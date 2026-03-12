"use client";

export default function Marquee({ texts = ["SHARE", "CONNECT", "GROW", "CREATE", "BUILD"], speed = 20 }) {
    // Double the text array so it loops seamlessly
    const doubled = [...texts, ...texts];

    return (
        <div className="marquee-container select-none">
            <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
                {doubled.map((text, i) => (
                    <span key={i} className="marquee-text">
                        {text} <span className="mx-4 inline-block">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
