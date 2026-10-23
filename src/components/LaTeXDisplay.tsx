import { useState, useEffect, useRef } from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export default function LaTeXDisplay({ content }: { content: String }) {
    return (
        /* <p>hello</p> */
        <>
            <BlockMath math={`\\textcolor{black}{${content}}`}/>
        </>
    )
}