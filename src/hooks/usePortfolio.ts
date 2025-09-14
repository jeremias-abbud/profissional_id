import { useState, useEffect } from 'react'
import { supabase, PortfolioSite } from '@/lib/supabase'
import { toast } from 'sonner'

export const usePortfolio = () => {
  const [sites, setSites] = useState<PortfolioSite[]>([])
  const [loading, setLoading] = useState(true)

  // Busca os sites do portfólio no Supabase
  const fetchSites = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSites(data || [])
    } catch (error) {
      console.error('Erro ao carregar sites do portfólio:', error)
      toast.error('Erro ao carregar sites do portfólio')
    } finally {
      setLoading(false)
    }
  }

  // Adiciona um novo site ao portfólio
  const addSite = async (siteData: Omit<PortfolioSite, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .insert(siteData) // Removido 'created_at' e 'updated_at'

      if (error) throw error

      toast.success('Site adicionado ao portfólio com sucesso!')
      fetchSites() // Atualiza a lista
    } catch (error) {
      console.error('Erro ao adicionar site ao portfólio:', error)
      toast.error('Erro ao adicionar site ao portfólio')
    }
  }

  // Atualiza um site existente no portfólio
  const updateSite = async (id: string, siteData: Partial<PortfolioSite>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update(siteData) // Removido 'updated_at'
        .eq('id', id)

      if (error) throw error

      toast.success('Site atualizado com sucesso!')
      fetchSites() // Atualiza a lista
    } catch (error) {
      console.error('Erro ao atualizar site:', error)
      toast.error('Erro ao atualizar site')
    }
  }

  // Deleta um site do portfólio
  const deleteSite = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Site removido do portfólio com sucesso!')
      fetchSites() // Atualiza a lista
    } catch (error) {
      console.error('Erro ao remover site do portfólio:', error)
      toast.error('Erro ao remover site do portfólio')
    }
  }

  // Faz o upload de uma imagem para o Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchSites()
  }, [])

  return {
    sites,
    loading,
    addSite,
    updateSite,
    deleteSite,
    uploadImage,
    refetch: fetchSites
  }
}