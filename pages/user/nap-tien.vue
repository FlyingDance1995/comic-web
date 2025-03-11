<script setup>
import {useConfigStore} from "~/store/config.js";
import {useUserStore} from "~/store/user.js";

const userStore = useUserStore();
const configStore = useConfigStore();

const router = useRouter();

const user = computed(() => userStore.$state.user);
const form = reactive({
    amount: "",
    method: "bank_transfer"
});
const success = ref(false);
const data = ref(null);

const suggestedAmount = [10000, 20000, 50000, 100000, 200000];

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const handleInput = () => {
    form.amount = formatNumber(form.amount.replace(/[^0-9]/g, ''))
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
        
        configStore.setLoadingModal(true);
        const response = await useNuxtApp().$api('/profile/transaction', {
            method: 'POST',
            body: {
                ...form,
                amount: Number(form.amount.replace(',', ''))
            }
        });
        data.value = response;
        form.amount = "";
        success.value = true;
        configStore.setLoadingModal(false);
    } catch (e) {
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                type: 'error'
            });
        }, 150);
        console.log(e);
    }
};

const handleVerify = async () => {
    try {
        configStore.setLoadingModal(true);
        await useNuxtApp().$api(`/profile/transaction/${data.value?.transaction?.id}`, {
            method: 'PUT',
            body: {
                status: 'pending'
            }
        });
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Thành công',
                text: '',
                type: 'success',
                onSubmit: async () => await router.push('/user/lich-su-giao-dich')
            });
        }, 150);
    } catch (e) {
        configStore.setLoadingModal(false);
        setTimeout(() => {
            configStore.setSwal({
                open: true,
                title: 'Oops...',
                text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                type: 'error',
            });
        }, 150);
        console.log(e);
    }
};
</script>

<template>
    <Head>
        <Title>Nạp tiền</Title>
    </Head>

    <div class="row">
        <div class="col-xl-6 mx-auto">
            <h6 class="mb-0 text-uppercase">Nạp tiền</h6>
            <hr>
            <div class="card">
                <div class="card-body">
                    <div v-if="!success" class="card bg-info text-center">
                        <div class="card-body">
                            <div class="p-2 text-white rounded">
                                Số dư: {{ user?.wallet?.balance?.toLocaleString()?.replaceAll('.', ',') || 0 }} VNĐ
                            </div>
                        </div>
                    </div>

                    <form v-if="!success" action="" method="POST" @submit.prevent="handleSubmit">
                        <div class="input-group mb-2">
                            <input v-model="form.amount"
                                   type="text" name="amount" 
                                   class="form-control" 
                                   placeholder="Nhập số tiền"
                                   @input="handleInput"
                                   required>
                            <span class="input-group-text" id="basic-addon2">VNĐ</span>
                        </div>

                        <div class="d-flex align-items-center mb-3 gap-2 flex-wrap text-info">
                            <span
                                v-for="item in suggestedAmount" 
                                style="text-decoration: underline; cursor: pointer;"
                                @click="form.amount = formatNumber(item)">
                                {{ item.toLocaleString().replaceAll('.', ',') }}
                            </span>
                        </div>

                        <div class="input-group mb-3 justify-content-center">
                            <button type="submit" class="btn btn-primary px-5">Nạp</button>
                        </div>
                    </form>

                    <template v-if="success">
                        <div class="text-center">
                            <h4 class="mb-3">Quét mã QR thanh toán</h4>
                            <img 
                                :src="data?.bank?.qrcode" 
                                alt="" 
                                width="300" 
                                style="border: 2px solid #008cff; 
                                border-radius: 5px;">
                            <p class="my-4" style="text-align: left; font-size: 16px">
                                Ngân hàng: <b>{{ data?.bank?.name }}</b> <br>
                                Số tài khoản: <b>{{ data?.bank?.stk }}</b> <br>
                                Chủ tài khoản: <b>{{ data?.bank?.owner }}</b> <br>
                                Nội dung: <b>{{ data?.bank?.message }}</b> <br>
                                * Thời gian nhận tiền tối đa là 24h tính từ lúc chuyển khoản<br>
                                * Vui lòng ghi đúng nội dung chuyển khoản <br>
                                * Nếu có vấn đề xảy ra hãy liên hệ hỗ trợ để được giải quyết!
                            </p>
                        </div>
                        
                        <div class="input-group mb-3 justify-content-center">
                            <button class="btn btn-primary px-5" @click="handleVerify">Xác nhận đã chuyển khoản</button>
                        </div>
                    </template>
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
