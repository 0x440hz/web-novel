import { Link } from "react-router-dom";
import { BookOpenIcon, UserGroupIcon, ChevronRightIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

export default function NovelHome({ novel }) {
  const chaptersByArc = novel.chapters.reduce((acc, ch) => {
    if (!acc[ch.arc]) acc[ch.arc] = [];
    acc[ch.arc].push(ch);
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20 animate-fade-in">
      <header className="max-w-3xl mb-16 sm:mb-24">
        <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-emerald-600 transition block mb-4">
          ← Semua Novel
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
            Sebuah Novel Oleh {novel.author}
          </span>
          {novel.status === "Tamat" && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
              <CheckBadgeIcon className="w-3.5 h-3.5" /> Tamat
            </span>
          )}
          {novel.status === "Ongoing" && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              Ongoing
            </span>
          )}
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tighter leading-tight mb-6">
          {novel.title}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 font-lora">
          {novel.synopsis}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to={`/${novel.slug}/chapter/${novel.chapters[0].id}`}
            className="inline-flex items-center gap-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold px-8 py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition text-lg shadow-sm"
          >
            <BookOpenIcon className="w-5 h-5" />
            Mulai Membaca Bab 1
          </Link>
          <Link
            to={`/${novel.slug}/wiki`}
            className="inline-flex items-center gap-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold px-8 py-4 rounded-xl hover:border-emerald-400 hover:text-emerald-700 transition text-lg"
          >
            <UserGroupIcon className="w-5 h-5" />
            Wiki Karakter
          </Link>
        </div>
      </header>

      <section className="space-y-12 sm:space-y-16">
        {Object.entries(chaptersByArc).map(([arcTitle, chapters]) => (
          <div key={arcTitle} className="animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {arcTitle}
              </h2>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {chapters.map((chap) => (
                <Link
                  key={chap.id}
                  to={`/${novel.slug}/chapter/${chap.id}`}
                  className="group flex items-center gap-5 p-6 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition shadow-sm"
                >
                  <span className="text-2xl font-mono font-bold text-slate-300 dark:text-slate-700 tabular-nums group-hover:text-emerald-400 transition">
                    {String(chap.id).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition">
                    {chap.title.split(": ").length > 1 ? chap.title.split(": ")[1] : chap.title}
                  </span>
                  <ChevronRightIcon className="w-5 h-5 text-slate-300 dark:text-slate-700 ml-auto group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
