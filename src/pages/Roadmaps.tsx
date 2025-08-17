import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/contexts/AppContext";
import { 
  Map, 
  Clock, 
  Users, 
  CheckCircle, 
  Play,
  Lock,
  ArrowRight,
  Star,
  Sprout,
  GraduationCap,
  Heart,
  Target
} from "lucide-react";

const roadmaps = [
  {
    id: "beginner",
    title: "Complete Beginner Journey",
    description: "Perfect introduction to Hindu scriptures for newcomers",
    duration: "3-6 months",
    phases: 3,
    lessons: 24,
    difficulty: 1,
    icon: Sprout,
    color: "bg-green-100 text-green-800",
    participants: 12847,
    progress: 0
  },
  {
    id: "philosophy",
    title: "Philosophy & Wisdom Seeker",
    description: "Deep philosophical study and scholarly exploration",
    duration: "6-12 months", 
    phases: 4,
    lessons: 48,
    difficulty: 4,
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-800",
    participants: 5623,
    progress: 0
  },
  {
    id: "devotional",
    title: "Devotional Heart Path",
    description: "Cultivating divine love and spiritual practice",
    duration: "4-8 months",
    phases: 3,
    lessons: 36,
    difficulty: 2,
    icon: Heart,
    color: "bg-red-100 text-red-800", 
    participants: 8934,
    progress: 65
  },
  {
    id: "practical",
    title: "Practical Wisdom for Modern Life",
    description: "Applying ancient teachings to contemporary challenges",
    duration: "2-4 months",
    phases: 2,
    lessons: 16,
    difficulty: 2,
    icon: Target,
    color: "bg-blue-100 text-blue-800",
    participants: 15672,
    progress: 0
  }
];

const phases = [
  {
    id: 1,
    title: "Foundation",
    description: "Understanding basic concepts and building vocabulary",
    weeks: "1-2",
    lessons: [
      { title: "What is Hinduism?", duration: "15 min", completed: true },
      { title: "Scripture Overview", duration: "20 min", completed: true },
      { title: "Key Concepts & Terms", duration: "25 min", completed: false },
      { title: "Timeline Understanding", duration: "20 min", completed: false }
    ]
  },
  {
    id: 2,
    title: "Exploration", 
    description: "Exploring each text type and finding what resonates",
    weeks: "3-8",
    lessons: [
      { title: "Vedas Introduction", duration: "30 min", completed: false },
      { title: "Upanishads Basics", duration: "35 min", completed: false },
      { title: "Epic Stories", duration: "40 min", completed: false },
      { title: "Puranic Wisdom", duration: "30 min", completed: false }
    ]
  },
  {
    id: 3,
    title: "Integration",
    description: "Connecting concepts and applying in daily life", 
    weeks: "9-12",
    lessons: [
      { title: "Synthesis Projects", duration: "45 min", completed: false },
      { title: "Daily Practice", duration: "20 min", completed: false },
      { title: "Community Engagement", duration: "25 min", completed: false },
      { title: "Next Steps Planning", duration: "15 min", completed: false }
    ]
  }
];

const Roadmaps = () => {
  const { userProgress, showToast } = useAppContext();

  const startRoadmap = (roadmapId: string) => {
    userProgress.setRoadmap(roadmapId);
    showToast({
      title: "Roadmap Started!",
      description: `Beginning your journey with ${roadmaps.find(r => r.id === roadmapId)?.title}`,
    });
  };

  const continueRoadmap = (roadmapId: string) => {
    userProgress.setRoadmap(roadmapId);
    showToast({
      title: "Continuing Journey",
      description: `Resuming your ${roadmaps.find(r => r.id === roadmapId)?.title} path`,
    });
  };

  // Update roadmap progress from user data
  const updatedRoadmaps = roadmaps.map(roadmap => ({
    ...roadmap,
    progress: userProgress.progress.roadmapProgress[roadmap.id] || roadmap.progress
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-crimson font-bold mb-2">
            Guided Learning Roadmaps
          </h1>
          <p className="text-muted-foreground">
            Structured learning paths designed for your spiritual journey, from beginner to advanced levels
          </p>
        </div>

        {/* Roadmap Selection */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {updatedRoadmaps.map((roadmap) => (
            <Card key={roadmap.id} className="hover-lift transition-sacred">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${roadmap.color.split(' ')[0]}-100`}>
                    <roadmap.icon className="h-6 w-6" />
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < roadmap.difficulty ? "text-secondary fill-secondary" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-xl font-crimson">{roadmap.title}</CardTitle>
                <CardDescription>{roadmap.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{roadmap.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4 text-muted-foreground" />
                    <span>{roadmap.phases} phases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-muted-foreground" />
                    <span>{roadmap.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{roadmap.participants.toLocaleString()} learners</span>
                  </div>
                </div>

                {roadmap.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{roadmap.progress}%</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-2" />
                  </div>
                )}

                <div className="flex gap-2">
                  {roadmap.progress > 0 ? (
                    <Button variant="sacred" className="flex-1" onClick={() => continueRoadmap(roadmap.id)}>
                      Continue Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button variant="sacred" className="flex-1" onClick={() => startRoadmap(roadmap.id)}>
                      Start Roadmap
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline">
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Phase Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Devotional Heart Path - Detailed Breakdown
            </CardTitle>
            <CardDescription>
              Your current roadmap with phase-by-phase progression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <div key={phase.id} className="relative">
                  {index < phases.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      phase.id === 1 ? 'bg-green-100 text-green-600' :
                      phase.id === 2 ? 'bg-blue-100 text-blue-600' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {phase.id === 1 ? <CheckCircle className="h-6 w-6" /> :
                       phase.id === 2 ? <Play className="h-6 w-6" /> :
                       <Lock className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">Phase {phase.id}: {phase.title}</h3>
                        <Badge variant="outline">Weeks {phase.weeks}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{phase.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {phase.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className={`p-3 rounded-lg border ${
                            lesson.completed ? 'bg-green-50 border-green-200' :
                            phase.id === 2 && lessonIndex === 0 ? 'bg-blue-50 border-blue-200' :
                            'bg-muted/30 border-border'
                          }`}>
                            <div className="flex items-center gap-3">
                              <div className={`p-1 rounded-full ${
                                lesson.completed ? 'bg-green-100 text-green-600' :
                                phase.id === 2 && lessonIndex === 0 ? 'bg-blue-100 text-blue-600' :
                                'bg-muted text-muted-foreground'
                              }`}>
                                {lesson.completed ? <CheckCircle className="h-4 w-4" /> :
                                 phase.id === 2 && lessonIndex === 0 ? <Play className="h-4 w-4" /> :
                                 <Lock className="h-4 w-4" />}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{lesson.title}</h4>
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Overall Progress</h4>
                  <p className="text-sm text-muted-foreground">8 of 12 lessons completed</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">67%</div>
                  <Progress value={67} className="w-32 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmaps;