export async function optimizeImage(
    file: File,
    maxWidth = 1600,
    quality = 0.8
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
  
        const width =
          img.width > maxWidth ? maxWidth : img.width;
        const height =
          img.width > maxWidth ? img.height * scale : img.height;
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("No canvas context");
  
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Error creating blob");
  
            const optimized = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              { type: "image/webp" }
            );
  
            resolve(optimized);
          },
          "image/webp",
          quality
        );
      };
  
      img.onerror = reject;
    });
  }
  