<script setup>
const router = useRouter();

const deferredPrompt = ref(null);
const isIOS = ref(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const iOSIsInstalled = ref(window.navigator.standalone === true);
const androidIsInstalled = ref(false);

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
});

const installApp = async () => {
    if (isIOS.value) {
        // alert('Để cài đặt ứng dụng trên iOS, vui lòng nhấn nút "Chia sẻ" trong Safari, sau đó tìm và chọn "Thêm vào Màn hình chính".');
        await router.push('/huong-dan-tai-app');
    } else if (deferredPrompt.value) {
        deferredPrompt.value?.prompt();
        const { outcome } = await deferredPrompt.value?.userChoice;
        if (outcome === 'accepted') {
            console.log('Người dùng đã chấp nhận cài đặt PWA');
        } else {
            console.log('Người dùng đã từ chối cài đặt PWA');
        }
        deferredPrompt.value = null;
    } else {
        console.log('Không thể hiển thị lời nhắc cài đặt PWA');
    }
};

onMounted(() => {
    androidIsInstalled.value = window.matchMedia('(display-mode: standalone)').matches;
});
</script>

<template>
    <div v-if="!iOSIsInstalled && !androidIsInstalled" class="box-app d-flex align-items-center">
        <div class="app-logo">
            <img
                alt=""
                loading="lazy"
                width="46"
                height="46"
                src="/images/favicon/apple-icon-60x60.png"
                style="color: transparent;">
        </div>

        <div class="app-content">
            <div>
                <div class="app-content__title">Phê truyện</div>
                <div class="app_content__des">Đọc truyện hay</div>
            </div>

            <div>
                <span id="installApp"
                      class="btn btn-primary rounded-pill cursor-pointer"
                      @click="installApp"
                >
                    Tải APP
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.box-app {
    border: 1px solid hsla(0, 1%, 77%, .271);
    padding: 20px;
    border-radius: 20px;
}

.app-logo {
    width: 46px;
    flex: 0 0 46px;
}

.app-logo img {
    border-radius: 10px;
}

.app-content {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: calc(100% - 46px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
}

.app-content .app-content__title {
    font-weight: 700;
    font-size: 16px;
}

.app-content .app_content__des {
    font-size: 14px;
    color: #757982;;
}

@media (min-width: 1200px) {
    .box-app {
        display: none !important;
    }
}
</style>
