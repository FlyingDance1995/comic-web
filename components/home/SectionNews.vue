<script setup>
import {useStoryStore, useStoryStore1} from '@/store/storys'

const storyStore = useStoryStore()
const storyStore1 = useStoryStore1()

const {storys} = storeToRefs(storyStore)
const {storys1} = storeToRefs(storyStore1)
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
                                <nav aria-label="...">
                                    <ul class="pagination">

                                        <li class="page-item disabled">
                                            <a class="page-link" href="javascript:;" tabindex="-1" aria-disabled="true">
                                                <i class="bx bx-chevrons-left"></i>
                                            </a>
                                        </li>


                                        <li class="page-item active" aria-current="page">
                                            <a class="page-link" href="javascript:;">1 <span
                                                class="visually-hidden">(current)</span></a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=2">2</a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=3">3</a>
                                        </li>


                                        <li class="page-item disabled">
                                            <a class="page-link" href="javascript:;">
                                                ...
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=66">66</a>
                                        </li>


                                        <li class="page-item"><a class="page-link" href="https://monkeyd.vn?page=2"><i
                                            class="bx bx-chevrons-right"></i></a>
                                        </li>
                                    </ul>
                                </nav>
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
