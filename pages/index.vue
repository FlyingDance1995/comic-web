<script setup>
import { useCategoryStore } from '@/store/category'
import { useStoryStore, useStoryStore1 } from '@/store/storys'

const params = {
    ordering: "-modification_time"
};

const params1 = {
    status: "finish"
};

await useStoryStore().fetchStorys(params);
await useStoryStore1().fetchStorys(params1);
await useCategoryStore().fetchCategory();
</script>
<template>
    <HomeContent/>
</template>
