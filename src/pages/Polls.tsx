import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { BarChart3, PlusCircle, Trash2, Vote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Poll {
  id: string;
  question: string;
  options: string[];
  created_at: string;
  closes_at: string | null;
}

interface PollVote {
  id: string;
  poll_id: string;
  user_id: string;
  option_index: number;
}

interface VoteCount {
  [key: number]: number;
}

const Polls = () => {
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [polls, setPolls] = useState<Poll[]>([]);
  const [votes, setVotes] = useState<PollVote[]>([]);
  const [voteCounts, setVoteCounts] = useState<{ [pollId: string]: VoteCount }>({});
  const [userVotes, setUserVotes] = useState<{ [pollId: string]: number }>({});
  
  // Admin create poll state
  const [newPollQuestion, setNewPollQuestion] = useState("");
  const [newPollOptions, setNewPollOptions] = useState<string[]>(["", ""]);
  const [isCreating, setIsCreating] = useState(false);

  // Fetch polls
  useEffect(() => {
    fetchPolls();
    fetchVotes();
  }, []);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('poll_votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'poll_votes'
        },
        (payload) => {
          console.log('Vote change received:', payload);
          fetchVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Calculate vote counts whenever votes change
  useEffect(() => {
    const counts: { [pollId: string]: VoteCount } = {};
    const userVoteMap: { [pollId: string]: number } = {};

    votes.forEach(vote => {
      if (!counts[vote.poll_id]) {
        counts[vote.poll_id] = {};
      }
      counts[vote.poll_id][vote.option_index] = (counts[vote.poll_id][vote.option_index] || 0) + 1;

      if (user && vote.user_id === user.id) {
        userVoteMap[vote.poll_id] = vote.option_index;
      }
    });

    setVoteCounts(counts);
    setUserVotes(userVoteMap);
  }, [votes, user]);

  const fetchPolls = async () => {
    const { data, error } = await supabase
      .from('polls')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching polls:', error);
      toast({
        title: "Error",
        description: "Failed to load polls",
        variant: "destructive",
      });
      return;
    }

    // Cast options from Json to string[]
    const pollsWithTypedOptions = (data || []).map(poll => ({
      ...poll,
      options: Array.isArray(poll.options) ? poll.options as string[] : []
    }));

    setPolls(pollsWithTypedOptions);
  };

  const fetchVotes = async () => {
    const { data, error } = await supabase
      .from('poll_votes')
      .select('*');

    if (error) {
      console.error('Error fetching votes:', error);
      return;
    }

    setVotes(data || []);
  };

  const handleCreatePoll = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const validOptions = newPollOptions.filter(opt => opt.trim() !== "");
    
    if (newPollQuestion.trim() === "" || validOptions.length < 2) {
      toast({
        title: "Invalid poll",
        description: "Please provide a question and at least 2 options",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    const { error } = await supabase
      .from('polls')
      .insert({
        question: newPollQuestion,
        options: validOptions,
        created_by: user.id,
      });

    setIsCreating(false);

    if (error) {
      console.error('Error creating poll:', error);
      toast({
        title: "Error",
        description: "Failed to create poll",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Poll created successfully",
    });

    setNewPollQuestion("");
    setNewPollOptions(["", ""]);
    fetchPolls();
  };

  const handleVote = async (pollId: string, optionIndex: number) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { error } = await supabase
      .from('poll_votes')
      .insert({
        poll_id: pollId,
        user_id: user.id,
        option_index: optionIndex,
      });

    if (error) {
      console.error('Error voting:', error);
      toast({
        title: "Error",
        description: "Failed to submit vote. You may have already voted.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Vote submitted",
      description: "Thank you for voting!",
    });
  };

  const getTotalVotes = (pollId: string): number => {
    const counts = voteCounts[pollId] || {};
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  };

  const getVotePercentage = (pollId: string, optionIndex: number): number => {
    const total = getTotalVotes(pollId);
    if (total === 0) return 0;
    const count = voteCounts[pollId]?.[optionIndex] || 0;
    return Math.round((count / total) * 100);
  };

  const addOption = () => {
    setNewPollOptions([...newPollOptions, ""]);
  };

  const removeOption = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(newPollOptions.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const updated = [...newPollOptions];
    updated[index] = value;
    setNewPollOptions(updated);
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
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Family Polls</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Share your opinions and see what the family thinks about important decisions
            </p>
          </div>

          {/* Admin Create Poll Form */}
          {isAdmin && (
            <Card className="mb-12 max-w-3xl mx-auto card-elevated border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Vote className="w-6 h-6 text-primary" />
                  Create New Poll
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Input
                    id="question"
                    placeholder="What should we decide on?"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <Label>Options</Label>
                  {newPollOptions.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                      />
                      {newPollOptions.length > 2 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeOption(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addOption}
                    className="w-full"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                </div>

                <Button
                  onClick={handleCreatePoll}
                  disabled={isCreating}
                  className="w-full"
                  size="lg"
                >
                  {isCreating ? "Creating..." : "Create Poll"}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Active Polls */}
          <div className="space-y-8 max-w-3xl mx-auto">
            {polls.length === 0 ? (
              <Card className="card-elevated">
                <CardContent className="pt-12 pb-12 text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-lg text-muted-foreground">
                    No polls yet. {isAdmin && "Create the first poll above!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              polls.map((poll, pollIndex) => {
                const hasVoted = userVotes[poll.id] !== undefined;
                const totalVotes = getTotalVotes(poll.id);

                return (
                  <Card
                    key={poll.id}
                    className="card-elevated animate-scale-in"
                    style={{ animationDelay: `${pollIndex * 100}ms` }}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl">{poll.question}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {!hasVoted && user ? (
                        <RadioGroup
                          onValueChange={(value) => handleVote(poll.id, parseInt(value))}
                        >
                          {poll.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value={index.toString()} id={`${poll.id}-${index}`} />
                              <Label htmlFor={`${poll.id}-${index}`} className="flex-1 cursor-pointer text-base">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      ) : (
                        <div className="space-y-3">
                          {poll.options.map((option, index) => {
                            const percentage = getVotePercentage(poll.id, index);
                            const voteCount = voteCounts[poll.id]?.[index] || 0;
                            const isUserChoice = userVotes[poll.id] === index;

                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className={`text-base ${isUserChoice ? 'font-bold text-primary' : ''}`}>
                                    {option} {isUserChoice && '(Your vote)'}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {voteCount} {voteCount === 1 ? 'vote' : 'votes'} ({percentage}%)
                                  </span>
                                </div>
                                <Progress 
                                  value={percentage} 
                                  className={`h-3 ${isUserChoice ? 'bg-primary/20' : ''}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {!user && (
                        <div className="pt-4 text-center">
                          <p className="text-sm text-muted-foreground mb-3">
                            Sign in to vote on this poll
                          </p>
                          <Button onClick={() => navigate('/auth')} variant="outline">
                            Sign In
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Polls;
