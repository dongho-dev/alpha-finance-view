import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  Plus
} from "lucide-react";
import { usePortfolioData } from "@/hooks/useSupabaseData";

const Portfolio = () => {
  const { portfolios: holdings, sectorAllocations: sectorAllocation, loading } = usePortfolioData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">데이터를 불러오는 중...</div>
        </div>
      </DashboardLayout>
    );
  }

  const totalValue = holdings.reduce((sum, holding) => sum + Number(holding.total_value), 0);
  const totalGain = holdings.reduce((sum, holding) => sum + Number(holding.gain), 0);
  const totalGainPercent = totalValue > 0 ? (totalGain / (totalValue - totalGain)) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">포트폴리오</h1>
            <p className="text-muted-foreground">보유 종목과 자산 배분을 관리하세요</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            종목 추가
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">총 포트폴리오 가치</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalValue.toLocaleString()}원</div>
              <div className={`flex items-center mt-2 ${totalGain >= 0 ? 'text-success' : 'text-destructive'}`}>
                {totalGain >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                <span className="text-sm font-medium">
                  {totalGain >= 0 ? '+' : ''}{totalGain.toLocaleString()}원 ({totalGainPercent.toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">보유 종목 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{holdings.length}개</div>
              <p className="text-sm text-muted-foreground mt-2">6개 섹터 분산</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">현금 비중</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8%</div>
              <p className="text-sm text-muted-foreground mt-2">800만원</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Holdings List */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>보유 종목</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div key={holding.code} className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{holding.name}</h3>
                            <p className="text-sm text-muted-foreground">{holding.code} • {holding.sector}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">보유수량</p>
                            <p className="font-medium">{holding.shares}주</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">평균단가</p>
                            <p className="font-medium">{Number(holding.avg_price).toLocaleString()}원</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">현재가</p>
                            <p className="font-medium">{Number(holding.current_price).toLocaleString()}원</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">평가금액</p>
                            <p className="font-medium">{Number(holding.total_value).toLocaleString()}원</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className={`flex items-center ${Number(holding.gain) >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {Number(holding.gain) >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            <span className="font-medium">
                              {Number(holding.gain) >= 0 ? '+' : ''}{Number(holding.gain).toLocaleString()}원 ({Number(holding.gain_percent) >= 0 ? '+' : ''}{Number(holding.gain_percent).toFixed(1)}%)
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {totalValue > 0 ? ((Number(holding.total_value) / totalValue) * 100).toFixed(1) : 0}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sector Allocation */}
          <div>
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  섹터별 배분
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sectorAllocation.map((sector) => (
                    <div key={sector.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{sector.name}</span>
                        <span>{sector.percentage}%</span>
                      </div>
                      <Progress value={sector.percentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">{sector.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;