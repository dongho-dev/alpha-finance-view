import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Mail, 
  Smartphone, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Target,
  Calendar,
  Settings
} from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { type: "priceAlert", enabled: true, label: "가격 알림" },
    { type: "portfolio", enabled: true, label: "포트폴리오 업데이트" },
    { type: "news", enabled: false, label: "시장 뉴스" },
    { type: "goals", enabled: true, label: "목표 달성 알림" },
    { type: "rebalancing", enabled: true, label: "리밸런싱 알림" }
  ]);

  const recentNotifications = [
    {
      id: 1,
      type: "price_alert",
      title: "삼성전자 목표가 도달",
      message: "삼성전자가 설정한 목표가 75,000원에 도달했습니다.",
      time: "5분 전",
      read: false,
      icon: <TrendingUp className="w-5 h-5 text-success" />
    },
    {
      id: 2,
      type: "portfolio",
      title: "포트폴리오 월간 리포트",
      message: "12월 포트폴리오 성과 리포트가 준비되었습니다.",
      time: "2시간 전",
      read: true,
      icon: <Target className="w-5 h-5 text-primary" />
    },
    {
      id: 3,
      type: "alert",
      title: "급격한 주가 하락",
      message: "보유 종목 SK하이닉스가 5% 이상 하락했습니다.",
      time: "1일 전",
      read: true,
      icon: <AlertTriangle className="w-5 h-5 text-destructive" />
    },
    {
      id: 4,
      type: "goal",
      title: "투자 목표 진행 상황",
      message: "내 집 마련 목표의 50%를 달성했습니다!",
      time: "3일 전",
      read: true,
      icon: <Target className="w-5 h-5 text-primary" />
    }
  ];

  const priceAlerts = [
    {
      id: 1,
      stock: "삼성전자",
      code: "005930",
      currentPrice: 74500,
      targetPrice: 80000,
      condition: "이상",
      active: true
    },
    {
      id: 2,
      stock: "애플",
      code: "AAPL",
      currentPrice: 185,
      targetPrice: 180,
      condition: "이하",
      active: true
    },
    {
      id: 3,
      stock: "테슬라",
      code: "TSLA",
      currentPrice: 245,
      targetPrice: 250,
      condition: "이상",
      active: false
    }
  ];

  const toggleNotification = (type: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.type === type 
          ? { ...notif, enabled: !notif.enabled }
          : notif
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">알림 설정</h1>
          <p className="text-muted-foreground">투자 관련 알림을 설정하고 관리하세요</p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">알림 내역</TabsTrigger>
            <TabsTrigger value="settings">알림 설정</TabsTrigger>
            <TabsTrigger value="price-alerts">가격 알림</TabsTrigger>
            <TabsTrigger value="delivery">전송 방법</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Summary */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Bell className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">읽지 않은 알림</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-sm text-muted-foreground">가격 알림</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warning/10 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">위험 알림</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Notifications */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>최근 알림</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                        notification.read ? 'bg-background' : 'bg-primary/5 border border-primary/20'
                      }`}
                    >
                      <div className="mt-1">
                        {notification.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">모든 알림 보기</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  알림 종류별 설정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notifications.map((notification) => (
                    <div key={notification.type} className="flex items-center justify-between">
                      <Label htmlFor={notification.type} className="text-sm font-medium">
                        {notification.label}
                      </Label>
                      <Switch
                        id={notification.type}
                        checked={notification.enabled}
                        onCheckedChange={() => toggleNotification(notification.type)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>알림 빈도</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">포트폴리오 업데이트</Label>
                    <select className="border border-input rounded-md px-3 py-1 text-sm">
                      <option>실시간</option>
                      <option>일 1회</option>
                      <option>주 1회</option>
                      <option>월 1회</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">시장 뉴스</Label>
                    <select className="border border-input rounded-md px-3 py-1 text-sm">
                      <option>중요한 뉴스만</option>
                      <option>일 1회 요약</option>
                      <option>실시간</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="price-alerts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">가격 알림 설정</h2>
              <Button>
                <Bell className="w-4 h-4 mr-2" />
                새 알림 추가
              </Button>
            </div>

            <Card className="bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {priceAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 rounded-lg bg-background">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{alert.stock}</h4>
                          <Badge variant="outline">{alert.code}</Badge>
                          <Badge variant={alert.active ? "default" : "secondary"}>
                            {alert.active ? "활성" : "비활성"}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          현재가: {alert.currentPrice.toLocaleString()}원 → 
                          목표가: {alert.targetPrice.toLocaleString()}원 {alert.condition}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={alert.active} />
                        <Button variant="ghost" size="sm">
                          수정
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    이메일 알림
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>이메일 알림 사용</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일 주소</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        defaultValue="user@example.com"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>일일 요약 메일</Label>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    모바일 푸시 알림
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>푸시 알림 사용</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>알림 시간</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-muted-foreground">시작</Label>
                          <Input type="time" defaultValue="09:00" />
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">종료</Label>
                          <Input type="time" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>주말 알림</Label>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;