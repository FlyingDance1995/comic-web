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
         :class="{'active': active}">
<!--         style="width: 612px; margin-right: 40px;">-->
        <div class="grid grid-cols-1 gap-y-4">
            <div v-for="(item, index) in data"
                 :key="index"
                 class="d-flex space-x-3 pt-2 px-2">
                <div class="flex-shrink-0">
                    <NuxtLink :to="`/${item?.slug}`"
                       :title="item?.name"
                       class="text-title font-weight-bold thumbnail-wrap">
                        <img onerror="this.src='/no-image.png'"
                             class="lazyload h-32 w-24 shadow-xl rounded"
                             :alt="`${item?.name}`"
                             :data-src="`${item?.avatar}`"
                             :src="`${item?.avatar}`"
                             width="200" height="260">
                    </NuxtLink>
                </div>

                <div class="space-y-2">
                    <div>
                        <NuxtLink :to="`/${item?.slug}`"
                           :title="item?.name"
                           class="text-title fw-bold">
                            {{item?.name}}
                        </NuxtLink>
                    </div>

                    <div class="text-gray-500 text-overflow-multiple-lines">
                        {{ item.description ? `${item.description.slice(0, 165)}...` : '' }}
                    </div>

                    <div class="d-flex justify-content-between items-center space-x-2 pt-1">
                        <div class="d-flex grow-0 align-items-center space-x-1">
                            <NuxtLink :to="`/nhom-dich/${item?.team?.slug}`"
                               class="text-title">
                                <i class="bx bx-user"
                                   style="margin-right: 5px;"></i>
                                {{item?.team?.name || 'No name'}}
                            </NuxtLink>
                        </div>
                    </div>

                    <NuxtLink :to="`/${item?.slug}`"
                              class="btn btn-sm btn-primary p-2">
                        Đọc ngay
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recommendedStory.owl-carousel .owl-item img {
    width: 12rem;
}

.h-32 {
    height: 16rem;
}

.text-overflow-multiple-lines {
    -webkit-line-clamp: 3;
}

.owl-item .thumbnail-wrap {
    overflow: hidden;
    width: 100%;
    display: block;
    border-radius: 0.375rem;
}

.owl-item .thumbnail-wrap img {
    transition: transform  .3s;
}

.owl-item:hover .thumbnail-wrap img {
    transform: scale(1.2);
}

@media screen and (max-width: 768px) {
    .recommendedStory.owl-carousel .owl-item img {
        width: 10rem;
    }

    .h-32 {
        height: 14rem;
    }
}
</style>
