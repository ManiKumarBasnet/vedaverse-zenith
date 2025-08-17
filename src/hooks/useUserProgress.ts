import { useLocalStorage } from './useLocalStorage';

interface UserProgress {
  totalScore: number;
  learningStreak: number;
  textsExplored: number;
  studyTime: number; // in minutes
  completedLessons: string[];
  quizScores: { [category: string]: number[] };
  currentRoadmap: string | null;
  roadmapProgress: { [roadmapId: string]: number };
  lastStudyDate: string | null;
  achievements: string[];
  bookmarks: string[];
  notes: { [textId: string]: string };
}

const initialProgress: UserProgress = {
  totalScore: 0,
  learningStreak: 0,
  textsExplored: 0,
  studyTime: 0,
  completedLessons: [],
  quizScores: {},
  currentRoadmap: null,
  roadmapProgress: {},
  lastStudyDate: null,
  achievements: [],
  bookmarks: [],
  notes: {}
};

export function useUserProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('vedaverse-progress', initialProgress);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setProgress(prev => ({ ...prev, ...updates }));
  };

  const addScore = (points: number) => {
    setProgress(prev => ({
      ...prev,
      totalScore: prev.totalScore + points
    }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      studyTime: prev.studyTime + 15 // Assume 15 minutes per lesson
    }));
  };

  const updateQuizScore = (category: string, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [category]: [...(prev.quizScores[category] || []), score]
      },
      totalScore: prev.totalScore + score
    }));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    setProgress(prev => {
      if (prev.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = prev.lastStudyDate === yesterday.toDateString();
        
        return {
          ...prev,
          learningStreak: wasYesterday ? prev.learningStreak + 1 : 1,
          lastStudyDate: today
        };
      }
      return prev;
    });
  };

  const setRoadmap = (roadmapId: string) => {
    setProgress(prev => ({
      ...prev,
      currentRoadmap: roadmapId,
      roadmapProgress: {
        ...prev.roadmapProgress,
        [roadmapId]: prev.roadmapProgress[roadmapId] || 0
      }
    }));
  };

  const updateRoadmapProgress = (roadmapId: string, progressPercent: number) => {
    setProgress(prev => ({
      ...prev,
      roadmapProgress: {
        ...prev.roadmapProgress,
        [roadmapId]: progressPercent
      }
    }));
  };

  const addAchievement = (achievementId: string) => {
    setProgress(prev => ({
      ...prev,
      achievements: [...new Set([...prev.achievements, achievementId])]
    }));
  };

  return {
    progress,
    updateProgress,
    addScore,
    completeLesson,
    updateQuizScore,
    updateStreak,
    setRoadmap,
    updateRoadmapProgress,
    addAchievement
  };
}