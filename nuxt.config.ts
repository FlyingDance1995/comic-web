// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    css: ['view-ui-plus/dist/styles/viewuiplus.css', '~/assets/css/main.css'],

    app: {
        head: {
            htmlAttrs: {
                lang: "vi"
            },
            charset: 'utf-8',
            viewport: 'width=device-width,initial-scale=1',
            title: "Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất",
            meta: [
                {charset: 'utf-8'},
                {
                    name: 'title',
                    content: 'Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất'
                },
                {name: 'msapplication-TileColor', content: '#ffffff'},
                {name: 'msapplication-TileImage', content: '/images/favicon/logo.png'},
                {name: 'theme-color', content: '#ffffff'},
                {property: 'og:type', content: 'website'},
                {
                    name: 'description',
                    content: 'Phê Truyện nơi đọc truyện và cập nhập các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất'
                },
                {name: 'image', content: '/images/seo/seo-image.png'},
                {
                    property: 'og:title',
                    content: 'Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất'
                },
                {property: 'og:image', content: '/images/seo/seo-image.png'},
                {
                    property: 'og:description',
                    content: 'Phê Truyện nơi đọc truyện và cập nhập các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất'
                },
                {name: 'author', content: 'Phê Truyện'},
                {name: 'copyright', content: 'Copyright©2024 Phê Truyện. All Right Reserved.'},
                {property: 'og:url', content: process.env.NUXT_PUBLIC_SITE_URL},
                {property: 'og:locale', content: 'vi_VN'},
                {property: 'og:site_name', content: 'Phê Truyện'},
                {property: 'rating', content: 'general'},
                {property: 'distribution', content: 'global'},
                {
                    name: 'keywords',
                    content: 'Phê Truyện, truyện ngắn, ngôn tình, tiểu thuyết, trọng sinh, truyện chữ, tổng tài, đoản văn'
                },
            ],
            link: [
                // {rel: 'stylesheet', href: '/owlcarousel/assets/owl.carousel.min.css'},
                // {rel: 'stylesheet', href: '/owlcarousel/assets/owl.theme.default.min.css'},
                {rel: 'index', href: process.env.NUXT_PUBLIC_SITE_URL},
                {rel: 'icon', type: 'image/x-icon', href: '/images/favicon/logo.png'},
                {rel: 'shortcut icon', href: '/images/favicon/logo.png'},
                {rel: 'canonical', href: process.env.NUXT_PUBLIC_SITE_URL},
                {rel: 'dns-prefetch', href: '//fonts.googleapis.com'},
                {rel: 'dns-prefetch', href: '//googleads.g.doubleclick.net'},
                {rel: 'dns-prefetch', href: '//pagead2.googlesyndication.com'},
                {rel: 'dns-prefetch', href: '//www.google-analytics.com'},
                {rel: 'dns-prefetch', href: '//www.googletagservices.com'},
                {rel: 'dns-prefetch', href: '//www.facebook.com'},
                {rel: 'dns-prefetch', href: '//connect.facebook.net'},
                {rel: 'dns-prefetch', href: '//apis.google.com'},
                {rel: 'dns-prefetch', href: '//static.xx.fbcdn.net'},
                {href: process.env.NUXT_PUBLIC_SITE_URL},
            ],
            script: [
                {src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NUXT_PUBLIC_GOOGLE_TAG_ID}`, async: true},
                {
                    innerHTML: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', '${process.env.NUXT_PUBLIC_GOOGLE_TAG_ID}');
                  `,
                    type: 'text/javascript'
                },
                {
                    innerHTML: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "@id": "#website",
                        "name": "Phê Truyện",
                        "url": process.env.NUXT_PUBLIC_SITE_URL,
                        "description": "Phê Truyện nơi đọc truyện và cập nhập các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất",
                        "keywords": 'Phê Truyện, truyện ngắn, ngôn tình, tiểu thuyết, trọng sinh, truyện chữ, tổng tài, đoản văn',
                        "alternateName": "Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": `${process.env.NUXT_PUBLIC_SITE_URL}?s={search_term_string}`,
                            "query-input": "required name=search_term_string"
                        }
                    }),
                    type: 'application/ld+json'
                }
            ],
            __dangerouslyDisableSanitizersByTagID: {
                'gtag-inline-script': ['innerHTML'],
                'json-ld-script': ['innerHTML']
            },
        }
    },

    modules: [
        // "@nuxt/ui",
        "@nuxtjs/seo",
        '@pinia/nuxt',
    ],

    site: {
        url: process.env.NUXT_PUBLIC_SITE_URL,
        name: 'Phê Truyện',
        SITE_URL: process.env.NUXT_PUBLIC_SITE_URL,
        description: "Phê Truyện nơi đọc truyện và cập nhập các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất 2024",
        defaultLocale: "vi"
    },

    sitemap: {sources: ['/api/sitemap'],},

    seo: {
        redirectToCanonicalSiteUrl: true
    },

    runtimeConfig: {
        public: {
            SITE_URL: process.env.NUXT_PUBLIC_SITE_URL,
            apiEndpoint: process.env.NUXT_PUBLIC_API_URL,
            email: process.env.NUXT_PUBLIC_EMAIL,
            contactFb: process.env.NUXT_PUBLIC_CONTACT_FB,
            setTimeAff: process.env.NUXT_PUBLIC_SET_TIME_AFF,
        }
    },

    plugins: [
        {src: '~/plugins/jquery', mode: 'client'},
        {src: '~/plugins/owl-carousel', mode: 'client'},
        {src: '~/plugins/view-ui-plus', mode: 'client'},
    ],

    compatibilityDate: '2024-07-17',

    routeRules: {
        '/user/thong-tin-ca-nhan': { ssr: false },
        '/user/truyen-da-luu': { ssr: false },
        '/user/dich-gia-dang-theo-doi': { ssr: false },
        '/user/lich-su-doc-truyen': { ssr: false },
        '/user/tro-thanh-tac-gia': { ssr: false },
        '/user/mua-vip': { ssr: false },
        '/tim-kiem': { ssr: false },
        '/dang-truyen/*': { ssr: false },
        '/dang-truyen/quan-ly-truyen/*': { ssr: false },
        '/admin/*': { ssr: false },
        '/admin/quan-ly-truyen/*': { ssr: false },
    },

    // experimental: {
    //     viewTransition: true
    // },
})
