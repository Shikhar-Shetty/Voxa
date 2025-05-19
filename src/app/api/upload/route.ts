import { writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = `${Date.now()}-${file.name}`;
  const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(uploadPath, buffer);

  return NextResponse.json({ fileUrl: `/uploads/${filename}` });
}
