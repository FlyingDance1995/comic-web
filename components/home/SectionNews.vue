<script setup>
import {useStoryStore, useStoryStore1} from '@/store/storys'

const storyStore = useStoryStore();
const storyStore1 = useStoryStore1();

const {storys, total} = storeToRefs(storyStore);
const {storys1, total1} = storeToRefs(storyStore1);

const page = 1;
</script>

<template>
    <section class="section-news py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-9 col-12">
                    <div id="news" class="">
                        <h5 class="mb-0 text-uppercase">Truyện mới cập nhật</h5>
                        <hr>
                        <div id="new-story">
                            <div class="row product-grid">
                                <HomeProductItem v-for="(item, index) in storys"
                                                 :key="index"
                                                 :item="item"/>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <!-- Pagination -->
                                <HomePagination :total="total" :page="page"/>
                                <!-- Pagination -->
                            </div>
                        </div>
                    </div>

                    <HomeSectionCreateStories/>

                    <div id="news" class="mt-5">
                        <div class="total-item-show position-relative">
                            <h5 class="mb-0 text-uppercase">Truyện đã hoàn thành</h5>
                            <hr>
                            <a href="/truyen-hoan-thanh"
                               class="read-more-story btn btn-outline-primary radius-30 btn-sm">Xem thêm</a>
                        </div>

                        <div id="new-story">
                            <div class="row product-grid">
                                <HomeProductItem v-for="(item, index) in storys1"
                                                 :key="index"
                                                 :item="item"/>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <a href="/truyen-hoan-thanh"
                                   class="btn btn-sm btn-primary">
                                    Xem thêm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <HomeWidgetFanpage/>
            </div>
        </div>
    </section>
</template>
