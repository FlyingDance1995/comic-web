<script setup>
import { formattedNameChaper } from "~/utils/formatName.js";
import {useConfigStore} from "~/store/config.js";

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

const configStore = useConfigStore();

const handleChange = (e) => {
    window.location.href = e.target.value;
};

const openSetting = () => {
    configStore.setSettingModal(true);
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

            <NuxtLink :to="chapter === listChapter[listChapter.length - 1]?.slug ? 'javascript:void(0)' : `/${slug}/${listChapter?.find(x => x?.chapter_number === chapter_number - 1)?.slug}`"
               :class="chapter === listChapter[listChapter.length - 1]?.slug ? `btn-secondary` : 'btn-white'"
               class="btn btn-sm"
               style="margin: 0.3rem;">
                <i class="bx bx-chevrons-left mr-0"></i>
            </NuxtLink>

            <select name="selected_chapter"
                    id="selected_chapter"
                    class="form-select"
                    @change="handleChange">
                <option v-for="item in listChapter"
                        :key="item?.id"
                        :value="item?.slug"
                        :selected="item?.slug === chapter">
                    {{ formattedNameChaper(item?.type) }} {{item?.chapter_number || ''}}
                </option>
            </select>

            <NuxtLink :to="chapter === listChapter[0]?.slug ? 'javascript:void(0)' : `/${slug}/${listChapter?.find(x => x?.chapter_number === chapter_number + 1)?.slug}`"
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
