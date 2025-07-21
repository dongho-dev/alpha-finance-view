import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { EditableCard } from "@/components/EditableCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const Index = () => {
  const [investmentGoal, setInvestmentGoal] = useState("연간 15% 수익률 달성");
  const [investmentNote, setInvestmentNote] = useState("다양한 포트폴리오로 리스크를 분산하고 장기적인 관점으로 투자하기");
  const [watchList, setWatchList] = useState([
    { name: "삼성전자", code: "005930", price: "74,500", change: 1.2 },
    { name: "SK하이닉스", code: "000660", price: "132,000", change: -0.8 },
    { name: "NAVER", code: "035420", price: "210,000", change: 2.1 }
  ]);

  const portfolioData = [
    { name: "국내주식", value: 45, amount: "4,500만원", color: "bg-chart-blue" },
    { name: "해외주식", value: 30, amount: "3,000만원", color: "bg-chart-green" },
    { name: "채권", value: 15, amount: "1,500만원", color: "bg-chart-purple" },
    { name: "현금", value: 10, amount: "1,000만원", color: "bg-chart-orange" }
  ];

  const recentTransactions = [
    { type: "매수", stock: "테슬라", amount: "50주", price: "$245.60", date: "2024-01-15" },
    { type: "매도", stock: "애플", amount: "30주", price: "$185.20", date: "2024-01-14" },
    { type: "배당", stock: "코카콜라", amount: "배당금", price: "+$124.50", date: "2024-01-13" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">투자 대시보드</h1>
          <p className="text-muted-foreground">포트폴리오 현황과 투자 성과를 한눈에 확인하세요</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="총 자산"
            value="1억 2,340만원"
            change={5.2}
            icon={<DollarSign className="w-4 h-4" />}
            description="전월 대비"
          />
          <StatsCard
            title="실현 수익률"
            value="12.8%"
            change={2.1}
            icon={<TrendingUp className="w-4 h-4" />}
            description="연간 수익률"
          />
          <StatsCard
            title="보유 종목 수"
            value="25개"
            icon={<PieChart className="w-4 h-4" />}
            description="8개 섹터 분산"
          />
          <StatsCard
            title="평가 손익"
            value="+1,560만원"
            change={8.4}
            icon={<Target className="w-4 h-4" />}
            description="전일 대비"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Portfolio Allocation */}
          <Card className="bg-gradient-card shadow-card col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>포트폴리오 구성</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${item.color}`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{item.value}%</div>
                      <div className="text-sm text-muted-foreground">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Investment Goal */}
          <EditableCard
            title="투자 목표"
            content={investmentGoal}
            onSave={setInvestmentGoal}
            placeholder="투자 목표를 설정하세요..."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Investment Notes */}
          <EditableCard
            title="투자 메모"
            content={investmentNote}
            onSave={setInvestmentNote}
            isTextArea={true}
            placeholder="투자 전략이나 중요한 메모를 작성하세요..."
          />

          {/* Watchlist */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>관심 종목</CardTitle>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                추가
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {watchList.map((stock) => (
                  <div key={stock.code} className="flex items-center justify-between p-3 rounded-lg bg-background">
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">{stock.code}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{stock.price}원</div>
                      <div className={`text-sm flex items-center ${
                        stock.change >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        {stock.change >= 0 ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(stock.change)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>최근 거래</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div className="flex items-center space-x-3">
                    <Badge variant={transaction.type === "매수" ? "default" : "secondary"}>
                      {transaction.type}
                    </Badge>
                    <div>
                      <div className="font-medium">{transaction.stock}</div>
                      <div className="text-sm text-muted-foreground">{transaction.amount}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{transaction.price}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
