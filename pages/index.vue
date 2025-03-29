<script setup>
import {usecreateStore1, useStoryStore, useStoryStore1, useRecommendedStoryStore, useStoryHotStore1} from '@/store/storys'

const params = {
    ordering: "-modification_time"
};

const params1 = {
    status: "finish"
};

const params_hots = {
    ordering: "hot",
    page: 1,
    size: 20
};

const params_creative = {
    ordering: '-modification_time',
    type: 'composed',
    page: 1,
    size: 20
};

const params_recommended = {
    ordering: 'recommended',
    page: 1,
    size: 20
};

try {
    await Promise.all([
        useRecommendedStoryStore().fetchStorys(params_recommended),
        useStoryHotStore1().fetchStorys(params_hots),
        useStoryStore().fetchStorys(params),
        usecreateStore1().fetchStorys(params_creative),
        useStoryStore1().fetchStorys(params1),
    ]);
} catch (error) {
    console.error('Có lỗi xảy ra:', error);
}
</script>

<template>
    <HomeContent/>
</template>
