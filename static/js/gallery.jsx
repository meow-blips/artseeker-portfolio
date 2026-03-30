const { useState, useEffect, useRef } = React;

/* ────────────────────────────────────────────────────────────
   Gallery App — fetches portfolio items from the FastAPI API,
   renders a filterable grid, and opens a modal lightbox on click.
   ──────────────────────────────────────────────────────────── */

function GalleryApp() {
    const [items, setItems]             = useState([]);
    const [filter, setFilter]           = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading]         = useState(true);

    useEffect(() => {
        fetch("/api/portfolio")
            .then(r => r.json())
            .then(data => { setItems(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filteredItems = filter === "all"
        ? items
        : items.filter(i => i.category === filter);

    const categories = [
        { id: "all",      label: "All"     },
        { id: "drawings", label: "Drawings"},
        { id: "crochet",  label: "Crochet" },
    ];

    return (
        <div>
            {/* ── Filter Tabs ─────────────────────────── */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={
                            "px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 " +
                            (filter === cat.id
                                ? "bg-[#c9705d] dark:bg-[#e07a5f] text-white shadow-lg shadow-[#c9705d]/25"
                                : "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-[#c9705d]/50 dark:hover:border-[#c9705d]/50")
                        }
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* ── Grid ────────────────────────────────── */}
            {loading ? (
                <div className="text-center py-20 text-gray-400 animate-pulse">Loading pieces…</div>
            ) : filteredItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No items in this category yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <GalleryCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                    ))}
                </div>
            )}

            {/* ── Modal ───────────────────────────────── */}
            {selectedItem && (
                <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
}


/* ── Gallery Card ──────────────────────────────────────────── */

function GalleryCard({ item, onClick }) {
    const badgeClass = item.category === "drawings"
        ? "bg-[#c9705d]/10 text-[#c9705d] dark:bg-[#c9705d]/20 dark:text-[#e07a5f]"
        : "bg-[#81b29a]/10 text-[#81b29a] dark:bg-[#81b29a]/20 dark:text-[#a3c9b7]";

    return (
        <div
            onClick={onClick}
            className="group cursor-pointer overflow-hidden rounded-2xl bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
            <div className="aspect-square overflow-hidden relative">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-white font-medium text-sm">Click to view details</span>
                </div>
            </div>
            <div className="p-5">
                <span className={"inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-2 " + badgeClass}>
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <h3 className="font-semibold text-lg" style={{fontFamily:"'Playfair Display',Georgia,serif"}}>
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.price}</p>
            </div>
        </div>
    );
}


/* ── Modal / Lightbox ──────────────────────────────────────── */

function Modal({ item, onClose }) {
    const backdropRef = useRef(null);

    useEffect(() => {
        const onEsc = e => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onEsc);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onEsc);
            document.body.style.overflow = "";
        };
    }, []);

    const handleBackdrop = e => {
        if (e.target === backdropRef.current) onClose();
    };

    const badgeClass = item.category === "drawings"
        ? "bg-[#c9705d]/10 text-[#c9705d] dark:bg-[#c9705d]/20 dark:text-[#e07a5f]"
        : "bg-[#81b29a]/10 text-[#81b29a] dark:bg-[#81b29a]/20 dark:text-[#a3c9b7]";

    return (
        <div
            ref={backdropRef}
            onClick={handleBackdrop}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm modal-fade-in"
        >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-auto bg-white dark:bg-[#1a1d2e] rounded-2xl shadow-2xl modal-slide-up">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black/80 transition"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/2">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
                        <span className={"inline-block self-start px-3 py-1 rounded-full text-xs font-medium mb-3 " + badgeClass}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>

                        <h2 className="text-2xl font-bold mb-2" style={{fontFamily:"'Playfair Display',Georgia,serif"}}>
                            {item.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            {item.description}
                        </p>

                        {/* Tools */}
                        <div className="mb-6">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                Tools &amp; Materials
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {item.tools.map((tool, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Price + Instagram DM */}
                        <div className="mt-auto flex items-center gap-4">
                            <span className="text-2xl font-bold text-[#c9705d] dark:text-[#e07a5f]">
                                {item.price}
                            </span>
                            <a
                                href="https://instagram.com/artseeker13"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                DM on Instagram
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


/* ── Mount ─────────────────────────────────────────────────── */
const root = ReactDOM.createRoot(document.getElementById("gallery-root"));
root.render(<GalleryApp />);
