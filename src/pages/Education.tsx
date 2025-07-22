import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  Clock, 
  User, 
  Star,
  Search,
  TrendingUp,
  PieChart,
  BarChart3,
  Target
} from "lucide-react";
import { useEducationData } from "@/hooks/useSupabaseData";

const Education = () => {
  const { courses, articles, loading } = useEducationData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">데이터를 불러오는 중...</div>
        </div>
      </DashboardLayout>
    );
  }

  const tools = [
    {
      name: "수익률 계산기",
      description: "투자 수익률과 복리 효과를 계산해보세요",
      icon: <BarChart3 className="w-6 h-6" />,
      category: "계산기"
    },
    {
      name: "포트폴리오 시뮬레이터",
      description: "다양한 자산 배분으로 포트폴리오를 시뮬레이션해보세요",
      icon: <PieChart className="w-6 h-6" />,
      category: "시뮬레이션"
    },
    {
      name: "리스크 평가 도구",
      description: "투자 성향과 위험 허용도를 평가해보세요",
      icon: <Target className="w-6 h-6" />,
      category: "평가"
    },
    {
      name: "목표 설정 가이드",
      description: "SMART 원칙에 따른 투자 목표 설정을 도와드립니다",
      icon: <TrendingUp className="w-6 h-6" />,
      category: "계획"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "초급": return "bg-success text-success-foreground";
      case "중급": return "bg-warning text-warning-foreground";
      case "고급": return "bg-destructive text-destructive-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">학습 자료</h1>
            <p className="text-muted-foreground">투자 지식을 늘리고 전문성을 키워보세요</p>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="강의나 아티클 검색..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">강의</TabsTrigger>
            <TabsTrigger value="articles">아티클</TabsTrigger>
            <TabsTrigger value="tools">도구</TabsTrigger>
            <TabsTrigger value="progress">학습 현황</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <Card key={course.id} className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-2 mb-2">{course.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                      </div>
                      <Badge className={getLevelColor(course.level)} variant="secondary">
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {course.instructor}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{Number(course.rating)}</span>
                          <span className="text-muted-foreground">(수강생)</span>
                        </div>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        {course.price === "무료" ? "무료 학습" : `${course.price} - 학습 시작`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid gap-4">
              {articles.map((article, index) => (
                <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                          <Badge variant="outline">{article.category}</Badge>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {tools.map((tool, index) => (
                <Card key={index} className="bg-gradient-card shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {tool.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                        <p className="text-muted-foreground mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{tool.category}</Badge>
                          <Button variant="outline" size="sm">
                            사용하기
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">완료한 강의</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">3개</div>
                  <p className="text-sm text-muted-foreground">총 12시간 학습</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">진행 중인 강의</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">2개</div>
                  <p className="text-sm text-muted-foreground">평균 진행률 52%</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">이번 주 학습</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">4시간</div>
                  <p className="text-sm text-muted-foreground">목표: 5시간</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>학습 기록</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.filter(course => course.progress > 0).map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 rounded-lg bg-background">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{course.progress}%</div>
                        <div className="text-sm text-muted-foreground">완료</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Education;