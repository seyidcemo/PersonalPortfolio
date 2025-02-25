import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContentSchema, type InsertContent, contentTypes, type Content } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Trash2 } from "lucide-react";

const ADMIN_PASSWORD = "portfolio123"; // Basit şifre kontrolü için

export default function Admin() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState<InsertContent | null>(null);

  const { data: contents } = useQuery<Content[]>({
    queryKey: ["/api/contents"],
    enabled: isAuthenticated
  });

  const form = useForm<InsertContent>({
    resolver: zodResolver(insertContentSchema),
    defaultValues: {
      type: "software",
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      link: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertContent) => {
      const response = await apiRequest("POST", "/api/contents", data, {
        password: ADMIN_PASSWORD
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "İçerik eklendi",
        description: "Yeni içerik başarıyla oluşturuldu.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contents"] });
      form.reset();
      setPreview(null);
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "İçerik eklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/contents/${id}`, undefined, {
        password: ADMIN_PASSWORD
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "İçerik silindi",
        description: "İçerik başarıyla silindi.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contents"] });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "İçerik silinirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Hata",
        description: "Yanlış şifre",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    const result = form.getValues();
    setPreview(result);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>Yönetici Girişi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handleLogin}>Giriş</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">İçerik Yönetimi</h1>
        <p className="text-muted-foreground mt-2">
          Yeni yazılım projeleri, müzikler, oyun incelemeleri ve blog yazıları ekleyin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Yeni İçerik Ekle</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İçerik Türü</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İçerik türü seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type === "software"
                                ? "Yazılım Projesi"
                                : type === "music"
                                ? "Müzik"
                                : type === "game-review"
                                ? "Oyun İncelemesi"
                                : "Blog Yazısı"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Başlık</FormLabel>
                      <FormControl>
                        <Input placeholder="İçerik başlığı" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="İçerik açıklaması"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Görsel URL'i</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Input placeholder="Kategori" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bağlantı (İsteğe bağlı)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handlePreview}
                  >
                    Önizle
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending}>
                    {createMutation.isPending ? "Ekleniyor..." : "İçerik Ekle"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {preview && (
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={preview.imageUrl}
                    alt={preview.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">{preview.title}</h3>
                <p className="text-sm text-muted-foreground">{preview.category}</p>
                <p className="text-sm">{preview.description}</p>
                {preview.link && (
                  <a
                    href={preview.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {preview.link}
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mevcut İçerikler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contents?.map((content) => (
              <Card key={content.id}>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={content.imageUrl}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{content.title}</h3>
                      <p className="text-sm text-muted-foreground">{content.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
                          deleteMutation.mutate(content.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}