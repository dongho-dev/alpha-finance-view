import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Shield, 
  Bell, 
  Palette,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Settings as SettingsIcon
} from "lucide-react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const connectedAccounts = [
    {
      name: "키움증권",
      type: "증권계좌",
      connected: true,
      lastSync: "2024-01-15 14:30"
    },
    {
      name: "신한은행",
      type: "은행계좌",
      connected: true,
      lastSync: "2024-01-15 14:25"
    },
    {
      name: "미래에셋증권",
      type: "증권계좌",
      connected: false,
      lastSync: null
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">설정</h1>
          <p className="text-muted-foreground">계정 정보와 앱 설정을 관리하세요</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="accounts">계좌 연결</TabsTrigger>
            <TabsTrigger value="appearance">화면 설정</TabsTrigger>
            <TabsTrigger value="data">데이터 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  프로필 정보
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="프로필 사진" />
                      <AvatarFallback className="text-2xl">김투자</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline">사진 변경</Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG 파일만 가능 (최대 5MB)
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" defaultValue="김투자" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">이메일</Label>
                      <Input id="email" type="email" defaultValue="investor@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">전화번호</Label>
                      <Input id="phone" type="tel" defaultValue="010-1234-5678" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">생년월일</Label>
                      <Input id="birthdate" type="date" defaultValue="1990-01-01" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="investment-style">투자 성향</Label>
                    <Select defaultValue="moderate">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">안정형</SelectItem>
                        <SelectItem value="moderate">균형형</SelectItem>
                        <SelectItem value="aggressive">성장형</SelectItem>
                        <SelectItem value="speculative">공격형</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button>프로필 저장</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  비밀번호 변경
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">현재 비밀번호</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="현재 비밀번호를 입력하세요"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">새 비밀번호</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="새 비밀번호를 입력하세요"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="새 비밀번호를 다시 입력하세요"
                    />
                  </div>
                  <Button>비밀번호 변경</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle>2단계 인증</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS 인증</Label>
                      <p className="text-sm text-muted-foreground">로그인 시 SMS로 인증번호 전송</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>이메일 인증</Label>
                      <p className="text-sm text-muted-foreground">중요한 작업 시 이메일 인증</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>연결된 계좌</CardTitle>
                  <Button>
                    <User className="w-4 h-4 mr-2" />
                    계좌 추가
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connectedAccounts.map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background">
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-sm text-muted-foreground">{account.type}</p>
                        {account.lastSync && (
                          <p className="text-xs text-muted-foreground">
                            마지막 동기화: {account.lastSync}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {account.connected ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-success rounded-full" />
                            <span className="text-sm text-success">연결됨</span>
                            <Button variant="outline" size="sm">
                              동기화
                            </Button>
                            <Button variant="destructive" size="sm">
                              연결 해제
                            </Button>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm">
                            연결하기
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  화면 설정
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>다크 모드</Label>
                      <p className="text-sm text-muted-foreground">어두운 테마로 화면 표시</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>

                  <div className="space-y-2">
                    <Label>언어</Label>
                    <Select defaultValue="ko">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ko">한국어</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>통화 표시</Label>
                    <Select defaultValue="krw">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="krw">KRW (원)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="eur">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>애니메이션</Label>
                      <p className="text-sm text-muted-foreground">화면 전환 효과 사용</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  데이터 내보내기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    투자 데이터를 다양한 형식으로 내보낼 수 있습니다.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      포트폴리오 데이터 (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      거래 내역 (Excel)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      투자 목표 (PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  위험 구역
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">계정 삭제</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                    </p>
                    <Button variant="destructive">계정 삭제</Button>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">모든 데이터 초기화</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      포트폴리오와 투자 기록을 모두 삭제하고 처음부터 시작합니다.
                    </p>
                    <Button variant="destructive" className="bg-destructive/80">데이터 초기화</Button>
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

export default Settings;