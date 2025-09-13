import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rerqskgasamvkatugkod.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlcnFza2dhc2FtdmthdHVna29kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3MTcwNzYsImV4cCI6MjA3MzI5MzA3Nn0.b0q-vzAjgVPiicSGIH_u6tONr2CpN7M4PGPG1bKAlfk'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type CarouselImage = {
  id: string
  filename: string
  url: string
  uploaded_at: string
}