<script setup>
const route = useRoute();

const slug = route?.params?.slug;

const data = ref(null);
// const description = ref(null);
// const title = ref('Phê Truyện - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất');
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
    // description = story?.description
    // title = story?.title
    
};

if (slug) await getData();

// if (description){
//     useHead({
//         title,
//         meta: [
//             { name: 'description', content: description }
//         ],
//     })
// }
</script>

<template>
    <Head>
        <Title>{{data?.name}}</Title>
    </Head>

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
