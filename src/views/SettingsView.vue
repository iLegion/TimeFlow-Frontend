<script setup lang="ts">
import { ref } from 'vue'
import SettingsProfileLogout from '@/components/Settings/Profile/SettingsProfileLogout.vue'

const tab = ref<'profile' | 'general'>('profile');
</script>

<template>
  <q-card>
    <q-tabs
      v-model="tab"
      class="text-dark"
      align="left"
      narrow-indicator
      dense
      no-caps
    >
      <q-tab name="profile" label="Profile" content-class="tab" />
      <q-tab name="general" label="General" content-class="tab" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="profile">
        <div>
          <SettingsProfileLogout class="q-mb-md" />

          <q-separator />

          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>

      </q-tab-panel>

      <q-tab-panel name="general">
        <q-btn>Log out</q-btn>

        <q-separator />

        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<style scoped>

</style>