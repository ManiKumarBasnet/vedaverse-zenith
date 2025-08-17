import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

interface Scripture {
  id: string;
  title: string;
  description: string;
  verses: number;
  category: string;
}

interface ScriptureReaderProps {
  scripture: Scripture;
  onBack: () => void;
}

// Sample content for demonstration
const sampleContent = {
  chapters: [
    {
      id: 1,
      title: "Chapter 1: Arjuna's Dilemma",
      verses: [
        {
          id: 1,
          sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |",
          transliteration: "dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |",
          translation: "Dhritarashtra said: O Sanjaya, after my sons and the sons of Pandu assembled in the place of pilgrimage at Kurukshetra, desiring to fight, what did they do?",
          commentary: "This opening verse establishes the setting of the Bhagavad Gita - the battlefield of Kurukshetra, which is also called dharma-kshetra (field of dharma), indicating that this will be a discourse on righteousness and duty."
        },
        {
          id: 2,
          sanskrit: "मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१॥",
          transliteration: "māmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ॥1॥",
          translation: "What did my people and the sons of Pandu do, O Sanjaya?",
          commentary: "Dhritarashtra's use of 'mamakah' (my people) reveals his attachment and partiality, which will contrast with Krishna's teachings on detachment."
        }
      ]
    }
  ]
};

export function ScriptureReader({ scripture, onBack }: ScriptureReaderProps) {
  const { userProgress, showToast } = useAppContext();
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showCommentary, setShowCommentary] = useState(true);
  const [fontSize, setFontSize] = useState('text-base');

  const chapter = sampleContent.chapters[currentChapter];
  const verse = chapter.verses[currentVerse];
  const totalVerses = sampleContent.chapters.reduce((acc, ch) => acc + ch.verses.length, 0);
  const currentVerseGlobal = currentChapter * chapter.verses.length + currentVerse + 1;
  const progress = (currentVerseGlobal / totalVerses) * 100;

  const handleBookmark = () => {
    showToast({
      title: "Verse Bookmarked",
      description: `${scripture.title} - Chapter ${currentChapter + 1}, Verse ${currentVerse + 1}`,
    });
  };

  const handleShare = () => {
    const shareText = `"${verse.translation}" - ${scripture.title}, Chapter ${currentChapter + 1}, Verse ${currentVerse + 1}`;
    if (navigator.share) {
      navigator.share({
        title: scripture.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      showToast({
        title: "Copied to Clipboard",
        description: "Verse has been copied to your clipboard.",
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    showToast({
      title: isAudioPlaying ? "Audio Paused" : "Audio Playing",
      description: `Sanskrit recitation ${isAudioPlaying ? 'paused' : 'started'}`,
    });
  };

  const nextVerse = () => {
    if (currentVerse < chapter.verses.length - 1) {
      setCurrentVerse(currentVerse + 1);
    } else if (currentChapter < sampleContent.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
      setCurrentVerse(0);
    }
    userProgress.updateStreak();
  };

  const previousVerse = () => {
    if (currentVerse > 0) {
      setCurrentVerse(currentVerse - 1);
    } else if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
      setCurrentVerse(sampleContent.chapters[currentChapter - 1].verses.length - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border shadow-gentle">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
              <div>
                <h1 className="text-xl font-crimson font-bold">{scripture.title}</h1>
                <p className="text-sm text-muted-foreground">{chapter.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={toggleAudio}>
                {isAudioPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Verse {currentVerse + 1}
              </CardTitle>
              <Badge variant="outline">
                Chapter {currentChapter + 1} of {sampleContent.chapters.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sanskrit Text */}
            <div className="text-center">
              <div className={`font-sanskrit ${fontSize} leading-relaxed text-primary mb-4`}>
                {verse.sanskrit}
              </div>
              
              {showTransliteration && (
                <div className={`${fontSize} text-muted-foreground italic mb-4`}>
                  {verse.transliteration}
                </div>
              )}
            </div>

            {/* Translation */}
            <div className={`${fontSize} leading-relaxed bg-elevated p-6 rounded-lg`}>
              <h3 className="font-semibold mb-2">Translation:</h3>
              <p>{verse.translation}</p>
            </div>

            {/* Commentary */}
            {showCommentary && (
              <div className={`${fontSize} leading-relaxed bg-muted/50 p-6 rounded-lg`}>
                <h3 className="font-semibold mb-2">Commentary:</h3>
                <p>{verse.commentary}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={previousVerse}
            disabled={currentChapter === 0 && currentVerse === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Verse {currentVerseGlobal} of {totalVerses}
          </div>
          
          <Button 
            variant="sacred" 
            onClick={nextVerse}
            disabled={currentChapter === sampleContent.chapters.length - 1 && 
                     currentVerse === chapter.verses.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Reading Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Reading Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Font Size:</label>
              <select 
                value={fontSize} 
                onChange={(e) => setFontSize(e.target.value)}
                className="px-2 py-1 border border-input rounded text-sm"
              >
                <option value="text-sm">Small</option>
                <option value="text-base">Medium</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
              </select>
            </div>
            
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={showTransliteration}
                onChange={(e) => setShowTransliteration(e.target.checked)}
              />
              Show Transliteration
            </label>
            
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={showCommentary}
                onChange={(e) => setShowCommentary(e.target.checked)}
              />
              Show Commentary
            </label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}