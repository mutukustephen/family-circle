import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">JL</span>
              </div>
              <span className="text-lg font-display font-bold">Jonathan Legacy Hub</span>
            </div>
            <p className="text-muted-foreground">
              Preserving our family heritage and celebrating the bonds that unite us across generations.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/family-tree" className="text-muted-foreground hover:text-primary transition-colors">
                  Family Tree
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="/stories" className="text-muted-foreground hover:text-primary transition-colors">
                  Family Stories
                </a>
              </li>
              <li>
                <a href="/events" className="text-muted-foreground hover:text-primary transition-colors">
                  Upcoming Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">
              Stay connected with family updates and celebrations.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center text-primary hover:text-accent transition-colors"
            >
              Get in Touch →
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-center text-muted-foreground">
          <span className="flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for the Muthoka Mbeva Family
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
