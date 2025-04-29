<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\ClusterForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useClusterStore } from '@/stores/cluster.store'
import { useEnumStore } from '@/stores/enumStore'

defineProps<{ demandeId: number | null }>()
const clusterStore = useClusterStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  nomDuRessourceGroupPackageServiceGuard: '',
  adresseIp: '',
  listeDesServeursConcernes: '',
  logicielCluster: '',
  version: '',
  mode: '',
  serveurActif: '',
  complementsInformations: '',
  demande_id: null as number | null,
  serveurs_ids: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await clusterStore.createCluster(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      nomDuRessourceGroupPackageServiceGuard: '',
      adresseIp: '',
      listeDesServeursConcernes: '',
      logicielCluster: '',
      version: '',
      mode: '',
      serveurActif: '',
      complementsInformations: '',
      demande_id: props.demandeId,
      serveurs_ids: null
    }
    await clusterStore.fetchClusters()
  } catch (error) {
    console.error('Erreur lors de la création du cluster:', error)
  }
}

clusterStore.fetchClusters()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un cluster</h3>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Référence</label>
        <input
          v-model="form.ref"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium">État</label>
        <select
          v-model="form.etat_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="etat in enumStore.etats" :key="etat.id" :value="etat.id">
            {{ etat.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Nom du Resource Group</label>
        <input
          v-model="form.nomDuRessourceGroupPackageServiceGuard"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Adresse IP</label>
        <input
          v-model="form.adresseIp"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Serveurs concernés</label>
        <input
          v-model="form.listeDesServeursConcernes"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Logiciel Cluster</label>
        <input
          v-model="form.logicielCluster"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Version</label>
        <input
          v-model="form.version"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Mode</label>
        <input
          v-model="form.mode"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Serveur Actif</label>
        <input
          v-model="form.serveurActif"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Informations complémentaires</label>
        <textarea
          v-model="form.complementsInformations"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
      </div>
      <div>
        <UiButton type="submit" :disabled="clusterStore.loading || !demandeId">
          Ajouter le cluster
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Clusters associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Nom du Resource Group</th>
            <th class="border p-2">Adresse IP</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cluster in clusterStore.clustersByDemande(demandeId)"
            :key="cluster.id"
            class="border-b"
          >
            <td class="border p-2">{{ cluster.ref }}</td>
            <td class="border p-2">{{ cluster.nomDuRessourceGroupPackageServiceGuard }}</td>
            <td class="border p-2">{{ cluster.adresseIp }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="clusterStore.deleteCluster(cluster.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!clusterStore.clustersByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun cluster associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>