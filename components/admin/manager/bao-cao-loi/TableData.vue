<script setup>

const { $api } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const columns = [
    {
        title: 'STT',
        key: 'stt',
        slot: 'stt',
        width: 80,
    },
    {
        title: 'Name',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        key: 'status',
        width: 120,
    },
    {
        title: 'Loại',
        key: 'type',
        width: 120,
    },
    {
        title: "Team",
        slot: "team",
        width: 270,
    },
    {
        title: "Thời gian cập nhật",
        slot: "creation_time",
        width: 170,
    },
    {
        title: "Đề cử",
        slot: "recommended",
        width: 80,
    },
    {
        title: "Số chương",
        slot: "last_chapter",
        width: 110,
    },
    {
        title: "Lượt xem",
        slot: "total_watched",
        width: 100,
    },
    {
        title: "Theo dõi",
        slot: "total_follow",
        width: 100,
    },
    {
        title: " ",
        slot: "action",
        width: 60,
        fixed: 'right'
    }
];

const data = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/report-error', {
            query: {
                ...query
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

const handlePreview = (row) => {

};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }
    getData();
}, {immediate: true, deep: true});

</script>

<template>
    <Table
        class="flex-1 mt-4"
        ref="table"
        max-height="650"
        :columns="columns"
        :data="data"
        :loading="loading"
    >
        <template #stt="{ row }">
            {{row?.stt}}
        </template>

        <template #team="{ row }">
            {{row?.team?.name}}
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #recommended="{ row }">
            <span>{{ row?.recommended ? "Có" : "Không" }}</span>
        </template>

        <template #last_chapter="{ row }">
            <span>{{ row?.last_chapter?.chapter_number || 0 }}</span>
        </template>

        <template #total_watched="{ row }">
            <span>{{ row?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #total_follow="{ row }">
            <span>{{ row?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #action="{ row }">
            <Icon type="ios-more" size="24" style="cursor: pointer" />
        </template>
    </Table>

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
