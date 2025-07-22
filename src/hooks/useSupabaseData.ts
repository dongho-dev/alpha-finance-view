import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function usePortfolioData() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [sectorAllocations, setSectorAllocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [portfolioData, sectorData] = await Promise.all([
          supabase.from('portfolios').select('*'),
          supabase.from('sector_allocations').select('*')
        ]);

        if (portfolioData.data) setPortfolios(portfolioData.data);
        if (sectorData.data) setSectorAllocations(sectorData.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { portfolios, sectorAllocations, loading };
}

export function usePerformanceData() {
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from('performance_data').select('*');
        if (data) setPerformanceData(data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { performanceData, loading };
}

export function useAccountsData() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from('accounts').select('*');
        if (data) setAccounts(data);
      } catch (error) {
        console.error('Error fetching accounts data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { accounts, loading };
}

export function useGoalsData() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from('investment_goals').select('*');
        if (data) setGoals(data);
      } catch (error) {
        console.error('Error fetching goals data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { goals, loading };
}

export function useEducationData() {
  const [courses, setCourses] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesData, articlesData] = await Promise.all([
          supabase.from('courses').select('*'),
          supabase.from('articles').select('*')
        ]);

        if (coursesData.data) setCourses(coursesData.data);
        if (articlesData.data) setArticles(articlesData.data);
      } catch (error) {
        console.error('Error fetching education data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { courses, articles, loading };
}

export function useNotificationSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from('notification_settings').select('*').limit(1);
        if (data && data.length > 0) setSettings(data[0]);
      } catch (error) {
        console.error('Error fetching notification settings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { settings, loading };
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await supabase.from('user_preferences').select('*').limit(1);
        if (data && data.length > 0) setPreferences(data[0]);
      } catch (error) {
        console.error('Error fetching user preferences:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { preferences, loading };
}