import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  Banknote,
  CreditCard,
  Building,
  Plus,
  Search,
  Filter
} from "lucide-react";

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const assetCategories = [
    {
      name: "주식",
      value: 85000000,
      percentage: 68,
      change: 5.2,
      items: [
        { name: "국내주식", value: 45000000, accounts: ["키움증권", "삼성증권"] },
        { name: "해외주식", value: 40000000, accounts: ["미래에셋증권"] }
      ]
    },
    {
      name: "현금 및 예금",
      value: 25000000,
      percentage: 20,
      change: 0.1,
      items: [
        { name: "일반예금", value: 15000000, accounts: ["신한은행", "국민은행"] },
        { name: "정기예금", value: 10000000, accounts: ["우리은행"] }
      ]
    },
    {
      name: "채권",
      value: 10000000,
      percentage: 8,
      change: 1.8,
      items: [
        { name: "국채", value: 6000000, accounts: ["한국투자증권"] },
        { name: "회사채", value: 4000000, accounts: ["NH투자증권"] }
      ]
    },
    {
      name: "기타",
      value: 5000000,
      percentage: 4,
      change: -0.5,
      items: [
        { name: "부동산펀드", value: 3000000, accounts: ["미래에셋자산운용"] },
        { name: "금투자", value: 2000000, accounts: ["한국금거래소"] }
      ]
    }
  ];

  const accounts = [
    {
      name: "키움증권",
      type: "증권계좌",
      balance: 28500000,
      lastUpdate: "2024-01-15",
      status: "연결됨"
    },
    {
      name: "신한은행",
      type: "입출금통장",
      balance: 12300000,
      lastUpdate: "2024-01-15",
      status: "연결됨"
    },
    {
      name: "미래에셋증권",
      type: "증권계좌",
      balance: 42800000,
      lastUpdate: "2024-01-15",
      status: "연결됨"
    },
    {
      name: "우리은행",
      type: "정기예금",
      balance: 10000000,
      lastUpdate: "2024-01-14",
      status: "연결됨"
    }
  ];

  const totalAssets = assetCategories.reduce((sum, category) => sum + category.value, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">자산 관리</h1>
            <p className="text-muted-foreground">전체 자산 현황과 계좌를 관리하세요</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            계좌 연결
          </Button>
        </div>

        {/* Asset Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="총 자산"
            value={`${(totalAssets / 100000000).toFixed(1)}억원`}
            change={4.2}
            icon={<Wallet className="w-4 h-4" />}
            description="전월 대비"
          />
          <StatsCard
            title="투자 자산"
            value="9.5억원"
            change={5.8}
            icon={<TrendingUp className="w-4 h-4" />}
            description="전체의 76%"
          />
          <StatsCard
            title="현금 자산"
            value="2.5억원"
            change={0.1}
            icon={<DollarSign className="w-4 h-4" />}
            description="전체의 20%"
          />
          <StatsCard
            title="연결 계좌"
            value="8개"
            icon={<Building className="w-4 h-4" />}
            description="4개 금융기관"
          />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">자산 개요</TabsTrigger>
            <TabsTrigger value="accounts">계좌 관리</TabsTrigger>
            <TabsTrigger value="allocation">자산 배분</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Asset Categories */}
            <div className="grid gap-6 lg:grid-cols-2">
              {assetCategories.map((category) => (
                <Card key={category.name} className="bg-gradient-card shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {category.name === "주식" && <TrendingUp className="w-5 h-5" />}
                        {category.name === "현금 및 예금" && <Banknote className="w-5 h-5" />}
                        {category.name === "채권" && <CreditCard className="w-5 h-5" />}
                        {category.name === "기타" && <Building className="w-5 h-5" />}
                        {category.name}
                      </CardTitle>
                      <Badge variant="outline">{category.percentage}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2">
                      {category.value.toLocaleString()}원
                    </div>
                    <div className={`flex items-center text-sm ${
                      category.change >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${category.change < 0 ? 'rotate-180' : ''}`} />
                      {category.change >= 0 ? '+' : ''}{category.change}%
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      {category.items.map((item) => (
                        <div key={item.name} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.name}</span>
                          <span className="font-medium">{item.value.toLocaleString()}원</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="계좌명 또는 금융기관 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>

            {/* Accounts List */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>연결된 계좌</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accounts.map((account) => (
                    <div key={account.name} className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{account.name}</h3>
                          <p className="text-sm text-muted-foreground">{account.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{account.balance.toLocaleString()}원</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {account.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {account.lastUpdate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-6">
            {/* Asset Allocation Chart */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>목표 vs 현재 자산 배분</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {assetCategories.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="flex gap-4 text-sm">
                          <span className="text-muted-foreground">목표: 70%</span>
                          <span>현재: {category.percentage}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-background rounded-lg">
                  <h4 className="font-semibold mb-2">리밸런싱 추천</h4>
                  <p className="text-sm text-muted-foreground">
                    현재 주식 비중이 목표보다 낮습니다. 현금의 일부를 주식으로 이동하는 것을 고려해보세요.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Assets;