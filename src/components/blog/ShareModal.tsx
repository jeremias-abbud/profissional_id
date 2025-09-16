import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Post</DialogTitle>
          <DialogDescription>
            Compartilhe "{post.title}" nas suas redes sociais
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* WhatsApp */}
          <Button
            onClick={shareOnWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#22C55E] text-white border-0"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Compartilhar no WhatsApp
          </Button>
          
          {/* Facebook */}
          <Button
            onClick={shareOnFacebook}
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white border-0"
            size="lg"
          >
            <Facebook className="w-5 h-5 mr-2" />
            Compartilhar no Facebook
          </Button>
          
          {/* Twitter */}
          <Button
            onClick={shareOnTwitter}
            className="w-full bg-[#1DA1F2] hover:bg-[#1A94DA] text-white border-0"
            size="lg"
          >
            <Twitter className="w-5 h-5 mr-2" />
            Compartilhar no Twitter
          </Button>
          
          {/* LinkedIn */}
          <Button
            onClick={shareOnLinkedIn}
            className="w-full bg-[#0A66C2] hover:bg-[#094E94] text-white border-0"
            size="lg"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            Compartilhar no LinkedIn
          </Button>
          
          {/* Copy Link */}
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="w-full border-primary/20 hover:bg-primary/5"
            size="lg"
          >
            <Copy className="w-5 h-5 mr-2" />
            Copiar Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;