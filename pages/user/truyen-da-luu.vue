<script setup>
const route = useRoute();

const page = +route?.query?.page || 1;
const params = {
    page: page,
    size: 20
};

const stories = ref([]);
const total = ref(0);

try {
    const {data} = await useAPI('/profile/story', {
        query: {
            ...params,
            type: 'bookmark'
        }
    });
    stories.value = data.value.results;
    total.value = data.value.count;
} catch (error) {
    console.log("error", error);
}
</script>

<template>
    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện đã lưu</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid bookmark">
                    <LazyHomeProductItem v-for="(item, index) in stories"
                                         :key="index"
                                         :item="item"/>
                </div>

                <div class="pagination mt-4 justify-content-center">
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="params.size"
                                    :type="`user/truyen-da-luu`"/>
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
