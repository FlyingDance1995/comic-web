<script setup>
import {useConfigStore} from "~/store/config.js";
import { formattedNameChaper } from "~/utils/formatName.js";

import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const configStore = useConfigStore();

const slug = route?.params?.slug;
const chapter = route?.params?.chapter || '';

const initStyle = {
    'font-family': 'Roboto, sans-serif',
    'font-size': '18px',
    'line-height': '140%',
}

const data = ref(null);
const styles = reactive(initStyle);

const getData = async () => {
    const { data: story } = await useAPI(`/story/${slug}/chapter/${chapter}`);
    data.value = story?.value;
    if (story.value === null) {
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

    window.addEventListener('localStorageChanged', (e) => {
        if (e?.detail?.key === 'settingFont') {
            styles['font-family'] = e?.detail?.form.fontFamily || 'Roboto, sans-serif';
            styles['font-size'] = e?.detail?.form.fontSize + 'px' || '18px';
            styles['line-height'] = e?.detail?.form.lineHeight + '%' || '140%';
        }
    });
});

onUnmounted(() => {
    window.removeEventListener('localStorageChanged');
});
</script>

<template>
    <Head>
        <Title>{{data?.name || data?.story?.name}} - {{ formattedNameChaper(data?.type) }} {{data?.chapter_number || ''}}: {{data?.name || ''}}</Title>
    </Head>

    <div class="container page-chapter-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb :name="`${formattedNameChaper(data?.type)} ${data?.chapter_number || ''}: ${data?.name || ''}`">
            <li class="breadcrumb-item">
                <NuxtLink :to="`/${data?.story?.slug}`">{{data?.story?.name}}</NuxtLink>
            </li>
        </CommonBreadCrumb>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body">
                <h1 class="card-title">{{data?.story?.name}} - {{ formattedNameChaper(data?.type) }} {{data?.chapter_number || ''}}: {{data?.name || ''}}</h1>

                <p class="bg-light-info p-3 radius-10 mt-3">
                    Cập nhật lúc: {{ formattedFullDate(data?.list_chapter?.find(x => x?.chapter_number === data?.chapter_number)?.modification_time)}}<br>
                    Lượt xem: {{data?.count_watched}}
                </p>

                <div class="chapter-content">
                    <div class="content-container mt-4 ql-editor" id="chapter-content-render"
                         :style="styles"
                         v-html="data?.content">
                    </div>
                </div>

                <!--                <div class="my-3 mx-lg-4 mx-2">-->
                <!--                    <a href="https://goeco.mobi/lUtqaGcJ" target="_blank">-->
                <!--                        <img src="https://Phê Truyện.vn/images/banner/lazada-1.jpg" alt="" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; border-radius: 5px;">-->
                <!--                    </a>-->
                <!--                </div>-->

                <div class="my-3 text-center">
                    <button type="button" class="btn btn-danger"
                            @click.prevent="reportError">
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

    <ReadStoryChapterFooter :chapter="chapter" :list-chapter="data?.list_chapter" :slug="slug" :chapter_number="data?.chapter_number || 1"/>
</template>
