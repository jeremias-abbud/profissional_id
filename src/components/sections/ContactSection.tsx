import { MessageCircle, Instagram, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Gostaria de iniciar uma conversa sobre meu projeto de design/logotipo com a Profissional ID.", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/profissional.id/", "_blank");
  };

  return (
    <section id="contato" className="py-20 bg-muted/20 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header da seção */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6 tracking-tight">
              Entre em <span className="text-transparent bg-gradient-primary bg-clip-text">Contato</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Pronto para criar o logotipo perfeito para sua marca? 
              Vamos conversar sobre seu projeto de identidade visual!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h3 className="text-2xl font-semibold font-display text-foreground mb-6">
                  Vamos criar juntos
                </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Estamos prontos para desenvolver a identidade visual profissional que sua marca merece. 
                Do logotipo aos materiais de identidade, criamos designs que transmitem credibilidade.
              </p>
              </div>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-elegant border">
                  <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">WhatsApp</h4>
                    <p className="text-muted-foreground">(31) 98218-5173</p>
                    <p className="text-sm text-muted-foreground">Resposta rápida garantida</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-elegant border">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Instagram</h4>
                    <p className="text-muted-foreground">@profissional.id</p>
                    <p className="text-sm text-muted-foreground">Veja nossos trabalhos</p>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-elegant border">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Horário de Atendimento</h4>
                    <p className="text-muted-foreground">Segunda a Sexta: 8h às 20h</p>
                    <p className="text-sm text-muted-foreground">Sábado: 8h às 14h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="animate-fade-in">
              <div className="bg-card p-8 rounded-xl shadow-glow border">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Pronto para seu logotipo?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Clique no botão abaixo e vamos criar a identidade visual perfeita para sua marca. 
                      Estamos ansiosos para conhecer seu projeto!
                    </p>
                  </div>

                <div className="space-y-4">
                  <Button 
                    variant="whatsapp" 
                    size="xl" 
                    className="w-full group" 
                    onClick={handleWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Iniciar Conversa no WhatsApp
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">ou</div>

                  <Button 
                    variant="outline" 
                    size="xl" 
                    className="w-full group border-2" 
                    onClick={handleInstagram}
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Seguir no Instagram
                  </Button>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Por que escolher a Profissional ID?</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Especialistas em logotipos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Design profissional estratégico</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Identidade visual completa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>Atendimento personalizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;