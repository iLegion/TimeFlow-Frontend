import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserInterface } from "@/interfaces/user/user.interface.ts";

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface | null>(null)

  const setUser = (data: UserInterface | null) => user.value = data

  return { user, setUser }
})
