import React, { useEffect, useState } from "react";
import { Textfit } from "react-textfit";
import { PenLine } from "lucide-react";
import { Ellipsis } from "lucide-react";

function QuoteCard({ quote, author, loading }) {
    return (
        <div className="py-2 flex flex-col justify-start items-center h-full gap-7">
            <h1 className="font-cormorant tracking-widest text-[#90806F]"> DAILY QUOTE </h1>

            <Textfit
                mode="multi"
                min={16}
                max={35}
                className="font-eb-garamond gradient-animation text-center px-3 pb-3"
                style={{
                    height: "220px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                {loading ? (
                    <div className="w-full flex justify-center">
                        <Ellipsis fill="orange" size={80} />
                    </div>
                ) : (
                    `"${quote}"`
                )}
            </Textfit>

            <p className="text-[#c8ae93] text-2xl tracking-wide pb-2 flex justify-center items-center">
                <PenLine className="mr-3" size={20} color="#84725f" />
                {loading ? (
                    <Ellipsis fill="orange" size={40} className="flex justify-center items-center w-full" />
                ) : (`${author}`)}
            </p>
        </div>
    );
}

export default QuoteCard;
