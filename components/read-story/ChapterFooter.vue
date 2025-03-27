<script setup>
import { formattedNameChaper } from "~/utils/formatName.js";
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const props = defineProps({
    slug: {
        type: String,
        default: ''
    },
    chapter: {
        type: String,
        default: ''
    },
    listChapter: {
        type: Array,
        default: []
    },
    chapter_number: {
        type: Number,
        default: 1
    }
});

const router = useRouter();
const configStore = useConfigStore();
const userStore = useUserStore();

const user = computed(() => userStore.$state.user);

const indexCurrentChapter = computed(() => props.listChapter.findIndex(o => o?.slug === props.chapter));

const handleChange = (e) => {
    // window.location.href = e.target.value;
    const item = props.listChapter?.find(x => x?.slug === e.target.value)
    if (item?.is_lock) {
        e.target.value = props.chapter;
        return configStore.setSwal({
            open: true,
            title: 'Mua chương',
            text: `Bạn muốn mua chương này với ${item?.coin} coin?`,
            type: 'info',
            onSubmit: async () => {
                const res = await handleChapterBuy(item?.id, item?.coin, item?.slug);
                if (res === 'Đã mua chương này') {
                    e.target.value = item?.slug;
                }
                return res;
            }
        });
    }
    router.push(item?.slug)
};

const getInfo = async () => {
    try {
        const response = await useNuxtApp().$api('/profile');
        useUserStore().setUser({
            ...user.value,
            ...response
        })
    } catch (error) {
        console.log("error", error);
    }
};

const openSetting = () => {
    configStore.setSettingModal(true);
};

const handleNext = () => {
    const afterChapter = props.listChapter?.find((_, index) => indexCurrentChapter.value === index + 1);
    if (afterChapter?.is_lock) {
        configStore.setSwal({
            open: true,
            title: 'Mua chương',
            text: `Bạn muốn mua chương này với ${afterChapter?.coin} coin?`,
            type: 'info',
            onSubmit: async () => handleChapterBuy(afterChapter?.id, afterChapter?.coin, afterChapter?.slug)
        });
    }
}

const handlePrev = () => {
    const beforeChapter = props.listChapter?.find((_, index) => indexCurrentChapter.value === index - 1);
    if (beforeChapter?.is_lock) {
        configStore.setSwal({
            open: true,
            title: 'Mua chương',
            text: `Bạn muốn mua chương này với ${beforeChapter?.coin} coin?`,
            type: 'info',
            onSubmit: async () => handleChapterBuy(beforeChapter?.id, beforeChapter?.coin, beforeChapter?.slug)
        });
    }
}

const handleChapterBuy = async (id, coin, slug) => {
    try {
        if (!user.value) {
            return configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Bạn cần đăng nhập để có thể mua chương này.',
                type: 'error'
            });
        }

        if (user.value?.wallet?.balance < coin) {
            return await router.push('/user/nap-tien')
        }

        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/profile/chapter-buy', {
            method: "POST",
            body: {
                chapter: id
            }
        });
        await getInfo();
        await router.push(`/${props.slug}/${slug}`)
        configStore.setLoadingModal(false);
        return 'Đã mua chương này';
    } catch (e) {
        configStore.setLoadingModal(false);
        console.log("error", e?.response);
        return null;
    }
}
</script>

<template>
    <div class="chapter-footer bg-dark p-1">
        <div class="d-flex justify-content-center">
            <a href="javascript:void(0)"
               class="btn btn-sm btn-white m-2"
               @click.stop="openSetting">
                <i class="bx bx-font-family mr-0"></i>
            </a>

            <NuxtLink :to="`/${slug}`" class="btn btn-sm btn-white m-2">
                <i class="bx bx-list-ol mr-0"></i>
            </NuxtLink>

            <NuxtLink :to="chapter === listChapter[listChapter.length - 1]?.slug || listChapter?.find((_, index) => indexCurrentChapter === index - 1)?.is_lock
                        ? 'javascript:void(0)'
                        : `/${slug}/${listChapter?.find((_, index) => indexCurrentChapter === index - 1)?.slug}`"
               :class="chapter === listChapter[listChapter.length - 1]?.slug ? `btn-secondary` : 'btn-white'"
               class="btn btn-sm"
               style="margin: 0.3rem;"
               @click="handlePrev">
                <i class="bx bx-chevrons-left mr-0"></i>
            </NuxtLink>

            <select name="selected_chapter"
                    id="selected_chapter"
                    class="form-select"
                    @change="handleChange">
                <template v-for="item in listChapter"
                          :key="item?.id">
                    <option :value="item?.slug"
                            :selected="item?.slug === chapter">
                        {{ formattedNameChaper(item?.type) }} {{item?.chapter_number || ''}} 
                        <span v-if="item?.is_lock">🔒</span>
                    </option>
                </template>
            </select>

            <NuxtLink :to="chapter === listChapter[0]?.slug || listChapter?.find((_, index) => indexCurrentChapter === index + 1)?.is_lock
                        ? 'javascript:void(0)'
                        : `/${slug}/${listChapter?.find((_, index) => indexCurrentChapter === index + 1)?.slug}`"
               :class="chapter === listChapter[0]?.slug ? `btn-secondary` : 'btn-white'"
               class="btn btn-sm"
               style="margin: 0.3rem;"
               @click="handleNext">
              <i class="bx bx-chevrons-right mr-0"></i>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.chapter-footer {
    left: 0;
}
</style>
