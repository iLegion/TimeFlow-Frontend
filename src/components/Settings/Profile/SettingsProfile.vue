<script setup lang="ts">
import SettingsProfileForm from '@/components/Settings/Profile/SettingsProfileForm.vue'
import SettingsProfileEmailForm from '@/components/Settings/Profile/SettingsProfileEmailForm.vue'
import SettingsProfilePasswordForm from '@/components/Settings/Profile/SettingsProfilePasswordForm.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 q-mb-xl">
        <q-card class="q-pa-lg">
          <q-card-section horizontal>
            <SettingsProfileForm class="col-12 col-md-6 col-lg-4 col-xl-3" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 q-mb-xl">
        <q-card class="q-pa-lg">
          <q-card-section horizontal>
            <div class="text-h4 text-bold q-mb-lg">Security</div>
          </q-card-section>

          <q-card-section horizontal>
            <SettingsProfilePasswordForm class="col-12 col-md-4 col-lg-4 col-xl-3" />

            <div class="col-sm-0 col-md-2 col-lg-1 col-xl-1"></div>

            <SettingsProfileEmailForm class="col-12 col-md-4 col-lg-4 col-xl-3" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>