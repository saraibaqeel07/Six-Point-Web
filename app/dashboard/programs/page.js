"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Search, Calendar } from "lucide-react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { getClassTypesService } from "@/app/lib/apiServices";
import { toast } from "sonner";

const FALLBACK_IMAGES = [
  "/assets/practice.png",
  "/assets/beginners.png",
  "/assets/advanced.png",
  "/assets/beginners.png",
];

const LIMIT = 10;

export default function ProgramsPage() {
  const [programs, setPrograms]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [query, setQuery]           = useState("");
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debounceRef                 = useRef(null);

  const fetchPrograms = useCallback(async (q, pg) => {
    setLoading(true);
    try {
      const res = await getClassTypesService({ q: q || undefined, page: pg, limit: LIMIT, activeOnly: true });
      const items = res?.data || res?.classTypes || res || [];
      const total = res?.totalPages || res?.meta?.totalPages || 1;
      setPrograms(Array.isArray(items) ? items : []);
      setTotalPages(total);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to load programs.";
      toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms(query, page);
  }, [query, page, fetchPrograms]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      setQuery(val);
    }, 400);
  };

  return (
    <>
      <PageHeader title="Programs" />

      {/* Search */}
      <div className="relative mb-5 w-full sm:w-72">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search programs…"
          className="w-full border border-white/10 bg-[#2d2525] pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/30"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded border border-white/10 bg-white/5" />
          ))}
        </div>
      ) : programs.length === 0 ? (
        <div className="border border-white/10 bg-[#2d2525] p-10 text-center text-white/50">
          No programs found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
          {programs.map((program, index) => (
            <ProgramCard
              key={program._id || index}
              id={program._id}
              title={program.name || program.title || "—"}
              duration={program.duration ? `${program.duration} MIN` : "—"}
              level={program.level || program.difficultyLevel}
              image={program.image || program.thumbnail || program.imageUrl || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
              description={program.description}
              createdAt={program.createdAt}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 text-sm border border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Prev
          </button>
          <span className="text-sm text-white/50">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 text-sm border border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function ProgramCard({ id, title, duration, level, image, description, createdAt }) {
  return (
    <div className="group overflow-hidden border border-white/10 bg-[#2d2525] shadow-lg transition-transform duration-300 hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[1/1] w-full sm:w-40 lg:w-52 shrink-0">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white leading-tight">
              {title}
            </h3>

            {/* <p className="mt-2 text-xs sm:text-sm tracking-[0.18em] uppercase text-white/70">
              {duration} | {level}
            </p> */}

            {formatDate(createdAt) && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-white/40">
                <Calendar size={11} />
                Added {formatDate(createdAt)}
              </p>
            )}

            {description && (
              <p className="mt-2 text-xs text-white/50 line-clamp-2">{description}</p>
            )}
          </div>

          <div className="flex justify-start sm:justify-end">
            <Button
              href={`/dashboard/programs/${id}?name=${encodeURIComponent(title)}`}
              className="inline-flex w-full sm:w-auto justify-center px-5 py-2.5"
            >
              Book Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
