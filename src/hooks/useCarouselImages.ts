import { useState, useEffect } from 'react'
import { supabase, CarouselImage } from '@/lib/supabase'
import { toast } from 'sonner'

export const useCarouselImages = () => {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch images from Supabase
  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('uploaded_at', { ascending: false })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error fetching images:', error)
      toast.error('Erro ao carregar imagens')
    } finally {
      setLoading(false)
    }
  }

  // Upload image to Supabase Storage and save metadata
  const uploadImage = async (file: File): Promise<void> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `carousel/${fileName}`

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('carousel_images')
        .insert({
          filename: file.name,
          url: publicUrl,
          uploaded_at: new Date().toISOString()
        })

      if (dbError) throw dbError

      toast.success('Imagem enviada com sucesso!')
      fetchImages() // Refresh the list
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Erro ao enviar imagem')
    }
  }

  // Delete image from storage and database
  const deleteImage = async (image: CarouselImage): Promise<void> => {
    try {
      // Extract file path from URL
      const urlParts = image.url.split('/')
      const filePath = `carousel/${urlParts[urlParts.length - 1]}`

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([filePath])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', image.id)

      if (dbError) throw dbError

      toast.success('Imagem removida com sucesso!')
      fetchImages() // Refresh the list
    } catch (error) {
      console.error('Error deleting image:', error)
      toast.error('Erro ao remover imagem')
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return {
    images,
    loading,
    uploadImage,
    deleteImage,
    refetch: fetchImages
  }
}