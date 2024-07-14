<script setup>

import { useStoryHotStore1 } from '@/store/storys'

const params_hots = {
    ordering: "hot",
    page: 1,
    size: 20
};
const storyStore = useStoryHotStore1();
await storyStore.fetchStorys(params_hots);
const { storys1, total1 } = storeToRefs(storyStore);
const loading = ref(false);
onMounted(() => {
    $(document).ready(function () {
        $(".creative-stories-slider").owlCarousel({
            items: 5,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1024: {
                    items: 4
                },
                1200: {
                    items: 5
                }
            }
        });
        loading.value = false;
    });
});

</script>

<template>
    <section class="creative-stories-home mt-5">
        <div class="container">
            <div class="top-ten-stories-area slider-recommend-right background-primary">
                <div class="total-item-show position-relative">
                    <h5 class="mb-0 text-uppercase"><i class="bx bx-star"></i> Truyện HOT </h5>
                    <hr>
                    <!-- <a href="/truyen-sang-tac"
                           class="read-more-story btn btn-outline-primary radius-30 btn-sm">Xem thêm</a> -->
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="creative-stories-slider owl-carousel owl-loaded owl-drag" id="propose-story-slider">
                            <div class="owl-stage-outer">
                                <div v-show="!loading" class="owl-stage">
                                    <div class="owl-item" v-for="(item, index) in storys1" :key="index" :item="item">
                                        <div class="single-story-block">
                                            <div class="single-story-wrap">
                                                <div class="single-story-img">
                                                    <a :href="`/${item.slug}`">
                                                        <img onerror="this.src=`/no-image.png`"
                                                            class="lazyload card-img-top" :alt="`${item.name}`"
                                                            :data-src="`${item.avatar}`" :src="`${item.avatar}`" width="200"
                                                            height="260">
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="single-story-details">
                                                <h3><a :href="`/${item.slug}`"> {{ item.name }}</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-show="loading" style="text-align: center">
                                    Loading...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
