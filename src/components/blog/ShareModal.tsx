import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Facebook, Twitter, Linkedin, MessageCircle, Instagram } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlog';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  post: BlogPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ post, open, onOpenChange }) => {
  const { toast } = useToast();
  const postUrl = `${window.location.origin}/blog/${post.slug}`;
  const shareText = `Confira este artigo: "${post.title}"`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      toast({
        title: "Sucesso",
        description: "Link copiado para a área de transferência!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o link",
        variant: "destructive",
      });
    }
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${postUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(linkedinUrl, '_blank');
  };

  const shareOnInstagram = () => {
    // Instagram não permite compartilhamento direto via URL, então copiamos o link
    copyToClipboard();
    toast({
      title: "Link copiado!",
      description: "Cole o link no Instagram Stories ou na sua bio",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-xl">Compartilhar Post</DialogTitle>
          
          {/* Preview do Post */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              {post.image_url && (
                <img 
                  src={post.image_url} 
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-lg border border-primary/20"
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground line-clamp-2 mb-1">
                  {post.title}
                </h4>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogDescription>
            Escolha onde compartilhar este conteúdo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3">
          {/* WhatsApp */}
          <Button
            onClick={shareOnWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#22C55E] text-white border-0 justify-start h-12"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">WhatsApp</div>
              <div className="text-xs opacity-90">Enviar mensagem</div>
            </div>
          </Button>
          
          {/* Instagram */}
          <Button
            onClick={shareOnInstagram}
            className="w-full bg-gradient-to-r from-[#E4405F] to-[#C13584] hover:from-[#D63384] hover:to-[#B02A5B] text-white border-0 justify-start h-12"
            size="lg"
          >
            <Instagram className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Instagram</div>
              <div className="text-xs opacity-90">Copiar para Stories</div>
            </div>
          </Button>
          
          {/* Facebook */}
          <Button
            onClick={shareOnFacebook}
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white border-0 justify-start h-12"
            size="lg"
          >
            <Facebook className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Facebook</div>
              <div className="text-xs opacity-90">Compartilhar no feed</div>
            </div>
          </Button>
          
          {/* Twitter */}
          <Button
            onClick={shareOnTwitter}
            className="w-full bg-[#1DA1F2] hover:bg-[#1A94DA] text-white border-0 justify-start h-12"
            size="lg"
          >
            <Twitter className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Twitter/X</div>
              <div className="text-xs opacity-90">Fazer um tweet</div>
            </div>
          </Button>
          
          {/* LinkedIn */}
          <Button
            onClick={shareOnLinkedIn}
            className="w-full bg-[#0A66C2] hover:bg-[#094E94] text-white border-0 justify-start h-12"
            size="lg"
          >
            <Linkedin className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">LinkedIn</div>
              <div className="text-xs opacity-90">Compartilhar profissionalmente</div>
            </div>
          </Button>
          
          {/* Copy Link */}
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-full border-primary/20 hover:bg-primary/5 justify-start h-12"
            size="lg"
          >
            <Copy className="w-5 h-5 mr-3" />
            <div className="text-left">
              <div className="font-medium">Copiar Link</div>
              <div className="text-xs text-muted-foreground">Para compartilhar em qualquer lugar</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;