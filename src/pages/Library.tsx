import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ScriptureCard } from "@/components/ScriptureCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  BookOpen, 
  Volume2,
  Star,
  Download,
  Heart,
  Eye
} from "lucide-react";

const scriptures = [
  {
    id: "bhagavad-gita",
    title: "Bhagavad Gītā",
    description: "The eternal dialogue between Prince Arjuna and Lord Krishna on the battlefield of life",
    verses: 700,
    estimatedTime: "25-30 hours",
    difficulty: 4,
    category: "Epics" as const,
    progress: 65,
    popularity: 95
  },
  {
    id: "rigveda",
    title: "Rigveda",
    description: "The oldest of the Vedas, containing hymns of praise and philosophical insights",
    verses: 1028,
    estimatedTime: "80+ hours", 
    difficulty: 5,
    category: "Vedas" as const,
    progress: 12,
    popularity: 78
  },
  {
    id: "isha-upanishad",
    title: "Īśāvāsya Upanishad",
    description: "A profound meditation on the divine presence in all of creation",
    verses: 18,
    estimatedTime: "2-3 hours",
    difficulty: 3,
    category: "Upanishads" as const,
    progress: 0,
    popularity: 89
  },
  {
    id: "ramayana",
    title: "Rāmāyaṇa",
    description: "The epic journey of Prince Rama, embodying dharma and devotion",
    verses: 24000,
    estimatedTime: "120+ hours",
    difficulty: 4,
    category: "Epics" as const,
    progress: 0,
    popularity: 92
  },
  {
    id: "katha-upanishad",
    title: "Kaṭha Upanishad", 
    description: "The timeless dialogue between young Nachiketa and Death himself",
    verses: 119,
    estimatedTime: "8-10 hours",
    difficulty: 4,
    category: "Upanishads" as const,
    progress: 0,
    popularity: 85
  },
  {
    id: "bhagavata-purana",
    title: "Bhāgavata Purāṇa",
    description: "Stories of divine love and the supreme devotion to Lord Krishna",
    verses: 18000,
    estimatedTime: "100+ hours",
    difficulty: 3,
    category: "Puranas" as const,
    progress: 0,
    popularity: 88
  }
];

const categories = ["All", "Vedas", "Upanishads", "Epics", "Puranas"];
const sortOptions = ["Popularity", "Difficulty", "Length", "Recently Added"];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popularity");

  const filteredScriptures = scriptures
    .filter(scripture => 
      (selectedCategory === "All" || scripture.category === selectedCategory) &&
      (searchTerm === "" || 
       scripture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       scripture.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "Popularity":
          return b.popularity - a.popularity;
        case "Difficulty":
          return a.difficulty - b.difficulty;
        case "Length":
          return a.verses - b.verses;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-crimson font-bold mb-2">
            Sacred Scripture Library
          </h1>
          <p className="text-muted-foreground">
            Explore the vast collection of Hindu scriptures with expert commentary and guidance
          </p>
        </div>

        {/* Library Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Sacred Texts</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">Verses</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Languages</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Access</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Your Perfect Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search scriptures, topics, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>Sort by {option}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Content */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Texts</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="beginner">Beginner Friendly</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScriptures.map((scripture) => (
                <ScriptureCard
                  key={scripture.id}
                  {...scripture}
                  onStart={() => console.log(`Starting ${scripture.title}`)}
                  onContinue={() => console.log(`Continuing ${scripture.title}`)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  AI-Curated Recommendations
                </CardTitle>
                <CardDescription>
                  Based on your learning profile and progress, here are the perfect texts for your journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScriptures.slice(0, 3).map((scripture) => (
                    <ScriptureCard
                      key={scripture.id}
                      {...scripture}
                      onStart={() => console.log(`Starting ${scripture.title}`)}
                      onContinue={() => console.log(`Continuing ${scripture.title}`)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScriptures
                .sort((a, b) => b.popularity - a.popularity)
                .map((scripture) => (
                  <ScriptureCard
                    key={scripture.id}
                    {...scripture}
                    onStart={() => console.log(`Starting ${scripture.title}`)}
                    onContinue={() => console.log(`Continuing ${scripture.title}`)}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="beginner" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScriptures
                .filter(scripture => scripture.difficulty <= 3)
                .map((scripture) => (
                  <ScriptureCard
                    key={scripture.id}
                    {...scripture}
                    onStart={() => console.log(`Starting ${scripture.title}`)}
                    onContinue={() => console.log(`Continuing ${scripture.title}`)}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="hover-lift transition-sacred">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                Audio Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Listen to professional Sanskrit recitations and English explanations
              </p>
              <Button variant="outline" className="w-full">
                Browse Audio Content
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-sacred">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Offline Reading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Download texts for offline study and contemplation
              </p>
              <Button variant="outline" className="w-full">
                Download Texts
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-lift transition-sacred">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Favorites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Save your favorite verses and passages for easy access
              </p>
              <Button variant="outline" className="w-full">
                View Saved Items
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Library;