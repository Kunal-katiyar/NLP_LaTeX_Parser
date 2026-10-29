import { useState, useEffect, useRef } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import useDarkMode from "@/hooks/useDarkMode.ts"

export default function LaTeXDisplay({ content }: { content: string }) {
    const isDark = useDarkMode();
    const textColor = isDark ? 'white' : 'black';

    const copyToClipboard = async(): Promise<void> => {
        try {
            if (!navigator.clipboard) {
            throw new Error("Clipboard API is not available in this browser context.");
            }
            await navigator.clipboard.writeText(content);
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };
    
    return (
        /* <p>hello</p> */
        <div onClick={copyToClipboard} className="mt-4 mb-4 flex justify-center">
            <div className="latex-wrapper">
                <BlockMath math={`\\textcolor{textColor}{${content}}`}/>
                <span className="latex-tooltip">Click to copy LaTeX</span>
            </div>
        </div>
    )
}