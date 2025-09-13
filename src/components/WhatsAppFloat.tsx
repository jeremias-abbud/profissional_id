import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppFloat = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/5531982185173?text=Olá! Gostaria de saber mais sobre os serviços da Profissional ID.", "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 mb-safe-area-inset-bottom mr-safe-area-inset-right">
      <Button
        variant="whatsapp"
        size="icon"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-glow animate-pulse hover:animate-none"
        onClick={handleWhatsApp}
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;