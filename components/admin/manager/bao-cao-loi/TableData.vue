<script setup>

import {mappingReportStatus, mappingReportErrTable, filterReportErrStatus} from "~/utils/mapping.js";
import {Table} from "view-ui-plus";

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
        title: 'Truyện',
        key: 'story',
        minWidth: 300,
    },
    {
        title: 'Chapter',
        key: 'chapter_number',
        width: 150,
    },
    {
        title: 'Phân loại',
        key: 'category',
        width: 300,
    },
    {
        title: "Người báo",
        slot: "owner",
        width: 200,
    },
    {
        title: "Trạng thái",
        slot: "status",
        width: 150,
        filters: mappingReportErrTable,
        filterMultiple: false,
        filterRemote: value => handleFilter('status', value),
    },
    {
        title: "Thời điểm tạo",
        slot: "creation_time",
        width: 170,
        sortable: true
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
    chapter_number: '',
    story: '',
    owner: {
        fullname: ''
    },
    category: '',
    detail: ''
});

const modalHandled = ref(false);
const loadingHandled = ref(false);


const modalApproval = ref(false);
const loadingApproval = ref(false);


const getData = async () => {
    try {
        loading.value = true;
        let query = {
          ordering: '-creation_time',
          ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/report-error', {
            query: {
                ...query,
                size: 10
            }
        });

        data.value = response?.results?.map((item, index) => {
            return {
                ...item,
                stt: (10 * (page.value - 1)) + index + 1,
                story: item?.chapter?.name,
                chapter_number: item?.chapter?.chapter_number,
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

const handledItem = (row) => {
    modalHandled.value = true;
    formItem.value = row;
};

const okHandled = async () => {
    try {
        loadingHandled.value = true;
        await useNuxtApp().$api(`admin/report-error/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "status": "finish"
            }
        });

        await getData();
        loadingHandled.value = false;
        modalHandled.value = false;
    } catch (e) {
        console.log("error", e);
        loadingHandled.value = false;
    }
};

const falsePositiveItem = (row) => {
    modalApproval.value = true;
    formItem.value = row;
};

const okApproval = async () => {
    try {
        loadingApproval.value = true;
        await useNuxtApp().$api(`admin/report-error/${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "status": "error"
            }
        });

        await getData();
        loadingApproval.value = false;
        modalApproval.value = false;
    } catch (e) {
        console.log("error", e);
        loadingApproval.value = false;
    }
};

const viewDetailItem = (row) => {
    openModal.value = true;
    formItem.value = row;
};

const asyncOK = async () => {
    loadingModal.value = true;

    // await useNuxtApp().$api(`admin/report-error/${formItem?.value?.id}`, {
    //     method: "PATCH",
    //     body: {
    //         "link": formItem?.value?.link,
    //         "name": formItem?.value?.name,
    //     }
    // });

    // getData();
    openModal.value = false;
    loadingModal.value = false;
    formItem.value = {
        chapter_number: '',
        story: '',
        owner: {
            fullname: ''
        },
        category: '',
        detail: ''
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
        @on-sort-change="handleSort"
    >
        <template #stt="{ row }">
            {{row?.stt}}
        </template>

        <template #story="{ row }">
            {{row?.story}}
        </template>

        <template #chapter_number="{ row }">
            {{row?.chapter_number}}
        </template>

        <template #owner="{ row }">
            <NuxtLink :to="`/admin/quan-ly-nguoi-dung?search=${row?.owner?.email || ''}`">
                {{row?.owner?.fullname}}
            </NuxtLink>
        </template>

        <template #status="{ row }">
            <span :style="{color: mappingReportStatus(row?.status).color}">
                {{mappingReportStatus(row?.status).title}}
            </span>
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="hover">
                <a href="javascript:void(0)">
                    <Icon type="ios-more" size="24" style="cursor: pointer" />
                </a>
                
                <template #list>
                    <DropdownMenu>
                        <DropdownItem @click="handledItem(row)">Đã xử lý</DropdownItem>
                        <DropdownItem @click="falsePositiveItem(row)">False Positive</DropdownItem>
                        <DropdownItem @click="viewDetailItem(row)">Xem thông tin</DropdownItem>
                    </DropdownMenu>
                </template>
            </Dropdown>
        </template>
    </Table>

    <Modal
        v-model="openModal"
        title="Báo cáo lỗi"
        :loading="loadingModal"
        @on-ok="openModal = !openModal"
        width="800px">

        <Form :model="formItem" label-position="top">
            <FormItem label="Truyện">
                <Input v-model="formItem.story" placeholder="Truyện" readonly></Input>
            </FormItem>

            <FormItem label="Chaper">
                <Input v-model="formItem.chapter_number" placeholder="Chaper" readonly></Input>
            </FormItem>

            <FormItem label="Phân loại">
                <Input v-model="formItem.category" placeholder="Phân loại" readonly></Input>
            </FormItem>

            <FormItem label="Người báo">
                <Input v-model="formItem.owner.fullname" placeholder="Người báo" readonly></Input>
            </FormItem>

            <FormItem label="Chi tiết lỗi">
                <Input v-model="formItem.detail" type="textarea" :autosize="{minRows: 3,maxRows: 5}" placeholder="Mô tả" readonly></Input>
            </FormItem>
        </Form>
    </Modal>

    <Modal
        v-model="modalHandled"
        title="Xác nhận"
        :loading="loadingHandled"
        @on-ok="okHandled">
        <p>Đã xử lý</p>
    </Modal>

    <Modal
        v-model="modalApproval"
        title="Yêu cầu phê duyệt"
        :loading="loadingApproval"
        @on-ok="okApproval">
        <p>False Positive</p>
    </Modal>

    <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
