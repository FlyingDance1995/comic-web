<script setup>
import {usecreateStore1} from '@/store/storys'

const route = useRoute();
const page = +route?.query?.page || 1;
const params = {
    ordering: '-modification_time',
    type: 'composed',
    page: page,
    size: 20
};

const storyStore = usecreateStore1();
await storyStore.fetchStorys(params);
const {storys1, total} = storeToRefs(storyStore);
</script>

<template>
    <Head>
        <Title>Truyện Sáng Tác</Title>
    </Head>

    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện sáng tác</h1>
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
