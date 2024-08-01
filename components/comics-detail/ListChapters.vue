<script setup>
import { timeAgo } from "~/utils/formatTime.js";
import { formattedNameChaper } from "~/utils/formatName.js";

const route = useRoute();

const slug = route?.params?.slug;

const query = {
    size: 10000,
    page: 1,
};

const data = ref(null);

const getData = async () => {
    try {
        const { data: story } = await useAPI(`/story/${slug}/chapter`, {
            query: query
        });
        data.value = story?.value;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug) getData();

defineExpose({
    data
});
</script>
<template>
    <div class="list-chapters">
        <div v-for="item in data?.results" :key="item?.id" class="item d-flex justify-content-between">
            <div class="episode-title"
                 :class="{
                    visited: item?.watched
                 }">
                <NuxtLink :to="`/${slug}/${item?.slug}`">
                    {{ formattedNameChaper(item?.type) }} {{ item?.chapter_number }}: {{ item?.name }}
                </NuxtLink>
            </div>
            <div class="episode-date">
                <span>{{ timeAgo(item?.creation_time) }}</span>
            </div>
        </div>
    </div>
</template>
<style>
.list-chapters .item .episode-title.visited {
    color: #ccd0d5
}
</style>
