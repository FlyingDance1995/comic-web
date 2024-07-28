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
        title: 'Tên',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        key: 'status',
        width: 120,
    },
    {
        title: "Trưởng nhóm",
        slot: "leader",
        width: 270,
    },
    {
        title: "Thời gian tạo",
        slot: "creation_time",
        width: 170,
    },
    {
        title: "Thành viên",
        slot: "member",
        width: 120,
    },
    {
        title: "Số truyện",
        slot: "total_story",
        width: 120,
    },
    {
        title: "Lượt xem",
        slot: "total_watched",
        width: 120,
    },
    {
        title: "Theo dõi",
        slot: "total_follow",
        width: 120,
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

        const response = await $api('/admin/teams', {
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
        data.value = [];
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

const removeItem = (row) => {
    console.log('aaa', row)
};

const approvalItem = (row) => {

};

const editItem = (row) => {

};

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }
    getData();
}, { immediate: true, deep: true });

</script>

<template>
    <Table class="flex-1 mt-4" ref="table" max-height="650" :columns="columns" :data="data" :loading="loading">
        <template #stt="{ row }">
            {{row?.stt}}
        </template>

        <template #name="{ row }">
            {{row?.name}}
        </template>

        <template #status="{ row }">
            {{row?.status}}
        </template>

        <template #leader="{ row }">
            {{ row?.leader?.fullname }}
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #member="{ row }">
            <span>{{ row?.member?.length || 0 }}</span>
        </template>

        <template #total_story="{ row }">
            <span>{{ row?.statistics?.total_story?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #total_watched="{ row }">
            <span>{{ row?.statistics?.total_watched?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #total_follow="{ row }">
            <span>{{ row?.statistics?.total_follow?.toLocaleString()?.replaceAll('.', ',') || 0 }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="click">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>
                
                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="removeItem(row)"><span style="color: red">Xóa</span></DropdownItem>
                        <DropdownItem @click="approvalItem(row)">Yêu cầu phê duyệt</DropdownItem>
                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
