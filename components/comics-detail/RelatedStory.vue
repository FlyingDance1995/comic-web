<script setup>
const route = useRoute();

const slug = route?.params?.slug;

const story = ref([]);
const loading = ref(true);

const query = {
    size: 15,
    page: 1,
    ordering: 'recommended',
};

const getData = async () => {
    const {data} = await useAPI('/story', {
        query: {
            ...query,
            story: slug
        }
    });
    story.value = data?.value
};

if (slug) getData();

onMounted(() => {
    $(document).ready(function () {
        $(".top-story-slider").owlCarousel({
            items: 6,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 3000,
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
                1100: {
                    items: 5
                },
                1200: {
                    items: 6
                }
            }
        });
        loading.value = false;
    });
});
</script>

<template>
    <div class="relatedStory mt-5">
        <div class="top-ten-comics-area pb-3">
            <div class="row">
                <div class="col-lg-12">
                    <div class="slider-recommend-right background-primary">
                        <div class="total-item-show">
                            <h5 class="mb-0 text-uppercase">Truyện gợi ý</h5>
                            <hr>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="top-story-slider owl-carousel owl-loaded owl-drag"
                                     id="completed-comics-slider">
                                    <div class="owl-stage-outer">
                                        <div v-show="!loading"
                                             class="owl-stage">
                                            <div v-for="item in story?.results"
                                                 :key="item?.id"
                                                 class="owl-item">
                                                <div class="single-story-block">
                                                    <div class="single-story-wrap">
                                                        <div class="single-story-img">
                                                            <a :href="`/${item?.slug}`">
                                                                <img
                                                                    :src="item?.avatar"
                                                                    class="lazyload"
                                                                    :data-src="item?.avatar"
                                                                    :alt="item?.name"
                                                                    width="200" height="260"
                                                                    onerror="this.src='/no-image.png'">
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div class="single-story-details">
                                                        <h3>
                                                            <a :href="`/${item?.slug}`">
                                                                {{item?.name}}
                                                            </a>
                                                        </h3>
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
            </div>
        </div>
    </div>
</template>
