import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BlogGrid from '@/components/blog/BlogGrid';
import ShareModal from '@/components/blog/ShareModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useBlog, BlogPost } from '@/hooks/useBlog';
import { Search, Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';

const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts, loading, fetchPosts, getPostBySlug } = useBlog();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts(true); // Apenas posts publicados
  }, []);

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug).then(post => {
        if (post) {
          setSelectedPost(post);
        } else {
          navigate('/blog');
        }
      });
    } else {
      setSelectedPost(null);
    }
  }, [slug]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min de leitura`;
  };

  const handleReadMore = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleShare = (post: BlogPost) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  // Visualização de post individual
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <WhatsAppFloat />
        
        <main className="pt-20">
          <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="mb-6 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>

            <header className="mb-8">
              {selectedPost.image_url && (
                <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                  <img 
                    src={selectedPost.image_url} 
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(selectedPost.created_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {getReadingTime(selectedPost.content)}
                  </div>
                  <span>Por {selectedPost.author}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare(selectedPost)}
                  className="hover:bg-primary hover:text-primary-foreground"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {selectedPost.title}
              </h1>

              {selectedPost.excerpt && (
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {selectedPost.excerpt}
                </p>
              )}

              {selectedPost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedPost.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-primary/20 text-primary/80 hover:bg-primary/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                {selectedPost.content}
              </div>
            </div>

            <footer className="mt-12 pt-8 border-t border-border/50">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Gostou do conteúdo? Compartilhe com seus amigos!
                </p>
                <Button 
                  onClick={() => handleShare(selectedPost)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </footer>
          </article>
        </main>

        <Footer />
        
        {shareModalOpen && selectedPost && (
          <ShareModal 
            post={selectedPost}
            open={shareModalOpen}
            onOpenChange={setShareModalOpen}
          />
        )}
      </div>
    );
  }

  // Listagem do blog
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppFloat />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog Profissional ID
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra dicas, insights e novidades sobre design, identidade visual 
              e transformação digital para o seu negócio.
            </p>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                >
                  Todos
                </Button>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* Posts em Destaque */}
                {featuredPosts.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Posts em Destaque
                    </h2>
                    <BlogGrid 
                      posts={featuredPosts} 
                      onReadMore={handleReadMore}
                    />
                  </div>
                )}

                {/* Posts Regulares */}
                {regularPosts.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      {featuredPosts.length > 0 ? 'Outros Posts' : 'Posts Recentes'}
                    </h2>
                    <BlogGrid 
                      posts={regularPosts} 
                      onReadMore={handleReadMore}
                    />
                  </div>
                )}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      {searchTerm || selectedTag 
                        ? 'Nenhum post encontrado com os filtros aplicados.' 
                        : 'Nenhum post encontrado no momento.'
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;