<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useTeamStore} from '@/store/teams'

const route = useRoute()
const router = useRouter()

// Lấy query search từ URL và gán vào biến searchQuery
const searchQuery = ref(route.query || '')

const storyTeams = useTeamStore();

// Hàm thực hiện tìm kiếm
await storyTeams.fetchTeams(searchQuery.value ? {
    ordering: "-total_watched",
    page: 1,
    size: 1000,
    ...searchQuery.value
} : {
    ordering: "-total_watched",
    page: 1,
    size: 1000,
});

const {teams} = storeToRefs(storyTeams);

function performSearch() {
    // Thực hiện tìm kiếm và hiển thị kết quả
    if (searchQuery.value.search) {
        router.push({query: searchQuery.value})
    } else {
        router.push({query: null})
    }
}
</script>

<template>
    <div class="container">
        <h1 class="mb-0 text-uppercase">Team</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <!-- tìm kiếm team -->
                <div class="d-lg-flex align-items-center mb-4 gap-3">
                    <div class="position-relative">
                        <form @onsubmit="()=> performSearch()">
                            <input type="text" class="form-control ps-5 radius-30" name="search" id="search"
                                   :value="searchQuery.search" placeholder="Tìm dịch giả/tác giả">
                            <span class="position-absolute top-50 product-show translate-middle-y">
                                <i class="bx bx-search"></i>
                            </span>
                        </form>
                    </div>
                </div>
                <!-- tìm kiếm team -->

                <!-- danh sách team -->
                <div class="row product-grid">
                    <div v-for="(team, index) in teams" :key="index" class="col-md-3 col-6">
                        <div class="card">
                            <NuxtLink :to="`/nhom-dich/${team?.slug}`">
                                <img :alt="`${team?.name}`" class="card-img-top" width="200" height="260"
                                     onerror="this.src='/no-image.png'" :src="`${team?.avatar || ''}`">
                            </NuxtLink>
                            <div class="card-body">
                                <NuxtLink :to="`/nhom-dich/${team?.slug}`">
                                    <h3 class="card-title cursor-pointer story-item-title">
                                        {{ team?.name }}
                                    </h3>
                                </NuxtLink>
                                <div class="d-flex justify-content-between">
                                    <span><i class="bx bx-show"></i> {{ team?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') }} </span>
                                    <span><i class="bx bx-book-alt"></i> {{ team?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') }} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- danh sách team -->
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
