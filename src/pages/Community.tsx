import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share, 
  Calendar,
  BookOpen,
  Award,
  Globe,
  Clock,
  TrendingUp,
  Plus,
  ChevronRight
} from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "Understanding Karma Yoga in Modern Context",
    author: "Priya Sharma",
    authorAvatar: "/api/placeholder/32/32",
    category: "Bhagavad Gita",
    replies: 23,
    likes: 45,
    lastActivity: "2 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "Sanskrit Pronunciation Practice Group",
    author: "Rahul Gupta", 
    authorAvatar: "/api/placeholder/32/32",
    category: "Language Learning",
    replies: 18,
    likes: 32,
    lastActivity: "5 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Daily Meditation Insights from Upanishads",
    author: "Sarah Williams",
    authorAvatar: "/api/placeholder/32/32", 
    category: "Upanishads",
    replies: 41,
    likes: 67,
    lastActivity: "1 day ago",
    isHot: true
  }
];

const studyGroups = [
  {
    id: 1,
    name: "Bhagavad Gita Study Circle",
    description: "Weekly deep-dive discussions on Krishna's teachings",
    members: 156,
    nextMeeting: "Tomorrow 7:00 PM EST",
    category: "Study Group",
    difficulty: "Intermediate"
  },
  {
    id: 2,
    name: "Sanskrit Beginners",
    description: "Learn Sanskrit script and basic vocabulary together",
    members: 89,
    nextMeeting: "Sunday 3:00 PM PST", 
    category: "Language",
    difficulty: "Beginner"
  },
  {
    id: 3,
    name: "Philosophy Debate Club",
    description: "Scholarly discussions on Vedantic philosophy",
    members: 203,
    nextMeeting: "Friday 6:00 PM GMT",
    category: "Philosophy", 
    difficulty: "Advanced"
  }
];

const events = [
  {
    id: 1,
    title: "Live Lecture: Advaita Vedanta Basics",
    speaker: "Dr. Rajesh Kumar",
    date: "Jan 25, 2025",
    time: "8:00 PM EST",
    attendees: 342,
    type: "Webinar"
  },
  {
    id: 2,
    title: "Community Quiz: Epic Literature",
    date: "Jan 27, 2025", 
    time: "7:00 PM PST",
    attendees: 128,
    type: "Competition"
  },
  {
    id: 3,
    title: "Virtual Temple Tour: Kedarnath",
    date: "Jan 30, 2025",
    time: "6:00 PM IST", 
    attendees: 567,
    type: "Virtual Tour"
  }
];

const teachers = [
  {
    id: 1,
    name: "Dr. Ananda Krishnan",
    title: "Vedantic Scholar",
    experience: "25+ years",
    specialties: ["Upanishads", "Advaita Vedanta"],
    rating: 4.9,
    students: 1247
  },
  {
    id: 2,
    name: "Swami Dharmananda",
    title: "Sanskrit Master",
    experience: "30+ years", 
    specialties: ["Sanskrit Grammar", "Vedic Chanting"],
    rating: 4.8,
    students: 856
  },
  {
    id: 3,
    name: "Prof. Lakshmi Devi",
    title: "Philosophy Professor",
    experience: "20+ years",
    specialties: ["Bhagavad Gita", "Applied Ethics"],
    rating: 4.9,
    students: 2341
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-crimson font-bold mb-2">
            Spiritual Community
          </h1>
          <p className="text-muted-foreground">
            Connect, learn, and grow with fellow seekers on the path of wisdom
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">12,847</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Study Groups</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">2,341</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">45</div>
              <div className="text-sm text-muted-foreground">Expert Teachers</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recent Discussions</h2>
                  <Button variant="sacred">
                    <Plus className="h-4 w-4 mr-2" />
                    New Discussion
                  </Button>
                </div>
                
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover-lift transition-sacred cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={discussion.authorAvatar} />
                          <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold hover:text-primary cursor-pointer">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <Badge className="bg-red-100 text-red-800">🔥 Hot</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <span>by {discussion.author}</span>
                            <Badge variant="outline">{discussion.category}</Badge>
                            <span>{discussion.lastActivity}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{discussion.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Karma Yoga", "Sanskrit Learning", "Meditation Practices", "Bhakti Traditions"].map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{topic}</span>
                        <Badge variant="secondary">{Math.floor(Math.random() * 50) + 10}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Community Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>• Respect diverse interpretations and traditions</p>
                    <p>• Practice compassion in all interactions</p>
                    <p>• Share knowledge generously while remaining humble</p>
                    <p>• Support fellow learners in their spiritual journey</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover-lift transition-sacred">
                  <CardHeader>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members} members</span>
                      </div>
                      <Badge className={
                        group.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        group.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {group.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{group.nextMeeting}</span>
                    </div>
                    
                    <Button variant="sacred" className="w-full">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="hover-lift transition-sacred">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                        {event.speaker && (
                          <p className="text-muted-foreground mb-2">Speaker: {event.speaker}</p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{event.attendees} registered</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>{event.type}</Badge>
                        <Button variant="sacred">Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="teachers">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <Card key={teacher.id} className="hover-lift transition-sacred">
                  <CardHeader className="text-center">
                    <Avatar className="mx-auto mb-4 w-16 h-16">
                      <AvatarImage src={`/api/placeholder/64/64`} />
                      <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <CardDescription>{teacher.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Award key={i} className="h-4 w-4 text-secondary fill-secondary" />
                        ))}
                        <span className="ml-2 text-sm font-medium">{teacher.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{teacher.experience} experience</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        {teacher.students.toLocaleString()} students taught
                      </p>
                      <Button variant="sacred" className="w-full">
                        Connect with Teacher
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;