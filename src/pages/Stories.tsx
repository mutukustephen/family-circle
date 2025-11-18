import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Story {
  title: string;
  author: string;
  date: string;
  content: string;
  category: string;
}

const Stories = () => {
  const stories: Story[] = [
    {
      title: "The Legacy of Muthoka Mbeva",
      author: "Family Elder",
      date: "Traditional Story",
      category: "Heritage",
      content:
        "Muthoka Mbeva and Teresia Kativi established the foundation of our family with unwavering dedication, hard work, and deep love. Their values of unity, respect, and perseverance continue to guide us through generations. They taught us that family is not just about blood, but about the bonds we nurture and the traditions we uphold.",
    },
    {
      title: "Growing Up in the Village",
      author: "Second Generation",
      date: "Shared Memories",
      category: "Childhood",
      content:
        "Life in our village was filled with simple joys - playing with cousins under the big trees, helping with farm work, and gathering around the fire for evening stories. Our elders would share wisdom passed down through generations, teaching us about our culture, our land, and the importance of staying connected to our roots.",
    },
    {
      title: "Family Gatherings: Our Greatest Tradition",
      author: "Family Member",
      date: "Ongoing Tradition",
      category: "Celebrations",
      content:
        "No matter how far we travel or where life takes us, our family gatherings remain sacred. These moments when all branches of the family come together remind us of who we are and where we come from. The laughter of children, the wisdom of elders, and the warmth of being together create memories that last a lifetime.",
    },
    {
      title: "Lessons from Our Grandparents",
      author: "Grandchild",
      date: "Living Memory",
      category: "Wisdom",
      content:
        "Our grandparents taught us that true wealth is measured not in material possessions, but in the strength of family bonds and the character we build. They showed us through their example what it means to work hard, love deeply, and always put family first. These lessons continue to shape who we are today.",
    },
  ];

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
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Family Stories</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The tales that define us - stories of heritage, wisdom, and the bonds that make us who we are
            </p>
          </div>

          {/* Stories Grid */}
          <div className="space-y-8 max-w-4xl mx-auto">
            {stories.map((story, index) => (
              <Card
                key={index}
                className="card-elevated border-l-4 border-l-primary animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {story.category}
                    </span>
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">{story.title}</CardTitle>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-2">
                    <span>By {story.author}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed text-foreground/90">{story.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Share Your Story CTA */}
          <Card className="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Share Your Story</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every family member has a story worth telling. Your experiences, memories, and wisdom 
                help preserve our heritage for future generations.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
              >
                Contribute Your Story
              </a>
            </CardContent>
          </Card>

          {/* Story Categories */}
          <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Heritage", "Childhood", "Celebrations", "Wisdom"].map((category) => (
              <div
                key={category}
                className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors"
              >
                <p className="font-semibold">{category}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stories.filter((s) => s.category === category).length} stories
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Stories;
