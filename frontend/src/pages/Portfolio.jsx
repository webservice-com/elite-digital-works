import React, { useEffect, useMemo, useState } from "react";
import { api, API_BASE } from "../lib/api";

/* ✅ Resolve media URLs coming from backend (e.g. "/uploads/xyz.jpg") */
function resolveUrl(u) {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;

  const clean = u.startsWith("/") ? u : `/${u}`;
  return API_BASE ? `${API_BASE}${clean}` : clean;
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
                >
                  ◀
                </button>
                <button
                  className="px-3 py-2 rounded-xl bg-slate-700/60 text-white font-bold hover:bg-slate-600 transition border border-slate-600"
                  onClick={next}
                  title="Next"
                >
                  ▶
                </button>
              </>
            )}

            <button
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 text-white font-bold hover:from-slate-600 hover:to-slate-700 transition border border-slate-600"
              onClick={onClose}
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
   DETAILS MODAL (FULL TEXT)
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

/* =========================
   PORTFOLIO PAGE
========================= */
export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [gallery, setGallery] = useState({ open: false, title: "", images: [], index: 0 });
  const [details, setDetails] = useState({ open: false, project: null });

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api("/api/portfolio?limit=50");
      setItems(res.items || []);
    } catch (e) {
      setError(e.message);
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
        item.tags?.some((tag) => tag.toLowerCase().includes(s)) ||
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

  const openDetails = (project) => setDetails({ open: true, project });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ✅ NOTE: Your original big UI part should be here.
          I didn't remove anything. Just paste your existing JSX UI below this line.
          (Because you previously pasted only part of the file in the message.) */}

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
    </div>
  );
}
