
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useHomepageContent, HomepageContent } from "@/hooks/useHomepageContent";
import { Save, Upload } from "lucide-react";

const HomepageContentManagement = () => {
  const { data: contentData, refetch } = useHomepageContent();
  const [heroContent, setHeroContent] = useState<Partial<HomepageContent>>({});
  const [newsletterContent, setNewsletterContent] = useState<Partial<HomepageContent>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (contentData) {
      const hero = contentData.find(item => item.content_type === 'hero_image');
      const newsletter = contentData.find(item => item.content_type === 'newsletter');
      
      if (hero) setHeroContent(hero);
      if (newsletter) setNewsletterContent(newsletter);
    }
  }, [contentData]);

  const handleSaveContent = async (type: 'hero_image' | 'newsletter', content: Partial<HomepageContent>) => {
    setLoading(true);
    try {
      const existingContent = contentData?.find(item => item.content_type === type);
      
      if (existingContent) {
        const { error } = await supabase
          .from('homepage_content')
          .update({
            title: content.title,
            content: content.content,
            image_url: content.image_url,
            is_active: content.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingContent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('homepage_content')
          .insert({
            content_type: type,
            title: content.title,
            content: content.content,
            image_url: content.image_url,
            is_active: content.is_active ?? true
          });

        if (error) throw error;
      }

      await refetch();
      toast({
        title: "Content Updated",
        description: `${type === 'hero_image' ? 'Hero' : 'Newsletter'} content has been updated successfully`,
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Homepage Content Management</h2>
      
      {/* Hero Section Management */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hero-title">Title</Label>
            <Input
              id="hero-title"
              value={heroContent.title || ''}
              onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              placeholder="Enter hero title"
            />
          </div>
          
          <div>
            <Label htmlFor="hero-content">Description</Label>
            <Textarea
              id="hero-content"
              value={heroContent.content || ''}
              onChange={(e) => setHeroContent({...heroContent, content: e.target.value})}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="hero-image">Background Image URL</Label>
            <Input
              id="hero-image"
              value={heroContent.image_url || ''}
              onChange={(e) => setHeroContent({...heroContent, image_url: e.target.value})}
              placeholder="Enter image URL"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="hero-active"
              checked={heroContent.is_active ?? true}
              onCheckedChange={(checked) => setHeroContent({...heroContent, is_active: checked})}
            />
            <Label htmlFor="hero-active">Active</Label>
          </div>
          
          <Button 
            onClick={() => handleSaveContent('hero_image', heroContent)}
            disabled={loading}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Hero Content
          </Button>
        </CardContent>
      </Card>

      {/* Newsletter Section Management */}
      <Card>
        <CardHeader>
          <CardTitle>Newsletter Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="newsletter-title">Title</Label>
            <Input
              id="newsletter-title"
              value={newsletterContent.title || ''}
              onChange={(e) => setNewsletterContent({...newsletterContent, title: e.target.value})}
              placeholder="Enter newsletter title"
            />
          </div>
          
          <div>
            <Label htmlFor="newsletter-content">Description</Label>
            <Textarea
              id="newsletter-content"
              value={newsletterContent.content || ''}
              onChange={(e) => setNewsletterContent({...newsletterContent, content: e.target.value})}
              placeholder="Enter newsletter description"
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="newsletter-active"
              checked={newsletterContent.is_active ?? true}
              onCheckedChange={(checked) => setNewsletterContent({...newsletterContent, is_active: checked})}
            />
            <Label htmlFor="newsletter-active">Active</Label>
          </div>
          
          <Button 
            onClick={() => handleSaveContent('newsletter', newsletterContent)}
            disabled={loading}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Newsletter Content
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageContentManagement;
