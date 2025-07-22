import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EditableCard } from "@/components/EditableCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp,
  DollarSign,
  Clock,
  Home,
  GraduationCap,
  Plane
} from "lucide-react";
import { useGoalsData } from "@/hooks/useSupabaseData";

const Goals = () => {
  const { goals: investmentGoals, loading } = useGoalsData();
  const [mainGoal, setMainGoal] = useState("5년 내 1억원 달성으로 내 집 마련하기");
  const [goalStrategy, setGoalStrategy] = useState(`월 200만원 적립식 투자
- 국내주식 50%
- 해외주식 30% 
- 채권 20%
연평균 8% 수익률 목표`);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">데이터를 불러오는 중...</div>
        </div>
      </DashboardLayout>
    );
  }

  const calculateMonthsRemaining = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - now.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const calculateProjectedAmount = (current: number, monthly: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    const futureValue = current * Math.pow(1 + monthlyRate, months) + 
                       monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return futureValue;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">투자 목표</h1>
            <p className="text-muted-foreground">투자 목표를 설정하고 진행 상황을 추적하세요</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            목표 추가
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Goal */}
          <EditableCard
            title="주요 투자 목표"
            content={mainGoal}
            onSave={setMainGoal}
            placeholder="주요 투자 목표를 설정하세요..."
          />

          {/* Investment Strategy */}
          <EditableCard
            title="투자 전략"
            content={goalStrategy}
            onSave={setGoalStrategy}
            isTextArea={true}
            placeholder="투자 전략을 작성하세요..."
          />

          {/* Overall Progress */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                전체 진행률
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">62%</div>
                <p className="text-sm text-muted-foreground mb-4">평균 목표 달성률</p>
                <Progress value={62} className="h-3" />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">달성한 목표</span>
                  <span className="font-medium">1개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">진행 중인 목표</span>
                  <span className="font-medium">3개</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Goals List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">투자 목표 현황</h2>
          
          {investmentGoals.map((goal) => {
            const monthsRemaining = calculateMonthsRemaining(goal.target_date);
            const projectedAmount = calculateProjectedAmount(
              Number(goal.current_amount), 
              2000000, // 예시 월 적립액
              8, // 예시 기대 수익률
              monthsRemaining
            );
            const onTrack = projectedAmount >= Number(goal.target_amount);

            return (
              <Card key={goal.id} className="bg-gradient-card shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {goal.category === "주택구입" && <Home className="w-5 h-5" />}
                      {goal.category === "교육" && <GraduationCap className="w-5 h-5" />}
                      {goal.category === "은퇴준비" && <Target className="w-5 h-5" />}
                      {goal.category === "여행" && <Plane className="w-5 h-5" />}
                      {goal.title}
                    </CardTitle>
                    <Badge variant={onTrack ? "default" : "destructive"}>
                      {onTrack ? "순조" : "부족"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Progress Section */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">진행률</span>
                          <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">현재 자산</p>
                          <p className="font-semibold text-lg">{Number(goal.current_amount).toLocaleString()}원</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">목표 자산</p>
                          <p className="font-semibold text-lg">{Number(goal.target_amount).toLocaleString()}원</p>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">목표 날짜:</span>
                        <span className="font-medium">{goal.target_date}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">남은 기간:</span>
                        <span className="font-medium">{Math.floor(monthsRemaining / 12)}년 {monthsRemaining % 12}개월</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">월 적립액:</span>
                        <span className="font-medium">200만원 (예시)</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">기대 수익률:</span>
                        <span className="font-medium">8% (예시)</span>
                      </div>
                    </div>
                  </div>

                  {/* Projection */}
                  <div className="mt-4 p-4 bg-background rounded-lg">
                    <h4 className="font-semibold mb-2">예상 결과</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">현재 계획 유지 시</span>
                      <span className={`font-bold ${onTrack ? 'text-success' : 'text-destructive'}`}>
                        {projectedAmount.toLocaleString()}원
                      </span>
                    </div>
                    {!onTrack && (
                      <p className="text-xs text-destructive mt-2">
                        목표 달성을 위해 월 적립액을 증액하거나 수익률을 높여야 합니다.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Goals;