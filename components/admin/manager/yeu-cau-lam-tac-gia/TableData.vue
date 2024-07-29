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
        title: 'SDT',
        key: 'sdt',
        minWidth: 150,
    },
    {
        title: 'Facebook',
        key: 'fb',
        width: 250,
    },
    {
        title: 'Lời nhắn',
        key: 'message',
        width: 250,
    },
    {
        title: "Người báo",
        slot: "owner",
        width: 200,
    },
    {
        title: "Trạng thái",
        slot: "status",
        width: 170,
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
            ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/admin/report-user', {
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


const handledItem = (row) => {
    modalHandled.value = true;
    formItem.value = row;
};

const okHandled = async (row) => {
    try {
        loadingHandled.value = true;
        await useNuxtApp().$api(`admin/report-user//${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "status": "finish"
            }
        });

        getData();
        loadingHandled.value = false;
        modalHandled.value = false;
        formItem.value = {
            chapter_number: '',
            story: '',
            owner: {
                fullname: ''
            },
            category: '',
            detail: ''
        };
    } catch (e) {
        console.log("error", e);
        loadingHandled.value = false;
    }
};

const falsePositiveItem = (row) => {
    modalApproval.value = true;
    formItem.value = row;
};

const okApproval = async (row) => {
    try {
        loadingApproval.value = true;
        await useNuxtApp().$api(`admin/report-user//${formItem?.value?.id}`, {
            method: "PATCH",
            body: {
                "status": "error"
            }
        });

        getData();
        loadingApproval.value = false;
        modalApproval.value = false;
        formItem.value = {
            chapter_number: '',
            story: '',
            owner: {
                fullname: ''
            },
            category: '',
            detail: ''
        }
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

    // await useNuxtApp().$api(`admin/report-user//${formItem?.value?.id}`, {
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

        <template #sdt="{ row }">
            {{row?.sdt}}
        </template>

        <template #fb="{ row }">
            {{row?.fb}}
        </template>


        <template #message="{ row }">
            {{row?.message}}
        </template>

        <template #owner="{ row }">
            {{row?.owner.fullname}}
        </template>

        <template #status="{ row }">
            {{row?.status === "init" ? "Khởi tạo" : "Đã xử lý"}}
        </template>

        <template #creation_time="{ row }">
            <span>{{ formattedDate(row?.creation_time) }}</span>
        </template>

        <template #action="{ row }">
            <Dropdown trigger="click">
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
        title="Chi tiết: Yêu cầu làm tác giả"
        :loading="loadingModal"
        @on-ok="openModal = !openModal"
        width="800px">

        <Form :model="formItem" label-position="top">
            <FormItem label="SDT">
                <Input v-model="formItem.sdt" placeholder="Link tác phẩm vi phạm"></Input>
            </FormItem>

            <FormItem label="Facebook">
                <Input v-model="formItem.fb" placeholder="Link tác phẩm gốc"></Input>
            </FormItem>
            <FormItem label="Lời nhắn">
                <Input v-model="formItem.message" placeholder="Contact"></Input>
            </FormItem>

            <FormItem label="Người báo">
                <Input v-model="formItem.owner.fullname" placeholder="Người báo"></Input>
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

    <Page class="mt-4" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
</template>
