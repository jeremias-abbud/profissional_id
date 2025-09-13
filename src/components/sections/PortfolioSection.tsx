import React from "react";
import { Instagram, Eye, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoCarousel from "@/components/LogoCarousel";
import PortfolioGrid from "@/components/PortfolioGrid";
import { usePortfolio } from "@/hooks/usePortfolio";

interface PortfolioSectionProps {
  uploadedImages?: string[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ uploadedImages = [] }) => {
  const { sites, loading } = usePortfolio();
  const handleInstagram = () => {
    window.open("https://www.instagram.com/profissional.id/", "_blank");
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Vi o portfolio no site e gostaria de solicitar um orçamento para um projeto similar.", "_blank");
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header da seção */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Nosso <span className="text-transparent bg-gradient-primary bg-clip-text">Portfolio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Confira alguns dos logotipos e projetos digitais que criamos. 
              Cada trabalho reflete nossa paixão pelo design estratégico e criativo.
            </p>
          </div>

          {/* Carrossel de Logotipos */}
          <div className="mb-16 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Logotipos Criados
              </h3>
              <p className="text-muted-foreground">
                {uploadedImages.length > 0 
                  ? `Confira nossos trabalhos mais recentes e projetos em destaque`
                  : "Algumas das identidades visuais que desenvolvemos para nossos clientes"
                }
              </p>
            </div>

            <LogoCarousel uploadedImages={uploadedImages} />
          </div>

          {/* Sites do Portfolio */}
          {sites.length > 0 && (
            <div className="mb-16 animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Sites Criados
                </h3>
                <p className="text-muted-foreground">
                  Projetos web desenvolvidos com foco em design e experiência do usuário
                </p>
              </div>

              <PortfolioGrid sites={sites} loading={loading} />
            </div>
          )}

          {/* Instagram Integration */}
          <div className="text-center mb-12">
            <div className="bg-card p-8 md:p-12 rounded-xl shadow-elegant border animate-fade-in">
              <div className="max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Instagram className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  @profissional.id
                </h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Siga nosso Instagram para ver mais trabalhos, processo criativo 
                  e os bastidores da criação dos nossos projetos digitais.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    onClick={handleInstagram}
                    className="group"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Ver Mais no Instagram
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleWhatsApp}
                    className="group border-2"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Solicitar Portfolio Completo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Destaques do Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-elegant border animate-fade-in hover:shadow-glow transition-all duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">150+</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Logotipos Criados</h4>
                <p className="text-muted-foreground text-sm">Identidades visuais únicas e marcantes</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-elegant border animate-fade-in hover:shadow-glow transition-all duration-300" style={{ animationDelay: "0.2s" }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{sites.length}+ Sites</h4>
                <p className="text-muted-foreground text-sm">Projetos web desenvolvidos e otimizados</p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-elegant border animate-fade-in hover:shadow-glow transition-all duration-300" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">∞</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Criatividade</h4>
                <p className="text-muted-foreground text-sm">Sua imaginação é o limite no digital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;