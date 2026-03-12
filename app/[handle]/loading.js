export default function ProfileLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-14">
            <div className="w-full max-w-sm animate-pulse">
                <div className="brutal-card-static p-8 text-center relative overflow-hidden">
                    <div className="strip-purple h-2 rounded-t-[9px] -mx-8 -mt-8 mb-8" style={{ marginLeft: "-2rem", marginRight: "-2rem", marginTop: "-2rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />

                    {/* Avatar skeleton */}
                    <div className="mb-4 flex justify-center">
                        <div className="w-24 h-24 rounded-xl bg-gray-200 border-[3px] border-brutal-border shadow-[3px_3px_0px_0px_#1a1a1a]" />
                    </div>

                    {/* Handle skeleton */}
                    <div className="h-7 w-32 bg-gray-200 rounded-lg mx-auto mb-3" />

                    {/* Bio skeleton */}
                    <div className="h-4 w-48 bg-gray-100 rounded mx-auto mb-2" />

                    {/* Link skeletons */}
                    <div className="flex flex-col gap-3 mt-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-14 bg-gray-100 rounded-xl border-[3px] border-brutal-border" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
