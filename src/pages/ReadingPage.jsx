import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function ReadingPage({ novel }) {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState(20);

  const chapter = novel.chapters.find((c) => c.id === parseInt(chapterId));
  const currentIndex = novel.chapters.findIndex((c) => c.id === parseInt(chapterId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  if (!chapter)
    return (
      <div className="text-center py-20 font-semibold text-slate-600">
        Bab tidak ditemukan bos.
      </div>
    );

  const parseNovelText = (rawText) => {
    return rawText.split("\n").map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-3"></div>;

      let isQuote = false;
      let processedLine = line.trim();

      if (processedLine.startsWith(">")) {
        isQuote = true;
        processedLine = processedLine.substring(1).trim();
      }

      processedLine = processedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");
      processedLine = processedLine.replace(/_(.*?)_/g, "<em>$1</em>");
      processedLine = processedLine.replace(
        /^([A-Za-z0-9 ]+):/g,
        '<strong class="text-emerald-600 dark:text-emerald-400 font-inter tracking-wide">$1:</strong>'
      );

      if (isQuote) {
        return (
          <blockquote
            key={idx}
            className="border-l-4 border-emerald-500 pl-4 py-2 my-6 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-r-xl"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }

      return (
        <p
          key={idx}
          className="mb-7 leading-relaxed text-slate-800 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  const prevChapter = currentIndex > 0 ? novel.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < novel.chapters.length - 1 ? novel.chapters[currentIndex + 1] : null;

  return (
    <>
      {/* Floating Controls */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 bg-white/90 dark:bg-slate-900/90 shadow-2xl border border-slate-100 dark:border-slate-800 rounded-full backdrop-blur-sm">
        <button
          onClick={() => setFontSize((f) => Math.max(16, f - 2))}
          className="p-3 text-xs rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition font-bold text-slate-600 dark:text-slate-300"
        >
          A-
        </button>
        <button
          onClick={() => setFontSize((f) => Math.min(28, f + 2))}
          className="p-3 text-lg rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition font-bold text-slate-600 dark:text-slate-300"
        >
          A+
        </button>
        <div className="w-px h-7 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <button
          onClick={() => navigate(`/${novel.slug}/chapter/${prevChapter.id}`)}
          disabled={!prevChapter}
          className="p-3 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-20 disabled:pointer-events-none"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(`/${novel.slug}/chapter/${nextChapter.id}`)}
          disabled={!nextChapter}
          className="p-3 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-20 disabled:pointer-events-none"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <main className="max-w-3xl mx-auto px-5 py-12 sm:py-16 animate-fade-in pb-32">
        <header className="mb-14 pb-8 border-b border-slate-100 dark:border-slate-800">
          <Link
            to={`/${novel.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 mb-4 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900"
          >
            <HomeIcon className="w-4 h-4" /> Beranda Novel
          </Link>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tighter leading-tight">
            {chapter.title}
          </h1>
        </header>

        <article
          className="novel-content text-justify sm:text-left"
          style={{ fontSize: `${fontSize}px` }}
        >
          {parseNovelText(chapter.content)}
        </article>

        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
          <Link
            to={`/${novel.slug}`}
            className="text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
          >
            Tutup Membaca & Balik Ke Beranda Novel
          </Link>
        </div>
      </main>
    </>
  );
}
