import { useState, useEffect } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import {
  BookOpenIcon,
  SunIcon,
  MoonIcon,
  UserGroupIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import { novels, getNovel } from "./data/novels/index";
import NovelHome from "./pages/NovelHome";
import ReadingPage from "./pages/ReadingPage";
import { WikiListPage, WikiDetailPage } from "./pages/WikiPage";

function Navbar({ isDarkMode, setIsDarkMode }) {
  return (
    <nav className="bg-white/95 dark:bg-slate-950/95 shadow-sm sticky top-0 z-50 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <BookOpenIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tighter group-hover:text-emerald-600 transition">
              Novel Rerei
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition px-3 py-2 rounded-xl"
            >
              <span className="hidden sm:inline">Semua Novel</span>
            </Link>
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800"></div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LibraryPage() {
  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20 animate-fade-in">
      <header className="max-w-3xl mb-16">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
          Koleksi Novel
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tighter leading-tight mb-4">
          Novel Rerei
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Pilih novel yang ingin kamu baca.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-8">
        {novels.map((novel) => (
          <div
            key={novel.id}
            className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600">
                {novel.id.toUpperCase()}
              </span>
              {novel.status === "Tamat" ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                  <CheckBadgeIcon className="w-3.5 h-3.5" /> Tamat
                </span>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                  Ongoing
                </span>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tighter leading-tight mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
              {novel.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-lora line-clamp-3">
              {novel.synopsis}
            </p>

            <div className="flex gap-3">
              <Link
                to={`/${novel.slug}`}
                className="inline-flex items-center gap-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold px-5 py-3 rounded-xl hover:bg-slate-700 dark:hover:bg-slate-200 transition text-sm"
              >
                <BookOpenIcon className="w-4 h-4" /> Baca Novel
              </Link>
              <Link
                to={`/${novel.slug}/wiki`}
                className="inline-flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold px-5 py-3 rounded-xl hover:border-emerald-400 hover:text-emerald-600 transition text-sm"
              >
                <UserGroupIcon className="w-4 h-4" /> Wiki
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function NovelHomeWrapper() {
  const { novelSlug } = useParams();
  const novel = getNovel(novelSlug);
  if (!novel) return <NotFound />;
  return <NovelHome novel={novel} />;
}

function ReadingWrapper() {
  const { novelSlug } = useParams();
  const novel = getNovel(novelSlug);
  if (!novel) return <NotFound />;
  return <ReadingPage novel={novel} />;
}

function WikiListWrapper() {
  const { novelSlug } = useParams();
  const novel = getNovel(novelSlug);
  if (!novel) return <NotFound />;
  return <WikiListPage novel={novel} />;
}

function WikiDetailWrapper() {
  const { novelSlug } = useParams();
  const novel = getNovel(novelSlug);
  if (!novel) return <NotFound />;
  return <WikiDetailPage novel={novel} />;
}

function NotFound() {
  return (
    <div className="text-center py-20 text-slate-600 dark:text-slate-400">
      <p className="text-2xl font-bold mb-2">404 — Ga ketemu bos</p>
      <Link to="/" className="text-emerald-600 hover:underline text-sm">
        Balik ke beranda
      </Link>
    </div>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Routes>
        <Route path="/" element={<LibraryPage />} />

        <Route path="/:novelSlug" element={<NovelHomeWrapper />} />
        <Route
          path="/:novelSlug/chapter/:chapterId"
          element={<ReadingWrapper />}
        />
        <Route path="/:novelSlug/wiki" element={<WikiListWrapper />} />
        <Route
          path="/:novelSlug/wiki/:charId"
          element={<WikiDetailWrapper />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
