// frontend/src/pages/Portfolio.jsx
import React, { useEffect, useMemo, useState } from "react";
import { api, API_BASE } from "../lib/api";

// ✅ Resolve media URLs coming from backend (e.g. "/uploads/x.jpg")
function resolveUrl(u) {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;

  // if env not set, return as-is (won't crash, but image may not load)
  if (!API_BASE) return u;

  const clean = u.startsWith("/") ? u : `/${u}`;
  return `${API_BASE}${clean}`;
}

/* =========================
   GALLERY MODAL (ALL IMAGES)
========================= */
function GalleryModal({ open, onClose, title, images = [], index = 0, setIndex }) {
  if (!open) return null;

  const safeImages = Array.isArray(images) ? images : [];
  const total = safeImages.length;
  const clampedIndex = Math.min(Math.max(index, 0), Math.max(total - 1, 0));
  const currentSrc = total ? safeImages[clampedIndex] : "";

  const prev = () => total > 1 && setIndex((i) => (i - 1 + total) % total);
  const next = () => total > 1 && setIndex((i) => (i + 1) % total);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className="relative w-full max-w-6xl rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700">
          <div>
            <p className="font-bold text-white">{title || "Preview"}</p>
            <p className="text-xs text-slate-300">
              {total ? `Image ${clampedIndex + 1} of ${total}` : "No images"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {total > 1 && (
              <>
                <button
                  className="px-3 py-2 rounded-xl bg-slate-700/60 text-white font-bold hover:bg-slate-600 transition border border-slate-600"
                  onClick={prev}
                  title="Previous"
                  type="button"
                >
                  ◀
                </button>
                <button
                  className="px-3 py-2 rounded-xl bg-slate-700/60 text-white font-bold hover:bg-slate-600 transition border border-slate-600"
                  onClick={next}
                  title="Next"
                  type="button"
                >
                  ▶
                </button>
              </>
            )}

            <button
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold hover:from-slate-600 hover:to-slate-700 transition border border-slate-600"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6">
          <div className="relative rounded-xl overflow-hidden bg-slate-900">
            {currentSrc ? (
              <img
                src={currentSrc}
                alt="preview"
                className="w-full max-h-[70vh] object-contain"
                loading="lazy"
              />
            ) : (
              <div className="h-[40vh] flex items-center justify-center text-slate-300">
                No images to preview
              </div>
            )}
          </div>

          {total > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-slate-200">All Images</p>
                <p className="text-xs text-slate-400">Scroll →</p>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {safeImages.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setIndex(i)}
                    className={`relative flex-shrink-0 rounded-xl overflow-hidden border transition ${
                      i === clampedIndex
                        ? "border-purple-400 ring-2 ring-purple-400/40"
                        : "border-slate-700 hover:border-slate-500"
                    }`}
                    style={{ width: 96, height: 72 }}
                    title={`Open image ${i + 1}`}
                    type="button"
                  >
                    <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
          <p className="text-sm text-slate-400 text-center">Click outside to close</p>
        </div>
      </div>
    </div>
  );
}

/* =========================
   DETAILS MODAL
========================= */
function DetailsModal({ open, onClose, project, onOpenGallery }) {
  if (!open || !project) return null;

  const media = Array.isArray(project.media) ? project.media : [];
  const images = media
    .filter((m) => {
      const t = String(m?.type || "").toLowerCase();
      const u = m?.url;
      return u && (t === "image" || !m?.type);
    })
    .map((m) => resolveUrl(m.url));

  const cover = images[0] || "";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-white shadow-2xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-white to-slate-50">
          <div>
            <p className="text-lg font-extrabold text-slate-900">{project.title}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {project.category && (
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                  {project.category}
                </span>
              )}
              {project.industry && (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  {project.industry}
                </span>
              )}
              {project.published && (
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  Published
                </span>
              )}
            </div>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6">
          {cover && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
              <img src={cover} alt="cover" className="w-full max-h-[45vh] object-contain bg-white" />
              <div className="p-4 flex flex-wrap gap-2 items-center justify-between">
                <p className="text-sm text-slate-600">{images.length} Images</p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition"
                    onClick={() => onOpenGallery(project.title, images, 0)}
                    type="button"
                  >
                    View All Images
                  </button>
                </div>
              </div>
            </div>
          )}

          {project.summary && (
            <section className="mt-6">
              <h4 className="text-sm font-extrabold text-slate-900 mb-2">Summary</h4>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">{project.summary}</p>
            </section>
          )}

          {Array.isArray(project.tags) && project.tags.length > 0 && (
            <section className="mt-6">
              <h4 className="text-sm font-extrabold text-slate-900 mb-2">Technologies / Tags</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>
          )}

          {Array.isArray(project.features) && project.features.length > 0 && (
            <section className="mt-6">
              <h4 className="text-sm font-extrabold text-slate-900 mb-2">Features</h4>
              <ul className="space-y-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-slate-700">
                    <span className="mt-1 w-2 h-2 rounded-full bg-purple-500 flex-shrink-0"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(project.results) && project.results.length > 0 && (
            <section className="mt-6">
              <h4 className="text-sm font-extrabold text-slate-900 mb-2">Results</h4>
              <ul className="space-y-2">
                {project.results.map((r, i) => (
                  <li key={i} className="flex gap-2 text-slate-700">
                    <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {images.length > 0 && (
            <section className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-slate-900">Images</h4>
                <button
                  className="text-sm font-bold text-purple-600 hover:text-purple-700"
                  onClick={() => onOpenGallery(project.title, images, 0)}
                  type="button"
                >
                  Open Gallery
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    className="rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-400 transition bg-white"
                    onClick={() => onOpenGallery(project.title, images, i)}
                    title={`Open image ${i + 1}`}
                    type="button"
                  >
                    <img src={src} alt={`img-${i}`} className="w-full h-36 object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [gallery, setGallery] = useState({
    open: false,
    title: "",
    images: [],
    index: 0,
  });

  const [details, setDetails] = useState({
    open: false,
    project: null,
  });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api("/api/portfolio?limit=50");
      setItems(res.items || []);
    } catch (e) {
      setError(e.message || "Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const categories = useMemo(() => {
    const cats = ["all"];
    (items || []).forEach((item) => {
      if (item.category && !cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, [items]);

  const filteredItems = useMemo(() => {
    return (items || []).filter((item) => {
      const matchesFilter = activeFilter === "all" || item.category === activeFilter;

      const s = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !s ||
        item.title?.toLowerCase().includes(s) ||
        item.summary?.toLowerCase().includes(s) ||
        item.tags?.some((tag) => String(tag).toLowerCase().includes(s)) ||
        item.features?.some((f) => String(f).toLowerCase().includes(s)) ||
        item.results?.some((r) => String(r).toLowerCase().includes(s));

      return matchesFilter && matchesSearch;
    });
  }, [items, activeFilter, searchTerm]);

  const openGallery = (title, images, index = 0) => {
    setGallery({
      open: true,
      title: title || "Preview",
      images: Array.isArray(images) ? images : [],
      index,
    });
  };

  const openDetails = (project) => {
    setDetails({ open: true, project });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></span>
            <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
              Our Work
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">
            Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Portfolio
            </span>
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Explore our collection of projects that blend premium design with strong functionality.
          </p>
        </div>

        {/* Modals */}
        <GalleryModal
          open={gallery.open}
          title={gallery.title}
          images={gallery.images}
          index={gallery.index}
          setIndex={(fnOrVal) =>
            setGallery((g) => ({
              ...g,
              index: typeof fnOrVal === "function" ? fnOrVal(g.index) : fnOrVal,
            }))
          }
          onClose={() => setGallery({ open: false, title: "", images: [], index: 0 })}
        />

        <DetailsModal
          open={details.open}
          project={details.project}
          onOpenGallery={openGallery}
          onClose={() => setDetails({ open: false, project: null })}
        />

        {/* Controls */}
        <div className="mb-8">
          <div className="rounded-3xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 p-6 shadow-lg">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects, technologies, features, results..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3.5 pl-12 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <svg
                    className="absolute left-4 top-3.5 w-5 h-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeFilter === cat
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    type="button"
                  >
                    {cat === "all" ? "All Projects" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-900">{filteredItems.length}</p>
                  <p className="text-sm text-slate-600">Projects</p>
                </div>
              </div>

              <button
                onClick={load}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 font-bold hover:from-slate-200 hover:to-slate-300 transition-all duration-300 flex items-center gap-2 border border-slate-300"
                type="button"
              >
                Refresh Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl bg-gradient-to-r from-red-50 to-red-100 border border-red-200 p-8 text-center shadow-lg">
            <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Portfolio</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={load}
              className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300"
              type="button"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-12 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Projects Found</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-6">
              {searchTerm || activeFilter !== "all"
                ? "Try adjusting your search or filter."
                : "Our portfolio is being updated. Check back soon!"}
            </p>
            {(searchTerm || activeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                type="button"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Cards */}
        {!loading && !error && filteredItems.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((p) => {
              const media = Array.isArray(p.media) ? p.media : [];
              const images = media
                .filter((m) => {
                  const t = String(m?.type || "").toLowerCase();
                  const u = m?.url;
                  return u && (t === "image" || !m?.type);
                })
                .map((m) => resolveUrl(m.url));

              const cover = images[0] || "";

              return (
                <div
                  key={p._id}
                  className="group relative rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    {cover ? (
                      <>
                        <img
                          src={cover}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
                          onClick={() => openGallery(p.title, images, 0)}
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 text-white text-xs font-bold backdrop-blur border border-white/10">
                          {images.length} Images
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-slate-400 font-medium">No Preview</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {p.category && (
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold">
                          {p.category}
                        </span>
                      )}
                      {p.industry && (
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                          {p.industry}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">{p.title}</h3>

                    {p.summary && <p className="text-slate-600 mb-4 line-clamp-2">{p.summary}</p>}

                    <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-sm">
                      <span className="font-semibold">
                        {(p.features?.length || 0) + (p.results?.length || 0)} Items
                      </span>
                      <span className="font-semibold">{images.length} Images</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => openDetails(p)}
                        className="py-3 rounded-xl font-bold border border-slate-300 bg-white hover:bg-slate-50 transition"
                        type="button"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => openGallery(p.title, images, 0)}
                        disabled={!cover}
                        className={`py-3 rounded-xl font-bold transition-all duration-300 border ${
                          cover
                            ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 hover:from-slate-200 hover:to-slate-300 border-slate-300"
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        }`}
                        type="button"
                      >
                        View Images
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
      `}</style>
    </div>
  );
}
