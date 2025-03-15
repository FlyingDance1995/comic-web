<script setup>
const route = useRoute();
const router = useRouter();

const slug = route?.params?.slug;

const {data: story, error, status} = await useAPI(`/story/${slug}`);
if (error?.value?.statusCode === 404) {
    throw createError({
        statusCode: 404,
        fatal: true,
        statusMessage: 'Page Not Found'
    });
} else if (!story.value) {
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
