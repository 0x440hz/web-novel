import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  IdentificationIcon,
  StarIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";


export function WikiListPage({ novel }) {
  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 animate-fade-in">
      <div className="mb-8">
        <Link
          to={`/${novel.slug}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 w-fit"
        >
          <HomeIcon className="w-4 h-4" /> Kembali ke Beranda Novel
        </Link>
      </div>

      <header className="max-w-2xl mb-12 sm:mb-16">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2.5">
          <UserGroupIcon className="w-8 h-8" />
          <h1 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tighter">
            Wiki Karakter
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-lora">
          Daftar karakter dalam novel <em>{novel.title}</em>. Klik untuk melihat detail.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {novel.characters.map((char) => (
          <Link
            key={char.id}
            to={`/${novel.slug}/wiki/${char.id}`}
            className="group block bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-sm hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-center"
          >
            <div className="aspect-square rounded-full overflow-hidden mb-5 border-4 border-slate-50 dark:border-slate-900 group-hover:border-emerald-100 dark:group-hover:border-emerald-900 transition-all shadow-inner">
              <img
                src={char.image}
                alt={char.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition tracking-tight">
              {char.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-medium">
              {char.role}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}


export function WikiDetailPage({ novel }) {
  const { charId } = useParams();
  const navigate = useNavigate();

  const currentIndex = novel.characters.findIndex((c) => c.id === charId);
  const char = novel.characters[currentIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [charId]);

  if (!char) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-5">
        <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-4">
          Karakter tidak ditemukan bos.
        </h2>
        <button
          onClick={() => navigate(`/${novel.slug}/wiki`)}
          className="text-emerald-600 hover:underline"
        >
          Balik ke daftar Wiki
        </button>
      </div>
    );
  }

  const prevChar = currentIndex > 0 ? novel.characters[currentIndex - 1] : null;
  const nextChar = currentIndex < novel.characters.length - 1 ? novel.characters[currentIndex + 1] : null;

  
  const useCompactLayout = novel.status === "Tamat";

  return (
    <main className="max-w-5xl mx-auto px-5 py-12 sm:py-16 animate-fade-in pb-24">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        <button
          onClick={() => navigate(`/${novel.slug}`)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <HomeIcon className="w-4 h-4" /> Beranda Novel
        </button>
        <button
          onClick={() => navigate(`/${novel.slug}/wiki`)}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <UserGroupIcon className="w-4 h-4" /> Daftar Wiki
        </button>
      </div>

      {useCompactLayout ? (
        
        <>
          <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden mb-10">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-56 flex-shrink-0 flex flex-col items-center justify-start p-8 bg-slate-50 dark:bg-slate-900/50 border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-800">
                <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 mb-5">
                  <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight text-center leading-tight mb-1">
                  {char.name}
                </h1>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest text-center">
                  {char.role}
                </p>
              </div>
              <div className="flex-1 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <StarIcon className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    Informasi Dasar
                  </h2>
                </div>
                <div className="space-y-3">
                  {Object.entries(char.details).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-semibold text-slate-500 dark:text-slate-400">{key}: </span>
                      <span className="text-slate-800 dark:text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-3">Latar Belakang</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-lora text-justify">{char.description}</p>
          </div>
        </>
      ) : (
        
        <div className="grid md:grid-cols-[260px,1fr] gap-10 sm:gap-14 items-start mb-10">
          <div className="space-y-5">
            <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-center bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">{char.name}</h1>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 uppercase tracking-widest">{char.role}</p>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <IdentificationIcon className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Latar Belakang</h2>
              </div>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-lora text-justify">{char.description}</p>
            </section>

            <section>
              <div className="flex items-center gap-2.5 mb-5">
                <StarIcon className="w-6 h-6 text-emerald-500" />
                <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Informasi Dasar</h2>
              </div>
              <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="space-y-4">
                    {Object.entries(char.details).map(([key, value]) => (
                      <div key={key} className="text-base">
                        <span className="font-semibold text-slate-500 dark:text-slate-400">{key}: </span>
                        <span className="text-slate-800 dark:text-slate-200">{value}</span>
                      </div>
                    ))}
                  </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Traits */}
      {char.traits && (
        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
          {Object.entries(char.traits).map(([traitTitle, traitItems]) => (
            <div key={traitTitle} className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 tracking-tight border-b border-slate-200 dark:border-slate-700 pb-2">
                {traitTitle}
              </h3>
              <ul className="space-y-2.5">
                {traitItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                    <span className="text-emerald-500 mt-1 flex-shrink-0 text-sm">✦</span>
                    <span className="leading-relaxed font-lora text-md">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Navigasi Karakter */}
      <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        {prevChar ? (
          <button
            onClick={() => navigate(`/${novel.slug}/wiki/${prevChar.id}`)}
            className="group flex items-center gap-4 w-full sm:w-auto p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all border border-slate-100 dark:border-slate-800"
          >
            <ChevronLeftIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-0.5">Karakter Sebelumnya</p>
              <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">{prevChar.name}</p>
            </div>
          </button>
        ) : <div className="hidden sm:block"></div>}

        {nextChar ? (
          <button
            onClick={() => navigate(`/${novel.slug}/wiki/${nextChar.id}`)}
            className="group flex items-center justify-end gap-4 w-full sm:w-auto p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-all border border-slate-100 dark:border-slate-800 text-right"
          >
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mb-0.5">Karakter Selanjutnya</p>
              <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">{nextChar.name}</p>
            </div>
            <ChevronRightIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
          </button>
        ) : <div className="hidden sm:block"></div>}
      </div>
    </main>
  );
}
