import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  attendees: number;
  type: "upcoming" | "past";
}

const Events = () => {
  const events: Event[] = [
    {
      title: "Annual Family Reunion 2024",
      date: "December 25, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Family Homestead",
      description:
        "Our annual gathering brings the entire family together for a day of celebration, food, stories, and bonding. All family members from all branches are welcome!",
      attendees: 50,
      type: "upcoming",
    },
    {
      title: "Family Tree Documentation Day",
      date: "November 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center",
      description:
        "Join us as we work together to document our family history, update records, and collect stories from our elders. Bring photos and memories to share!",
      attendees: 25,
      type: "upcoming",
    },
    {
      title: "Children's Heritage Day",
      date: "October 20, 2024",
      time: "9:00 AM - 12:00 PM",
      location: "Village Grounds",
      description:
        "A special day dedicated to teaching our youngest generation about their heritage through games, stories, and cultural activities.",
      attendees: 30,
      type: "past",
    },
    {
      title: "Elder's Appreciation Ceremony",
      date: "September 10, 2024",
      time: "3:00 PM - 7:00 PM",
      location: "Family Homestead",
      description:
        "We honored our elders for their wisdom, guidance, and the foundation they've built for our family. A beautiful celebration of their legacy.",
      attendees: 40,
      type: "past",
    },
  ];

  const upcomingEvents = events.filter((e) => e.type === "upcoming");
  const pastEvents = events.filter((e) => e.type === "past");

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-20">
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Family Events</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay connected with upcoming gatherings, celebrations, and important family milestones
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-primary rounded-full"></span>
              Upcoming Events
            </h2>
            <div className="space-y-6 max-w-4xl">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={index}
                  className="card-elevated border-l-4 border-l-primary animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg text-foreground/90">{event.description}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold">{event.date}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-semibold">{event.time}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-semibold">{event.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expected</p>
                          <p className="font-semibold">{event.attendees}+ family members</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button className="w-full sm:w-auto">
                        Mark as Attending
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-muted-foreground rounded-full"></span>
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {pastEvents.map((event, index) => (
                <Card
                  key={index}
                  className="card-elevated opacity-80 hover:opacity-100 transition-opacity"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Suggest Event CTA */}
          <Card className="mt-16 max-w-4xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Suggest an Event</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have an idea for a family gathering or celebration? Share your suggestions with us 
                and help strengthen our family bonds.
              </p>
              <Button asChild size="lg">
                <a href="/contact">Submit Event Idea</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Events;
