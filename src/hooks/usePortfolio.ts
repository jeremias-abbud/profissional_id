import { useState, useEffect } from 'react'
import { supabase, PortfolioSite } from '@/lib/supabase'
import { toast } from 'sonner'

export const usePortfolio = () => {
  const [sites, setSites] = useState<PortfolioSite[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch portfolio sites from Supabase
  const fetchSites = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_sites')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setSites(data || [])
    } catch (error) {
      console.error('Error fetching portfolio sites:', error)
      toast.error('Erro ao carregar sites do portfólio')
    } finally {
      setLoading(false)
    }
  }

  // Add new portfolio site
  const addSite = async (siteData: Omit<PortfolioSite, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_sites')
        .insert({
          ...siteData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      toast.success('Site adicionado ao portfólio com sucesso!')
      fetchSites() // Refresh the list
    } catch (error) {
      console.error('Error adding portfolio site:', error)
      toast.error('Erro ao adicionar site ao portfólio')
    }
  }

  // Update portfolio site
  const updateSite = async (id: string, siteData: Partial<PortfolioSite>): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_sites')
        .update({
          ...siteData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      toast.success('Site atualizado com sucesso!')
      fetchSites() // Refresh the list
    } catch (error) {
      console.error('Error updating portfolio site:', error)
      toast.error('Erro ao atualizar site')
    }
  }

  // Delete portfolio site
  const deleteSite = async (id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('portfolio_sites')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast.success('Site removido do portfólio com sucesso!')
      fetchSites() // Refresh the list
    } catch (error) {
      console.error('Error deleting portfolio site:', error)
      toast.error('Erro ao remover site do portfólio')
    }
  }

  // Upload image to Supabase Storage
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
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