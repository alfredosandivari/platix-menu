export async function uploadImageToCloudinary(
    file: File,
    folder?: string
  ): Promise<string | null> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
    if (!cloudName || !uploadPreset) {
      console.error("Faltan variables de entorno de Cloudinary");
      return null;
    }
  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    if (folder) {
      formData.append("folder", folder);
    }
  
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
  
    if (!res.ok) {
      console.error("Error subiendo a Cloudinary", await res.text());
      return null;
    }
  
    const data = await res.json();
    return data.secure_url as string;
  }
  