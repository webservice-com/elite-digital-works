import React, { useEffect, useMemo, useState } from "react";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";

function Chip({ text, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold">
      {text}
      <button
        type="button"
        onClick={onRemove}
        className="w-6 h-6 rounded-full hover:bg-white border border-transparent hover:border-slate-200"
        aria-label="Remove"
      >
        ✕
      </button>
    </span>
  );
}

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [msg, setMsg] = useState({ type: "", text: "" });

  // Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Website");
  const [industry, setIndustry] = useState("");
  const [summary, setSummary] = useState("");
  const [published, setPublished] = useState(true);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);

  const [resultInput, setResultInput] = useState("");
  const [results, setResults] = useState([]);

  // Upload state
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);

  const token = useMemo(() => getToken(), []);
  const authHeaders = () => ({ Authorization: `Bearer ${token}` });

  async function load() {
    setLoading(true);
    setMsg({ type: "", text: "" });
    try {
      const res = await api("/api/admin/portfolio", {
        headers: authHeaders(),
      });
      setItems(res.items || []);
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Failed to load portfolio" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addToList(list, setList, input, setInput) {
    const v = input.trim();
    if (!v) return;
    if (list.includes(v)) return;
    setList([...list, v]);
    setInput("");
  }

  function removeFromList(list, setList, v) {
    setList(list.filter((x) => x !== v));
  }

  function onPickFiles(e) {
    const picked = Array.from(e.target.files || []);
    setFiles(picked);
  }

  async function uploadMedia(itemId) {
    if (!files.length) {
      setMsg({ type: "err", text: "Select images/videos first." });
      return;
    }

    setBusy(true);
    setMsg({ type: "", text: "" });

    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f)); // ✅ MUST MATCH backend upload.array("files")

      await api(`/api/admin/portfolio/${itemId}/media`, {
        method: "POST",
        headers: authHeaders(), // ✅ DON'T set Content-Type
        body: fd,
      });

      setMsg({ type: "ok", text: "Media uploaded successfully." });

      // Clear file picker state
      setFiles([]);
      await load();
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Upload failed" });
    } finally {
      setBusy(false);
    }
  }

  async function createItem(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!title.trim()) {
      setMsg({ type: "err", text: "Title is required" });
      return;
    }

    setBusy(true);
    try {
      const payload = {
        title: title.trim(),
        category: category.trim() || "Website",
        industry: industry.trim(),
        summary: summary.trim(),
        published: Boolean(published),
        tags,
        features,
        results,
        media: [],
      };

      await api("/api/admin/portfolio", {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setMsg({
        type: "ok",
        text: "Portfolio item created. Now select files and click “Upload Media” on that item.",
      });

      // reset form (DO NOT clear selected files)
      setTitle("");
      setCategory("Website");
      setIndustry("");
      setSummary("");
      setPublished(true);
      setTags([]);
      setFeatures([]);
      setResults([]);
      setTagInput("");
      setFeatureInput("");
      setResultInput("");

      await load();
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Create failed" });
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(id) {
    const ok = confirm("Delete this portfolio item?");
    if (!ok) return;

    setBusy(true);
    setMsg({ type: "", text: "" });
    try {
      await api(`/api/admin/portfolio/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      setMsg({ type: "ok", text: "Deleted." });
      await load();
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Delete failed" });
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(item) {
    setBusy(true);
    setMsg({ type: "", text: "" });
    try {
      await api(`/api/admin/portfolio/${item._id}/publish`, {
        method: "PATCH",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ published: !item.published }),
      });
      await load();
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Update failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold">Portfolio Manager</h2>
        <p className="text-slate-600 mt-1">
          Add projects and publish them to the public portfolio page.
        </p>
      </div>

      {msg.text && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-semibold border ${
            msg.type === "ok"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* CREATE */}
      <form
        onSubmit={createItem}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4"
      >
        <h3 className="text-xl font-extrabold">Add New Project</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3"
              placeholder="Project title"
              disabled={busy}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3"
              placeholder="Website / E-commerce / Landing Page"
              disabled={busy}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Industry</label>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3"
              placeholder="Printing / Retail / Education"
              disabled={busy}
            />
          </div>

          <div className="flex items-end gap-3">
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={busy}
              />
              Published (visible to customers)
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 min-h-[120px]"
            placeholder="Short description of the project..."
            disabled={busy}
          />
        </div>

        {/* TAGS */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Tags</label>
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3"
              placeholder="React, Node, SEO..."
              disabled={busy}
            />
            <button
              type="button"
              onClick={() => addToList(tags, setTags, tagInput, setTagInput)}
              className="px-5 rounded-xl bg-slate-900 text-white font-extrabold disabled:opacity-50"
              disabled={busy}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Chip
                key={t}
                text={t}
                onRemove={() => removeFromList(tags, setTags, t)}
              />
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Features</label>
          <div className="flex gap-2">
            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3"
              placeholder="Admin panel, Payments, SEO..."
              disabled={busy}
            />
            <button
              type="button"
              onClick={() =>
                addToList(features, setFeatures, featureInput, setFeatureInput)
              }
              className="px-5 rounded-xl bg-slate-900 text-white font-extrabold disabled:opacity-50"
              disabled={busy}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((t) => (
              <Chip
                key={t}
                text={t}
                onRemove={() => removeFromList(features, setFeatures, t)}
              />
            ))}
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Results</label>
          <div className="flex gap-2">
            <input
              value={resultInput}
              onChange={(e) => setResultInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3"
              placeholder="Faster loading, +30% leads..."
              disabled={busy}
            />
            <button
              type="button"
              onClick={() =>
                addToList(results, setResults, resultInput, setResultInput)
              }
              className="px-5 rounded-xl bg-slate-900 text-white font-extrabold disabled:opacity-50"
              disabled={busy}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((t) => (
              <Chip
                key={t}
                text={t}
                onRemove={() => removeFromList(results, setResults, t)}
              />
            ))}
          </div>
        </div>

        {/* UPLOAD PICKER */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Select Images / Videos (for upload step)
          </label>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={onPickFiles}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white"
            disabled={busy}
          />

          {files.length > 0 && (
            <div className="text-xs text-slate-500 space-y-1">
              <p>{files.length} file(s) selected</p>
              <ul className="list-disc pl-5">
                {files.slice(0, 6).map((f, i) => (
                  <li key={i}>
                    {f.name} ({Math.round(f.size / 1024)} KB)
                  </li>
                ))}
                {files.length > 6 && <li>+{files.length - 6} more</li>}
              </ul>
            </div>
          )}

          <p className="text-xs text-slate-500">
            Create item → select files → click “Upload Media” on that item.
          </p>
        </div>

        <button
          disabled={busy}
          className="w-full rounded-xl bg-slate-900 text-white font-extrabold py-3 hover:opacity-95 disabled:opacity-50"
        >
          {busy ? "Saving..." : "Save Portfolio Item"}
        </button>
      </form>

      {/* LIST */}
      <section className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold">Existing Projects</h3>
          <button
            onClick={load}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-bold hover:bg-slate-50 disabled:opacity-50"
            disabled={busy}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="mt-4">Loading...</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-slate-600">No portfolio items yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((p) => (
              <div
                key={p._id}
                className="rounded-2xl border border-slate-200 p-4 flex items-start justify-between gap-4"
              >
                <div>
                  <p className="font-extrabold">{p.title}</p>
                  <p className="text-sm text-slate-600">
                    {p.category} • {p.industry || "—"} •{" "}
                    <span className="font-bold">
                      {p.published ? "Published" : "Hidden"}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Media: {p.media?.length || 0}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => togglePublish(p)}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-bold hover:bg-slate-50 disabled:opacity-50"
                      disabled={busy}
                    >
                      {p.published ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      onClick={() => uploadMedia(p._id)}
                      className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-bold hover:bg-slate-50 disabled:opacity-50"
                      disabled={busy}
                    >
                      {busy ? "Uploading..." : "Upload Media"}
                    </button>

                    <button
                      onClick={() => deleteItem(p._id)}
                      className="px-4 py-2 rounded-xl border border-red-200 bg-red-50 text-red-800 font-extrabold hover:bg-red-100 disabled:opacity-50"
                      disabled={busy}
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mt-2">
                    Tip: Select files above, then click “Upload Media”.
                  </p>
                </div>

                <div className="text-xs text-slate-500 whitespace-nowrap">
                  {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
