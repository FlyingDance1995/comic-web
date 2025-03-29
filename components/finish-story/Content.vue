<script setup>
import {useStoryStore1} from '@/store/storys'

const route = useRoute();
const page = +route?.query?.page || 1;
const params = {
    status: "finish",
    page: page,
    size: 20
};

const storyStore = useStoryStore1();
await storyStore.fetchStorys(params);
const {storys1, total1} = storeToRefs(storyStore);
</script>

<template>
    <Head>
        <Title>Truyện Full</Title>
    </Head>

    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện Hoàn Thành</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid">
                    <LazyHomeProductItem v-for="(item, index) in storys1"
                                         :key="index"
                                         :item="item"/>
                </div>

                <div class="text-center mb-4 pagination justify-content-center">
                    <!-- Pagination -->
                    <HomePagination :total="total1"
                                    :page="page"
                                    :size="params.size"
                                    type="truyen-hoan-thanh"/>
                    <!-- End Pagination -->
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
