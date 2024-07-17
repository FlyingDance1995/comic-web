<script setup>
const route = useRoute();

const slug = route?.params?.slug;

const data = ref(null);

const getData = async () => {
    try {
        const {data: story} = await useAPI(`/story/${slug}`);
        data.value = story?.value;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug) getData();
</script>

<template>
    <div class="container page-comics-detail">
        <!--breadcrumb-->
        <CommonBreadCrumb :name="data?.name"/>
        <!--end breadcrumb-->

        <ComicsDetailCard :data="data"/>

        <ComicsDetailRelatedStory :slug="slug"/>
    </div>
</template>
