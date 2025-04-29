// interfaces/Serveur.ts
import type { Etat } from './Common'
import type { Platforme } from './Common'
import type { TypeServeur } from './Common'
import type { OS } from './Common'
import type { SocleStandardOMU } from './Common'
import type { VersionTechFirmware } from './Common'
import type { Demande } from './Demande'

export interface Serveur {
  id: number
  ref: string
  etat_id: number
  platforme_id: number
  hostname: string
  fqdn: string
  type_id: number
  modele: string
  os_id: number
  verTechFirmware_id: number | null
  cluster: string
  ipSource: string
  description: string
  socleStandardOmu_id: number
  complementsInformations: string
  demande_id: number
  
  // Relations
  etat?: Etat
  platforme?: Platforme
  typeserveur?: TypeServeur
  os?: OS
  soclestandardomu?: SocleStandardOMU
  ver_tech_firmware?: VersionTechFirmware
  demande?: Demande
}

export interface ServeurCreatePayload {
  ref: string
  etat_id: number
  platforme_id: number
  hostname: string
  fqdn: string
  type_id: number
  modele: string
  os_id: number
  verTechFirmware_id?: number | null
  cluster: string
  ipSource: string
  description: string
  socleStandardOmu_id: number
  complementsInformations: string
  demande_id: number
}