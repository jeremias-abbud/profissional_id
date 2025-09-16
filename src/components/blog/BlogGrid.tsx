import React from 'react';
import { BlogPost } from '@/hooks/useBlog';
import BlogCard from './BlogCard';
import ShareModal from './ShareModal';
import { useState } from 'react';

interface BlogGridProps {
  posts: BlogPost[];
  onReadMore?: (post: BlogPost) => void;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, onReadMore }) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleShare = (post: BlogPost) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Nenhum post encontrado no momento.
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Volte em breve para conferir novos conteúdos!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            onShare={handleShare}
            onReadMore={onReadMore}
          />
        ))}
      </div>
      
      {selectedPost && (
        <ShareModal 
          post={selectedPost}
          open={shareModalOpen}
          onOpenChange={setShareModalOpen}
        />
      )}
    </>
  );
};

export default BlogGrid;