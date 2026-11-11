import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType, mode } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Không tìm thấy dữ liệu ảnh' },
        { status: 400 },
      );
    }

    const imagePart = {
      inlineData: {
        data: imageBase64.split(',')[1],
        mimeType: mimeType || 'image/jpeg',
      },
    };

    // Thiết lập hệ thống prompt tùy theo chế độ người dùng chọn
    let instruction = '';

    if (mode === 'flatlay') {
      instruction = `

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
    } else if (mode === 'handson') {
      instruction = `
        You are a professional commercial product stylist and lifestyle photographer specializing in "hands-on product photography". 
        Analyze the product in this uploaded image carefully. 
        Generate a detailed, high-end AI image generation prompt (in English) where a graceful, slender woman's hand with neat, light gel-manicured nails is interacting naturally and elegantly with the product (e.g., holding it gently, lifting it, or showcasing it). 
        
        The prompt must strictly include:
        1. Subject & Action: A slender woman's hand with soft, light gel-painted nails interacting delicately with the product.
        2. Surface/Background: The product must be placed on a clean, aesthetic table surface (e.g., textured white marble, warm minimalist oak wood, concrete tabletop, or smooth pastel ceramic) with a matching stylish background environment.
        3. Props: Carefully curated, minimal complementary props on the table that match the product's vibe (e.g., small dried flowers, a ceramic cup, or a soft linen cloth).
        4. Lighting & Quality: Soft natural window light or professional studio lighting, soft natural shadows, photorealistic, 8k resolution, commercial advertising photography.
        
        Return ONLY the final prompt text without extra pleasantries.
      `;
    } else if (mode === 'influencer') {
      instruction = `
        You are an elite creative director for high-end Pinterest and Instagram fashion influencers. 
        The user will provide an image of a model wearing an outfit/item. 
        Your task is to write a powerful AI image generation prompt (in English) that works together with this reference image to generate a new, stunning photo.
        
        The prompt should specify:
        1. A brand new, trendy aesthetic background or location (e.g., a sunlit minimalist Parisian café, a chic loft with morning light, a clean aesthetic studio).
        2. The desired lighting, atmosphere, and mood (e.g., soft golden hour glow, editorial flash photography, film grain).
        3. The pose, camera angle, and framing (e.g., candid mid-shot, over-the-shoulder, looking away from the camera).
        4. Instructions telling the image generator to maintain consistency with the clothing, style, or subject from the provided reference image.
        
        Return ONLY the final prompt text without extra text.
      `;
    } else {
      return NextResponse.json(
        { error: 'Chế độ không hợp lệ' },
        { status: 400 },
      );
    }

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
