'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function formatNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function VytvoritObrazekForm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [text1, setText1] = useState('přispěl');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');

  const handleText3Input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setText3(formatted);
  }, []);

  const handleText4Input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setText4(formatted);
  }, []);

  useEffect(() => {
    const loadFont = async () => {
      try {
        const font = new FontFace('Proxima Nova Bold', 'url(/fonts/proximanova_bold.otf)', {
          weight: '700',
          style: 'normal',
        });
        await font.load();
        document.fonts.add(font);
        setFontLoaded(true);
      } catch (err) {
        console.error('Načtení fontu selhalo:', err);
      }
    };
    loadFont();
  }, []);

  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/image/sablona2026.png';
    img.onload = () => {
      imageRef.current = img;
      setDimensions({ w: img.naturalWidth, h: img.naturalHeight });
      setImageLoaded(true);
    };
    return () => {
      imageRef.current = null;
    };
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !fontLoaded || !imageLoaded || !img || !dimensions) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = dimensions;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';

    // Šablona 3375×4219 – pozice odpovídají vertikálnímu layoutu
    const scale = w / 1080;
    const font1 = Math.round(30 * scale);
    const font2 = Math.round(50 * scale);
    const font3 = Math.round(85 * scale);
    const font4 = Math.round(95 * scale);

    const y1 = Math.round(h * 0.5);
    const y2 = Math.round(h * 0.57);
    const y3 = Math.round(h * 0.65);
    const y4 = Math.round(h * 0.93);

    ctx.font = `bold ${font1}px "Proxima Nova Bold"`;
    ctx.fillText(text1.toUpperCase(), w / 2, y1);

    ctx.font = `bold ${font2}px "Proxima Nova Bold"`;
    ctx.fillText(text2, w / 2, y2);

    ctx.font = `bold ${font3}px "Proxima Nova Bold"`;
    ctx.fillText(text3 + ' Kč', w / 2, y3);

    ctx.font = `bold ${font4}px "Proxima Nova Bold"`;
    ctx.fillText(text4 + ' Kč', w / 2, y4);
  }, [fontLoaded, imageLoaded, dimensions, text1, text2, text3, text4]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'sbirka-veteran.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const ready = fontLoaded && imageLoaded;

  return (
    <div className="space-y-4 sm:space-y-6 min-w-0">
      <Link href="/admin" className="text-[#134070] hover:underline text-sm sm:text-base inline-block">
        ← Domů
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-3 sm:space-y-4 min-w-0">
          <div>
            <label className="block text-sm font-medium mb-1">
              Napsat přispěl/a:
            </label>
            <input
              type="text"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="přispěl"
              className="w-full px-3 py-2 border rounded-[var(--radius)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Jméno nebo název firmy:
            </label>
            <input
              type="text"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Zadejte jméno nebo firmu"
              className="w-full px-3 py-2 border rounded-[var(--radius)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Částka, kterou přispěl:
            </label>
            <input
              type="text"
              value={text3}
              onChange={handleText3Input}
              placeholder="Zadejte částku"
              className="w-full px-3 py-2 border rounded-[var(--radius)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Celková částka:
            </label>
            <input
              type="text"
              value={text4}
              onChange={handleText4Input}
              placeholder="Zadejte celkovou částku"
              className="w-full px-3 py-2 border rounded-[var(--radius)]"
            />
          </div>

          {ready && (
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-green-600 text-white rounded-[var(--radius)] hover:bg-green-700"
            >
              Stáhnout PNG
            </button>
          )}
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={dimensions?.w ?? 1080}
              height={dimensions?.h ?? 1080}
              className="max-w-full h-auto border rounded-[var(--radius)] shadow-lg w-full"
              style={{ maxHeight: 'min(80vh, 500px)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
