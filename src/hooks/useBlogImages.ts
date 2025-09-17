import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useBlogImages = () => {
  const { toast } = useToast();

  const uploadBlogImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Supabase Storage Error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Could not get public URL for the uploaded image.');
      }

      toast({
        title: "Sucesso",
        description: "Imagem enviada com sucesso!",
      });

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading blog image:', error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a imagem",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    uploadBlogImage,
  };
};