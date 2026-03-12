export default function DashboardLoading() {
    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Header Card Skeleton */}
                <div className="brutal-card-static p-6 mb-8 animate-pulse">
                    <div className="strip-blue h-2 rounded-t-[9px] -mx-6 -mt-6 mb-6" style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem", marginTop: "-1.5rem", borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }} />
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-200 border-[3px] border-brutal-border" />
                        <div>
                            <div className="h-7 w-40 bg-gray-200 rounded-lg mb-2" />
                            <div className="h-4 w-28 bg-gray-100 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="brutal-card-static p-4 text-center animate-pulse">
                            <div className="h-2 rounded-t-[9px] bg-gray-200 -mx-4 -mt-4 mb-4" />
                            <div className="h-9 w-12 bg-gray-200 rounded-lg mx-auto mb-2" />
                            <div className="h-3 w-16 bg-gray-100 rounded mx-auto" />
                        </div>
                    ))}
                </div>

                {/* Taptrees List Skeleton */}
                <div className="brutal-card-static overflow-hidden animate-pulse">
                    <div className="px-6 py-4 bg-brutal-yellow" style={{ borderBottomWidth: "3px", borderBottomColor: "#1a1a1a" }}>
                        <div className="h-5 w-32 bg-brutal-black/20 rounded" />
                    </div>
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="px-6 py-6 border-b-[3px] border-brutal-border">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-200 border-[2px] border-brutal-border" />
                                <div>
                                    <div className="h-6 w-28 bg-gray-200 rounded-lg mb-2" />
                                    <div className="h-3 w-44 bg-gray-100 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
