<script setup>
import {useStoryStore1} from '@/store/storys'
const route = useRoute();
const slug = route?.params?.slug;
const page = +route?.query?.page || 1;
const params = {
    category: slug,
    page: page,
    size: 20
};

const storyStore = useStoryStore1();
await storyStore.fetchStorys(params);
const {storys1, total1} = storeToRefs(storyStore);

const data = ref(null);

const getData = async () => {
    try {
        const {data: story} = await useAPI(`/category/${slug}`);
        console.log(story.value);
        data.value = story.value;
    } catch (error) {
        console.log("error", error);
    }
};

if (slug) getData();

</script>

<template>
    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện {{ data?.name }}</h1>
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
                                    type="the-loai/{{ slug }}"/>
                    <!-- Pagination -->
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
