<script setup>
import {useUserStore} from "~/store/user.js";
import {useConfigStore} from "~/store/config.js";

const props = defineProps({
    location: {
        type: Number,
        required: true
    }
})

const userStore = useUserStore();
const configStore = useConfigStore();

const aff = computed(() => configStore.$state.affList?.find(x => x?.location === props.location));
const checkVIP = computed(() => userStore.checkVIP());
</script>

<template>
    <div v-if="!checkVIP"
         class="mt-3">
        <a :href="aff?.link" target="_blank">
            <img :src="aff?.banner"
                 alt="" style="width: 100%; display: block; margin: 0 auto; border-radius: 5px;">
        </a>
    </div>
</template>

<style scoped>

</style>
