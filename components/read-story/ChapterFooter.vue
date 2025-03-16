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

const user = ref();
const checkVIP = ref(false);

const indexCurrentChapter = computed(() => props.listChapter.findIndex(o => o?.slug === props.chapter));

const handleChange = (e) => {
    // window.location.href = e.target.value;
    // router.push(e.target.value)
    const item = props.listChapter?.find(x => x?.slug === e.target.value)
    if (item?.is_lock) {
        e.target.value = props.chapter;
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần mua chương này để có thể đọc.',
            type: 'error'
        });
    }
    router.push(item?.slug)
};

const openSetting = () => {
    configStore.setSettingModal(true);
};

const handleNext = () => {
    if (props.listChapter?.find((_, index) => indexCurrentChapter.value === index + 1)?.is_lock) {
        configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần mua chương này để có thể đọc.',
            type: 'error'
        });
    }
}

const handlePrev = () => {
    if (props.listChapter?.find((_, index) => indexCurrentChapter.value === index - 1)?.is_lock) {
        configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần mua chương này để có thể đọc.',
            type: 'error'
        });
    }
}

if (process.client) {
    const userStore = useUserStore();
    user.value = userStore.$state.user;
    checkVIP.value = userStore.checkVIP();
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
