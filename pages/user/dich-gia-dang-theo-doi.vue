<script setup>
import {useConfigStore} from "~/store/config.js";

const route = useRoute();
const configStore = useConfigStore();

const page = +route?.query?.page || 1;
const params = {
    page: page,
    size: 20
};

const teams = ref([]);
const total = ref(0);

const getData = async () => {
    try {
        const {data} = await useAPI('/profile/team', {
            query: {
                ...params,
                type: 'follow'
            }
        });
        teams.value = data.value.results;
        total.value = data.value.count;
    } catch (error) {
        console.log("error", error);
    }
};

await getData();

const deleteItem = async (item) => {
    configStore.setSwal({
        open: true,
        title: 'Bỏ theo dõi',
        text: 'Bạn muốn bỏ theo dõi người này?',
        type: 'info',
        onSubmit: async () => {
            try {
                configStore.setLoadingModal(true);
                await useNuxtApp().$api('/profile/team', {
                    method: "POST",
                    body: {
                        team: item?.slug,
                        type: 'unfollow'
                    }
                });
                await getData();
                configStore.setLoadingModal(false);
                return 'Đã xóa bỏ theo dõi người này';
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
    <div class="container">
        <h1 class="mb-0 text-uppercase">Đang theo dõi</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="row product-grid bookmark">
                    <div v-for="(team, index) in teams" :key="index" class="col-md-3 col-6">
                        <div class="card">
                            <div class="position-relative">
                                <NuxtLink :to="`/nhom-dich/${team?.slug}`">
                                    <img :alt="`${team?.name}`" class="card-img-top" width="200" height="260"
                                         onerror="this.src='/no-image.png'" :src="`${team?.avatar || ''}`">
                                </NuxtLink>

                                <div class="">
                                    <div class="position-absolute top-0 end-0 m-1 product-discount" style="z-index: 10;">
                                        <a href="javascript:;" @click.stop="deleteItem(team)" class="ms-3">
                                            <i class="bx bxs-trash"></i>
                                        </a>
                                    </div>
                                </div>

                                <div class="story-meta-data d-flex justify-content-start">
                                    <span><i class="bx bx-show"></i> {{ team?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') }}</span>
                                    <span><i class="bx bx-bell"></i> {{ team?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') }}</span>
                                </div>
                            </div>
                            <div class="card-body">
                                <NuxtLink :to="`/nhom-dich/${team?.slug}`">
                                    <h3 class="card-title cursor-pointer story-item-title">
                                        {{ team?.name }}
                                    </h3>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="pagination mt-4 justify-content-center">
                    <HomePagination :total="total"
                                    :page="page"
                                    :size="params.size"
                                    :type="`user/dich-gia-dang-theo-doi`"/>
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
