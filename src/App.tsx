import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  useEffect(() => {
    // Carregar imagens do localStorage
    const savedImages = localStorage.getItem('profissionalid-carousel-images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }

    // Escutar mudanças no localStorage (quando admin adiciona imagens)
    const handleStorageChange = () => {
      const savedImages = localStorage.getItem('profissionalid-carousel-images');
      if (savedImages) {
        setUploadedImages(JSON.parse(savedImages));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Também escutar mudanças na mesma aba
    const interval = setInterval(() => {
      const savedImages = localStorage.getItem('profissionalid-carousel-images');
      const currentImages = JSON.stringify(uploadedImages);
      if (savedImages && savedImages !== currentImages) {
        setUploadedImages(JSON.parse(savedImages));
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [uploadedImages]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index uploadedImages={uploadedImages} />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;