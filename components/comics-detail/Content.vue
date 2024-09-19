<script setup>
const route = useRoute();

const slug = route?.params?.slug;

const { data } = defineProps({ data: { type: Object, required: true } });
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
