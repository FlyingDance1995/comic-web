<script setup>

import {
    mappingStoryStatus, mappingStoryStatusTable, mappingStoryTypeTable,
    filterStoryStatus, filterStoryType, mappingStoryRecommendedTable,
    filterStoryRecommended, mappingStoryType
} from "~/utils/mapping.js";
import {Notice, Table} from "view-ui-plus";

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const columns = [
    {
        title: 'STT',
        key: 'stt',
        width: 80,
    },
    {
        title: 'Người dùng',
        key: 'user',
        slot: 'user',
        minWidth: 200,
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
        title: "Thời gian tạo",
        slot: "creation_time",
        width: 170,
        sortable: true,
    },
];

const data = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-modification_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/chapter-buy', {
            query: {
                ...query,
                size: 10
            }
        });

        data.value = response?.results?.map((item, index) => {
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

const handleSort = ({column, order}) => {
    const type = column.slot || column.key;
    const query = {
        ...route.query,
    };

    if (order === 'normal') {
        if (query.ordering) {
            delete query.ordering;
        }
    } else if (order === 'asc') {
        query.ordering = type;
    } else {
        query.ordering = `-${type}`;
    }

    delete query.page;
    router.push({
        query,
    });
};

const getColor = (endDate) => {
    if (!endDate) return '';
    const currentDate = new Date();
    const expiryDate = new Date(endDate);
    return expiryDate > currentDate ? 'text-success' : 'text-danger';
};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }

    getData();
}, { immediate: true, deep: true });
</script>

<template>
    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading"
           @on-sort-change="handleSort">
        <template #user="{ row }">
            <Tooltip placement="bottom-end">
                {{ row?.user?.fullname }}

                <template #content>
                    {{ row?.user?.email }}
                </template>
            </Tooltip>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>
        
        <template #name="{ row }">
            <span>{{ row?.chapter?.story?.name }}</span>
        </template>

        <template #chapter="{ row }">
            <span>Chương {{ row?.chapter?.chapter_number }}: {{ row?.chapter?.name }}</span>
        </template>

        <template #price="{ row }">
            {{row?.chapter?.price ? Number(row?.chapter?.price)?.toLocaleString()?.replaceAll('.', ',') : 0 }} Coin
        </template>
    </Table>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
