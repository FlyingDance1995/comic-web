<script setup>
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const configStore = useConfigStore();

const page = +route?.query?.page || 1;
const params = {
    page: page,
    size: 20
};

const stories = ref([]);
const total = ref(0);

const getData = async () => {
    try {
        const {data} = await useAPI('/profile/story', {
            query: {
                ...params,
                type: 'watched'
            }
        });
        stories.value = data.value.results;
        total.value = data.value.count;
    } catch (error) {
        console.log("error", error);
    }
};

await getData();

const deleteItem = async (item) => {
    configStore.setSwal({
        open: true,
        title: 'Xóa truyện',
        text: 'Bạn muốn xoá này khỏi danh sách?',
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api('/profile/story', {
                    method: "POST",
                    body: {
                        story: item?.slug,
                        type: 'unwatched'
                    }
                });
                await getData();
                configStore.setLoadingModal(false);
                return 'Đã xóa truyện khỏi danh sách';
            } catch (e) {
                configStore.setLoadingModal(false);
                console.log("error", e?.response);
                return null;
            }
        }
    });
};
</script>

<template>
    <Head>
        <Title>Truyện đã đọc</Title>
    </Head>

    <div class="container">
        <h1 class="mb-0 text-uppercase">Truyện đã đọc</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid bookmark">
                    <LazyHomeProductItem v-for="(item, index) in stories"
                                         :key="index"
                                         :item="item">
                        <div class="">
                            <div class="position-absolute top-0 end-0 m-1 product-discount" style="z-index: 10;">
                                <a href="javascript:;" @click.stop="deleteItem(item)" class="ms-3">
                                    <i class="bx bxs-trash"></i>
                                </a>
                            </div>
                        </div>
                    </LazyHomeProductItem>
                </div>

                <div class="pagination mt-4 justify-content-center">
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="params.size"
                                    :type="`user/lich-su-doc-truyen`"/>
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
<style>
.bookmark .product-discount a {
    font-size: 18px;
    padding: 5px;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #ccc;
    line-height: 1;
}
</style>
