#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
};
use tauri::{Builder, Manager};
use tauri_plugin_clipboard_manager::init as clipboard_plugin;
use window_vibrancy::apply_acrylic;

#[derive(Serialize, Deserialize)]
struct Author {
    id: String,
    name: String,
}

#[derive(Serialize, Deserialize)]
struct Quote {
    id: String,
    text: String,
    author: Author,
}

#[tauri::command]
async fn fetch_quote() -> Result<Quote, String> {
    let mut attempts = 0;
    while attempts < 10 {
        let res = reqwest::get("https://www.quoterism.com/api/quotes/random")
            .await
            .map_err(|e| format!("Network error: {}", e))?;
        let quote = res
            .json::<Quote>()
            .await
            .map_err(|e| format!("JSON decode error: {}", e))?;
        if quote.text.len() <= 224 {
            return Ok(quote);
        }
        attempts += 1;
    }
    Err("Failed to fetch a short quote after 10 attempts".into())
}

fn main() {
    #[cfg(target_os = "windows")]
    unsafe {
        winapi::um::shellscalingapi::SetProcessDpiAwareness(2);
    }
    Builder::default()
        .plugin(clipboard_plugin())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![fetch_quote])
        .setup(|app| {
            let win = app
                .get_webview_window("main")
                .expect("`main` window not found");

            #[cfg(target_os = "windows")]
            apply_acrylic(&win, Some((18, 18, 18, 125)))
                .expect("apply_acrylic only supported on Windows");

            let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let toggle_i =
                MenuItem::with_id(app, "show_hide", "Show/Hide Widget", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&toggle_i, &quit_i])?;

            let _tray = TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .show_menu_on_left_click(true)
                .build(app)?
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "show_hide" => {
                        if let Some(window) = app.get_webview_window("main") {
                            if let Ok(true) = window.is_visible() {
                                let _ = window.hide();
                            } else {
                                let _ = window.show();
                                let _ = window.set_focus();
                            }
                        }
                    }
                    _ => {
                        println!("Unhandled tray event: {:?}", event.id);
                    }
                });

            // Optionally hide taskbar icon on startup
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.set_skip_taskbar(true);
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
