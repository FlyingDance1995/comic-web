<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: null
    }
});
</script>

<template>
    <div class="col-md-3 col-4">
        <div class="card">
            <div class="position-relative">
                <a :href="`/${item.slug}`">
                    <img onerror="this.src=`/no-image.png`"
                         class="lazyload card-img-top" :alt="`${item.name}`"
                         :data-src="`${item.avatar}`" :src="`${item.avatar}`"
                         width="200"
                         height="260">
                </a>

                <div class="story-meta-data d-flex justify-content-start">
                    <span>
                        <i class="bx bx-show"></i>
                        {{
                            item.statistics.total_watched?.toLocaleString()?.replace('.', ',')
                        }}
                    </span>

                    <span>
                        <i class="bx bx-bookmark-alt"></i>
                        {{
                            item.statistics.total_follow?.toLocaleString()?.replace('.', ',')
                        }}
                    </span>
                </div>

                <div v-if="item.statistics.status === 'finish'"
                     class="position-absolute top-0 end-0 m-1 product-discount">
                    <div class="hot-item"><span class="is-full">FULL</span></div>
                </div>
            </div>

            <div class="card-body">
                <h6 class="card-title cursor-pointer story-item-title">
                    <a :href="`/${item.slug}`">
                        {{ item.description }}
                    </a>
                </h6>

                <div class="d-flex justify-content-between">
                    <span class="chapter font-meta">
                        <a :href="`/${item.slug}/chuong-${item.last_chapter
                            ? item.last_chapter.chapter_number : 1}`">
                            Chương {{
                                item.last_chapter ? item.last_chapter.chapter_number : 1
                            }}
                        </a>
                    </span>

                    <span class="post-on font-meta">{{timeAgo(item?.modification_time)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
