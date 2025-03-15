<script setup>
import { useConfigStore } from "~/store/config.js";
import { formattedNameChaper, getMax250Chars } from "~/utils/formatName.js";
import { useUserStore } from "~/store/user.js";

import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const router = useRouter();
const configStore = useConfigStore();

const slug = route?.params?.slug;
const chapter = route?.params?.chapter || '';

const initStyle = {
    'font-family': 'Roboto, sans-serif',
    'font-size': '18px',
    'line-height': '140%',
}

const data = ref(null);
const stateAffClick = ref(false);
const checkVIP = ref(false);
const styles = reactive(initStyle);

const getData = async () => {
    const { data: story, error, status } = await useAPI(`/story/${slug}/chapter/${chapter}`);
    data.value = story?.value;

    if (error?.value?.data?.error) {
        await router.push('/user/nap-tien');
    } else if (!story.value) {
        throw createError({
            statusCode: 404,
            fatal: true,
            statusMessage: 'Page Not Found'
        });
    }
};

if (slug && chapter) await getData();

const reportError = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể báo cáo lỗi.',
            type: 'error'
        });
    }

    configStore.setStoryReportError({
        ...data.value,
        results: data.value?.list_chapter
    });
    setTimeout(() => configStore.setReportErrorModal(true), 100);
};

const handleAffClick = () => {
    stateAffClick.value = true;
};

const handleChangeSetting = (e) => {
    if (e?.detail?.key === 'settingFont') {
        styles['font-family'] = e?.detail?.form.fontFamily || 'Roboto, sans-serif';
        styles['font-size'] = e?.detail?.form.fontSize + 'px' || '18px';
        styles['line-height'] = e?.detail?.form.lineHeight + '%' || '140%';
    }
};

if (process.client) {
    const userStore = useUserStore();
    watch(() => userStore.checkVIP(), (value) => {
        checkVIP.value = userStore.checkVIP();
    }, {immediate: true})
}

onMounted(() => {
    try {
        const settingFont = localStorage.getItem('settingFont');
        if (settingFont) {
            const parseSettingFont = JSON.parse(settingFont);
            styles['font-family'] = parseSettingFont?.fontFamily || 'Roboto, sans-serif';
            styles['font-size'] = parseSettingFont?.fontSize + 'px' || '18px';
            styles['line-height'] = parseSettingFont?.lineHeight + '%' || '140%';
        }
    } catch (e) {
        Object.assign(styles, {
            ...initStyle
        });
        console.log(e);
    }

    window.addEventListener('localStorageChanged', handleChangeSetting);

    if(sessionStorage.getItem('aff-chuong')) {
        stateAffClick.value = true;
    }
});

onUnmounted(() => {
    window.removeEventListener('localStorageChanged', handleChangeSetting);
});


useHead({
    title: `${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`,
    meta: [
        {
            name: 'title',
            content: `${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''} | Phê truyện`
        },
        {
            name: 'description',
            content: getMax250Chars(`${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`)
        },
        {
            name: "image",
            content: data.value?.story?.avatar?.replace("http://", "https://")
        }
    ],
});

useSeoMeta({
    title: `${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`,
    ogTitle: `${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`,
    description: getMax250Chars(`${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`),
    ogDescription: getMax250Chars(`${data.value?.name || data.value?.story?.name} - ${formattedNameChaper(data.value?.type)} ${data.value?.chapter_number || ''}: ${data.value?.name || ''}`),
    ogImage: data.value?.story?.avatar?.replace("http://", "https://"),
    twitterCard: 'summary_large_image',
});
</script>

<template>

    <Head>
        <Title>{{ data?.name || data?.story?.name }} - {{ formattedNameChaper(data?.type) }} {{ data?.chapter_number ||
            '' }}: {{ data?.name || '' }}</Title>
    </Head>

    <div class="container page-chapter-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb
            :name="`${formattedNameChaper(data?.type)} ${data?.chapter_number || ''}: ${data?.name || ''}`">
            <li class="breadcrumb-item">
                <NuxtLink :to="`/${data?.story?.slug}`">{{ data?.story?.name }}</NuxtLink>
            </li>
        </CommonBreadCrumb>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body">
                <h1 class="card-title">{{ data?.story?.name }} - {{ formattedNameChaper(data?.type) }}
                    {{ data?.chapter_number || '' }}: {{ data?.name || '' }}</h1>

                <p class="bg-light-info p-3 radius-10 mt-3">
                    Cập nhật lúc: {{formattedFullDate(data?.list_chapter?.find(x => x?.chapter_number ===
                        data?.chapter_number)?.modification_time)}}<br>
                    Lượt xem: {{ data?.count_watched }}
                </p>
                <div class="chapter-content">
                    <div v-if="stateAffClick || checkVIP" class="content-container mt-4 ql-editor" id="chapter-content-render"
                         :style="styles"
                         v-html="data?.content">
                    </div>

                    <ClientOnly v-else>
                        <ReadStoryAffContent @on-click-aff-chuong="handleAffClick"/>
                    </ClientOnly>
                </div>

                <ClientOnly>
                    <CommonAffHorizontal :location="4" style="margin: 0" />
                </ClientOnly>

                <div class="my-3 text-center">
                    <button type="button" class="btn btn-danger" @click.prevent="reportError">
                        Báo cáo nội dung vi phạm
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-5">
            <div class="card-body">
                <h5 class="mb-0 text-uppercase text-primary">Bình luận</h5>
                <hr>
                <ClientOnly>
                    <ComicsDetailComment />
                </ClientOnly>
            </div>
        </div>
    </div>

    <ClientOnly>
        <ReadStoryChapterFooter
          :chapter="chapter"
          :list-chapter="data?.list_chapter?.filter(item => !item?.is_lock)"
          :slug="slug"
          :chapter_number="data?.chapter_number || 1" />
    </ClientOnly>
</template>
