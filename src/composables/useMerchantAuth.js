import { ref, onMounted } from 'vue'
import axios from 'axios'

const merchant = ref(null)
const token = ref(null)
const isLoading = ref(true)
const error = ref(null)

export function useMerchantAuth() {
  const fetchMerchant = async () => {
    const shopUrl = window.location.hostname
    const apiUrl = import.meta.env.VITE_API_URL

    try {
      const { data } = await axios.get(`${apiUrl}/merchants`, {
        params: { shopUrl }
      })

      merchant.value = data.merchant

      const loginRes = await axios.post(`${apiUrl}/auth/login`, {
        appId: merchant.value.appId,
        appSecret: merchant.value.appSecret
      })

      token.value = loginRes.data.token
      localStorage.setItem('merchantToken', token.value)
    } catch (err) {
      error.value = err.message || 'Erreur lors de la récupération du marchand'
    } finally {
      isLoading.value = false
    }
  }
  onMounted(fetchMerchant)

  return {
    merchant,
    token,
    isLoading,
    error
  }
}
