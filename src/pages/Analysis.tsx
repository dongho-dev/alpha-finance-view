import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart,
  Calendar,
  Download
} from "lucide-react";
import { usePerformanceData } from "@/hooks/useSupabaseData";

const Analysis = () => {
  const { performanceData, loading } = usePerformanceData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">데이터를 불러오는 중...</div>
        </div>
      </DashboardLayout>
    );
  }

  const riskMetrics = [
    { metric: "변동성 (연환산)", value: "18.5%", description: "과거 1년간 일일 수익률의 표준편차" },
    { metric: "샤프 비율", value: "1.33", description: "위험 대비 수익률 지표" },
    { metric: "최대 낙폭", value: "-12.8%", description: "고점 대비 최대 하락폭" },
    { metric: "베타", value: "1.15", description: "시장 대비 민감도" }
  ];

  const monthlyReturns = [
    { month: "2024-01", return: 3.2, benchmark: 2.1 },
    { month: "2024-02", return: -1.8, benchmark: -0.9 },
    { month: "2024-03", return: 4.5, benchmark: 3.8 },
    { month: "2024-04", return: 2.1, benchmark: 1.6 },
    { month: "2024-05", return: 5.8, benchmark: 4.2 },
    { month: "2024-06", return: -0.7, benchmark: 0.3 }
  ];

  const topPerformers = [
    { name: "테슬라", return: 28.5, contribution: 4.2 },
    { name: "엔비디아", return: 45.3, contribution: 3.8 },
    { name: "삼성전자", return: 12.8, contribution: 2.1 },
  ];

  const bottomPerformers = [
    { name: "메타", return: -15.2, contribution: -2.3 },
    { name: "넷플릭스", return: -8.9, contribution: -1.1 },
    { name: "페이팔", return: -12.4, contribution: -0.8 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">투자 분석</h1>
            <p className="text-muted-foreground">포트폴리오 성과와 위험도를 분석하세요</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">성과 분석</TabsTrigger>
            <TabsTrigger value="risk">위험 분석</TabsTrigger>
            <TabsTrigger value="attribution">기여도 분석</TabsTrigger>
            <TabsTrigger value="comparison">벤치마크 비교</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {performanceData.map((data) => (
                <Card key={data.period} className="bg-gradient-card shadow-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{data.period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">+{Number(data.portfolio_return)}%</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      벤치마크: +{Number(data.benchmark_return)}%
                    </div>
                    <Badge 
                      variant={Number(data.portfolio_return) > Number(data.benchmark_return) ? "default" : "secondary"}
                      className="mt-2 text-xs"
                    >
                      {Number(data.portfolio_return) > Number(data.benchmark_return) ? '+' : ''}{(Number(data.portfolio_return) - Number(data.benchmark_return)).toFixed(1)}%
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Monthly Performance Chart */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  월별 수익률
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyReturns.map((data) => (
                    <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{data.month}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`font-semibold ${data.return >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {data.return >= 0 ? '+' : ''}{data.return}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            벤치마크: {data.benchmark >= 0 ? '+' : ''}{data.benchmark}%
                          </div>
                        </div>
                        {data.return >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {riskMetrics.map((metric) => (
                <Card key={metric.metric} className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attribution" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Top Performers */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <TrendingUp className="w-5 h-5" />
                    상위 수익 종목
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformers.map((stock) => (
                      <div key={stock.name} className="flex items-center justify-between p-3 rounded-lg bg-background">
                        <span className="font-medium">{stock.name}</span>
                        <div className="text-right">
                          <div className="font-semibold text-success">+{stock.return}%</div>
                          <div className="text-sm text-muted-foreground">기여도: +{stock.contribution}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Performers */}
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <TrendingDown className="w-5 h-5" />
                    하위 수익 종목
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bottomPerformers.map((stock) => (
                      <div key={stock.name} className="flex items-center justify-between p-3 rounded-lg bg-background">
                        <span className="font-medium">{stock.name}</span>
                        <div className="text-right">
                          <div className="font-semibold text-destructive">{stock.return}%</div>
                          <div className="text-sm text-muted-foreground">기여도: {stock.contribution}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  벤치마크 대비 성과
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl font-bold text-success mb-2">+6.9%</div>
                  <div className="text-lg text-muted-foreground mb-4">벤치마크 대비 초과 수익률</div>
                  <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                    <div className="text-center">
                      <div className="text-2xl font-bold">31.2%</div>
                      <div className="text-sm text-muted-foreground">내 포트폴리오</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">22.1%</div>
                      <div className="text-sm text-muted-foreground">KOSPI 지수</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;