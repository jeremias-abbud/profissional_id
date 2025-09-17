import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/profissional-id-logo.jpg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "#inicio", isExternal: false },
    { label: "Sobre", href: "#sobre", isExternal: false },
    { label: "Serviços", href: "#produtos", isExternal: false },
    { label: "Portfolio", href: "#portfolio", isExternal: false },
    { label: "Blog", href: "/blog", isExternal: true },
    { label: "Contato", href: "#contato", isExternal: false }
  ];

  const handleNavigation = (href: string, isExternal: boolean) => {
    if (isExternal) {
      navigate(href);
    } else {
      // Se estamos numa rota diferente de /, navegar primeiro para /
      if (location.pathname !== '/') {
        navigate('/');
        // Aguardar a navegação antes de fazer scroll
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    setIsMenuOpen(false);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Vim através do site da Profissional ID e gostaria de entrar em contato para conversar sobre meu projeto.", "_blank");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-primary/10" 
        : "bg-gradient-to-b from-primary/5 via-background/30 to-transparent backdrop-blur-sm"
    }`}>
      <nav className="container mx-auto px-4 py-3 relative">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-50 pointer-events-none rounded-lg"></div>
        <div className="flex items-center justify-between relative z-10">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer z-10 relative" 
            onClick={() => handleNavigation("#inicio", false)}
          >
            <img 
              src={logo} 
              alt="Profissional ID Logo" 
              className="h-12 w-12 object-cover rounded-full border-2 border-primary/20 hover:border-primary/40 transition-colors"
            />
            <span className="ml-3 text-lg font-semibold text-foreground hidden sm:block">
              Profissional ID
            </span>
          </div>

          {/* Desktop Menu - Centralizado */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 bg-card/30 backdrop-blur-sm rounded-full px-6 py-2 border border-primary/10">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href, item.isExternal)}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* WhatsApp Button & Mobile Menu */}
          <div className="flex items-center space-x-3 z-10 relative">
            <Button 
              variant="whatsapp" 
              size="sm" 
              onClick={handleWhatsApp}
              className="hidden sm:flex shadow-md hover:shadow-lg transition-shadow"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>

            {/* Mobile WhatsApp Icon */}
            <Button 
              variant="whatsapp" 
              size="icon" 
              onClick={handleWhatsApp}
              className="sm:hidden shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 relative z-50">
            <div className="flex flex-col space-y-2 bg-card/98 backdrop-blur-md rounded-xl p-4 shadow-glow border border-border/50">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href, item.isExternal)}
                  className="text-left py-2.5 px-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;