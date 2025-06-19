<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuthApi from '@/api/auth.http.ts'
import { useUserStore } from '@/stores/user.ts'

const router = useRouter()
const authApi = useAuthApi()
const userStore = useUserStore()

const drawer = ref(false)

const isCurrentPage = (name: string) => {
  return router.currentRoute.value.name === name;
}

const handleSubmit = async () => {
  try {
    await authApi.logout()
    userStore.setUser(null)
    localStorage.removeItem('token')
    await router.push({ name: 'auth' })
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <q-drawer
    class="sidebar"
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    dark
  >
    <div class="column fit">
      <q-list padding>
        <q-item
          :active="isCurrentPage('home')"
          to="/"
          active-class="sidebar-item-active"
          dark
          clickable
        >
          <q-item-section avatar>
            <q-icon name="schedule" />
          </q-item-section>

          <q-item-section>
            Timer
          </q-item-section>
        </q-item>
        <q-item
          :active="isCurrentPage('projects')"
          to="/projects"
          active-class="sidebar-item-active"
          dark
          clickable
        >
          <q-item-section avatar>
            <q-icon name="folder_open" />
          </q-item-section>

          <q-item-section>
            Projects
          </q-item-section>
        </q-item>
      </q-list>

      <div class="col"></div>

      <q-list padding>
        <q-item
          :active="isCurrentPage('settings')"
          to="/settings"
          active-class="sidebar-item-active"
          dark
          clickable
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            Settings
          </q-item-section>
        </q-item>
        <q-item
          dark
          clickable
          @click="handleSubmit"
        >
          <q-item-section avatar>
            <q-icon name="output" />
          </q-item-section>

          <q-item-section>
            Log out
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-drawer>
</template>

<style lang="scss" scoped>
.sidebar {
  .sidebar-item-active {
    color: $grey-2;
    background-color: rgba(245, 245, 245, 0.15);
  }
}
</style>