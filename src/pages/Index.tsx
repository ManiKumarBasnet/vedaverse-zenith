import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { VedaverseLogo } from "@/components/VedaverseLogo";
import { ProfileCard } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  GraduationCap, 
  Heart, 
  Users, 
  ArrowRight,
  BookOpen,
  Brain,
  Map,
  Sparkles,
  Star,
  TrendingUp,
  Globe
} from "lucide-react";

const learningProfiles = [
  {
    id: "seeker",
    title: "Spiritual Seeker",
    description: "Perfect for complete newcomers to Hindu philosophy",
    icon: Sprout,
    features: ["Guided learning", "Simple explanations", "Audio support", "Visual timelines"],
    duration: "3-6 months",
    difficulty: "Beginner" as const
  },
  {
    id: "scholar", 
    title: "Philosophy Student",
    description: "Academic study and deep philosophical inquiry",
    icon: GraduationCap,
    features: ["Advanced concepts", "Cross-references", "Original texts", "Academic sources"],
    duration: "6-12 months", 
    difficulty: "Advanced" as const
  },
  {
    id: "practitioner",
    title: "Devotional Practitioner", 
    description: "Applying teachings in spiritual practice",
    icon: Heart,
    features: ["Daily practices", "Mantras", "Devotional stories", "Ritual guidance"],
    duration: "4-8 months",
    difficulty: "Intermediate" as const
  },
  {
    id: "teacher",
    title: "Teacher & Guide",
    description: "Sharing wisdom and guiding others", 
    icon: Users,
    features: ["Teaching resources", "Discussion tools", "Progress tracking", "Community features"],
    duration: "Ongoing",
    difficulty: "Expert" as const
  }
];

const platformFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Personalization",
    description: "Intelligent recommendations based on your learning patterns and goals"
  },
  {
    icon: BookOpen,
    title: "Complete Scripture Library", 
    description: "Full texts with commentary, audio, and multiple translations"
  },
  {
    icon: Map,
    title: "Guided Learning Roadmaps",
    description: "Structured paths for every type of learner and experience level"
  },
  {
    icon: Sparkles,
    title: "Interactive Quiz System",
    description: "500+ questions across all difficulty levels with detailed explanations"
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Connect with fellow seekers and experienced teachers worldwide"
  },
  {
    icon: Globe,
    title: "Cross-Platform Access",
    description: "Learn anywhere, anytime on any device with seamless sync"
  }
];

const Index = () => {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  const handleGetStarted = () => {
    if (selectedProfile) {
      setShowAssessment(true);
    }
  };

  if (showAssessment) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-crimson font-bold mb-4">
              Welcome to Your Learning Journey
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's personalize your experience with a quick assessment
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-crimson">AI-Powered Assessment</CardTitle>
              <CardDescription>
                This brief quiz will help us understand your background and create the perfect learning path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-sunrise-gradient rounded-full flex items-center justify-center">
                  <Brain className="h-12 w-12 text-white" />
                </div>
                <p className="text-muted-foreground">
                  Assessment feature coming soon! For now, you can explore the platform with your selected profile.
                </p>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => setShowAssessment(false)}>
                  Go Back
                </Button>
                <Button variant="sacred" onClick={() => window.location.href = "/dashboard"}>
                  Continue to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sacred-pattern">
        <div className="absolute inset-0 bg-sunrise-gradient opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <VedaverseLogo size="lg" showText={false} className="mx-auto mb-4" />
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-crimson font-bold bg-sunrise-gradient bg-clip-text text-transparent">
                Vedaverse Ultimate
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The ultimate platform for learning Hindu scriptures. Ancient wisdom meets modern technology 
              with AI-powered personalization and expert guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="sacred" className="text-lg px-8 py-3">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="h-5 w-5 fill-secondary text-secondary" />
                <span>4.9/5 from 10,000+ learners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-elevated">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold font-crimson text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-crimson text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Sacred Texts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-crimson text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Quiz Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold font-crimson text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-crimson font-bold mb-4">
              Choose Your Learning Profile
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI adapts to your unique learning style and goals. Select the profile that best describes your approach to spiritual learning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {learningProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                {...profile}
                isSelected={selectedProfile === profile.id}
                onSelect={() => setSelectedProfile(profile.id)}
              />
            ))}
          </div>
          
          {selectedProfile && (
            <div className="text-center animate-fade-in-up">
              <Button size="lg" variant="sacred" onClick={handleGetStarted}>
                Continue with {learningProfiles.find(p => p.id === selectedProfile)?.title}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-elevated">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-crimson font-bold mb-4">
              Powerful Features for Deep Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master ancient wisdom with modern convenience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="hover-lift transition-sacred">
                <CardHeader>
                  <div className="w-12 h-12 bg-sunrise-gradient rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-crimson">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-crimson font-bold mb-4">
            Begin Your Sacred Journey Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of learners discovering the profound wisdom of Hindu scriptures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="sacred">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              View Curriculum
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <VedaverseLogo className="mx-auto mb-4" />
          <p className="text-muted-foreground">
            © 2025 Vedaverse Ultimate. Bridging ancient wisdom with modern learning.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
