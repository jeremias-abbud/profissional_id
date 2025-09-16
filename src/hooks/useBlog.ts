import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  published: boolean;
  featured: boolean;
  slug: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export const useBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async (publishedOnly = false) => {
    try {
      setLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (publishedOnly) {
        query = query.eq('published', true);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Erro ao carregar posts:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os posts do blog",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchPosts();
      toast({
        title: "Sucesso",
        description: "Post criado com sucesso!",
      });
      
      return data;
    } catch (error: any) {
      console.error('Erro ao criar post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchPosts();
      toast({
        title: "Sucesso",
        description: "Post atualizado com sucesso!",
      });
      
      return data;
    } catch (error: any) {
      console.error('Erro ao atualizar post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchPosts();
      toast({
        title: "Sucesso",
        description: "Post deletado com sucesso!",
      });
    } catch (error: any) {
      console.error('Erro ao deletar post:', error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o post",
        variant: "destructive",
      });
      throw error;
    }
  };

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('Erro ao carregar post:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
  };
};