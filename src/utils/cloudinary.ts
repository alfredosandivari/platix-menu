export function getOptimizedImage(
    url?: string,
    width = 800
  ): string {
    if (!url) return "/placeholderimage.png";
  
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,w_${width},c_fill/`
    );
  }
  