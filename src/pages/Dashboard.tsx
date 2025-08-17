import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Target, 
  Flame, 
  Clock, 
  TrendingUp, 
  Brain,
  Heart,
  Award,
  ArrowRight,
  Play,
  CheckCircle
} from "lucide-react";

const recentActivity = [
  {
    title: "Completed: Bhagavad Gita Chapter 2",
    description: "Sankhya Yoga - The Path of Knowledge",
    time: "2 hours ago",
    type: "completed",
    icon: CheckCircle
  },
  {
    title: "Quiz Score: 85% in Upanishads Basics",
    description: "Advanced concepts mastery",
    time: "1 day ago", 
    type: "quiz",
    icon: Brain
  },
  {
    title: "Started: Rigveda Introduction",
    description: "Foundation of Vedic knowledge",
    time: "3 days ago",
    type: "started", 
    icon: Play
  }
];

const currentGoals = [
  {
    title: "Complete Bhagavad Gita",
    progress: 65,
    target: "18 chapters",
    current: "12 chapters"
  },
  {
    title: "Master Sanskrit Basics", 
    progress: 30,
    target: "100 words",
    current: "30 words"
  },
  {
    title: "Daily Practice Streak",
    progress: 85,
    target: "30 days",
    current: "26 days"
  }
];

const aiInsights = [
  {
    type: "strength",
    title: "Philosophical Concepts",
    description: "You excel at understanding abstract philosophical ideas"
  },
  {
    type: "suggestion", 
    title: "Audio Learning",
    description: "Try Sanskrit pronunciation practice to enhance your learning"
  },
  {
    type: "opportunity",
    title: "Community Engagement", 
    description: "Join discussion groups to deepen your understanding"
  }
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-crimson font-bold mb-2">
            Welcome back, Spiritual Seeker! 🙏
          </h1>
          <p className="text-muted-foreground">
            Continue your journey through ancient wisdom. You're making excellent progress!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Score"
            value="2,847"
            icon={Award}
            description="Points earned from learning"
            trend={{ value: 12, isPositive: true }}
            variant="sacred"
          />
          <StatsCard
            title="Learning Streak"
            value="26 days"
            icon={Flame}
            description="Consecutive learning days"
            trend={{ value: 8, isPositive: true }}
            variant="wisdom"
          />
          <StatsCard
            title="Texts Explored"
            value="7"
            icon={BookOpen}
            description="Scriptures studied"
            variant="devotional"
          />
          <StatsCard
            title="Study Time"
            value="142h"
            icon={Clock}
            description="Total learning hours"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription>
                  Pick up where you left off in your spiritual journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-elevated rounded-lg">
                  <div className="w-16 h-16 bg-sunrise-gradient rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Bhagavad Gita - Chapter 3</h3>
                    <p className="text-sm text-muted-foreground">Karma Yoga - The Path of Action</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={65} className="flex-1" />
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                  </div>
                  <Button variant="sacred">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Current Goals
                </CardTitle>
                <CardDescription>
                  Track your progress towards spiritual milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'completed' ? 'bg-green-100 text-green-600' :
                      activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Insights
                </CardTitle>
                <CardDescription>
                  Personalized recommendations for your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-3 bg-elevated rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={
                        insight.type === 'strength' ? 'default' :
                        insight.type === 'suggestion' ? 'secondary' : 'outline'
                      }>
                        {insight.type === 'strength' ? '💪' : 
                         insight.type === 'suggestion' ? '💡' : '📈'} 
                        {insight.type}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Library
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Brain className="mr-2 h-4 w-4" />
                  Take Quiz
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;