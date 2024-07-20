<script setup>
import {useStoryStore} from '@/store/storys'

const route = useRoute();
const page = +route?.query?.page || 1;
const params = {
    ordering: "-modification_time",
    page: page,
    size: 20
};

const storyStore = useStoryStore();
await storyStore.fetchStorys(params);
const {storys, total} = storeToRefs(storyStore);
</script>

<template>
    <Head>
        <Title>Truyện mới cập nhật</Title>
    </Head>

    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện mới cập nhật</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid">
                    <LazyHomeProductItem v-for="(item, index) in storys"
                                         :key="index"
                                         :item="item"/>
                </div>

                <div class="text-center mb-4 pagination justify-content-center">
                    <!-- Pagination -->
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="params.size"/>
                    <!-- Pagination -->
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
