import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const slides = [
  {
    title: "Four students at Efrei Paris have created a revolutionary app called MOVE2GETR… 🫶🚀",
    img: "/images/img1.jpg",
  },
  {
    title: "Château Rouge, véritable havre de la communauté africaine à Paris…",
    img: "/images/img2.jpg",
  },
  {
    title: "L'université Staffordshire classé parmi les meilleures écoles du UK…",
    img: "/images/img3.jpg",
  },
  {
    title: "2% de logements en plus en IDF en 2025… Paris reste-t-il un bon choix ?",
    img: "/images/crous.jpg",
  },
  {
    title: "AI is reshaping engineering careers. Are you ready, dear MOVER?",
    img: "/images/IA.jpg",
  },
  {
    title: "-15% sur MacBook Pro i7 avec le code MOVE237… GO FOR IT! 🚀🔥",
    img: "/images/Mac.jpg",
  },
];

export default function Carousel() {
  return (
    <div className="max-w-6xl mx-auto mb-6">
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
            <div className="relative w-[290px] h-[170px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white p-3">
                <h3 className="text-sm font-semibold">{slide.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
