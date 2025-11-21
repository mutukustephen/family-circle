import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FamilyMember {
  name: string;
  children?: string[];
}

interface FamilyBranch {
  id: string;
  name: string;
  description: string;
  father: string;
  mother: string;
  children: string[];
}

const FamilyTree = () => {
  const { toast } = useToast();
  const [branches, setBranches] = useState<FamilyBranch[]>([]);
  const [loading, setLoading] = useState(true);

  const grandparents = {
    grandfather: "Muthoka Mbeva",
    grandmother: "Teresia Kativi",
  };

  const firstGeneration = [
    "Musa Muthoka",
    "Daniel Muthoka",
    "Kyalo Muthoka",
    "Mwangangi Muthoka",
    "Muthiani Muthoka",
    "Mutua Muthoka",
    "Jacinta Muthoka",
  ];

  const familiesData: Omit<FamilyBranch, "id" | "description">[] = [
    {
      name: "Musa Muthoka & Mama Kyengo",
      father: "Musa Muthoka",
      mother: "Mama Kyengo",
      children: ["Kyengo (First Born)", "Eric (Second Born)", "Mummy (Last Born)"],
    },
    {
      name: "Daniel Muthoka & Wanza",
      father: "Daniel Muthoka",
      mother: "Wanza",
      children: ["Nthiwa", "Munyao", "Paul", "Mutwiwa"],
    },
    {
      name: "Kyalo Muthoka & Easter",
      father: "Kyalo Muthoka",
      mother: "Easter",
      children: ["Annah", "Caleb", "Veronicah"],
    },
    {
      name: "Mwangangi Muthoka & Ma Muuo",
      father: "Mwangangi Muthoka",
      mother: "Ma Muuo",
      children: ["Muuo", "Moses", "Abigal"],
    },
    {
      name: "Muthiani Muthoka & Ma Mwendwa",
      father: "Muthiani Muthoka",
      mother: "Ma Mwendwa",
      children: ["Mwendwa", "Prince"],
    },
    {
      name: "Mutua Muthoka & Mercy",
      father: "Mutua Muthoka",
      mother: "Mercy",
      children: ["Elvies"],
    },
  ];

  const jacintalData = {
    name: "Jacinta Muthoka",
    children: ["Muia", "Mutheu"],
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data, error } = await supabase
        .from('family_branches')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Map database branches with local data
      const mappedBranches = (data || []).map((branch, index) => {
        if (branch.name === "Jacinta Muthoka") {
          return {
            ...branch,
            father: "Jacinta Muthoka",
            mother: "",
            children: jacintalData.children,
          };
        }
        
        const familyData = familiesData[index] || { father: "", mother: "", children: [] };
        return {
          ...branch,
          father: familyData.father || "",
          mother: familyData.mother || "",
          children: familyData.children || [],
        };
      });

      setBranches(mappedBranches);
    } catch (error: any) {
      console.error('Error fetching branches:', error);
      toast({
        title: "Error",
        description: "Failed to load family branches",
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
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Our Family Tree</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The Muthoka Mbeva family lineage spanning multiple generations, preserving our heritage and connections
            </p>
          </div>

          {/* Grandparents - Root of the Tree */}
          <div className="mb-12 animate-scale-in">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 border-2 border-primary/20 card-elevated">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl">Founding Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Grandfather</p>
                    <p className="text-2xl font-bold text-primary">{grandparents.grandfather}</p>
                  </div>
                  <div className="text-2xl text-muted-foreground">❤️</div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Grandmother</p>
                    <p className="text-2xl font-bold text-primary">{grandparents.grandmother}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* First Generation Children */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-8">
              Children of Muthoka & Teresia
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {firstGeneration.map((child, index) => (
                <Card key={index} className="card-elevated border-secondary/20">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <p className="font-semibold text-lg">{child}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Second Generation - Family Branches */}
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Family Branches - Second Generation
            </h2>
            
            <div className="space-y-8 max-w-5xl mx-auto">
              {branches.map((family, index) => (
                <Link 
                  key={family.id}
                  to={`/family-branch/${family.id}`}
                  className="block"
                >
                  <Card className="card-elevated border-accent/20 hover:border-primary/40 transition-all cursor-pointer">
                    <CardHeader className="bg-gradient-to-r from-accent/5 to-transparent">
                      <CardTitle className="text-2xl flex items-center justify-between">
                        <span>{family.name}</span>
                        <Users className="w-5 h-5 text-accent" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground mb-4 font-semibold">Children:</p>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {family.children.map((child, childIndex) => (
                          <div
                            key={childIndex}
                            className="bg-muted/50 rounded-lg p-3 text-center hover:bg-muted transition-colors"
                          >
                            <p className="font-medium">{child}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-primary mt-4 font-semibold">
                        Click to view branch details →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Family Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <Card className="text-center card-elevated bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <p className="text-muted-foreground">Generations</p>
              </CardContent>
            </Card>
            <Card className="text-center card-elevated bg-gradient-to-br from-secondary/5 to-transparent">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-secondary mb-2">7</div>
                <p className="text-muted-foreground">Family Branches</p>
              </CardContent>
            </Card>
            <Card className="text-center card-elevated bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="pt-8">
                <div className="text-4xl font-bold text-accent mb-2">20+</div>
                <p className="text-muted-foreground">Grandchildren</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FamilyTree;
