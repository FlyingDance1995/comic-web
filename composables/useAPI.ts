// @ts-ignore
import type { UseFetchOptions } from 'nuxt/app'
// @ts-ignore
import type {Ref} from "vue";

export function useAPI<T>(
    url: string | (() => string),
    options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> },
) {
    return useFetch(url, {
        ...options,
        // @ts-ignore
        $fetch: useNuxtApp().$api
    })
}
