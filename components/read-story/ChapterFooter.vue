<script setup>
import { formattedNameChaper } from "~/utils/formatName.js";
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const props = defineProps({
    slug: {
        type: {
            type: String,
            default: ''
        }
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
const runtimeConfig = useRuntimeConfig();

const user = ref();
const checkVIP = ref(false);

const indexCurrentChapter = computed(() => props.listChapter.findIndex(o => o?.slug === props.chapter));

const handleChange = (e) => {
    // window.location.href = e.target.value;
    router.push(e.target.value)
};

const openSetting = () => {
    configStore.setSettingModal(true);
};

if (process.client) {
    const userStore = useUserStore();
    user.value = userStore.$state.user;
    checkVIP.value = userStore.checkVIP();

}

const checkCreationTime = (value) => {
    const currentTime = new Date();
    const timeDifference = currentTime - new Date(value * 1000);
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference >= (Number(runtimeConfig.public?.unlockTime) || 24);
};
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

            <NuxtLink :to="chapter === listChapter[listChapter.length - 1]?.slug
                        ? 'javascript:void(0)'
                        : `/${slug}/${listChapter?.find((_, index) => indexCurrentChapter === index - 1)?.slug}`"
               :class="chapter === listChapter[listChapter.length - 1]?.slug ? `btn-secondary` : 'btn-white'"
               class="btn btn-sm"
               style="margin: 0.3rem;">
                <i class="bx bx-chevrons-left mr-0"></i>
            </NuxtLink>

            <select name="selected_chapter"
                    id="selected_chapter"
                    class="form-select"
                    @change="handleChange">
                <template v-for="item in listChapter"
                          :key="item?.id">
                    <option v-if="checkVIP || (checkCreationTime(item?.creation_time) && !item?.is_lock)"
                            :value="item?.slug"
                            :selected="item?.slug === chapter">
                        {{ formattedNameChaper(item?.type) }} {{item?.chapter_number || ''}}
                    </option>
                </template>
            </select>

            <NuxtLink :to="chapter === listChapter[0]?.slug
                        ? 'javascript:void(0)'
                        : `/${slug}/${listChapter?.find((_, index) => indexCurrentChapter === index + 1)?.slug}`"
               :class="chapter === listChapter[0]?.slug ? `btn-secondary` : 'btn-white'"
               class="btn btn-sm"
               style="margin: 0.3rem;">
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
