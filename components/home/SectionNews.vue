<script setup>
import {useStoryStore, useStoryStore1} from '@/store/storys'

const storyStore = useStoryStore();
const storyStore1 = useStoryStore1();

const {storys, total} = storeToRefs(storyStore);
const {storys1} = storeToRefs(storyStore1);

const page = 1;
const size = 20;
</script>

<template>
    <section class="section-news py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-9 col-12">
                    <div id="news" class="">
                        <h5 class="mb-0 text-uppercase">
                            <i class='bx bx-book-open text-primary'></i>
                            Truyện mới cập nhật
                        </h5>
                        <hr>
                        <div id="new-story">
                            <div class="row product-grid">
                                <LazyHomeProductItem v-for="(item, index) in storys"
                                                     :key="index"
                                                     :item="item"/>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <!-- Pagination -->
                                <HomePagination :total="total"
                                                :page="page"
                                                :size="size"/>
                                <!-- Pagination -->
                            </div>
                        </div>
                    </div>

                    <HomeSectionCreateStories/>

                    <div id="news" class="mt-5">
                        <div class="total-item-show position-relative">
                            <h5 class="mb-0 text-uppercase">
                                <i class='bx bx-book-open text-primary'></i>
                                Truyện đã hoàn thành
                            </h5>
                            <hr>
                            <NuxtLink to="/truyen-hoan-thanh"
                               class="read-more-story btn btn-outline-primary radius-30 btn-sm">Xem thêm</NuxtLink>
                        </div>

                        <div id="new-story">
                            <div class="row product-grid">
                                <LazyHomeProductItem v-for="(item, index) in storys1"
                                                     :key="index"
                                                     :item="item"/>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <NuxtLink to="/truyen-hoan-thanh"
                                   class="btn btn-sm btn-primary">
                                    Xem thêm
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <HomeWidgetFanpage/>
            </div>
        </div>
    </section>
</template>
