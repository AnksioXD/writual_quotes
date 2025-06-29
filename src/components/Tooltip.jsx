import React from "react";

const Tooltip = ({ text, position = "top", children }) => {
    let tooltipPosition = "";
    let containerClasses = "relative group inline-flex items-center";

    if (position === "top") {
        tooltipPosition = "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    } else if (position === "bottom" || position === "down") {
        tooltipPosition = "absolute top-full left-1/2 transform -translate-x-1/2 mt-2";
    } else if (position === "right") {
        tooltipPosition = "absolute left-full top-1/2 transform -translate-y-1/2 ml-2";
    } else if (position === "left") {
        tooltipPosition = "absolute right-full top-1/2 transform -translate-y-1/2 mr-2";
    }

    return (
        <div className={containerClasses}>
            {children}
            <div className={`z-10 text-[#ebd9b8] border border-[#655A4E] text-base px-2 py-1 rounded whitespace-nowrap hidden group-hover:block bg-[#080807] ${tooltipPosition}`}>
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
