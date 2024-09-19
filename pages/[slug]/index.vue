<script setup>
const route = useRoute();

const slug = route?.params?.slug;

const {data: story} = await useAPI(`/story/${slug}`);
if (story.value === null) {
    throw createError({
        statusCode: 404,
        fatal: true,
        statusMessage: 'Page Not Found'
    });
}
</script>

<template>
    <CommonSEOHead :info="story"/>

    <ComicsDetailContent :data="story"/>
</template>
