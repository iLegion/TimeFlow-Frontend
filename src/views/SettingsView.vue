<script setup lang="ts">
import { ref } from 'vue'
import SettingsProfile from '@/components/Settings/Profile/SettingsProfile.vue'

const tab = ref<'profile' | 'general'>('profile');
</script>

<template>
  <main>
    <q-tabs
      v-model="tab"
      class="tabs bg-white text-dark"
      align="left"
      narrow-indicator
      dense
      no-caps
    >
      <q-tab name="profile" label="Profile" content-class="tab" />
      <q-tab name="general" label="General" content-class="tab" />
    </q-tabs>

    <q-separator />

    <q-tab-panels class="tab-panels" v-model="tab" animated>
      <q-tab-panel name="profile" class="q-py-xl">
        <SettingsProfile />
      </q-tab-panel>

      <q-tab-panel name="general">
        <q-btn>Log out</q-btn>

        <q-separator />

        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </main>
</template>

<style lang="scss" scoped>
.tabs {
  height: 88px;
}

.tab-panels {
  background-color: $grey-2;
}
</style>