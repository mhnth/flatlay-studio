'use client';

import { useState } from 'react';

type Mode = 'flatlay' | 'handson' | 'influencer';

export default function MultiModeGeneratorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [mode, setMode] = useState<Mode>('influencer');
  const [loading, setLoading] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setGeneratedPrompt('');

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: selectedImage, mimeType, mode }),
      });

      const data = await res.json();
      if (res.ok) {
        setGeneratedPrompt(data.prompt);
      } else {
        setGeneratedPrompt(`Lỗi: ${data.error}`);
      }
    } catch (err) {
      setGeneratedPrompt('Đã xảy ra lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'flatlay':
        return 'Flatlay Sản Phẩm';
      case 'handson':
        return 'Hands-on Shot (Cầm nắm sản phẩm)';
      case 'influencer':
        return 'Instagram / Pinterest Hotgirl Vibe';
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-center">
        AI Visual Prompt Studio
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Biến ảnh sản phẩm hoặc ảnh mẫu của bạn thành các prompt chuyên nghiệp.
      </p>

      {/* Lựa chọn chế độ */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setMode('influencer')}
          className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
            mode === 'influencer'
              ? 'bg-pink-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ✨ Hotgirl Vibe (IG/Pin)
        </button>
        <button
          onClick={() => setMode('handson')}
          className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
            mode === 'handson'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🤲 Hands-on Shot
        </button>
        <button
          onClick={() => setMode('flatlay')}
          className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
            mode === 'flatlay'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📦 Flatlay Style
        </button>
      </div>

      {/* Tải ảnh lên */}
      <div className="flex flex-col gap-4 border-2 border-dashed border-gray-300 p-6 rounded-xl text-center bg-gray-50">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 cursor-pointer mx-auto"
        />

        {selectedImage && (
          <div className="mt-4 flex justify-center">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-64 rounded-lg shadow-md object-contain"
            />
          </div>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={!selectedImage || loading}
        className="mt-4 w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 disabled:bg-gray-300 transition-colors shadow"
      >
        {loading
          ? 'Gemini đang phân tích bối cảnh & phong cách...'
          : `Tạo Prompt cho chế độ: ${getModeTitle()}`}
      </button>

      {/* Kết quả */}
      {generatedPrompt && (
        <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-2 text-gray-800">
            Prompt thu được ({getModeTitle()}):
          </h3>
          <p className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 whitespace-pre-wrap font-mono select-all">
            {generatedPrompt}
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(generatedPrompt)}
            className="mt-3 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded font-medium transition"
          >
            📋 Sao chép Prompt
          </button>
        </div>
      )}
    </main>
  );
}
