'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DISPLAY_HEIGHT = 135;
const SCALE = 2; // 2× rozlišení pro vyšší kvalitu exportu
const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3;
const ZOOM_STEP = 0.25;

type LogoUploadCanvasProps = {
  file: File | null;
  onPngReady: (blob: Blob | null) => void;
  className?: string;
};

export default function LogoUploadCanvas({
  file,
  onPngReady,
  className = '',
}: LogoUploadCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState<{ w: number; h: number } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomInput, setZoomInput] = useState('100');

  const applyZoomFromInput = useCallback((value: string) => {
    const num = parseFloat(value.replace(',', '.'));
    if (!Number.isNaN(num) && num > 0) {
      const z = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, num / 100));
      setZoom(z);
      setZoomInput(String(Math.round(z * 100)));
    } else {
      setZoomInput(String(Math.round(zoom * 100)));
    }
  }, [zoom]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !loaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const aspect = imgW / imgH;
    const h = DISPLAY_HEIGHT * SCALE;
    const w = Math.round(aspect * h);

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);

    const drawW = w * zoom;
    const drawH = h * zoom;
    const x = (w - drawW) / 2;
    const y = (h - drawH) / 2;
    ctx.drawImage(img, x, y, drawW, drawH);

    setDimensions({ w, h });
  }, [loaded, zoom]);

  useEffect(() => {
    if (!file) {
      setLoaded(false);
      setDimensions(null);
      imageRef.current = null;
      onPngReady(null);
      return;
    }

    setLoaded(false);
    setDimensions(null);
    setZoom(1);
    setZoomInput('100');
    imageRef.current = null;

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      imageRef.current = img;
      setLoaded(true);
      URL.revokeObjectURL(url);
    };
    img.src = url;
    return () => {
      URL.revokeObjectURL(url);
      imageRef.current = null;
    };
  }, [file, onPngReady]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    if (!loaded || !dimensions || !canvasRef.current) return;

    canvasRef.current.toBlob(
      (blob) => {
        onPngReady(blob ?? null);
      },
      'image/png',
      0.9
    );
  }, [loaded, dimensions, zoom, onPngReady]);

  if (!file) return null;

  return (
    <div className={`${className} max-w-full overflow-x-auto`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-600">Zvětšení:</span>
        <button
          type="button"
          onClick={() => {
            const z = Math.max(ZOOM_MIN, zoom - ZOOM_STEP);
            setZoom(z);
            setZoomInput(String(Math.round(z * 100)));
          }}
          disabled={zoom <= ZOOM_MIN}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius)] border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-lg font-medium"
        >
          −
        </button>
        <input
          type="text"
          value={zoomInput}
          onChange={(e) => setZoomInput(e.target.value)}
          onBlur={() => applyZoomFromInput(zoomInput)}
          onKeyDown={(e) => e.key === 'Enter' && applyZoomFromInput(zoomInput)}
          className="w-14 text-center text-sm font-medium border border-gray-300 rounded-[var(--radius)] px-1 py-1"
        />
        <span className="text-sm text-gray-600">%</span>
        <button
          type="button"
          onClick={() => {
            const z = Math.min(ZOOM_MAX, zoom + ZOOM_STEP);
            setZoom(z);
            setZoomInput(String(Math.round(z * 100)));
          }}
          disabled={zoom >= ZOOM_MAX}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius)] border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-lg font-medium"
        >
          +
        </button>
      </div>
      <div className="inline-block border border-gray-200 rounded-[var(--radius)] p-2 bg-white">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ height: DISPLAY_HEIGHT, maxWidth: '100%', minWidth: 80 }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Náhled: {dimensions?.w ?? '…'}×{dimensions?.h ?? '…'} px (PNG, 2× kvalita)
      </p>
    </div>
  );
}
