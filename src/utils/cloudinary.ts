export function getOptimizedImageUrl(
  image: string | null | undefined,
  width = 600
) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // 1️⃣ Sin imagen → placeholder local
  if (!image) {
    return "/placeholderimage.png";
  }

  // 2️⃣ Si YA es un placeholder local → devuélvelo tal cual
  if (image.startsWith("/")) {
    return image;
  }

  // 3️⃣ Cloudinary public_id → optimizar
  if (!cloudName) {
    return "/placeholderimage.png";
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto:good,w_${width}/${image}.webp`;
}

