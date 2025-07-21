export default function Footer() {
    return (
        <>
            {/* Footer */}
            < footer className="bg-black text-white px-4 py-20 sm:py-28 md:py-32 relative overflow-hidden" >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-[6rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] xl:text-[22rem] font-bold text-gray-800 opacity-40 select-none leading-none tracking-tighter text-center whitespace-nowrap">
                        Plantify
                    </div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center text-sm text-gray-400">
                        <p>&copy; 2025 Plantify</p>
                    </div>
                </div>
            </footer >
        </>
    )
}