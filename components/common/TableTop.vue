<script setup>
const query = {
    size: 10,
    page: 1,
};

const {data: topDaily} = await useAPI('/story', {
    query: {
        ...query,
        ordering: 'daily_watched',
    }
});

const {data: topWeek} = await useAPI('/story', {
    query: {
        ...query,
        ordering: 'weekly_watched',
    }
});

const {data: topMonth} = await useAPI('/story', {
    query: {
        ...query,
        ordering: 'monthly_watched',
    }
});

const active = ref('top-day');
</script>

<template>
    <div class="col-md-12">
        <div class="card widget-top">
            <div class="card-body p-2">
                <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">
                    Bảng xếp hạng
                </h5>

                <ul class="nav nav-pills mb-3 justify-content-center" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-day' ? 'active' : ''"
                            class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                            :aria-selected="active === 'top-day'" @click="active = 'top-day'">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Hôm nay</div>
                            </div>
                        </a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-week' ? 'active' : ''"
                            class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                            :aria-selected="active === 'top-week'" @click="active = 'top-week'">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Tuần này</div>
                            </div>
                        </a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a :class="active === 'top-month' ? 'active' : ''"
                            class="nav-link" data-bs-toggle="pill" href="javascript:void(0)" role="tab"
                            :aria-selected="active === 'top-month'" @click="active = 'top-month'">
                            <div class="d-flex align-items-center">
                                <div class="tab-title">Tháng này</div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div :class="active === 'top-day' ? 'show active' : ''"
                        class="tab-pane fade" id="top-day" role="tabpanel">
                        <div v-for="(item, index) in topDaily?.results" 
                            :key="item?.id"
                            class="d-flex top-item">
                            <div class="stt">{{index + 1}}</div>
                            <div class="thumbnail">
                                <img
                                    :src="item?.avatar"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/${item?.slug}`">
                                        {{item?.name}}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="last_chapter">
                                        Chương {{
                                            item?.last_chapter ? item?.last_chapter?.chapter_number : 1
                                        }}
                                    </div>
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

                    <div :class="active === 'top-week' ? 'show active' : ''"
                        class="tab-pane fade" id="top-week" role="tabpanel">
                        <div v-for="(item, index) in topWeek?.results" 
                            :key="item?.id"
                            class="d-flex top-item">
                            <div class="stt">{{index + 1}}</div>
                            <div class="thumbnail">
                                <img
                                    :src="item?.avatar"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/${item?.slug}`">
                                        {{item?.name}}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="last_chapter">
                                        Chương {{
                                            item?.last_chapter ? item?.last_chapter?.chapter_number : 1
                                        }}
                                    </div>
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

                    <div :class="active === 'top-month' ? 'show active' : ''"
                        class="tab-pane fade" id="top-month" role="tabpanel">
                        <div v-for="(item, index) in topMonth?.results" 
                            :key="item?.id"
                            class="d-flex top-item">
                            <div class="stt">{{index + 1}}</div>
                            <div class="thumbnail">
                                <img
                                    :src="item?.avatar"
                                    :alt="item?.name"
                                    onerror="this.src='/no-image.png'">
                            </div>
                            <div class="detail">
                                <h3>
                                    <NuxtLink
                                        :to="`/${item?.slug}`">
                                        {{item?.name}}
                                    </NuxtLink>
                                </h3>

                                <div class="d-flex justify-content-between">
                                    <div class="last_chapter">
                                        Chương {{
                                            item?.last_chapter ? item?.last_chapter?.chapter_number : 1
                                        }}
                                    </div>
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
