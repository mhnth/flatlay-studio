'use client';

import { useState } from 'react';

// Dữ liệu mở rộng chuẩn chuyên gia flatlay
const flatlayData = {
  surfaces: [
    {
      name: 'Đá cẩm thạch trắng (White Marble)',
      vibe: 'Sang trọng, hiện đại, tối giản',
      bestFor: 'Mỹ phẩm cao cấp, trang sức, nước hoa, đồng hồ.',
      promptKeyword:
        'luxurious white marble surface, clean reflections, elegant texture',
      color: 'bg-slate-100 border-slate-300',
    },
    {
      name: 'Vải linen mộc (Raw Linen Fabric)',
      vibe: 'Mềm mại, tự nhiên, mộc mạc, thư giãn',
      bestFor: 'Quần áo, sản phẩm organic, nến thơm, đồ handmade.',
      promptKeyword:
        'raw textured linen fabric background, soft natural fabric folds, neutral tones',
      color: 'bg-orange-50 border-orange-200',
    },
    {
      name: 'Đá phiến xám đậm (Dark Slate)',
      vibe: 'Cá tính, mạnh mẽ, cao cấp, tương phản cao',
      bestFor: 'Sản phẩm nam giới, tech gadgets, đồng hồ thể thao, mỹ phẩm.',
      promptKeyword:
        'dark grey slate stone tabletop, moody dark texture, sharp contrast',
      color: 'bg-zinc-200 border-zinc-400',
    },
    {
      name: 'Bê tông mài (Polished Concrete)',
      vibe: 'Hiện đại, công nghiệp (Industrial), cá tính',
      bestFor:
        'Sản phẩm thiết kế độc lập, nước hoa unisex, phụ kiện thời trang.',
      promptKeyword:
        'smooth polished concrete tabletop, modern industrial minimalist texture',
      color: 'bg-stone-200 border-stone-400',
    },
    {
      name: 'Gỗ sồi tự nhiên (Natural Oak Wood)',
      vibe: 'Ấm áp, gần gũi, tự nhiên, sang trọng vừa phải',
      bestFor: 'Đồ skincare thiên nhiên, thực phẩm, cà phê, đồ gia dụng.',
      promptKeyword:
        'natural light oak wood tabletop, beautiful warm wood grain',
      color: 'bg-amber-100 border-amber-300',
    },
  ],
  compositions: [
    {
      name: 'Knolling 90 độ (Sắp xếp vuông góc hoàn hảo)',
      description:
        'Tất cả các vật dụng được căn chỉnh thẳng tắp, song song hoặc vuông góc 90 độ với nhau theo dạng lưới khoa học.',
      bestFor:
        'Đồ công nghệ, dụng cụ nấu ăn, mỹ phẩm thành phần, đồ dùng cá nhân.',
      promptKeyword:
        'strict knolling composition, items neatly aligned at 90-degree right angles, top-down orthographic view',
    },
    {
      name: 'Tạp chí tự nhiên (Editorial Magazine Style)',
      description:
        'Sắp xếp ngẫu hứng nhưng có chủ ý như một trang tạp chí thời trang/lifestyle cao cấp, có khoảng trống (negative space) nghệ thuật.',
      bestFor: 'Thời trang, lookbook, phụ kiện lifestyle.',
      promptKeyword:
        'editorial magazine flatlay style, high-end lifestyle spread, elegant negative space',
    },
    {
      name: 'Tối giản Zen (Zen Minimalist)',
      description:
        'Cực kỳ ít chi tiết, tập trung vào một vật thể duy nhất đặt lệch tâm, tạo cảm giác thiền định, bình yên.',
      bestFor:
        'Sản phẩm thuần chay, trà đạo, nước hoa cao cấp, trang sức tối giản.',
      promptKeyword:
        'zen minimalist flatlay, single off-center subject, extreme negative space, calming atmosphere',
    },
    {
      name: 'Đổ bóng mềm 3D (Soft 3D Lighting & Shadows)',
      description:
        'Sử dụng nguồn sáng góc thấp tạo các dải bóng đổ mềm mại, dài và có chiều sâu không gian 3D rõ rệt.',
      bestFor:
        'Tạo cảm giác ánh nắng chiếu qua cửa sổ buổi sáng sớm, tăng tính chân thực.',
      promptKeyword:
        'dramatic soft 3D shadows, morning window sunlight casting gentle shadows, high depth of field',
    },
    {
      name: 'Ngẫu hứng tự nhiên (Organic Casual / Scatter)',
      description:
        'Các đạo cụ phụ rơi rớt hoặc sắp xếp tự nhiên xung quanh sản phẩm chính, không quá gò bó khuôn mẫu.',
      bestFor: 'Đồ ăn, mỹ phẩm organic, phong cách sống đời thường (candid).',
      promptKeyword:
        'casual organic scatter arrangement, natural random placement, effortless aesthetic',
    },
    {
      name: 'Neo góc tỏa đạo cụ (Corner Anchor & Radial Flow)',
      description:
        'Sản phẩm chính hoặc cụm chính đặt ở một góc hoặc tâm, các đạo cụ tỏa ra theo hình quạt hoặc hướng dẫn ánh nhìn.',
      bestFor:
        'Làm nổi bật một món đồ trung tâm lớn với nhiều phụ kiện nhỏ đi kèm.',
      promptKeyword:
        'corner anchor composition, props radiating outward from a focal point, dynamic visual flow',
    },
  ],
  props: [
    {
      category: 'Thực vật & Thiên nhiên (Botanicals)',
      items: [
        'Lá khuynh diệp xanh (Fresh eucalyptus leaves)',
        'Vài giọt nước trong suốt trên mặt phẳng (Clear water droplets on surface)',
        'Lát cam vàng sấy khô & hoa hồi (Dried yellow orange slices & star anise)',
        'Cành hoa khô, hạt cà phê',
      ],
      effect:
        'Tăng cảm giác tươi mới, sinh động, kích thích thị giác và khứu giác.',
    },
    {
      category: 'Đồ vải & Phụ kiện mềm (Textiles & Ribbons)',
      items: [
        'Dải ruy băng lụa satin mềm mại (Soft flowing silk satin ribbon)',
        'Khăn tay linen nhàu nhẹ tự nhiên',
        'Túi vải canvas gấp gọn',
      ],
      effect:
        'Tạo sự uyển chuyển, mềm mại, phá vỡ sự cứng nhắc của các vật thể phẳng.',
    },
    {
      category: 'Lifestyle & Đồ uống (Cafe & Reading)',
      items: [
        'Tách cafe gốm sứ mộc & hạt cà phê (Ceramic coffee cup & scattered coffee beans)',
        'Cuốn sách nghệ thuật mở trang giấy ngả màu',
        'Tạp chí thời trang ngoại văn, kính râm',
      ],
      effect: 'Kể câu chuyện về lối sống thư giãn, sang trọng của người dùng.',
    },
  ],
};

export default function FlatlayGuidePage() {
  const [activeTab, setActiveTab] = useState<
    'surfaces' | 'compositions' | 'props'
  >('surfaces');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 font-sans">
      {/* Tiêu đề trang */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          🎨 Cẩm Nang Thiết Lập Flatlay Chuyên Nghiệp
        </h1>
        <p className="text-gray-600">
          Tổng hợp các chất liệu mặt nền cao cấp, quy tắc bố cục nghệ thuật và
          đạo cụ decor chuẩn studio.
        </p>
      </div>

      {/* Thanh chuyển tab */}
      <div className="flex justify-center gap-3 mb-8 border-b pb-4">
        <button
          onClick={() => setActiveTab('surfaces')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm ${
            activeTab === 'surfaces'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          🪵 Mặt Nền ({flatlayData.surfaces.length})
        </button>
        <button
          onClick={() => setActiveTab('compositions')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm ${
            activeTab === 'compositions'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          📐 Bố Cục ({flatlayData.compositions.length})
        </button>
        <button
          onClick={() => setActiveTab('props')}
          className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm ${
            activeTab === 'props'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border'
          }`}
        >
          🌿 Đạo Cụ Decor ({flatlayData.props.length})
        </button>
      </div>

      {/* Nội dung Tab 1: Mặt nền */}
      {activeTab === 'surfaces' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flatlayData.surfaces.map((item, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl border ${item.color} shadow-sm flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-2">
                  Vibe: {item.vibe}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  <strong>Phù hợp cho:</strong> {item.bestFor}
                </p>
              </div>
              <div className="bg-white/90 p-3 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-500 mb-1 font-mono">
                  Từ khóa Prompt AI:
                </p>
                <code className="text-xs text-gray-800 block mb-2 font-mono bg-gray-50 p-1.5 rounded">
                  {item.promptKeyword}
                </code>
                <button
                  onClick={() => handleCopy(item.promptKeyword)}
                  className="w-full text-xs bg-gray-900 text-white py-1.5 rounded font-medium hover:bg-gray-800 transition"
                >
                  {copiedText === item.promptKeyword
                    ? '✨ Đã sao chép!'
                    : '📋 Sao chép từ khóa'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nội dung Tab 2: Bố cục */}
      {activeTab === 'compositions' && (
        <div className="space-y-4">
          {flatlayData.compositions.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xs text-indigo-600 font-medium">
                  💡 Gợi ý: {item.bestFor}
                </p>
              </div>
              <div className="w-full md:w-80 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <code className="text-xs text-gray-800 block mb-2 font-mono">
                  {item.promptKeyword}
                </code>
                <button
                  onClick={() => handleCopy(item.promptKeyword)}
                  className="w-full text-xs bg-gray-900 text-white py-1.5 rounded font-medium hover:bg-gray-800 transition"
                >
                  {copiedText === item.promptKeyword
                    ? '✨ Đã sao chép!'
                    : '📋 Sao chép từ khóa'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nội dung Tab 3: Đạo cụ bổ sung */}
      {activeTab === 'props' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flatlayData.props.map((group, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm"
            >
              <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b">
                {group.category}
              </h3>
              <ul className="space-y-2 mb-4">
                {group.items.map((subItem, sIdx) => (
                  <li
                    key={sIdx}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    {subItem}
                  </li>
                ))}
              </ul>
              <div className="bg-indigo-50/50 p-2.5 rounded-lg text-xs text-indigo-900">
                <strong>Hiệu quả:</strong> {group.effect}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
