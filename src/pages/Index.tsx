import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TreePine, Calendar, Heart, Image, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import familyGroupImg from "@/assets/family-group.jpg";
import familyChildrenImg from "@/assets/family-children.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="section-container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Jonathan Legacy Hub
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Celebrating the heritage of the <span className="text-primary font-semibold">Muthoka Mbeva</span> family - 
                where generations connect, stories are preserved, and bonds grow stronger.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="shadow-lg">
                  <Link to="/family-tree">Explore Family Tree</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-scale-in">
              <div className="absolute -top-4 -left-4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl card-elevated">
                <img 
                  src={familyGroupImg} 
                  alt="Muthoka Mbeva Family" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 warm-gradient">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Discover Our Legacy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore the rich tapestry of our family history, connections, and cherished moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <TreePine className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Family Tree</h3>
                <p className="text-muted-foreground mb-6">
                  Trace our roots from Muthoka Mbeva and Teresia Kativi through generations of family members.
                </p>
                <Link to="/family-tree" className="text-primary hover:text-accent transition-colors font-semibold">
                  Explore Tree →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Image className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Photo Gallery</h3>
                <p className="text-muted-foreground mb-6">
                  Relive precious moments captured through the years, from celebrations to everyday joy.
                </p>
                <Link to="/gallery" className="text-primary hover:text-accent transition-colors font-semibold">
                  View Photos →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Family Stories</h3>
                <p className="text-muted-foreground mb-6">
                  Read and share stories that define our family's journey, wisdom, and traditions.
                </p>
                <Link to="/stories" className="text-primary hover:text-accent transition-colors font-semibold">
                  Read Stories →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Events</h3>
                <p className="text-muted-foreground mb-6">
                  Stay connected with upcoming family gatherings, celebrations, and important dates.
                </p>
                <Link to="/events" className="text-primary hover:text-accent transition-colors font-semibold">
                  View Events →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Family Members</h3>
                <p className="text-muted-foreground mb-6">
                  Connect with relatives across all branches of our extended family network.
                </p>
                <Link to="/family-tree" className="text-primary hover:text-accent transition-colors font-semibold">
                  Meet Family →
                </Link>
              </CardContent>
            </Card>

            <Card className="card-elevated border-none">
              <CardContent className="pt-8">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Stay Connected</h3>
                <p className="text-muted-foreground mb-6">
                  Reach out, share updates, and strengthen the bonds that make us family.
                </p>
                <Link to="/contact" className="text-primary hover:text-accent transition-colors font-semibold">
                  Get in Touch →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-card">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={familyChildrenImg} 
                alt="Family heritage" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Our Heritage, Our Pride
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The Jonathan Legacy Hub stands as a testament to the enduring spirit of the Muthoka Mbeva family. 
                From our founding patriarch and matriarch to the newest generation, each member contributes to our 
                rich tapestry of experiences, values, and love.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Here, we preserve memories, celebrate milestones, and ensure that the wisdom of our elders 
                and the energy of our youth continue to inspire generations to come.
              </p>
              <Button size="lg" asChild>
                <Link to="/stories">Discover Our Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
