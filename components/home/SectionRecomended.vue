<script setup>
import {useStoryStore} from '@/store/storys'

const storyStore = useStoryStore()

const {storys, loading, error} = storeToRefs(storyStore);
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
                                <div class="owl-stage"
                                     style="transform: translate3d(0px, 0px, 0px); transition: all 0.25s ease 0s; width: 1956px;">
                                    <HomeOwlItem :data="storys.slice(0, 3)" active/>

                                    <HomeOwlItem :data="storys.slice(3, 6)" active/>

                                    <HomeOwlItem :data="storys.slice(6, 9)"/>
                                </div>
                            </div>

                            <div class="owl-nav disabled">
                                <button type="button" role="presentation" class="owl-prev">
                                    <span aria-label="Previous">‹</span>
                                </button>
                                <button type="button" role="presentation" class="owl-next">
                                    <span aria-label="Next">›</span>
                                </button>
                            </div>

                            <div class="owl-dots">
                                <button role="button" class="owl-dot active">
                                    <span></span>
                                </button>
                                <button role="button" class="owl-dot">
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
