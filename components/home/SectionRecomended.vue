<script setup>
import {useRecommendedStoryStore} from '@/store/storys'

const storyStore = useRecommendedStoryStore();

const {storys} = storeToRefs(storyStore);
const loading = ref(true);

onMounted(() => {
    $(document).ready(function () {
        $(".recommendedStory").owlCarousel({
            margin: 40,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            smartSpeed: 500,
            autoplayTimeout: 3000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                900: {
                    items: 2
                },
            }
        });
        loading.value = false;
    });
});
</script>

<template>
    <section class="recommendedStories-section mt-2">
        <div class="container">
            <div class="total-item-show">
                <h5 class="mb-0 text-uppercase">
                    <i class='bx bx-book-open text-primary'></i>
                    Hôm nay đọc gì?
                </h5>
                <br>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="d-lg-d-flex align-items-center gap-3">
                        <div class="recommendedStory owl-carousel owl-theme owl-loaded owl-drag">
                            <div class="owl-stage-outer">
                                <div v-show="!loading"
                                     class="owl-stage">
                                    <template v-for="(item, index) in storys"
                                              :key="index">
                                        <HomeOwlItem :data="[item]" :active="index === 0"/>
                                    </template>
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
