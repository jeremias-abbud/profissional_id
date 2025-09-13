import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface LogoCarouselProps {
  uploadedImages?: string[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = () => {
  // Containers placeholder para futura implementação com banco de dados
  const placeholderContainers = Array.from({ length: 12 }, (_, index) => ({
    id: `placeholder-${index + 1}`,
    isEmpty: true as const,
  }));

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {placeholderContainers.map((item) => (
            <CarouselItem key={item.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="bg-card rounded-xl shadow-elegant border p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                {/* Container da imagem */}
                <div className="aspect-square bg-muted/20 rounded-lg p-6 mb-4 flex items-center justify-center overflow-hidden">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-sm">Em breve</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Controles do carrossel */}
        <CarouselPrevious className="hidden md:flex -left-12 bg-card/80 hover:bg-card border-border" />
        <CarouselNext className="hidden md:flex -right-12 bg-card/80 hover:bg-card border-border" />
      </Carousel>
      
      {/* Indicadores mobile */}
      <div className="flex md:hidden justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(placeholderContainers.length / 1) }).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-muted-foreground/30"
          />
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;