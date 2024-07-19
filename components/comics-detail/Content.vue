<script setup>
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
