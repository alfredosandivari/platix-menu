const galleryImages = [
  {
    url: "/images/g0.png",
    caption: "Bar Central",
  },
  {
    url: "/images/sushi.png",
    caption: "Terraza Premium",
  },
  {
    url: "/images/tragosdeautor.png",
    caption: "Bar Central",
  },
  {
    url: "/images/pubcompleto.png",
    caption: "Terraza Premium",
  },
  {
    url: "/images/dj.png",
    caption: "Bar Central",
  },
  {
    url: "/images/bartenders.png",
    caption: "Terraza Premium",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-secondary/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          Descubre el ambiente único de Alto Croacia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vive tus noches en lo más alto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl aspect-square hover-lift"
            >
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-foreground font-semibold text-lg">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
