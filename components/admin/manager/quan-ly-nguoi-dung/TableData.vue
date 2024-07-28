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
        key: 'fullname',
        minWidth: 200,
    },
    {
        title: 'Email',
        key: 'email',
        width: 300,
    },
    {
        title: 'Role',
        key: 'role',
        width: 140,
    },
    {
        title: "Trạng thái",
        slot: "is_active",
        width: 140,
    },
    {
        title: "Thời điểm tạo",
        slot: "date_joined",
        width: 180,
    },
    {
        title: "Lần đăng nhập gần nhất",
        slot: "last_login",
        width: 200,
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

        const response = await $api('/admin/users', {
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
            {{row?.fullname}}
        </template>

        <template #email="{ row }">
            <span>{{ row?.email }}</span>
        </template>

        <template #role="{ row }">
            <span>{{ row?.role }}</span>
        </template>

        <template #is_active="{ row }">
            <span>{{ row?.is_active }}</span>
        </template>

        <template #date_joined="{ row }">
            <span>{{ formattedTime(row?.date_joined) }}</span>
        </template>
        
        <template #last_login="{ row }">
            <span>{{ timeAgo2(row?.last_login) }}</span>
        </template>

        <template #action="{ row }">
            <Icon type="ios-more" size="24" style="cursor: pointer" />
        </template>
    </Table>

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
