<script setup>
const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    active: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="owl-item"
         :class="{'active': active}"
         style="width: 612px; margin-right: 40px;">
        <div class="grid grid-cols-1 gap-y-4">
            <div v-for="(item, index) in data"
                 :key="index"
                 class="d-flex space-x-3 pt-2 px-2">
                <div class="flex-shrink-0">
                    <a :href="`/${item?.slug}`"
                       :title="item?.name"
                       class="text-title font-weight-bold">
                        <img onerror="this.src='/no-image.png'"
                             class="lazyload h-32 w-24 shadow-xl rounded"
                             :alt="`${item?.name}`"
                             :data-src="`${item?.avatar}`"
                             :src="`${item?.avatar}`"
                             width="200" height="260">
                    </a>
                </div>

                <div class="space-y-2">
                    <div>
                        <a :href="`/${item?.slug}`"
                           :title="item?.name"
                           class="text-title fw-bold">
                            {{item?.name}}
                        </a>
                    </div>

                    <div class="text-gray-500 text-overflow-multiple-lines">
                        {{ item.description ? `${item.description.slice(0, 165)}...` : '' }}
                    </div>

                    <div
                        class="d-flex justify-content-between items-center space-x-2 pt-1">
                        <div class="d-flex grow-0 align-items-center space-x-1">
                            <a :href="`/nhom-dich/${item?.team?.slug}`"
                               class="text-title">
                                <i class="bx bx-user"
                                   style="margin-right: 5px;"></i>
                                {{item?.team?.name || 'No name'}}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
