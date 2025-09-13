import React, { useState } from 'react'
import { Plus, Edit, Trash2, ExternalLink, Star, StarOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { usePortfolio } from '@/hooks/usePortfolio'
import { PortfolioSite } from '@/lib/supabase'

const PortfolioManager = () => {
  const { sites, loading, addSite, updateSite, deleteSite, uploadImage } = usePortfolio()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSite, setEditingSite] = useState<PortfolioSite | null>(null)
  const [uploading, setUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image_url: '',
    technologies: '',
    featured: false
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      url: '',
      image_url: '',
      technologies: '',
      featured: false
    })
    setEditingSite(null)
  }

  const openEditDialog = (site: PortfolioSite) => {
    setEditingSite(site)
    setFormData({
      title: site.title,
      description: site.description,
      url: site.url,
      image_url: site.image_url,
      technologies: site.technologies.join(', '),
      featured: site.featured
    })
    setIsDialogOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      setFormData(prev => ({ ...prev, image_url: imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const siteData = {
      title: formData.title,
      description: formData.description,
      url: formData.url,
      image_url: formData.image_url,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(Boolean),
      featured: formData.featured
    }

    try {
      if (editingSite) {
        await updateSite(editingSite.id, siteData)
      } else {
        await addSite(siteData)
      }
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error saving site:', error)
    }
  }

  const handleDelete = async (siteId: string) => {
    if (window.confirm('Tem certeza que deseja remover este site do portfólio?')) {
      await deleteSite(siteId)
    }
  }

  const toggleFeatured = async (site: PortfolioSite) => {
    await updateSite(site.id, { featured: !site.featured })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gerenciar Portfólio</CardTitle>
            <p className="text-muted-foreground">
              Adicione e gerencie os sites do seu portfólio
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Site
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSite ? 'Editar Site' : 'Adicionar Novo Site'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Título do Site</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">URL do Site</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Imagem do Site</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {formData.image_url && (
                    <div className="mt-2">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="technologies">Tecnologias (separadas por vírgula)</Label>
                  <Input
                    id="technologies"
                    value={formData.technologies}
                    onChange={(e) => setFormData(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="React, TypeScript, Tailwind CSS"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Site em destaque</Label>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" disabled={uploading || !formData.image_url}>
                    {editingSite ? 'Atualizar' : 'Adicionar'} Site
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sites.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            Nenhum site no portfólio ainda
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sites.map((site) => (
              <div key={site.id} className="relative group">
                <Card className="overflow-hidden">
                  <div className="aspect-video">
                    <img 
                      src={site.image_url} 
                      alt={site.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{site.title}</h3>
                        {site.featured && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {site.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {site.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {site.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{site.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-y-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleFeatured(site)}
                  >
                    {site.featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => window.open(site.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openEditDialog(site)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(site.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PortfolioManager