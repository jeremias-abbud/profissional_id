import { Heart, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/profissional-id-logo.jpg";

const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Gostaria de saber mais sobre os serviços da Profissional ID e fazer um orçamento.", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/profissional.id/", "_blank");
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo e Descrição */}
            <div className="md:col-span-2 mb-8 md:mb-0">
              <div className="mb-4 flex items-center gap-3">
                <img 
                  src={logo} 
                  alt="Profissional ID Logo" 
                  className="h-8 w-8 object-cover rounded-full"
                />
                <span className="text-lg font-semibold text-secondary-foreground">
                  Profissional ID
                </span>
              </div>
              <p className="text-secondary-foreground/80 leading-relaxed mb-6">
                Especialistas em logotipos e identidade visual profissional. Criamos designs únicos 
                que elevam sua marca e transmitem credibilidade com profissionalismo e criatividade.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center hover:bg-whatsapp/90 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={handleInstagram}
                  className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Navegação */}
            <div className="mb-8 md:mb-0">
              <h4 className="font-semibold text-secondary-foreground mb-4">Navegação</h4>
              <nav className="space-y-2">
                <button 
                  onClick={() => scrollToSection("#inicio")}
                  className="block text-secondary-foreground/80 hover:text-primary transition-colors text-left"
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection("#sobre")}
                  className="block text-secondary-foreground/80 hover:text-primary transition-colors text-left"
                >
                  Sobre
                </button>
                <button 
                  onClick={() => scrollToSection("#produtos")}
                  className="block text-secondary-foreground/80 hover:text-primary transition-colors text-left"
                >
                  Serviços
                </button>
                <button 
                  onClick={() => scrollToSection("#portfolio")}
                  className="block text-secondary-foreground/80 hover:text-primary transition-colors text-left"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => scrollToSection("#contato")}
                  className="block text-secondary-foreground/80 hover:text-primary transition-colors text-left"
                >
                  Contato
                </button>
              </nav>
            </div>

            {/* Contato */}
            <div>
              <h4 className="font-semibold text-secondary-foreground mb-4">Contato</h4>
              <div className="space-y-2 text-secondary-foreground/80 text-sm">
                <div>
                  <strong>WhatsApp:</strong>
                  <br />
                  (31) 98218-5173
                </div>
                <div>
                  <strong>Instagram:</strong>
                  <br />
                  @profissional.id
                </div>
                <div>
                  <strong>Horário:</strong>
                  <br />
                  Seg-Sex: 8h às 18h
                  <br />
                  Sáb: 8h às 14h
                </div>
              </div>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-secondary-foreground/20 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
              <div className="flex items-center gap-1 text-center sm:text-left">
                <span>© 2024 Profissional ID. Feito com</span>
                <Heart className="w-4 h-4 text-primary fill-primary" />
                <span>para você.</span>
              </div>
              <div className="text-center sm:text-right">
                Todos os direitos reservados.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;