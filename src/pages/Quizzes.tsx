import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Star, 
  Timer, 
  Trophy, 
  Target,
  ChevronRight,
  Award,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Globe,
  Zap
} from "lucide-react";

const quizCategories = [
  {
    id: "general",
    title: "General Knowledge",
    description: "Basic concepts, text identification, key teachings",
    questions: 50,
    difficulty: 2,
    timeLimit: 30,
    points: 10,
    icon: BookOpen,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "advanced",
    title: "Advanced Concepts", 
    description: "Complex philosophy, Sanskrit terminology, scholarly interpretations",
    questions: 40,
    difficulty: 4,
    timeLimit: 45,
    points: 20,
    icon: Brain,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "practical",
    title: "Practical Application",
    description: "Ethics, meditation, ritual understanding, modern relevance",
    questions: 35,
    difficulty: 3,
    timeLimit: 30,
    points: 15,
    icon: Target,
    color: "bg-green-100 text-green-800"
  },
  {
    id: "cultural",
    title: "Cultural Context",
    description: "Festivals, traditions, regional variations, historical context",
    questions: 30,
    difficulty: 2,
    timeLimit: 25,
    points: 10,
    icon: Globe,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: "expert",
    title: "Expert Challenge",
    description: "Rare texts, complex interpretations, advanced Sanskrit",
    questions: 25,
    difficulty: 5,
    timeLimit: 60,
    points: 50,
    icon: Zap,
    color: "bg-red-100 text-red-800"
  }
];

const recentScores = [
  { category: "General Knowledge", score: 85, maxScore: 100, date: "2 days ago" },
  { category: "Practical Application", score: 78, maxScore: 100, date: "1 week ago" },
  { category: "Cultural Context", score: 92, maxScore: 100, date: "2 weeks ago" }
];

const achievements = [
  { title: "First Perfect Score", description: "Scored 100% in any category", earned: true },
  { title: "Knowledge Explorer", description: "Completed quizzes in all categories", earned: true },
  { title: "Speed Demon", description: "Answer 10 questions in under 2 minutes", earned: false },
  { title: "Wisdom Seeker", description: "Attempt 100 quiz questions", earned: true }
];

const Quizzes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);

  const startQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsQuizActive(true);
  };

  if (isQuizActive && selectedCategory) {
    const category = quizCategories.find(c => c.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-crimson">
                {category?.title} Quiz
              </CardTitle>
              <CardDescription>
                Question 1 of {category?.questions}
              </CardDescription>
              <Progress value={2} className="w-full mt-4" />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge className={category?.color}>{category?.difficulty} Stars</Badge>
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span className="text-sm font-medium">29s</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  What is the main teaching of the Bhagavad Gītā?
                </h3>
                
                <div className="space-y-3">
                  {[
                    "The importance of performing one's duty without attachment to results",
                    "The supremacy of devotional worship over other spiritual practices", 
                    "The need to renounce the world completely for spiritual growth",
                    "The historical accounts of ancient Indian kingdoms"
                  ].map((option, index) => (
                    <button
                      key={index}
                      className="w-full p-4 text-left border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border border-border rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsQuizActive(false)}>
                  Exit Quiz
                </Button>
                <Button variant="sacred">
                  Next Question
                  <ChevronRight className="ml-2 h-4 w-4" />
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-crimson font-bold mb-2">
            Interactive Quiz System
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge with 500+ carefully crafted questions across all difficulty levels
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-sunrise-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-consciousness-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Questions Answered</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-devotion-gradient rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">82%</div>
              <div className="text-sm text-muted-foreground">Average Accuracy</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categories">Quiz Categories</TabsTrigger>
            <TabsTrigger value="scores">Recent Scores</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizCategories.map((category) => (
                <Card key={category.id} className="hover-lift transition-sacred">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${category.color.split(' ')[0]}-100`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < category.difficulty ? "text-secondary fill-secondary" : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-crimson">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-muted-foreground" />
                        <span>{category.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="h-4 w-4 text-muted-foreground" />
                        <span>{category.timeLimit}s per question</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                        <span>{category.points} points each</span>
                      </div>
                      <Badge className={category.color}>
                        {category.difficulty} Star{category.difficulty > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    <Button 
                      variant="sacred" 
                      className="w-full"
                      onClick={() => startQuiz(category.id)}
                    >
                      Start Quiz
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Performance
                </CardTitle>
                <CardDescription>
                  Track your progress and identify areas for improvement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentScores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-elevated rounded-lg">
                    <div>
                      <h4 className="font-medium">{score.category}</h4>
                      <p className="text-sm text-muted-foreground">{score.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {score.score}/{score.maxScore}
                      </div>
                      <div className={`text-sm ${
                        score.score >= 90 ? 'text-green-600' :
                        score.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {Math.round((score.score / score.maxScore) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  View All Scores
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements & Badges
                </CardTitle>
                <CardDescription>
                  Unlock achievements as you progress in your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border ${
                    achievement.earned ? 'bg-green-50 border-green-200' : 'bg-muted/30 border-border'
                  }`}>
                    <div className={`p-2 rounded-full ${
                      achievement.earned ? 'bg-green-100 text-green-600' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-muted-foreground'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-green-100 text-green-800">Earned</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Quizzes;