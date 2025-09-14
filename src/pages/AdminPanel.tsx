import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogoCarousel from '@/components/LogoCarousel';
import PortfolioManager from '@/components/admin/PortfolioManager';
import { useCarouselImages } from '@/hooks/useCarouselImages';
import { usePortfolio } from '@/hooks/usePortfolio';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const { images: dbImages, uploadImage, deleteImage, loading } = useCarouselImages();
  const { sites: portfolioSites } = usePortfolio();

  // Senha do admin (em produção, isso deveria vir de um backend seguro)
  const ADMIN_PASSWORD = 'profissionalid2024';

  useEffect(() => {
    // Carregar imagens salvas do localStorage
    const savedImages = localStorage.getItem('profissionalid-carousel-images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }

    // Verificar se já está logado
    const isLoggedIn = sessionStorage.getItem('profissionalid-admin-auth');
    if (isLoggedIn === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('profissionalid-admin-auth', 'true');
      setError('');
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('profissionalid-admin-auth');
    setPassword('');
  };

  const handleImagesChange = (images: string[]) => {
    setUploadedImages(images);
    // Salvar no localStorage
    localStorage.setItem('profissionalid-carousel-images', JSON.stringify(images));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle>Admin - Profissional ID</CardTitle>
            <p className="text-muted-foreground">Digite a senha para acessar o painel administrativo</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha do administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            <Button onClick={handleLogin} className="w-full">
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header do Admin */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            Painel Administrativo - Profissional ID
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Upload de Novas Imagens */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Imagens ao Carrossel</CardTitle>
            <p className="text-muted-foreground">
              Faça upload de novas imagens para o carrossel (armazenadas no Supabase)
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={async (e) => {
                  const files = e.target.files;
                  if (files) {
                    for (let i = 0; i < files.length; i++) {
                      await uploadImage(files[i]);
                    }
                  }
                }}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                Selecione uma ou mais imagens (PNG, JPG, WEBP)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Gerenciamento de Portfólio */}
        <PortfolioManager />

        {/* Preview do Carrossel */}
        <Card>
          <CardHeader>
            <CardTitle>Preview do Carrossel</CardTitle>
            <p className="text-muted-foreground">
              Assim as imagens aparecerão no site principal
            </p>
          </CardHeader>
          <CardContent>
        <LogoCarousel uploadedImages={uploadedImages} />
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                {portfolioSites.length}
              </div>
              <p className="text-muted-foreground">Sites no Portfólio</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {dbImages.length}
              </div>
              <p className="text-muted-foreground">Imagens no Banco</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {uploadedImages.length}
              </div>
              <p className="text-muted-foreground">Imagens Locais</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;