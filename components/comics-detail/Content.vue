<script setup>
import {getMax250Chars} from "~/utils/formatName.js";

const route = useRoute();

const slug = route?.params?.slug;

const data = ref(null);

const getData = async () => {
    const {data: story} = await useAPI(`/story/${slug}`);
    data.value = story?.value;
    if (story.value === null) {
        throw createError({
            statusCode: 404,
            fatal: true,
            statusMessage: 'Page Not Found'
        });
    }
};

if (slug) await getData();

useHead({
    title: `${data.value?.name}`,
    meta: [
        {
            name: 'title',
            content: `${data.value?.name} | Phê truyện`
        },
        {
            name: 'description',
            content: getMax250Chars(data.value?.description)
        },
    ],
});

useSeoMeta({
    description: getMax250Chars(data.value?.description),
    ogDescription: getMax250Chars(data.value?.description),
    ogImage: data.value?.avatar,
    twitterCard: 'summary_large_image',
});
</script>

<template>
    <div class="container page-comics-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb :name="data?.name"/>
        <!--end breadcrumb-->

        <ComicsDetailCard :data="data"/>

        <ClientOnly>
            <ComicsDetailRelatedStory/>
        </ClientOnly>
    </div>
</template>
