<script setup>
import {useStoryStore} from '@/store/storys'

const storyStore = useStoryStore();

const {storys} = storeToRefs(storyStore);
const loading = ref(true);

onMounted(() => {
    $(document).ready(function () {
        $(".recommendedStory").owlCarousel({
            items: 2,
            margin: 40,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
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
                <h5 class="mb-0 text-uppercase">Đề cử hôm nay</h5>
                <hr>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="d-lg-d-flex align-items-center gap-3">
                        <div class="recommendedStory owl-carousel owl-theme owl-loaded owl-drag">
                            <div class="owl-stage-outer">
                                <div v-show="!loading"
                                     class="owl-stage">
                                    <HomeOwlItem :data="storys?.slice(0, 3)" active/>

                                    <HomeOwlItem :data="storys?.slice(3, 6)" active/>

                                    <HomeOwlItem :data="storys?.slice(6, 9)"/>
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
        <HomeSectionHotStories/>
    </section>

</template>
