import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oruvcumtglxfnqlhwxpo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ydXZjdW10Z2x4Zm5xbGh3eHBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTUwNjMsImV4cCI6MjA3MzM3MTA2M30.r6Tx245llx3IKdKYmdSIRcDA7RLFr-gGQj2dXP5yWog'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos
export type CarouselImage = {
  id: string
  filename: string
  url: string
  uploaded_at: string
}

export type PortfolioProject = {
  id: string
  title: string
  description: string | null
  url: string
  image_url: string
  technologies: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

// Mantenha compatibilidade com código existente
export type PortfolioSite = PortfolioProject

// Funções CRUD para Portfolio
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erro ao carregar projetos:', error)
    throw error
  }

  return data || []
}

export async function createPortfolioProject(projectData: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert([projectData])
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar projeto:', error)
    throw error
  }

  return data
}

export async function updatePortfolioProject(id: string, updates: Partial<PortfolioProject>): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar projeto:', error)
    throw error
  }

  return data
}

export async function deletePortfolioProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar projeto:', error)
    throw error
  }
}

// Funções com nomes antigos para compatibilidade
export const getPortfolioSites = getPortfolioProjects
export const createPortfolioSite = createPortfolioProject
export const updatePortfolioSite = updatePortfolioProject
export const deletePortfolioSite = deletePortfolioProject