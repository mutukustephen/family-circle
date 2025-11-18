import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import familyChildrenImg from "@/assets/family-children.jpg";
import familyElderManImg from "@/assets/family-elder-man.jpg";
import familyEldersImg from "@/assets/family-elders.jpg";
import familyGroupImg from "@/assets/family-group.jpg";
import familyCommunityImg from "@/assets/family-community.jpg";

interface Photo {
  src: string;
  alt: string;
  category: string;
}

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    {
      src: familyGroupImg,
      alt: "Family group portrait outdoors",
      category: "Family Gatherings",
    },
    {
      src: familyCommunityImg,
      alt: "Community gathering",
      category: "Community",
    },
    {
      src: familyChildrenImg,
      alt: "Young family members",
      category: "Children",
    },
    {
      src: familyElderManImg,
      alt: "Family elder",
      category: "Elders",
    },
    {
      src: familyEldersImg,
      alt: "Elder couple",
      category: "Elders",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Family Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Precious moments captured through the years - celebrating our family's journey, love, and togetherness
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl cursor-pointer card-elevated animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-semibold text-lg mb-1">{photo.category}</p>
                    <p className="text-white/80 text-sm">{photo.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="mt-16 pt-16 border-t border-border">
            <h2 className="text-3xl font-display font-bold text-center mb-8">
              Photo Categories
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {["Family Gatherings", "Children", "Elders", "Community"].map((category) => (
                <div
                  key={category}
                  className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer"
                >
                  <p className="font-semibold">{category}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {photos.filter((p) => p.category === category).length} photos
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedPhoto && (
            <div>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto"
              />
              <div className="p-6">
                <p className="text-lg font-semibold mb-2">{selectedPhoto.category}</p>
                <p className="text-muted-foreground">{selectedPhoto.alt}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
