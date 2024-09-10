<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: null
    }
});
</script>

<template>
    <div class="col-lg-3 col-md-4 col-6">
        <div class="card">
            <div class="position-relative">
                <NuxtLink :to="`/${item?.slug}`">
                    <img onerror="this.src=`/no-image.png`" class="lazyload card-img-top" :alt="`${item?.name}`"
                         :data-src="`${item?.avatar}`" :src="`${item?.avatar || ''}`" width="200" height="260">
                </NuxtLink>

                <slot/>

                <div class="story-meta-data d-flex justify-content-start">
                    <span>
                        <i class="bx bx-show"></i>
                        {{
                            item?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',')
                        }}
                    </span>

                    <span>
                        <i class="bx bx-bookmark-alt"></i>
                        {{
                            item?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',')
                        }}
                    </span>
                </div>

                <div v-if="item?.status === 'finish'" class="position-absolute top-0 end-0 m-1 product-discount">
                    <div class="hot-item">
                        <span class="is-full">FULL</span>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <h6 class="card-title cursor-pointer story-item-title">
                    <NuxtLink :to="`/${item?.slug}`">
                        {{ item.name }}
                    </NuxtLink>
                </h6>

                <div class="d-flex justify-content-between">
                    <span class="chapter font-meta">
                        <NuxtLink :to="`/${item?.slug}/chuong-${item?.last_chapter
                            ? item?.last_chapter?.chapter_number : 1}`">
                            Chương {{
                                item?.last_chapter ? item?.last_chapter?.chapter_number : 1
                            }}
                        </NuxtLink>
                    </span>

                    <span class="post-on font-meta">{{ timeAgo(item?.modification_time) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
