import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, ArrowLeft, Mail, Phone, MapPin, Facebook, 
  Twitter, Instagram, Linkedin, Image as ImageIcon, FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FamilyMember {
  id: string;
  full_name: string;
  email?: string;
  phone_number?: string;
  address?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  linkedin_url?: string;
  profile_photo_url?: string;
  bio?: string;
  occupation?: string;
  birth_date?: string;
}

interface Media {
  id: string;
  title: string;
  file_url: string;
  media_type: string;
  thumbnail_url?: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
}

const FamilyBranch = () => {
  const { branchId } = useParams();
  const { toast } = useToast();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [branchName, setBranchName] = useState("");

  useEffect(() => {
    fetchBranchData();
  }, [branchId]);

  const fetchBranchData = async () => {
    try {
      // Fetch branch info
      const { data: branchData, error: branchError } = await supabase
        .from('family_branches')
        .select('*')
        .eq('id', branchId)
        .single();

      if (branchError) throw branchError;

      setBranchName(branchData.name);

      // Fetch family members for this branch
      const { data: membersData, error: membersError } = await supabase
        .from('family_members')
        .select('*')
        .eq('parent_id', branchId);

      if (membersError) throw membersError;
      setMembers(membersData || []);

      // Fetch media for this branch
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .select('*')
        .eq('branch_id', branchId)
        .order('created_at', { ascending: false })
        .limit(6);

      if (mediaError) throw mediaError;
      setMedia(mediaData || []);

      // Fetch news for this branch
      const { data: newsData, error: newsError } = await supabase
        .from('family_news')
        .select('*')
        .eq('branch_id', branchId)
        .order('created_at', { ascending: false })
        .limit(3);

      if (newsError) throw newsError;
      setNews(newsData || []);

    } catch (error: any) {
      console.error('Error fetching branch data:', error);
      toast({
        title: "Error",
        description: "Failed to load family branch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
          <div className="mb-12">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/family-tree">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Family Tree
              </Link>
            </Button>
            
            <div className="text-center animate-fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                {branchName} Family
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore photos, news, and connect with family members
              </p>
            </div>
          </div>

          {/* Family Members */}
          {members.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                Family Members
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <Card key={member.id} className="card-elevated">
                    <CardHeader>
                      {member.profile_photo_url && (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                          <img 
                            src={member.profile_photo_url} 
                            alt={member.full_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardTitle className="text-center">{member.full_name}</CardTitle>
                      {member.occupation && (
                        <Badge variant="secondary" className="mx-auto">
                          {member.occupation}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {member.bio && (
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                      )}
                      
                      <div className="space-y-2 pt-4 border-t">
                        {member.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a href={`mailto:${member.email}`} className="hover:text-primary">
                              {member.email}
                            </a>
                          </div>
                        )}
                        {member.phone_number && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <a href={`tel:${member.phone_number}`} className="hover:text-primary">
                              {member.phone_number}
                            </a>
                          </div>
                        )}
                        {member.address && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{member.address}</span>
                          </div>
                        )}
                      </div>

                      {/* Social Media Links */}
                      {(member.facebook_url || member.twitter_url || member.instagram_url || member.linkedin_url) && (
                        <div className="flex gap-2 pt-4 border-t">
                          {member.facebook_url && (
                            <a href={member.facebook_url} target="_blank" rel="noopener noreferrer" 
                               className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Facebook className="w-5 h-5" />
                            </a>
                          )}
                          {member.twitter_url && (
                            <a href={member.twitter_url} target="_blank" rel="noopener noreferrer"
                               className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Twitter className="w-5 h-5" />
                            </a>
                          )}
                          {member.instagram_url && (
                            <a href={member.instagram_url} target="_blank" rel="noopener noreferrer"
                               className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Instagram className="w-5 h-5" />
                            </a>
                          )}
                          {member.linkedin_url && (
                            <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer"
                               className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Linkedin className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Family News */}
          {news.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-secondary rounded-full"></span>
                Family News
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <Card key={item.id} className="card-elevated">
                    {item.image_url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/80 line-clamp-3">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Family Media Gallery */}
          {media.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-full"></span>
                Photo Gallery
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map((item) => (
                  <div key={item.id} className="aspect-square overflow-hidden rounded-lg card-elevated group">
                    {item.media_type === 'photo' ? (
                      <img 
                        src={item.file_url} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        {item.media_type === 'video' ? (
                          <ImageIcon className="w-12 h-12 text-muted-foreground" />
                        ) : (
                          <FileText className="w-12 h-12 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/gallery">View Full Gallery</Link>
                </Button>
              </div>
            </section>
          )}

          {/* Empty State */}
          {members.length === 0 && news.length === 0 && media.length === 0 && (
            <Card className="text-center py-16">
              <CardContent>
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">No Content Yet</h3>
                <p className="text-muted-foreground mb-6">
                  This family branch doesn't have any members, news, or photos yet.
                </p>
                <Button asChild>
                  <Link to="/family-tree">Back to Family Tree</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FamilyBranch;
