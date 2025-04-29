<template>
  <div class="container mx-auto py-8">
    <div class="mb-6">
      <UiButton variant="outline" @click="navigateTo('/demandes')">
        <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
        Retour
      </UiButton>
    </div>

    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <h1 class="text-2xl font-bold mb-4">Détails de la demande #{{ demande?.id }}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Statut</h3>
          <p>{{ demande?.status?.nom }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Plateforme</h3>
          <p>{{ demande?.serviceplatfom?.nom }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Description</h3>
          <p>{{ demande?.description }}</p>
        </div>
      </div>

      <UiTabs default-value="clusters" class="w-full">
        <UiTabsList class="flex overflow-x-auto py-2">
          <template v-for="(tab, index) in tabs" :key="index">
            <UiTabsTrigger 
              :value="tab.value"
              class="px-4 py-2 whitespace-nowrap"
              :disabled="!hasData(tab.dataKey)"
            >
              {{ tab.title }}
              <span v-if="hasData(tab.dataKey)" class="ml-1 text-xs bg-gray-200 rounded-full px-2 py-0.5">
                {{ getDataCount(tab.dataKey) }}
              </span>
            </UiTabsTrigger>
          </template>
        </UiTabsList>

        <template v-for="(tab, index) in tabs" :key="index">
          <UiTabsContent :value="tab.value" class="pt-4">
            <div v-if="hasData(tab.dataKey)">
              <UiDatatable 
                :key="tab.dataKey" 
                :data="getData(tab.dataKey)"
                :columns="tab.columns"
                :options="tableOptions"
              />
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              Aucun {{ tab.title.toLowerCase() }} associé à cette demande
            </div>
          </UiTabsContent>
        </template>
      </UiTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDemandeStore } from '~/stores/demande.store'

const route = useRoute()
const demandeStore = useDemandeStore()
const demande = ref<any>(null)

const tableOptions = {
  dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
  buttons: [
    {
      extend: 'colvis',
      text: 'Colonnes',
      columns: ':not(.no-export)',
    },
    'copy',
    'excel',
    'pdf',
    'print',
    'csv',
  ],
  responsive: true,
  autoWidth: true,
  select: true,
  searching: true,
  paging: true,
  info: true
}

const tabs = [
  {
    value: 'clusters',
    title: 'Clusters',
    dataKey: 'clusters',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'nomDuRessourceGroupPackageServiceGuard', title: 'Nom RGPSG' },
      { data: 'adresseIp', title: 'Adresse IP' },
      { data: 'listeDesServeursConcernes', title: 'Serveurs concernés' },
      { data: 'logicielCluster', title: 'Logiciel Cluster' },
      { data: 'version', title: 'Version' },
      { data: 'mode', title: 'Mode' },
      { data: 'serveurActif', title: 'Serveur actif' },
      { data: 'complementsInformations', title: 'Compléments' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'logfiles',
    title: 'Logfiles',
    dataKey: 'logfiles',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'rgSgSiCluster', title: 'Cluster' },
      { data: 'logfile', title: 'Fichier' },
      { data: 'localisation', title: 'Localisation' },
      { data: 'description', title: 'Description' },
      { data: 'formatLogfile', title: 'Format' },
      { data: 'separateur', title: 'Séparateur' },
      { data: 'intervalleDePolling', title: 'Intervalle' },
      { data: 'monitoredBy_id', title: 'Monitoré par' },
      { data: 'fourniEnAnnexe', title: 'Annexe' },
      { data: 'refService', title: 'Service' },
      { data: 'nomTemplate', title: 'Template' },
      { data: 'logConditions', title: 'Conditions' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'serveurs',
    title: 'Serveurs',
    dataKey: 'serveurs',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'platforme_id', title: 'Plateforme ID' },
      { data: 'hostname', title: 'Hostname' },
      { data: 'fqdn', title: 'FQDN' },
      { data: 'type_id', title: 'Type ID' },
      { data: 'modele', title: 'Modèle' },
      { data: 'os_id', title: 'OS ID' },
      { data: 'verTechFirmware_id', title: 'Firmware ID' },
      { data: 'cluster', title: 'Cluster' },
      { data: 'ipSource', title: 'IP Source' },
      { data: 'description', title: 'Description' },
      { data: 'socleStandardOmu_id', title: 'Socle OMU ID' },
      { data: 'complementsInformations', title: 'Compléments' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'processes',
    title: 'Processus',
    dataKey: 'processes',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'process', title: 'Process' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'messageAlarme', title: 'Message Alarme' },
      { data: 'intervalleDePolling', title: 'Intervalle' },
      { data: 'objet', title: 'Objet' },
      { data: 'nomTemplate', title: 'Template' },
      { data: 'monitoredBy_id', title: 'Monitoré par' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'requetes',
    title: 'Requêtes SQL',
    dataKey: 'requetessqls',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'rgSgSiCluster', title: 'Cluster' },
      { data: 'requeteSql', title: 'Requête SQL' },
      { data: 'usernameDbName', title: 'Utilisateur DB' },
      { data: 'resultatAttenduDeLaRequete', title: 'Résultat attendu' },
      { data: 'performAction', title: 'Action' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'messageAlarme', title: 'Message Alarme' },
      { data: 'instructions', title: 'Instructions' },
      { data: 'intervalleDePolling', title: 'Intervalle' },
      { data: 'refService', title: 'Service' },
      { data: 'objet', title: 'Objet' },
      { data: 'monitoredBy_id', title: 'Monitoré par' },
      { data: 'nomTemplate', title: 'Template' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'scripts',
    title: 'Scripts',
    dataKey: 'scripts',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'rgSgSiCluster', title: 'Cluster' },
      { data: 'script', title: 'Script' },
      { data: 'codeErreur', title: 'Code Erreur' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'description', title: 'Description' },
      { data: 'instructions', title: 'Instructions' },
      { data: 'monitoredBy_id', title: 'Monitoré par' },
      { data: 'refService', title: 'Service' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'traps',
    title: 'Traps SNMP',
    dataKey: 'trapssnmps',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'signification', title: 'Signification' },
      { data: 'versionSnmp_id', title: 'Version SNMP' },
      { data: 'oid', title: 'OID' },
      { data: 'specificTrap', title: 'Trap spécifique' },
      { data: 'variableBinding', title: 'Variable Binding' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'messageAlarme', title: 'Message Alarme' },
      { data: 'instructions', title: 'Instructions' },
      { data: 'acquittement', title: 'Acquittement' },
      { data: 'mibAssocie', title: 'MIB associé' },
      { data: 'objet', title: 'Objet' },
      { data: 'compelementInformation', title: 'Information complémentaire' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'urls',
    title: 'URLs',
    dataKey: 'urls',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'refComposant', title: 'Composant' },
      { data: 'rgSgSiCluster', title: 'Cluster' },
      { data: 'url', title: 'URL' },
      { data: 'performAction', title: 'Action' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'messageAlarme', title: 'Message Alarme' },
      { data: 'instructions', title: 'Instructions' },
      { data: 'intervalleDePolling', title: 'Intervalle' },
      { data: 'refService', title: 'Service' },
      { data: 'objet', title: 'Objet' },
      { data: 'monitoredBy_id', title: 'Monitoré par' },
      { data: 'nomTemplate', title: 'Template' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  },
  {
    value: 'logfilespatterns',
    title: 'Patterns Logfiles',
    dataKey: 'logfilespatterns',
    columns: [
      { data: 'id', title: 'ID' },
      { data: 'nRef', title: 'N° Réf' },
      { data: 'ref', title: 'Référence' },
      { data: 'etat_id', title: 'État ID' },
      { data: 'signification', title: 'Signification' },
      { data: 'identification', title: 'Identification' },
      { data: 'criticite_id', title: 'Criticité ID' },
      { data: 'messageAlarme', title: 'Message Alarme' },
      { data: 'instructions', title: 'Instructions' },
      { data: 'performAction', title: 'Action' },
      { data: 'acquittement', title: 'Acquittement' },
      { data: 'complementsInformations', title: 'Compléments' },
      { data: 'refService', title: 'Service' },
      { data: 'objet', title: 'Objet' },
      { data: 'logfile_id', title: 'Logfile ID' },
      { data: 'demande_id', title: 'Demande ID' }
    ]
  }
]

const hasData = (key: string) => {
  return demande.value?.[key]?.length > 0
}

const getData = (key: string) => {
  return demande.value?.[key] || []
}

const getDataCount = (key: string) => {
  return demande.value?.[key]?.length || 0
}

onMounted(async () => {
  await demandeStore.fetchDemandes()
  const demandeId = Number(route.params.id)
  demande.value = demandeStore.getDemandeById(demandeId)
  
  if (!demande.value) {
    console.error(`Demande avec ID ${demandeId} non trouvée`)
    return
  }
  
  console.log('Données de la demande:', demande.value)
})
</script>