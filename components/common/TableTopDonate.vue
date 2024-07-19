<script setup>
import {useTopStore} from "~/store/top.js";

const topStore = useTopStore();

const topDonate = computed(() => topStore.$state.topDonate);
const query = {
    size: 10,
    page: 1,
};

const getData = async () => {
    try {
        const response = await useNuxtApp().$api('/teams', {
            query: {
                ...query,
                ordering: 'total_story',
            }
        });
        if (!topDonate.value) {
            topStore.setTopDonate(response);
        }
    } catch (error) {
        console.log("error", error);
    }
};

getData();
</script>
<template>
    <div class="col-md-12">
        <div class="card widget-top top-user-contributions">
            <div class="card-body p-2">
                <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">
                    Đóng góp
                </h5>

                <ul class="nav nav-pills nav-pills-danger mb-3 justify-content-center"
                    role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="pill" href="#top-contributions"
                            role="tab" aria-selected="true">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Cống hiến</div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="danger-pills-tabContent">
                    <div class="tab-pane fade show active" id="top-contributions" role="tabpanel">
                        <div v-for="(item, index) in topDonate?.results" 
                            :key="item?.id"
                            class="d-flex top-item">
                            <div class="stt">{{index + 1}}</div>
                            <div class="thumbnail">
                                <img
                                    :src="item?.avatar || ''"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                            </div>

                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/nhom-dich/${item?.slug}`">
                                        {{item?.name}}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="last_chapter">
                                        <i class="bx bx-book-alt"></i>
                                        {{
                                            item?.statistics?.total_story?.toLocaleString()?.replaceAll('.', ',')
                                        }}
                                    </div>
                                    <div class="view">
                                        TOP {{index + 1}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
