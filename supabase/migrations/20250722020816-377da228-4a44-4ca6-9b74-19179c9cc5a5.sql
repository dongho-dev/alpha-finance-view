-- Create portfolios table for holdings
CREATE TABLE public.portfolios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  shares INTEGER NOT NULL,
  avg_price DECIMAL(15,2) NOT NULL,
  current_price DECIMAL(15,2) NOT NULL,
  total_value DECIMAL(15,2) NOT NULL,
  gain DECIMAL(15,2) NOT NULL,
  gain_percent DECIMAL(5,2) NOT NULL,
  sector TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sector_allocations table
CREATE TABLE public.sector_allocations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  amount TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create performance_data table for analysis
CREATE TABLE public.performance_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  period TEXT NOT NULL,
  portfolio_return DECIMAL(5,2) NOT NULL,
  benchmark_return DECIMAL(5,2) NOT NULL,
  alpha DECIMAL(5,2) NOT NULL,
  beta DECIMAL(3,2) NOT NULL,
  sharpe_ratio DECIMAL(3,2) NOT NULL,
  volatility DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create accounts table for assets
CREATE TABLE public.accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  balance DECIMAL(15,2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create investment_goals table
CREATE TABLE public.investment_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  target_amount DECIMAL(15,2) NOT NULL,
  current_amount DECIMAL(15,2) NOT NULL,
  target_date DATE NOT NULL,
  progress INTEGER NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table for education
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create articles table for education
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification_settings table
CREATE TABLE public.notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  price_alerts BOOLEAN NOT NULL DEFAULT true,
  portfolio_updates BOOLEAN NOT NULL DEFAULT true,
  market_news BOOLEAN NOT NULL DEFAULT true,
  earnings_reports BOOLEAN NOT NULL DEFAULT false,
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  push_notifications BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_preferences table for settings
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  display_name TEXT,
  email TEXT,
  phone TEXT,
  language TEXT NOT NULL DEFAULT 'ko',
  currency TEXT NOT NULL DEFAULT 'KRW',
  timezone TEXT NOT NULL DEFAULT 'Asia/Seoul',
  theme TEXT NOT NULL DEFAULT 'dark',
  two_factor_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user-specific data
CREATE POLICY "Users can view their own portfolios" ON public.portfolios FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own portfolios" ON public.portfolios FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own portfolios" ON public.portfolios FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own portfolios" ON public.portfolios FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own sector allocations" ON public.sector_allocations FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own sector allocations" ON public.sector_allocations FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own sector allocations" ON public.sector_allocations FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own sector allocations" ON public.sector_allocations FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own performance data" ON public.performance_data FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own performance data" ON public.performance_data FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own performance data" ON public.performance_data FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own performance data" ON public.performance_data FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own accounts" ON public.accounts FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own accounts" ON public.accounts FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own accounts" ON public.accounts FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own accounts" ON public.accounts FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own investment goals" ON public.investment_goals FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own investment goals" ON public.investment_goals FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own investment goals" ON public.investment_goals FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own investment goals" ON public.investment_goals FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own notification settings" ON public.notification_settings FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own notification settings" ON public.notification_settings FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own notification settings" ON public.notification_settings FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own notification settings" ON public.notification_settings FOR DELETE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own preferences" ON public.user_preferences FOR SELECT USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert their own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);
CREATE POLICY "Users can update their own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can delete their own preferences" ON public.user_preferences FOR DELETE USING (auth.uid()::text = user_id::text);

-- Public access for courses and articles
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Anyone can view articles" ON public.articles FOR SELECT USING (true);

-- Insert sample data for courses
INSERT INTO public.courses (title, instructor, duration, level, rating, price, description) VALUES
('기초 주식 투자', '김투자', '4주', '초급', 4.8, '무료', '주식 투자의 기본 개념과 원리를 배웁니다'),
('포트폴리오 관리 전략', '박전략', '6주', '중급', 4.9, '99,000원', '효과적인 포트폴리오 구성과 리밸런싱 방법'),
('기술적 분석 마스터', '이차트', '8주', '고급', 4.7, '199,000원', '차트 분석과 기술적 지표 활용법'),
('가치 투자의 이해', '최가치', '5주', '중급', 4.6, '149,000원', '기업 분석과 내재가치 평가 방법');

-- Insert sample data for articles
INSERT INTO public.articles (title, author, date, category, summary) VALUES
('2024년 하반기 투자 전망', '경제연구소', '2024-01-15', '시장분석', '글로벌 경제 동향과 투자 기회를 분석합니다'),
('ESG 투자의 중요성', '지속가능연구팀', '2024-01-10', 'ESG', '환경, 사회, 지배구조를 고려한 투자의 필요성'),
('인플레이션 시대의 자산배분', '자산관리팀', '2024-01-08', '자산관리', '인플레이션 환경에서의 효과적인 자산배분 전략'),
('AI 기술주 투자 가이드', '테크분석팀', '2024-01-05', '기술주', 'AI 관련 기업 투자 시 고려사항과 주의점');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sector_allocations_updated_at
  BEFORE UPDATE ON public.sector_allocations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();