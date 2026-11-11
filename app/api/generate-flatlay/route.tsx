import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu ảnh' },
        { status: 400 },
      );
    }

    // Chuẩn bị phần dữ liệu ảnh dạng inlineData cho SDK mới
    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1], // Lọc bỏ phần tiền tố "data:image/...;base64,"
        mimeType: mimeType || 'image/jpeg',
      },
    };

    // Câu lệnh hướng dẫn Gemini (Prompt Engineering)
    const instruction = `
      You are an expert product photographer and professional flatlay stylist. 
      Analyze the product in this image carefully (its color, style, target audience, and vibe). 
      Generate a detailed, professional AI image generation prompt (in English) to create a stunning flatlay photograph for this product. 
      The prompt must describe:
      1. The background surface (e.g., marble, rustic wood, pastel paper).
      2. Carefully curated complementary props matching the product theme.
      3. Studio lighting, shadows, and top-down flatlay angle.
      4. High-end aesthetic keywords (photorealistic, 8k, commercial photography).
      
      Return ONLY the final prompt text without extra pleasantries.
    `;

    // Gọi model Gemini 2.5 Flash (hoặc phiên bản phù hợp hỗ trợ multimodal)
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [instruction, imagePart],
    });

    return NextResponse.json({ prompt: response.text });
  } catch (error: any) {
    console.error('Lỗi Gemini Vision:', error);
    return NextResponse.json(
      { error: error.message || 'Lỗi hệ thống' },
      { status: 500 },
    );
  }
}
