<script setup lang="ts">
import { ref } from 'vue'
import { useDemandeStore } from '@/stores/demande.store'
import { useEnumStore } from '@/stores/enumStore'

defineProps<{ demandeId: number | null }>()
const emit = defineEmits(['created'])

const demandeStore = useDemandeStore()
const enumStore = useEnumStore()

// Supposons que user_id vient d'un store d'authentification ou d'une autre source
const userId = 1; // Remplace ceci par une récupération dynamique, par exemple : authStore.user.id

const form = ref({
  description: '',
  status_id: 1,
  user_id: userId, // Ajoute user_id ici
  serviceplatfom_id: null as number | null
})

const submitForm = async () => {
  try {
    console.log('Envoi du formulaire:', form.value)
    const newDemande = await demandeStore.createDemande(form.value)
    emit('created', newDemande.id)
    form.value = { description: '', status_id: 1, user_id: userId, serviceplatfom_id: null }
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error)
  }
}

enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Créer une demande</h3>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Statut</label>
        <select
          v-model="form.status_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="status in enumStore.status" :key="status.id" :value="status.id">
            {{ status.nom }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium">Plateforme de service</label>
        <select
          v-model="form.serviceplatfom_id" <!-- Corrigé ici -->
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option :value="null">Sélectionnez une plateforme</option>
          <option
v-for="platform in enumStore.servicePlatformes" 
                  :key="platform.id" 
                  :value="platform.id">
            {{ platform.nom }}
          </option>
        </select>
      </div>

      <div>
        <UiButton type="submit" :disabled="demandeStore.loading">
          Créer la demande
        </UiButton>
      </div>
    </form>
  </div>
</template>