<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useProjectApi from '@/api/project.http.ts'
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'
import ProjectForm from '@/components/Project/ProjectForm.vue'

defineProps({
  id: String
})

const route = useRoute()
const projectApi = useProjectApi()
const project = ref<ProjectInterface|null>(null)

const getProject = async (id: string) => {
  try {
    const response = await projectApi.getByID(Number(id))

    if (response && response.data) {
      project.value = response.data
    }
  } catch (e) {
    console.error(e)
  }
}

watch(() => route.params.id, () => getProject(route.params.id as string), { immediate: true })
</script>

<template>
  <main>
    <q-card class="filters bg-white">Filters</q-card>

    <div class="q-py-xl">
      <q-card class="q-pa-lg">
        <q-card-section horizontal>
          <ProjectForm :project="project" mode="update" />
        </q-card-section>
      </q-card>
    </div>
  </main>
</template>

<style scoped>
.filters {
  height: 88px;
}
</style>