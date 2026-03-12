"use client";

export default function GlobalError({ error, reset }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center animate-fade-in max-w-md">
                <div className="brutal-card-static p-10 relative overflow-hidden">
                    <div className="strip-red h-2 rounded-t-[9px] -mx-10 -mt-10 mb-8" style={{ marginLeft: "-2.5rem", marginRight: "-2.5rem", marginTop: "-2.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

                    <div className="w-16 h-16 bg-brutal-red/10 border-[3px] border-brutal-red rounded-xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#1a1a1a]">
                        <span className="text-3xl">😕</span>
                    </div>

                    <h1 className="text-2xl font-black text-brutal-black mb-3">
                        Something went wrong
                    </h1>
                    <p className="text-brutal-gray font-medium mb-8 leading-relaxed">
                        An unexpected error occurred. Don&apos;t worry — your data is safe.
                    </p>

                    <button
                        onClick={() => reset()}
                        className="brutal-btn brutal-btn-yellow px-8 py-3 text-sm hover-wobble"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}
