import { ref } from "vue";

type RequestOptions = {
    url: string
    method?: string
    headers?: HeadersInit
    body?: any
}

export function useApi() {
    const data = ref<any>(null)
    const error = ref<string | null>(null)
    const loading = ref(false)
    const success = ref(false)

    async function request(options: RequestOptions) {
        loading.value = true
        error.value = null
        success.value = false
        data.value = null

        try {
            const response = await fetch(options.url, {
                method: options.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Ошибка запроса')
            }

            data.value = result
            success.value = true

        } catch (e: any) {
            error.value = e.message || 'Незвестная ошибка'

        } finally {
            loading.value = false
        }
    }

    return {
        data,
        error,
        loading,
        success,
        request,
    }
}
