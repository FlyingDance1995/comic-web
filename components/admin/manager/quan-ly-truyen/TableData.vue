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
        slot: 'stt',
        width: 80,
    },
    {
        title: 'Tên truyện',
        key: 'name',
        minWidth: 300,
    },
    {
        title: 'Trạng thái',
        slot: 'status',
        width: 150,
        filters: mappingStoryStatusTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('status', value),
    },
    {
        title: 'Loại',
        slot: 'type',
        width: 150,
        filters: mappingStoryTypeTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('type', value),
    },
    {
        title: "Team",
        slot: "team",
        width: 270,
    },
    {
        title: "Thời gian cập nhật",
        slot: "modification_time",
        width: 180,
        sortable: true,
    },
    {
        title: "Đề cử",
        slot: "recommended",
        width: 90,
        filters: mappingStoryRecommendedTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('recommended', value),
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

const openModal = ref(false);
const loadingModal = ref(true);
const formItem = ref({
    type: "",
    last_chapter: "",
    name: "",
    description: "",
    category: []
});

const modalRemove = ref(false);
const loadingRemove = ref(false);

const getData = async () => {
    try {
        loading.value = true;
        let query = {
            ordering: '-modification_time',
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/story', {
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

const removeItem = async (row) => {
    modalRemove.value = true;
    formItem.value = row;
};

const okRemove = async () => {
    try {
        loadingRemove.value = true;
        await useNuxtApp().$api(`admin/story/${formItem?.value?.slug}`, {
            method: "DELETE",
        });

        await getData();
        loadingRemove.value = false;
        modalRemove.value = false;
    } catch (e) {
        console.log("error", e);
        loadingRemove.value = false;
    }
};

const approvalItem = async (row) => {
    try {
        if (row?.status !== 'awaiting') return;

        loading.value = true;
        await useNuxtApp().$api(`admin/story/${row?.slug}`, {
            method: "PATCH",
            body: {
                status: "processing"
            }
        });

        await getData();
        Notice.success({
            title: 'Phê duyệt thành công',
        });
    } catch (e) {
        loading.value = false;
        Notice.error({
            title: 'Phê duyệt thất bại',
        });
        console.log("error", e);
    }
};

const deputeItem = async (row) => {
    try {
        loading.value = true;
        await useNuxtApp().$api(`admin/story/${row?.slug}`, {
            method: "PATCH",
            body: {
                recommended: !row?.recommended
            }
        });

        await getData();
        Notice.success({
            title: 'Đề cử thành công',
        });
    } catch (e) {
        loading.value = false;
        Notice.error({
            title: 'Đề cử thất bại',
        });
        console.log("error", e);
    }
};

const editItem = (row) => {
    openModal.value = true;
    formItem.value = row;
};

const asyncOK = () => {
    loadingModal.value = true;

    getData();
    openModal.value = false;
    loadingModal.value = false;
    formItem.value = {
        type: "",
        last_chapter: "",
        name: "",
        description: "",
        category: []
    };
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

const handleFilter = (type, value) => {
    const query = {
        ...route.query,
    };

    if (value.length > 0) {
        query[type] = value.join(',');
    } else {
        delete query[type];
    }

    delete query.page;

    router.push({
        query,
    });
};

const handleClickRow = (row) => {
    router.push(`/admin/quan-ly-truyen/${row?.slug}`);
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
           :row-class-name="() => 'cursor-pointer'"
           @on-row-click="handleClickRow"
           @on-sort-change="handleSort">
        <template #stt="{ row }">
            {{ row?.stt }}
        </template>

        <template #team="{ row }">
            {{ row?.team?.name }}
        </template>

        <template #status="{ row }">
            <span :style="{ color: mappingStoryStatus(row?.status).color }">
                {{ mappingStoryStatus(row?.status).title }}
            </span>
        </template>

        <template #type="{ row }">
            {{ mappingStoryType(row?.type) }}
        </template>

        <template #modification_time="{ row }">
            <span>{{ formattedDate(row?.modification_time) }}</span>
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
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>

                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="removeItem(row)"><span style="color: #fd3550">Xóa</span></DropdownItem>
                        <DropdownItem @click="approvalItem(row)"
                                      :disabled="row?.status !== 'awaiting'">
                            <span :style="{color: row?.status === 'awaiting' && 'blue'}">Phê duyệt</span>
                        </DropdownItem>
                        <DropdownItem @click="deputeItem(row)">
                            {{row?.recommended ? 'Bỏ đề cử' : 'Đề cử'}}
                        </DropdownItem>
<!--                        <DropdownItem @click="editItem(row)">Chỉnh sửa</DropdownItem>-->
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Modal v-model="openModal" title="Chỉnh sửa truyện" :loading="loadingModal" width="800px" @on-ok="asyncOK">
        <Form :model="formItem" label-position="top">
            <FormItem label="Loại">
                <Select v-model="formItem.type">
                    <div v-for="item in formItem.category" :key="item.id">
                        <Option :value="item.slug">{{ item.name }}</Option>
                    </div>
                </Select>
            </FormItem>

            <FormItem label="Số chương">
                <Select v-model="formItem.last_chapter">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>
            </FormItem>

            <FormItem label="Tên">
                <Input v-model="formItem.name" placeholder="Tên"></Input>
            </FormItem>

            <FormItem label="Nội dung">
                <Input v-model="formItem.description" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"
                    placeholder="Nội dung"></Input>
            </FormItem>
        </Form>
    </Modal>

    <Modal v-model="modalRemove" title="Xác nhận" :loading="loadingRemove" @on-ok="okRemove">
        <p>Bạn có muốn chắc chắn xóa truyện này</p>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total
        @on-change="handleChangePage" />
</template>
