<script setup>
import {useTopStore} from "~/store/top.js";

const topStore = useTopStore();

const topDaily = computed(() => topStore.$state.topViewDaily);
const topWeek = computed(() => topStore.$state.topViewWeek);
const topMonth = computed(() => topStore.$state.topViewMonth);

const active = ref('top-day');
const show = ref('top-day');

const query = {
    size: 10,
    page: 1,
};

const getData = async (ordering = 'daily_watched') => {
    try {
        const response = await useNuxtApp().$api('/teams', {
            query: {
                ...query,
                ordering: ordering,
            }
        });
        if (ordering === 'daily_watched') {
            show.value = 'top-day';
            topStore.setTopViewDaily(response);
        } else if (ordering === 'weekly_watched') {
            show.value = 'top-week';
            topStore.setTopViewWeek(response);
        } else if (ordering === 'monthly_watched') {
            show.value = 'top-month';
            topStore.setTopViewMonth(response);
        }
    } catch (error) {
        console.log("error", error);
    }
};

if (process.client) {
    getData();
}
</script>

<template>
    <div class="col-md-12">
        <div class="card widget-top top-user-view">
            <div class="card-body p-2">
                <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">
                    Bảng xếp hạng
                </h5>

                <ul class="nav nav-pills mb-3 justify-content-center" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-day' ? 'active' : ''"
                           class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                           :aria-selected="active === 'top-day'" @click="() => {
                                active = 'top-day';
                                getData('daily_watched');
                            }">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Hôm nay</div>
                            </div>
                        </a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-week' ? 'active' : ''"
                           class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                           :aria-selected="active === 'top-week'" @click="() => {
                                active = 'top-week';
                                getData('weekly_watched');
                            }">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Tuần này</div>
                            </div>
                        </a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-month' ? 'active' : ''"
                           class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                           :aria-selected="active === 'top-month'" @click="() => {
                                active = 'top-month';
                                getData('monthly_watched');
                            }">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Tháng này</div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div :class="{
                            active: active === 'top-day',
                            show: show === 'top-day',
                          }"
                         class="tab-pane fade" id="top-user-view-day" role="tabpanel">
                        <div v-for="(item, index) in topDaily?.results"
                             :key="item?.id"
                             class="d-flex top-item">
                            <div class="stt">{{ index + 1 }}</div>
                            <div class="thumbnail">
                                <NuxtLink
                                    :to="`/nhom-dich/${item?.slug}`">
                                    <img
                                    :src="item?.avatar || ''"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                                </NuxtLink>
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/nhom-dich/${item?.slug}`">
                                        {{ item?.name }}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="view">
                                        <i class="bx bx-show"></i>
                                        {{
                                            item?.statistics?.daily_watched?.toLocaleString()?.replaceAll('.', ',')
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div :class="{
                            active: active === 'top-week',
                            show: show === 'top-week',
                          }"
                         class="tab-pane fade" id="top-user-view-week" role="tabpanel">
                        <div v-for="(item, index) in topWeek?.results"
                             :key="item?.id"
                             class="d-flex top-item">
                            <div class="stt">{{ index + 1 }}</div>
                            <div class="thumbnail">
                                <NuxtLink
                                    :to="`/nhom-dich/${item?.slug}`">
                                    <img
                                    :src="item?.avatar || ''"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                                </NuxtLink>
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/nhom-dich/${item?.slug}`">
                                        {{ item?.name }}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="view">
                                        <i class="bx bx-show"></i>
                                        {{
                                            item?.statistics?.weekly_watched?.toLocaleString()?.replaceAll('.', ',')
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div :class="{
                            active: active === 'top-month',
                            show: show === 'top-month',
                          }"
                         class="tab-pane fade" id="top-user-view-month" role="tabpanel">
                        <div v-for="(item, index) in topMonth?.results"
                             :key="item?.id"
                             class="d-flex top-item">
                            <div class="stt">{{ index + 1 }}</div>
                            <div class="thumbnail">
                                <NuxtLink
                                    :to="`/nhom-dich/${item?.slug}`">
                                    <img
                                    :src="item?.avatar || ''"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                                </NuxtLink>
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/nhom-dich/${item?.slug}`">
                                        {{ item?.name }}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="view">
                                        <i class="bx bx-show"></i>
                                        {{
                                            item?.statistics?.monthly_watched?.toLocaleString()?.replaceAll('.', ',')
                                        }}
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
