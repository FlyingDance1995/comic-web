<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();
const route = useRoute();
const router = useRouter();

const { $api } = useNuxtApp();

const user = computed(() => userStore.$state.user);
const data = ref([]);
const loading = ref(false);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);

const columns = [
    {
        title: "ID",
        key: "id",
        width: 100,
    },
    {
        title: "Thời gian",
        slot: "creation_time",
        width: 200,
    },
    {
        title: 'Code',
        key: 'code',
        minWidth: 200,
    },
    {
        title: 'Trạng thái',
        slot: 'status',
        minWidth: 300,
    },
    {
        title: 'Số tiền',
        slot: 'amount',
        minWidth: 300,
    },
]

const getData = async () => {
    try {
        loading.value = true;
        let query = {
          ordering: '-creation_time',
          ...route.query
        }
        if (!query?.search) delete query.search;

        const response = await $api('/profile/transaction', {
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


watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search || value?.live !== oldValue?.live) {
        page.value = 1;
    }
    getData();
}, {immediate: true, deep: true});

</script>

<template>
    <Head>
        <Title>Lịch sử giao dịch</Title>
    </Head>

    <div class="row">
        <div class="mx-auto">
            <h6 class="mb-0 text-uppercase">Lịch sử giao dịch</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <Table
                            class="flex-1 mt-4"
                            ref="table"
                            max-height="650"
                            :columns="columns"
                            :data="data"
                            :loading="loading"
                        >
                            <template #creation_time="{ row }">
                                <span>{{ formattedDate(row?.creation_time) }}</span>
                            </template>

                            <template #status="{ row }">
                                <span :style="{ color: mappingTransactionStatus(row?.status).color }">
                                    {{ mappingTransactionStatus(row?.status).title }}
                                </span>
                            </template>

                            <template #amount="{ row }">
                                {{Number(row?.amount)?.toLocaleString()?.replaceAll('.', ',')}} VNĐ
                            </template>
                        </Table>

                        <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" show-total @on-change="handleChangePage"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dark-theme .text-dark {
    color: #c0c8d1 !important;
}
</style>
