import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function compressImage(buffer: Buffer): Promise<Buffer> {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  return image
    .resize({
      width: 1200,
      height: 1600,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, progressive: true })
    .toBuffer();
}

export async function uploadToCloudinary(
  buffer: Buffer,
  originalName: string,
): Promise<string> {
  console.log(`[Cloudinary] Compressing image: ${originalName} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);

  const compressed = await compressImage(buffer);
  console.log(`[Cloudinary] Compressed to: ${(compressed.length / 1024 / 1024).toFixed(2)} MB`);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "ramani-fashion/products",
        resource_type: "image",
        use_filename: false,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          console.error("[Cloudinary] Upload error:", error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error("No result from Cloudinary upload"));
        }
        console.log(`[Cloudinary] Uploaded successfully: ${result.secure_url}`);
        resolve(result.secure_url);
      },
    );
    uploadStream.end(compressed);
  });
}

export default cloudinary;
