import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: '이미지가 없습니다.' }, { status: 400 });
    }

    if (files.length > 5) {
      return NextResponse.json({ error: '최대 5개의 이미지만 업로드할 수 있습니다.' }, { status: 400 });
    }

    const compressedImages: { name: string; data: string; size: number }[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: '이미지 파일만 업로드 가능합니다.' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 이미지 압축
      const compressedBuffer = await sharp(buffer)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      // 1MB 체크 및 추가 압축
      let finalBuffer = compressedBuffer;
      let quality = 80;

      while (finalBuffer.length > 1024 * 1024 && quality > 20) {
        quality -= 10;
        finalBuffer = await sharp(buffer)
          .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality })
          .toBuffer();
      }

      // 여전히 1MB보다 크면 더 작은 크기로 리사이즈
      if (finalBuffer.length > 1024 * 1024) {
        finalBuffer = await sharp(buffer)
          .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 60 })
          .toBuffer();
      }

      const base64Data = finalBuffer.toString('base64');
      
      compressedImages.push({
        name: file.name,
        data: base64Data,
        size: finalBuffer.length,
      });
    }

    return NextResponse.json({
      images: compressedImages,
      count: compressedImages.length,
    });
  } catch (error) {
    console.error('Image compression error:', error);
    return NextResponse.json({ error: '이미지 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}