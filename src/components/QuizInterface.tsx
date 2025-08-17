import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, Star, ChevronRight, X, Trophy } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  explanation: string;
}

interface QuizInterfaceProps {
  category: {
    id: string;
    title: string;
    questions: number;
    difficulty: number;
    timeLimit: number;
    points: number;
    color: string;
  };
  onExit: () => void;
}

// Sample questions for demonstration
const sampleQuestions: { [key: string]: Question[] } = {
  general: [
    {
      id: "1",
      question: "What is the main teaching of the Bhagavad Gītā?",
      options: [
        "The importance of performing one's duty without attachment to results",
        "The supremacy of devotional worship over other spiritual practices",
        "The need to renounce the world completely for spiritual growth",
        "The historical accounts of ancient Indian kingdoms"
      ],
      correctAnswer: 0,
      difficulty: 2,
      explanation: "The Bhagavad Gītā emphasizes performing one's dharma (duty) without attachment to the fruits of action (karma yoga)."
    },
    {
      id: "2", 
      question: "Which Veda is known for its musical chants and melodies?",
      options: ["Rigveda", "Yajurveda", "Samaveda", "Atharvaveda"],
      correctAnswer: 2,
      difficulty: 2,
      explanation: "The Samaveda is known as the Veda of melodies and musical chants used in religious ceremonies."
    }
  ],
  advanced: [
    {
      id: "adv1",
      question: "In Advaita Vedanta, what does 'Tat tvam asi' mean?",
      options: [
        "That art thou",
        "I am Brahman", 
        "All is one",
        "Truth alone triumphs"
      ],
      correctAnswer: 0,
      difficulty: 4,
      explanation: "'Tat tvam asi' (That art thou) is one of the Mahāvākyas declaring the fundamental identity between individual consciousness and universal consciousness."
    }
  ]
};

export function QuizInterface({ category, onExit }: QuizInterfaceProps) {
  const { userProgress, showToast } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(category.timeLimit);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = sampleQuestions[category.id] || sampleQuestions.general;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setShowExplanation(true);
    showToast({
      title: "Time's up!",
      description: "Moving to next question...",
      variant: "destructive"
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      const points = category.points + (timeLeft * 2); // Bonus for speed
      setScore(score + points);
      userProgress.addScore(points);
      showToast({
        title: "Correct! 🎉",
        description: `+${points} points (including speed bonus)`,
        variant: "default"
      });
    } else {
      showToast({
        title: "Incorrect",
        description: "Don't worry, keep learning!",
        variant: "destructive"
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
      setTimeLeft(category.timeLimit);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      userProgress.updateQuizScore(category.id, score);
      userProgress.updateStreak();
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / (questions.length * category.points)) * 100);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-sunrise-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-crimson">Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-primary">{score}</div>
            <div className="text-muted-foreground">Total Points Earned</div>
            <div className="text-2xl font-semibold">{percentage}%</div>
            <Progress value={percentage} className="w-full" />
            <div className="space-y-2">
              <Button variant="sacred" className="w-full" onClick={onExit}>
                Continue Learning
              </Button>
              <Button variant="outline" className="w-full">
                Review Answers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div>
                <CardTitle className="text-2xl font-crimson">{category.title} Quiz</CardTitle>
                <p className="text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
              <Button variant="ghost" onClick={onExit}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full" />
          </CardHeader>
        </Card>

        {/* Quiz Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <Badge className={category.color}>
                {[...Array(currentQuestion.difficulty)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </Badge>
              <div className={`flex items-center gap-2 ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
                <Timer className="h-4 w-4" />
                <span className="text-lg font-bold">{timeLeft}s</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left border rounded-lg transition-colors";
                  
                  if (isAnswered) {
                    if (index === currentQuestion.correctAnswer) {
                      buttonClass += " bg-green-50 border-green-300 text-green-800";
                    } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
                      buttonClass += " bg-red-50 border-red-300 text-red-800";
                    } else {
                      buttonClass += " bg-muted/30 border-border text-muted-foreground";
                    }
                  } else {
                    buttonClass += " border-border hover:bg-muted cursor-pointer";
                  }

                  return (
                    <button
                      key={index}
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showExplanation && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Score: <span className="font-semibold">{score}</span>
              </div>
              {isAnswered && (
                <Button variant="sacred" onClick={handleNextQuestion}>
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}