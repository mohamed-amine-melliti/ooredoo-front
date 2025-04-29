// interfaces/RequeteSQL.ts
import type { Etat } from './Common'
import type { Criticite } from './Common'
import type { MonitoredBy } from './Common'
import type { Demande } from './Demande'
import type { Serveur } from './Serveur'

export interface RequeteSQL {
  id: number
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  requeteSql: string
  usernameDbName: string
  resultatAttenduDeLaRequete: string
  performAction: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  intervalleDePolling: string
  refService: string
  objet: string
  monitoredBy_id: number
  nomTemplate: string
  demande_id: number
  
  // Relations
  etat?: Etat
  criticite?: Criticite
  monitoredby?: MonitoredBy
  demande?: Demande
  serveurs?: Serveur[]
}

export interface RequeteSQLCreatePayload {
  ref: string
  etat_id: number
  refComposant: string
  rgSgSiCluster: string
  requeteSql: string
  usernameDbName: string
  resultatAttenduDeLaRequete: string
  performAction: string
  criticite_id: number
  messageAlarme: string
  instructions: string
  intervalleDePolling: string
  refService: string
  objet: string
  monitoredBy_id: number
  nomTemplate: string
  demande_id: number
  serveurs_ids?: number
}