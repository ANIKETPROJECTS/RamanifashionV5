import { useState, useEffect } from "react";
import bannerImage from "@assets/BANNER (1).png";

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImage, setHeroImage] = useState<string>(bannerImage);

  useEffect(() => {
    const cacheBust = Date.now();
    const img = new Image();
    img.onload = () => setHeroImage(`/media/hero-banner.png?t=${cacheBust}`);
    img.onerror = () => setHeroImage(bannerImage);
    img.src = `/media/hero-banner.png?t=${cacheBust}`;
  }, []);

  const slides = [{ image: heroImage }];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "55vh", maxHeight: "500px", backgroundColor: "#fff" }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full">
            <img
              src={slide.image}
              alt="Ramani Fashion Banner"
              className="w-full h-full object-cover object-center"
              data-testid={`img-hero-banner-${index}`}
              style={{ display: "block" }}
              onError={(e) => {
                if (e.currentTarget.src !== bannerImage) {
                  e.currentTarget.src = bannerImage;
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
