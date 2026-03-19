'use client';

import { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(
  () => import('react-quill-new').then((mod) => mod.default),
  { ssr: false }
);

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  /** URL pro upload obrázků (např. /api/admin/clanky/upload). Pokud není, tlačítko obrázku se nezobrazí. */
  imageUploadUrl?: string;
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Napište obsah článku...',
  className = '',
  imageUploadUrl = '/api/admin/clanky/upload',
}: RichTextEditorProps) {
  const quillRef = useRef<{ getEditor: () => { getSelection: (focus?: boolean) => { index: number }; insertEmbed: (index: number, type: string, value: string) => void; setSelection: (index: number) => void } } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(imageUploadUrl, { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.path) {
        const quill = quillRef.current?.getEditor?.();
        if (quill) {
          const range = quill.getSelection(true);
          const index = range?.index ?? (quill as unknown as { getLength: () => number }).getLength();
          quill.insertEmbed(index, 'image', data.path);
          quill.setSelection(index + 1);
        }
      }
    } finally {
      e.target.value = '';
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', ...(imageUploadUrl ? ['image'] as const : [])],
          ['clean'],
        ],
        handlers: imageUploadUrl
          ? {
              image: () => fileInputRef.current?.click(),
            }
          : undefined,
      },
    }),
    [imageUploadUrl]
  );

  return (
    <div className={`rich-text-editor ${className}`}>
      {imageUploadUrl && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleImageSelect}
          className="hidden"
        />
      )}
      <ReactQuill
        // @ts-expect-error react-quill-new types omit ref but it works at runtime
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(val) => onChange(val ?? '')}
        modules={modules}
        placeholder={placeholder}
        className="min-h-[200px]"
      />
    </div>
  );
}
