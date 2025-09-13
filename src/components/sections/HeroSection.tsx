import { ArrowRight, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/profissional-id-logo.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Gostaria de solicitar um orçamento para criação de logotipo/identidade visual com a Profissional ID.", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/profissional.id/", "_blank");
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden border-b pt-20 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
          
          {/* Título e Subtítulo */}
          <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground mb-6 animate-fade-in tracking-tight">
            Identidade Visual
            <span className="text-transparent bg-gradient-primary bg-clip-text"> Profissional</span>
          </h1>
          
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Criamos logotipos e identidades visuais profissionais que elevam sua marca. 
              Design estratégico, criativo e impactante para destacar seu negócio.
            </p>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 sm:px-0">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleWhatsApp}
              className="group w-full sm:w-auto sm:min-w-[200px] max-w-sm"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="xl" 
              onClick={handleInstagram}
              className="group w-full sm:w-auto sm:min-w-[200px] max-w-sm border-2 hover:border-primary/50 hover:bg-primary/5"
            >
              <Instagram className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
              Ver Portfolio
            </Button>
          </div>

          {/* Destaque da Empresa */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold font-display text-primary mb-3">Design</div>
              <div className="text-muted-foreground font-medium">Profissional</div>
            </div>
            <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold font-display text-secondary mb-3">Criativo</div>
              <div className="text-muted-foreground font-medium">& Único</div>
            </div>
            <div className="text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <div className="text-3xl font-bold font-display text-primary mb-3">Impacto</div>
              <div className="text-muted-foreground font-medium">Visual</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default HeroSection;