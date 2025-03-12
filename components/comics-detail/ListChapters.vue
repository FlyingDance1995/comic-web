<script setup>
import { timeAgo } from "~/utils/formatTime.js";
import { formattedNameChaper } from "~/utils/formatName.js";
import {useUserStore} from "~/store/user.js";
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const configStore = useConfigStore();

const slug = route?.params?.slug;

const query = {
    size: 10000,
    page: 1,
};

const data = ref(null);

const user = computed(() => userStore.$state.user);
const checkVIP = computed(() => userStore.checkVIP());

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

const getInfo = async () => {
    try {
        const response = await useNuxtApp().$api('/profile');
        userStore.setUser({
            ...user.value,
            ...response
        })
    } catch (error) {
        console.log("error", error);
    }
};

const handleChapterBuy = async (item) => {
    if (!user.value) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể mua chương này.',
            type: 'error'
        });
    }
    
    if (user.value?.wallet?.balance < item?.coin) {
        return await router.push('/user/nap-tien')
    }

    configStore.setSwal({
        open: true,
        title: 'Mua chương',
        text: `Bạn muốn mua chương này với ${item?.coin} coin?`,
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api('/profile/chapter-buy', {
                    method: "POST",
                    body: {
                        chapter: item?.id
                    }
                });
                await getData();
                await getInfo();
                configStore.setLoadingModal(false);
                return 'Đã mua chương này';
            } catch (e) {
                configStore.setLoadingModal(false);
                console.log("error", e?.response);
                return null;
            }
        }
    });
};

getData();

defineExpose({
    data
});
</script>
<template>
    <div class="list-chapters">
        <div v-for="item in data?.results" :key="item?.id" class="item d-flex justify-content-between flex-wrap">
            <div class="episode-title"
                 :class="{
                    visited: item?.watched
                 }">
                <NuxtLink :to="!checkVIP && item?.is_lock
                        ? '#'
                        : `/${slug}/${item?.slug}`">
                    {{ formattedNameChaper(item?.type) }} {{ item?.chapter_number }}: {{ item?.name }}
                </NuxtLink>
            </div>

            <div class="d-flex gap-2 justify-content-end">
                <div v-if="!checkVIP && item?.is_lock"
                    class="d-flex gap-1 cursor-pointer text-primary align-items-center"
                    @click="handleChapterBuy(item)">
                    <i class="bx bxs-lock"></i>
                    <span>Mua ({{ item?.coin }} coin)</span>
                </div>

                <div class="episode-date text-end">
                    <span>{{ timeAgo(item?.creation_time) }}</span>
                </div>
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
