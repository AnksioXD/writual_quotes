#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
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
        use winapi::um::shellscalingapi::SetProcessDpiAwareness;

        SetProcessDpiAwareness(2);
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
            unsafe {
                winapi::um::shellscalingapi::SetProcessDpiAwareness(2);
            }
            apply_acrylic(&win, Some((18, 18, 18, 125)))
                .expect("apply_acrylic only supported on Windows");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
