'use client';

import { useState } from 'react';
import { PageContainer, SectionHeader } from '@/components/ui';
import { ChevronDown, ImageIcon, ExternalLink, Video } from 'lucide-react';

const VIDEO_ROKY = [
  {
    rok: '2025',
    videa: [
      { id: 'Z_W386m0q4Q' },
      { id: 'L3yYgtdGbF8' },
      { id: '_-a_Rg303lA' },
      { id: '29cMFiTPf4I' },
    ],
  },
  { rok: '2024', videa: [{ id: 'xBmMd8Froqo' }] },
  {
    rok: '2023',
    videa: [
      { id: 'Ioa6C8fRfOQ' },
      { id: '1Qb6uEEqQmk' },
    ],
  },
  { rok: '2022', videa: [{ id: 'PcdNnXfUYco' }] },
];

const GALERIE = [
  { rok: '11. ročník - Veterán Cup 2025', fotky: [
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-zapas-deti-utkani-osobnosti-predani-se', label: 'Zápas dětí, utkání osobností, předání šeku (Marek Hlava)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-turnaj-veteranu', label: 'Turnaj veteránů (Marek Hlava)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-7-podekovani-deti-a-predani-seku', label: 'Poděkování dětem a předání šeku (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-6-zapas-osobnosti', label: 'Zápas osobností (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-5-zapas-deti-a-besada', label: 'Zápas dětí a beseda (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-4-vyhlaseni-vysledku-turnaje', label: 'Vyhlášení výsledků turnaje (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-3', label: 'Turnaj veteránů 3 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-2', label: 'Turnaj veteránů 2 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2025-1', label: 'Turnaj veteránů 1 (Jiří Mikyska)' },
  ]},
  { rok: '10. ročník - Veterán Cup 2024', fotky: [
    { url: 'https://eu.zonerama.com/annakropackova/Album/11651888', label: 'Veterán Cup Letohrad (Anna Kropáčková)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-1', label: 'Turnaj veteránů 1 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-2', label: 'Turnaj veteránů 2 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-3', label: 'Turnaj veteránů 3 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-4', label: 'Turnaj veteránů 4 (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-6-zapas-deti', label: 'Zápas dětí ZŠS Neratov a SK Hokejbal Letohrad (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-5-zapas-osobnosti', label: 'Utkání osobností (Jiří Mikyska)' },
    { url: 'https://www.rajce.idnes.cz/motyckamartin/album/veteran-cup-letohrad-2024-7-podekovani-a-predani-seku', label: 'Předání šeku (Jiří Mikyska)' },
  ]},
  { rok: '9. ročník - Veterán Cup 2023', fotky: [
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2023_Letohrad_1/', label: 'Turnaj veteránů' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2023_Letohrad_2/', label: 'Zápas dětí ZŠS Neratov a SK Hokejbal Letohrad' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2023_Letohrad_3', label: 'Utkání osobností a předání šeku' },
  ]},
  { rok: '8. ročník - Veterán Cup 2022', fotky: [
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_1/', label: 'Turnaj veteránů 1' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_2/', label: 'Turnaj veteránů 2' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_3/', label: 'Turnaj veteránů 3' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_4/', label: 'Utkání dětí ZŠS Neratov' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_5/', label: 'Utkání osobností' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_6/', label: 'Předání šeku' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2022_Letohrad_7/', label: 'Předávání cen za turnaj' },
  ]},
  { rok: '7. ročník - Veterán Cup 2019', fotky: [{ url: 'https://hokejbal-letohrad.rajce.idnes.cz/Veteran_Cup_2019/', label: 'Fotogalerie' }]},
  { rok: '6. ročník - Veterán Cup 2018', fotky: [
    { url: 'https://hokejbal-letohrad.rajce.idnes.cz/Veteran_Cup_2018/', label: 'Fotogalerie 1' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2018/', label: 'Fotogalerie 2' },
    { url: 'https://motyckamartin.rajce.idnes.cz/VETERAN_CUP_2018_2/', label: 'Fotogalerie 3' },
  ]},
  { rok: '5. ročník - Veterán Cup 2017', fotky: [
    { url: 'https://motyckamartin.rajce.idnes.cz/Veteran_Cup_2017/', label: 'Fotogalerie 1' },
    { url: 'https://motyckamartin.rajce.idnes.cz/Veteran_Cup_2017_1/', label: 'Fotogalerie 2' },
  ]},
  { rok: '3. ročník - Veterán Cup 2015', fotky: [
    { url: 'https://hokejbal-letohrad.rajce.idnes.cz/Veteran_Cup_2015/', label: 'Fotogalerie' },
    { url: 'https://hokejbal-letohrad.rajce.idnes.cz/Veteran_Cup_2015_-_vyhlaseni', label: 'Fotogalerie z vyhlášení' },
  ]},
  { rok: '2. ročník - Veterán Cup 2014', fotky: [
    { url: 'https://ballct1213.rajce.idnes.cz/Veteran_Cup_2014_Letohrad/', label: 'Fotogalerie 1' },
    { url: 'https://hokejbal-letohrad.rajce.idnes.cz/Veteran_Cup_2014/', label: 'Fotogalerie 2' },
  ]},
  { rok: '1. ročník - Veterán Cup 2013', fotky: [{ url: 'https://baluvlada.rajce.idnes.cz/2013_Veteran_cup_Letohrad/', label: 'Fotogalerie' }]},
];

type View = 'tiles' | 'videa' | 'fotogalerie';

export default function GaleriePage() {
  const [view, setView] = useState<View>('tiles');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['galerie-0']));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (view === 'tiles') {
    return (
      <PageContainer size="lg" className="pt-8 sm:pt-12 pb-8">
        <SectionHeader className="mb-6 sm:mb-8">Galerie</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <button
            onClick={() => setView('videa')}
            className="group flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px] md:min-h-[260px] rounded-[var(--radius-lg)] border-2 border-gray-200 hover:border-[var(--secondary)] bg-white hover:bg-[var(--secondary)]/5 transition-all p-6 sm:p-8 text-center cursor-pointer"
          >
            <span className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors mb-4">
              <Video className="w-10 h-10" strokeWidth={1.5} />
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[var(--secondary)]">
              Videa
            </span>
          </button>
          <button
            onClick={() => setView('fotogalerie')}
            className="group flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px] md:min-h-[260px] rounded-[var(--radius-lg)] border-2 border-gray-200 hover:border-[var(--secondary)] bg-white hover:bg-[var(--secondary)]/5 transition-all p-6 sm:p-8 text-center cursor-pointer"
          >
            <span className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--secondary)]/10 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-colors mb-4">
              <ImageIcon className="w-10 h-10" strokeWidth={1.5} />
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[var(--secondary)]">
              Fotky
            </span>
          </button>
        </div>
      </PageContainer>
    );
  }

  if (view === 'videa') {
    return (
      <PageContainer size="lg" className="pt-12 pb-8 flex flex-col gap-8">
        <button
          onClick={() => setView('tiles')}
          className="text-[var(--secondary)] hover:underline font-medium self-start cursor-pointer"
        >
          ← Zpět na výběr
        </button>
        <h2 className="text-xl font-bold text-[var(--secondary)] uppercase mb-6 flex items-center gap-2">
          <Video className="w-6 h-6" strokeWidth={1.5} />
          Videa
        </h2>
        <div className="flex flex-col gap-12">
          {VIDEO_ROKY.map((v) => (
            <div key={v.rok}>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">{v.rok}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {v.videa.map((vid) => (
                  <div key={vid.id} className="aspect-video rounded-[var(--radius-lg)] overflow-hidden border border-gray-200">
                    <iframe
                      src={`https://www.youtube.com/embed/${vid.id}`}
                      className="w-full h-full"
                      allowFullScreen
                      title="YouTube video"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer size="lg" className="pt-12 pb-8 flex flex-col gap-8">
      <button
        onClick={() => setView('tiles')}
        className="text-[var(--secondary)] hover:underline font-medium self-start cursor-pointer"
      >
        ← Zpět na výběr
      </button>
      <h2 className="text-xl font-bold text-[var(--secondary)] uppercase mb-6 flex items-center gap-2">
        <ImageIcon className="w-6 h-6" strokeWidth={1.5} />
        Fotogalerie
      </h2>
      <div className="space-y-3">
        {GALERIE.map((g, i) => {
          const id = `galerie-${i}`;
          const isOpen = openIds.has(id);
          return (
            <div
              key={id}
              className="rounded-[var(--radius-lg)] overflow-hidden bg-white border border-gray-200"
            >
              <button
                onClick={() => toggle(id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-[var(--secondary)] hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-[var(--radius)] bg-[var(--secondary)]/10 text-[var(--secondary)]">
                    <ImageIcon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  {g.rok}
                  <span className="text-sm font-normal text-[var(--foreground)]/60">
                    ({g.fotky.length} {g.fotky.length === 1 ? 'album' : g.fotky.length < 5 ? 'alba' : 'alb'})
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[var(--secondary)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? 'max-h-[2000px]' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-gray-100 pt-4 space-y-1">
                    {g.fotky.map((f) => (
                      <a
                        key={f.url}
                        href={f.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 py-3 px-4 rounded-[var(--radius)] text-[var(--secondary)] hover:bg-[var(--secondary)]/5 transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                        <span className="group-hover:underline">{f.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
