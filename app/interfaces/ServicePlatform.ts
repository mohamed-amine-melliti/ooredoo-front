// interfaces/ServicePlatform.ts
import type { User } from './User'

export interface ServicePlatform {
  id: number
  user_id: number | null
  support_id: number | null
  nom: string
  created_at: string
  updated_at: string
  
  // Relations
  user?: User
  // support?: Support // Si vous avez une interface Support
}