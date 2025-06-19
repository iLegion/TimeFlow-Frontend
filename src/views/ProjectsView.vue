<script setup lang="ts">
import { ref } from 'vue'
import { QDialog } from 'quasar'
import ProjectList from '@/components/Project/ProjectList.vue'
import useProjectApi from '@/api/project.http.ts'
import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'
import ProjectForm from '@/components/Project/ProjectForm.vue'

const projectApi = useProjectApi()

const projects = ref<ProjectInterface[]>([])
const isLoadingList = ref<boolean>(true)
const refDialog = ref<QDialog | null>(null)
const showDialog = ref<boolean>(false)

const getProjects = async () => {
  try {
    const response = await projectApi.get()

    projects.value = response.data ?? []
  } catch (e) {
    console.log(e)
  } finally {
    isLoadingList.value = false
  }
}

const handleCreateProject = () => {
  showDialog.value = true
}
const handleDeleteProject = async (id: number) => {
  try {
    await projectApi.destroy(id)

    projects.value = projects.value?.filter(project => project.id !== id)
  } catch (e) {
    console.log(e)
  }
}
const handleCreated = async (project: ProjectInterface) => {
  projects.value = [...projects.value, project]

  refDialog.value?.hide()
}

getProjects()
</script>

<template>
  <main>
    <q-card class="filters bg-white">
      <q-card-section class="full-height" horizontal>
        <div class="col-11">Filters</div>
        <div class="flex items-center">
          <q-btn @click="handleCreateProject">Create</q-btn>
        </div>
      </q-card-section>
    </q-card>

    <ProjectList
      v-if="!isLoadingList"
      class="q-py-xl"
      :projects="projects"
      @delete="handleDeleteProject"
    />

    <q-dialog ref="refDialog" v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="flex justify-center">
          <q-card-section style="width: 450px">
            <ProjectForm
              :project="null"
              mode="create"
              @saved="handleCreated"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>
  </main>
</template>

<style scoped>
.filters {
  height: 88px;
}
</style>