import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Users, Image, Music, Video, Calendar, MessageSquare, Vote, FileText } from "lucide-react";

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/auth");
    }
  }, [isAdmin, loading, navigate]);

  const handleMediaUpload = async (event: React.ChangeEvent<HTMLInputElement>, mediaType: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("media")
        .insert({
          title: file.name,
          media_type: mediaType,
          file_url: publicUrl,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: `${mediaType} uploaded successfully.`,
      });

      event.target.value = "";
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl text-muted-foreground">Manage family content and members</p>
          </div>

          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="media">
                <Upload className="w-4 h-4 mr-2" />
                Media
              </TabsTrigger>
              <TabsTrigger value="members">
                <Users className="w-4 h-4 mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger value="blog">
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="polls">
                <Vote className="w-4 h-4 mr-2" />
                Polls
              </TabsTrigger>
            </TabsList>

            <TabsContent value="media" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Upload Photos
                    </CardTitle>
                    <CardDescription>Add family photos to the gallery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleMediaUpload(e, "photo")}
                      disabled={uploading}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Upload Videos
                    </CardTitle>
                    <CardDescription>Share family videos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleMediaUpload(e, "video")}
                      disabled={uploading}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="w-5 h-5" />
                      Upload Music
                    </CardTitle>
                    <CardDescription>Add family music</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => handleMediaUpload(e, "music")}
                      disabled={uploading}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <CardTitle>Add Family Member</CardTitle>
                  <CardDescription>Add a new member to the family tree</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Member management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog">
              <Card>
                <CardHeader>
                  <CardTitle>Create Blog Post</CardTitle>
                  <CardDescription>Share family news and stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Blog creation interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="polls">
              <Card>
                <CardHeader>
                  <CardTitle>Create Poll</CardTitle>
                  <CardDescription>Create a poll for family members to vote on</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Poll creation interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
