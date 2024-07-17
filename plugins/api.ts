export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: process.env.NODE_ENV === 'development' ? runtimeConfig.public.apiEndpoint : '/api',
        // @ts-ignore
        onRequest({ request, options, error }) {
            // const access_token = localStorage.getItem('access_token');
            const access_token = null;

            if (access_token) {
                const headers = options.headers ||= {};
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `${access_token}`]);
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `${access_token}`);
                } else {
                    headers.Authorization = `${access_token}`;
                }
            }
        },
        // @ts-ignore
        async onResponseError({ response }) {
            if (response.status === 401) {
                await navigateTo('/login');
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})
