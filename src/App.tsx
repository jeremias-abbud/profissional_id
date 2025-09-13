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
    const savedImages = localStorage.getItem('profissionalid-carousel-images');
    if (savedImages) {
      setUploadedImages(JSON.parse(savedImages));
    }

    const handleStorageChange = () => {
      const savedImages = localStorage.getItem('profissionalid-carousel-images');
      if (savedImages) {
        setUploadedImages(JSON.parse(savedImages));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
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
    <div className="overflow-x-hidden"> {/* Adicione esta linha */}
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index uploadedImages={uploadedImages} />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;