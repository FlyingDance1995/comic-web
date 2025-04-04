export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: runtimeConfig.public.apiEndpoint,
        // @ts-ignore
        onRequest({ request, options, error }) {
            const access_token = useCookie('token').value;

            if (access_token && access_token !== 'null') {
                const headers = options.headers ||= {};
                if (Array.isArray(headers)) {
                    headers.push(['Authorization', `Token ${access_token}`]);
                } else if (headers instanceof Headers) {
                    headers.set('Authorization', `Token ${access_token}`);
                } else {
                    headers.Authorization = `Token ${access_token}`;
                }
            }
        },
        // @ts-ignore
        async onResponseError({ response }) {
            // if (response.status === 401) {
            //     await navigateTo('/login');
            // }
        }
    })

    return {
        provide: {
            api
        }
    }
})
