import { useState, useEffect } from 'react'
import { supabase, PortfolioProject } from '@/lib/supabase'
import { toast } from 'sonner'

// Alias para compatibilidade
export type PortfolioSite = PortfolioProject

export const usePortfolio = () => {
  const [sites, setSites] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Buscar projetos
  const fetchSites = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Erro ao carregar projetos:', fetchError)
        throw fetchError
      }

      setSites(data || [])
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao carregar projetos do portfólio'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Adicionar projeto
  const addSite = async (
    siteData: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>
  ): Promise<void> => {
    try {
      const { error: insertError } = await supabase
        .from('portfolio_projects')
        .insert([siteData])
        .select()
        .single()

      if (insertError) {
        console.error('Erro ao adicionar projeto:', insertError)
        throw insertError
      }

      toast.success('Projeto adicionado ao portfólio com sucesso!')
      await fetchSites() // Recarregar lista
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao adicionar projeto ao portfólio'
      toast.error(errorMessage)
      throw err
    }
  }

  // Atualizar projeto
  const updateSite = async (
    id: string,
    siteData: Partial<PortfolioProject>
  ): Promise<void> => {
    try {
      const { error: updateError } = await supabase
        .from('portfolio_projects')
        .update({
          ...siteData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)

      if (updateError) {
        console.error('Erro ao atualizar projeto:', updateError)
        throw updateError
      }

      toast.success('Projeto atualizado com sucesso!')
      await fetchSites() // Recarregar lista
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao atualizar projeto'
      toast.error(errorMessage)
      throw err
    }
  }

  // Deletar projeto
  const deleteSite = async (id: string): Promise<void> => {
    try {
      const { error: deleteError } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Erro ao remover projeto:', deleteError)
        throw deleteError
      }

      toast.success('Projeto removido do portfólio com sucesso!')
      await fetchSites() // Recarregar lista
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao remover projeto do portfólio'
      toast.error(errorMessage)
      throw err
    }
  }

  // Upload de imagem
  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExt}`
      const filePath = `portfolio/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.error('Erro no upload:', uploadError)
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath)

      return publicUrl
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao fazer upload da imagem'
      toast.error(errorMessage)
      throw err
    }
  }

  // Carregar dados na inicialização
  useEffect(() => {
    fetchSites()
  }, [])

  return {
    sites,
    loading,
    error,
    addSite,
    updateSite,
    deleteSite,
    uploadImage,
    refetch: fetchSites,
    refresh: fetchSites,
  }
}