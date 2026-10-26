


import fs from "fs/promises";
import path from "path";

export async function saveFileLocally(file, folder = "public/uploads") {
  if (!file || file.size === 0 || typeof file === "string") return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
  const uploadDir = path.join(process.cwd(), folder);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, fileName), buffer);

  return `/uploads/${fileName}`;
}