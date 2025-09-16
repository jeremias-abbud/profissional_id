import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Share2 } from 'lucide-react';
import { BlogPost } from '@/hooks/useBlog';

interface BlogCardProps {
  post: BlogPost;
  onShare?: (post: BlogPost) => void;
  onReadMore?: (post: BlogPost) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onShare, onReadMore }) => {
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

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 overflow-hidden border-border/50 hover:border-primary/20">
      {post.image_url && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {getReadingTime(post.content)}
            </div>
          </div>
          
          {post.featured && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Destaque
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs border-primary/20 text-primary/80 hover:bg-primary/5"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => onReadMore?.(post)}
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Ler mais
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onShare?.(post)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;