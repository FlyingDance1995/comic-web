<script setup>
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const configStore = useConfigStore();

const slug = route?.params?.slug;
const chapter = route?.params?.chapter;

const data = ref(null);

const getData = async () => {
    try {
        const { data: story } = await useAPI(`/story/${slug}/chapter/${chapter}`);
        data.value = story?.value;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug && chapter) await getData();

const reportError = () => {
    console.log(data.value)
    configStore.setStoryReportError({
        ...data.value,
        results: data.value?.list_chapter
    });
    setTimeout(() => configStore.setReportErrorModal(true), 100);
};
</script>

<template>
    <div class="container page-chapter-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb :name="`Chương ${data?.chapter_number || ''}`">
            <li class="breadcrumb-item">
                <NuxtLink :to="`/${data?.story?.slug}`">{{data?.story?.name}}</NuxtLink>
            </li>
        </CommonBreadCrumb>
        <!--end breadcrumb-->

        <div class="card">
            <div class="card-body">
                <h1 class="card-title">{{data?.name}} - Chương {{data?.chapter_number}}</h1>

                <p class="bg-light-info p-3 radius-10 mt-3">
                    Cập nhật lúc: {{ formattedFullDate(data?.list_chapter?.find(x => x?.chapter_number === data?.chapter_number)?.modification_time)}}<br>
                    Lượt xem: 54
                </p>


                <div class="chapter-content">
                    <div class="content-container mt-4" id="chapter-content-render"
                         style="font-family: Roboto, sans-serif; font-size: 18px; line-height: 140%;"
                         v-html="data?.content">
                    </div>
                </div>

                <!--                <div class="my-3 mx-lg-4 mx-2">-->
                <!--                    <a href="https://goeco.mobi/lUtqaGcJ" target="_blank">-->
                <!--                        <img src="https://monkeyd.vn/images/banner/lazada-1.jpg" alt="" style="width: 100%; max-width: 500px; display: block; margin: 0 auto; border-radius: 5px;">-->
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

    <ReadStoryChapterFooter :chapter="chapter" :list-chapter="data?.list_chapter" :slug="slug" :chapter_number="data?.chapter_number"/>
</template>
