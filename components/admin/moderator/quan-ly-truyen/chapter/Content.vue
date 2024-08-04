<script setup>
const route = useRoute();

const slug = route?.params?.slug || '';

const story = ref();
const dataDetail = ref();
const formRef = ref();

const getData = async () => {
    try {
        story.value = await useNuxtApp().$api(`/moderator/story/${slug}`);
    } catch (e) {
        console.log("error", e);
    }
};
await getData();

const handleDetailOrUpdate = async (row) => {
    try {
        dataDetail.value = await useNuxtApp().$api(`moderator/story/${slug}/chapter/${row?.slug}`);
        formRef.value.status = 'detail';
    } catch (e) {
        console.log(e);
    }
};

const handleAdd = () => {
    dataDetail.value = {};
    formRef.value.status = 'add';
};

const handleSuccess = () => {
    dataDetail.value = null;
    formRef.value.status = 'add';
};
</script>

<template>
    <div class="d-flex justify-content-between gap-4 flex-1 h-100">
        <div class=" h-100 flex-column d-flex"
             :class="dataDetail ? 'w-50' : 'w-100'">
            <AdminModeratorQuanLyTruyenChapterHeaderAction :story="story" @onAdd="handleAdd"/>

            <AdminModeratorQuanLyTruyenChapterTableData :story="story" @onDetailOrUpdate="handleDetailOrUpdate"/>
        </div>

        <div v-show="dataDetail" style="width: 1px; height: 100%; background: #C7CDCF;"/>

        <AdminModeratorQuanLyTruyenChapterCurdForm v-show="dataDetail"
                                                   ref="formRef"
                                                   :story="story"
                                                   :dataDetail="dataDetail"
                                                    @onSuccess="handleSuccess"/>
    </div>
</template>
