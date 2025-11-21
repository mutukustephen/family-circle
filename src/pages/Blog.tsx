import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, User, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string | null;
  image_url: string | null;
  author_id: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface BlogWithCounts extends BlogPost {
  likeCount: number;
  commentCount: number;
}

const Blog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data: postsData, error: postsError } = await query;

      if (postsError) throw postsError;

      // Fetch like counts and comment counts for each post
      const postsWithCounts = await Promise.all(
        (postsData || []).map(async (post) => {
          const [likesResult, commentsResult] = await Promise.all([
            supabase
              .from('blog_likes')
              .select('id', { count: 'exact', head: true })
              .eq('post_id', post.id),
            supabase
              .from('blog_comments')
              .select('id', { count: 'exact', head: true })
              .eq('post_id', post.id),
          ]);

          return {
            ...post,
            likeCount: likesResult.count || 0,
            commentCount: commentsResult.count || 0,
          };
        })
      );

      setPosts(postsWithCounts);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(postsData?.map((p) => p.category).filter(Boolean) as string[])
      );
      setCategories(uniqueCategories);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getExcerpt = (content: string, maxLength: number = 200) => {
    const stripped = content.replace(/<[^>]*>/g, '');
    return stripped.length > maxLength
      ? stripped.substring(0, maxLength) + '...'
      : stripped;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Family Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stories, updates, and memories from our family
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-12 flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                All Posts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          )}

          {/* Blog Posts Grid */}
          {posts.length === 0 ? (
            <Card className="text-center py-16 card-elevated">
              <CardContent>
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for family stories and updates!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="block animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card className="h-full card-elevated hover:shadow-lg transition-all">
                    {post.image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
                          <Heart className="w-4 h-4" />
                          <span>{post.likeCount}</span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 line-clamp-3">
                        {getExcerpt(post.content)}
                      </p>
                      <p className="text-primary font-semibold mt-4">
                        Read more →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
