import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slides = [
  {
    title: "L'université Staffordshire classée parmi les 10 meilleures écoles du UK d'après la BBC…",
    img: "/images/img3.jpg",
  },
  {
    title: "Château Rouge, véritable havre de la communauté africaine à Paris...",
    img: "/images/img2.jpg",
  },
  {
    title: "Culture & intégration",
    img: "https://source.unsplash.com/800x400/?africa,france",
  },
];

export default function Carousel() {
  return (
    <div className="max-w-[300px] mx-auto mb-6">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={20}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-[300px] h-36 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  {slide.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}