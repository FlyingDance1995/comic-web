<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();
const route = useRoute();
const router = useRouter();

const user = computed(() => userStore.$state.user);
const loading = ref(false);
const packageVip = ref([]);
const selectedPrice = ref(null);
const page = ref(Number(route.query?.page) || 1);
const total = ref(0);
const dataTable = ref([]);

const columns = [
    {
        title: "Thời gian",
        slot: "creation_time",
        width: 160,
    },
    {
        title: 'Tên gói',
        slot: 'name',
        width: 120,
    },
    {
        title: 'Hạn sử dụng',
        slot: 'expiry',
        width: 160,
    },
    {
        title: 'Số tiền',
        slot: 'price',
        minWidth: 170,
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

        const response = await useNuxtApp().$api('/profile/purchase-vip', {
            query: {
                ...query,
                size: 5
            }
        });

        dataTable.value = response?.results?.map((item, index) => {
            return {
                ...item,
                stt: (5 * (page.value - 1)) + index + 1
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

const handleSubmit = async () => {
    try {
        if (!user.value) {
            return configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Bạn cần đăng nhập để có thể thực hiện hành động này.',
                type: 'error'
            });
        }

        if (!selectedPrice.value) {
            return configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Bạn cần phải chọn gói VIP trước khi thực hiện hành động này.',
                type: 'error'
            });
        }

        configStore.setLoadingModal(true);
        await useNuxtApp().$api('/profile/purchase-vip', {
            method: 'POST',
            body: {
                package_id: selectedPrice.value
            }
        });
        getInfo();
        getData();
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Thành công',
                text: '',
                type: 'success'
            });
        }, 150);
        selectedPrice.value = null;
        configStore.setLoadingModal(false);
    } catch (e) {
        configStore.setLoadingModal(false);
        let errorMsg = 'Có lỗi xảy ra, vui lòng thử lại sau!'
        console.log(e?.response);
        if (e?.response?._data?.error) {
            errorMsg = e?.response?._data?.error;
        }
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: errorMsg,
                type: 'error'
            });
        }, 150);
    }
};

const getPakageVip = async () => {
    try {
        configStore.setLoadingModal(true);
        const response = await useNuxtApp().$api('/admin/package-vip');
        packageVip.value = response?.results?.map((item, index) => {
            return {
                ...item,
                stt: index
            }
        }) || [];
        configStore.setLoadingModal(false);
    } catch (e) {
        configStore.setLoadingModal(false);
        console.log("error", e);
    }
}

const getInfo = async () => {
    try {
        const response = await useNuxtApp().$api('/profile');
        userStore.setUser({
            ...user.value,
            ...response
        })
    } catch (error) {
        console.log("error", error);
    }
};

const getColor = (endDate) => {
    if (!endDate) return '';
    const currentDate = new Date();
    const expiryDate = new Date(endDate);
    return expiryDate > currentDate ? 'text-success' : 'text-danger';
};

getPakageVip();

watch(() => route?.query, (value, oldValue) => {
    if (value?.search !== oldValue?.search) {
        page.value = 1;
    }
    getData();
}, {immediate: true, deep: true});
</script>

<template>
    <Head>
        <Title>Mua VIP</Title>
    </Head>

    <div class="row">
        <div class="col-xl-6 mx-auto">
            <h6 class="mb-0 text-uppercase">Nâng cấp VIP</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div class="card bg-warning text-center">
                        <div class="card-body">
                            <div class="p-2 text-dark rounded">
                                Nâng cấp VIP bạn sẽ đọc truyện mà không có quảng cáo và được đọc truyện mới nhất
                            </div>
                        </div>
                    </div>

                    <div class="card bg-info text-center">
                        <div class="card-body">
                            <div class="p-2 text-white rounded">
                                Số dư: {{ user?.wallet?.balance?.toLocaleString()?.replaceAll('.', ',') || 0 }} VNĐ
                            </div>
                        </div>
                    </div>

                    <form action="" method="POST" @submit.prevent="handleSubmit">
                        <h5 class="mb-3">Các gói VIP</h5>
                        <div 
                            v-for="item in packageVip"
                            :key="item?.id"
                            class="form-check mb-3">
                            <input v-model="selectedPrice" class="form-check-input" type="radio" name="premiumPrice" :id="`premiumPrice${item?.id}`" :value="item?.id">
                            <label class="form-check-label" :for="`premiumPrice${item?.id}`">
                                Gói VIP {{ item?.name }} ({{ item?.duration_days }} ngày): {{ Number(item?.price)?.toLocaleString()?.replaceAll('.', ',') || 0 }} VNĐ
                            </label>
                        </div>

                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Mua</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <Table
                            class="flex-1"
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
                                <span>{{ row?.package?.name }}</span>
                            </template>
   
                            <template #expiry="{ row }">
                                <span :class="getColor(row?.end_date)">{{ formattedTime(row?.end_date) }}</span>
                            </template>

                            <template #price="{ row }">
                                {{Number(row?.package?.price)?.toLocaleString()?.replaceAll('.', ',')}} VNĐ
                            </template>
                        </Table>

                        <Page class="mt-4 text-black" style="text-align: right" :modelValue="page" :total="total" :page-size="5" show-total @on-change="handleChangePage"/>
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
