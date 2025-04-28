const mockMedia = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
      alt: "Bourse Campus France",
    },
    {
      type: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      alt: "Exemple de vidéo",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      alt: "Job étudiant",
    },
  ];
  
  export default function UserMediaGallery() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-[#3B2F2F] mb-4">Photos & Vidéos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockMedia.map((media, index) => (
            <div key={index} className="overflow-hidden rounded-lg border border-[#E6D7B6]">
              {media.type === "image" ? (
                <img
                  src={media.src}
                  alt={media.alt}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                />
              ) : (
                <video
                  controls
                  className="w-full h-48 object-cover bg-black"
                >
                  <source src={media.src} type="video/mp4" />
                  Votre navigateur ne prend pas en charge les vidéos HTML5.
                </video>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  