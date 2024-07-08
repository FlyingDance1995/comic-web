<script setup>
import {useStoryStore} from '@/store/storys'

const route = useRoute();
const page = +route?.query?.page || 1;

const storyStore = useStoryStore();
await storyStore.fetchStorys({
    ordering: "-modification_time",
    page: page,
    size: 1
});
const {storys, total} = storeToRefs(storyStore);
</script>

<template>
    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện mới cập nhật</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid">
                    <HomeProductItem v-for="(item, index) in storys"
                                     :key="index"
                                     :item="item"/>
                </div>

                <div class="text-center mb-4 pagination justify-content-center">
                    <!-- Pagination -->
                    <HomePagination :total="total" :page="page" :size="1"/>
                    <!-- Pagination -->
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
