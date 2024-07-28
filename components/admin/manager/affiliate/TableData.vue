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
        title: 'Link',
        key: 'link',
        width: 300,
    },
    {
        title: 'Trạng thái',
        key: 'enable',
        width: 120,
    },
    {
        title: "Thời điểm tạo",
        slot: "creation_time",
        width: 170,
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

        const response = await $api('/admin/affiliate', {
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
            {{row?.name}}
        </template>

        <template #link="{ row }">
            {{row?.link}}
        </template>

        <template #enable="{ row }">
            <span :style="row?.enable ? 'color: red' : 'color: blue'">
                {{row?.enable ? "Đã kích hoạt" : "Không kích hoạt"}}
            </span>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #action="{ row }">
            <Icon type="ios-more" size="24" style="cursor: pointer" />
        </template>
    </Table>

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
