<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();
const route = useRoute();
const router = useRouter();

const { $api } = useNuxtApp();

const user = computed(() => userStore.$state.user);
const dataTable = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);

const columns = [
    {
        title: 'STT',
        key: 'stt',
        width: 80,
    },
    {
        title: 'Tên truyện',
        slot: 'name',
        minWidth: 300,
    },
    {
        title: 'Tên chương',
        slot: 'chapter',
        minWidth: 300,
    },
    {
        title: 'Số coin',
        slot: 'price',
        minWidth: 160,
    },
    {
        title: "Thời gian",
        slot: "creation_time",
        width: 180,
    },
];

const getData = async () => {
    try {
        loading.value = true;
        let query = {
          ordering: '-creation_time',
          ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/profile/chapter-buy', {
            query: {
                ...query,
                size: 10
            }
        });

        dataTable.value = response?.results?.map((item, index) => {
            return {
                ...item,
                stt: (10 * (page.value - 1)) + index + 1
            }
        }) || [];
        total.value = response?.count || 0;
        loading.value = false;
    } catch (e) {
        loading.value = false;
        console.log("error", e);
    }
};

const handleChangePage = (value) => {
    page.value = value;
    const query = {
        ...route.query,
        page: value
    };
    delete query.sportType;
    if (query.page === 1) delete query.page;

    router.push({
        query: query
    });
};


watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }
    getData();
}, {immediate: true, deep: true});

</script>

<template>
    <Head>
        <Title>Lịch sử mua chương</Title>
    </Head>

    <div class="row">
        <div class="mx-auto">
            <h6 class="mb-0 text-uppercase">Lịch sử mua chương</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <Table
                            class="flex-1 mt-4 test"
                            ref="table"
                            max-height="650"
                            :columns="columns"
                            :data="dataTable"
                            :loading="loading"
                        >
                            <template #creation_time="{ row }">
                                <span>{{ formattedDate(row?.creation_time) }}</span>
                            </template>

                            <template #name="{ row }">
                                <NuxtLink :to="`/${row?.chapter?.story?.slug}/${row?.chapter?.slug}`" target="_blank"
                                    class="text-primary">
                                    {{ row?.chapter?.story?.name }}
                                </NuxtLink>
                            </template>

                            <template #chapter="{ row }">
                                <NuxtLink :to="`/${row?.chapter?.story?.slug}/${row?.chapter?.slug}`" target="_blank"
                                    class="text-primary">
                                  {{ formattedNameChaper(row?.chapter?.type) }} {{ row?.chapter?.chapter_number }}: {{ row?.chapter?.name }}
                                </NuxtLink>
                            </template>

                            <template #price="{ row }">
                                {{ Number(row?.chapter?.price || row?.chapter?.coin || 0)?.toLocaleString()?.replaceAll('.', ',') }} coin
                            </template>
                        </Table>

                        <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dark-theme .text-dark {
    color: #c0c8d1 !important;
}

.dark-theme .table-responsive .ivu-table {
    color: white !important;
}

.dark-theme .table-responsive .ivu-table th {
    background-color: #323537 !important;
}

.dark-theme .table-responsive .ivu-table td {
    background-color: #16191b !important;
}

.dark-theme .table-responsive .ivu-page-total {
    color: white !important;
}

.dark-theme .table-responsive .ivu-page-next, .dark-theme .table-responsive .ivu-page-prev {
    background-color: #323537 !important;
    color: white !important;
}

.dark-theme .table-responsive .ivu-page-item {
    background-color: #323537 !important;
    color: white;
}

.dark-theme .table-responsive .ivu-page-item-active a {
    color: #2d8cf0 !important;
}


</style>
