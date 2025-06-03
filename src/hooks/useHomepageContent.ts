
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HomepageContent {
  id: string;
  content_type: 'hero_image' | 'newsletter';
  title: string | null;
  content: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useHomepageContent = () => {
  return useQuery({
    queryKey: ['homepage-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as HomepageContent[];
    },
  });
};

export const useHeroContent = () => {
  const { data, isLoading, error } = useHomepageContent();
  return {
    data: data?.find(item => item.content_type === 'hero_image'),
    isLoading,
    error
  };
};

export const useNewsletterContent = () => {
  const { data, isLoading, error } = useHomepageContent();
  return {
    data: data?.find(item => item.content_type === 'newsletter'),
    isLoading,
    error
  };
};
