// src/components/SecondaryGallery.tsx
import { ImagePlayer } from "@/components/ImagePlayer";

const images = [
  "/images/g0.png",   // la de la terraza que generamos
  "/images/sushi.png",   // la de la terraza que generamos
  "/images/tragosdeautor.png", // tragos coloridos
  "/images/people.png",     // sushi
];

export function SecondaryGallery() {
  return (
    <section className="py-20 md:py-24" id="gallery-2">
      <div className="container-inner">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">
            Galería
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Momentos Alto Croacia
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Una mirada a la coctelería, la cocina y el ambiente que nos define.
          </p>
        </div>

        <ImagePlayer
          images={images}
          interval={700}
          loop
          renderImage={(src) => (
            <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden rounded-3xl shadow-[0_18px_45px_rgba(0,0,0,0.35)] max-w-4xl mx-auto px-4">
              <img
                src={src}
                alt="Alto Croacia"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}
