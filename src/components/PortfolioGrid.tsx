import React from 'react';
import { ExternalLink, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PortfolioSite } from '@/lib/supabase';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface PortfolioGridProps {
    sites: PortfolioSite[];
    loading?: boolean;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ sites, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <div className="aspect-video bg-muted animate-pulse" />
                        <CardContent className="p-6">
                            <div className="space-y-3">
                                <div className="h-4 bg-muted rounded animate-pulse" />
                                <div className="h-3 bg-muted rounded animate-pulse w-3/4" />
                                <div className="flex gap-2">
                                    <div className="h-6 bg-muted rounded animate-pulse w-16" />
                                    <div className="h-6 bg-muted rounded animate-pulse w-20" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (sites.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                    Nenhum site no portfólio ainda.
                </p>
            </div>
        );
    }

    return (
        <Carousel
            opts={{
                align: 'start',
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
            className="w-full"
        >
            <CarouselContent>
                {sites.map((site) => (
                    <CarouselItem
                        key={site.id}
                        className="sm:basis-1/2 md:basis-1/2 lg:basis-1/3 p-4"
                    >
                        <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={site.image_url}
                                        alt={site.title}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                {site.featured && (
                                    <div className="absolute top-4 right-4">
                                        <Badge
                                            variant="secondary"
                                            className="bg-primary text-primary-foreground"
                                        >
                                            <Star className="w-3 h-3 mr-1" />
                                            Destaque
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{site.title}</h3>
                                        <p className="text-muted-foreground text-sm line-clamp-2">
                                            {site.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {site.technologies.map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => {
                                            // Adiciona o prefixo 'https://' se ele não existir
                                            const url = site.url.startsWith('http') ? site.url : `https://${site.url}`;

                                            // Abre o link em uma nova aba
                                            window.open(url, '_blank');
                                        }}
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Ver Site
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default PortfolioGrid;