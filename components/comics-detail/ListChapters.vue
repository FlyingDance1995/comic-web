<script setup>
import { timeAgo } from "~/utils/formatTime.js";
import { formattedNameChaper } from "~/utils/formatName.js";
import {Tooltip} from "view-ui-plus";
import {useUserStore} from "~/store/user.js";

const route = useRoute();
const userStore = useUserStore();
const runtimeConfig = useRuntimeConfig();

const slug = route?.params?.slug;

const query = {
    size: 10000,
    page: 1,
};

const data = ref(null);
const user = computed(() => userStore.$state.user);

const getData = async () => {
    try {
        const response = await useNuxtApp().$api(`/story/${slug}/chapter`, {
            query: query
        });
        data.value = response;
    } catch (error) {
        console.log("error", error);
    }
};

const checkCreationTime = (value) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(value * 1000);
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < (Number(runtimeConfig.public?.unlockTime) || 24);
};

getData();

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
                <NuxtLink :to="!user?.is_vip && checkCreationTime(item?.creation_time) ? '' : `/${slug}/${item?.slug}`">
                    {{ formattedNameChaper(item?.type) }} {{ item?.chapter_number }}: {{ item?.name }}
                </NuxtLink>
            </div>

            <Tooltip v-if="!user?.is_vip && checkCreationTime(item?.creation_time)"
                     placement="bottom-end">
                <span class="me-2 icon-lock cursor-pointer">
                    <i class="bx bxs-lock"></i>
                </span>

                <template #content>
                    Nâng cấp Premium để được đọc
                    <br>
                    truyện mới nhất
                </template>
            </Tooltip>

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

.list-chapters .item .episode-date {
    width: 125px;
}

.list-chapters .icon-lock i {
    font-size: 16px;
    color: #212529;
}

.dark-theme .list-chapters .icon-lock i {
    color: #e4e5e6;
}
</style>
