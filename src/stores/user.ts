import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserInterface } from "@/interfaces/user/user.interface.ts";

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface | null>(null)
  const token = ref<string | null>(null)

  const setUser = (data: UserInterface) => user.value = data
  const setToken = (data: string) => token.value = data

  return { user, token, setUser, setToken }
})
