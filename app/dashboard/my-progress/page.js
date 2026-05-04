"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight, X, FileText } from "lucide-react";
import PageHeader from "@/app/components/dashboard/pageHeader";
import Button from "@/app/components/elements/Button";
import { getMyProgressService, getMyNotesService } from "@/app/lib/apiServices";

export default function MyProgressPage() {
  const [progress, setProgress] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);

  useEffect(() => {
    getMyProgressService()
      .then((data) => setProgress(data))
      .catch((err) => console.error("my-progress error:", err));
  }, []);

  function openNotesModal() {
    setNotesOpen(true);
    if (notes.length === 0) {
      setNotesLoading(true);
      getMyNotesService()
        .then((data) => {
          const list = Array.isArray(data) ? data : data?.data ?? [];
          setNotes(list);
        })
        .catch((err) => console.error("my-notes error:", err))
        .finally(() => setNotesLoading(false));
    }
  }

  const attendance = progress?.attendance;
  const belt = progress?.belt;
  const latestNote = progress?.latestNote;

  return (
    <>
      <PageHeader title="My Progress" />

      <section className="bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:items-start gap-5 border border-white/10">
        <div className="flex items-start gap-4 flex-col">
          <img src="/assets/next-class.png" alt="Next Class" className="w-20 h-20 object-contain" />
          <div>
            <h2 className="text-lg font-medium">Attendance</h2>
            <p className="text-sm text-white/70 mt-2">
              Total Classes Attended: {attendance?.total ?? "—"}
            </p>
            <p className="text-sm text-white/70 mt-1">
              Classes Attended this Month: {attendance?.thisMonth ?? "—"} / {attendance?.target ?? "—"}
            </p>
          </div>
          <Button className="hidden sm:inline-flex">Consistency builds champions</Button>
        </div>
      </section>

      <section className="bg-[#2d2525] p-5 lg:p-6 flex flex-col lg:items-start gap-5 border border-white/10 mt-5">
        <div className="flex items-start gap-4 flex-col">
          <img src="/assets/next-class.png" alt="Next Class" className="w-20 h-20 object-contain" />
          <div>
            <h2 className="text-lg font-medium">Current Belt</h2>
            <p className="text-sm text-white/70 mt-2">Belt: {belt?.name ?? "—"}</p>
            <p className="text-sm text-white/70 mt-1">Next Promotion Goal: {belt?.nextGoal ?? "—"}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#2d2525] p-5 lg:p-6 border border-white/10 mt-5">
        <button
          type="button"
          onClick={openNotesModal}
          className="w-full flex items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4 flex-col text-left flex-1">
            <img src="/assets/next-class.png" alt="Next Class" className="w-20 h-20 object-contain" />
            <div>
              <h2 className="text-lg font-medium">Coach Notes</h2>
              {latestNote ? (
                <>
                  <blockquote className="text-lg text-white/70 italic tracking-tight my-3 border-l-2 border-white/20 pl-3">
                    <p>{latestNote.note || latestNote.content || String(latestNote)}</p>
                  </blockquote>
                  {latestNote.updatedAt && (
                    <p className="text-sm text-white/70 mt-1">
                      Last Updated: {new Date(latestNote.updatedAt).toLocaleDateString()}
                    </p>
                  )}
                  {latestNote.coach?.fullName && (
                    <p className="text-sm text-white/70 mt-1">Coach: Prof. {latestNote.coach.fullName}</p>
                  )}
                </>
              ) : (
                <p className="text-sm text-white/50 mt-2">No coach notes yet.</p>
              )}
            </div>
          </div>
          <ChevronRight className="text-white/50 flex-shrink-0" size={22} />
        </button>
      </section>

      {notesOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setNotesOpen(false)}
          />
          <div className="relative z-10 w-full sm:max-w-lg bg-[#1f1919] border border-white/10 flex flex-col max-h-[85vh] rounded-t-2xl sm:rounded-2xl overflow-hidden">

            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">All Coach Notes</h3>
              <button
                onClick={() => setNotesOpen(false)}
                className="text-white/60 hover:text-white transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
              {notesLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-[#2d2525] border border-white/10 p-4 rounded-lg space-y-2 animate-pulse">
                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                    <div className="h-3 w-1/2 bg-white/10 rounded" />
                    <div className="h-3 w-1/3 bg-white/10 rounded" />
                  </div>
                ))
              ) : notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 gap-3 text-white/40">
                  <FileText size={40} />
                  <p className="text-sm">No coach notes yet.</p>
                </div>
              ) : (
                notes.map((n, i) => (
                  <div key={n._id || i} className="bg-[#2d2525] border border-white/10 p-4 rounded-lg">
                    <blockquote className="text-white/80 italic text-sm border-l-2 border-white/20 pl-3">
                      {n.note || n.content || String(n)}
                    </blockquote>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {n.coach?.fullName && (
                        <span className="text-xs text-white/50">Prof. {n.coach.fullName}</span>
                      )}
                      {n.updatedAt && (
                        <span className="text-xs text-white/40">
                          {new Date(n.updatedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
