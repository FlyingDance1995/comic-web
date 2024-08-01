<script setup>
import {useConfigStore} from "~/store/config.js";

const runtimeConfig = useRuntimeConfig();
const configStore = useConfigStore();

const report = () => {
    const user = localStorage.getItem('user');
    if (!user) {
        return configStore.setSwal({
            open: true,
            title: 'Oops...',
            text: 'Bạn cần đăng nhập để có thể báo cáo lỗi.',
            type: 'error'
        });
    }

    setTimeout(() => configStore.setReportModal(true), 100)
};
</script>

<template>
    <footer class="page-footer">
        <div class="container py-2" style="text-align: left">
            <div class="row">
                <div class="col-md-6">
                    <div class="footer-logo text-center">
                        <NuxtLink to="/">
                            <img src="/images/logo/Logo-MonkeyD.png"
                                 alt="MonkeyD - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất 2024"
                                 width="300" height="80">
                        </NuxtLink>
                    </div>
                    <div class="footer-content my-3">
                        <p>Email: {{ runtimeConfig.public?.email }}</p>
                        <p>Liên hệ hỗ trợ: {{ runtimeConfig.public?.contactFb }}</p>
                        <button type="button" class="btn btn-sm btn-danger radius-30 px-3" @click.prevent="report">
                            Báo cáo vi phạm bản quyền
                        </button>
                    </div>
                    <div class="footer-contact">

                    </div>
                </div>
                <div class="col-md-6">
                    <div class="footer-privacy">
                        <p>Mọi thông tin và hình ảnh trên website đều được bên thứ ba đăng tải, MonkeyD miễn trừ mọi
                            trách nhiệm liên quan đến các nội dung trên website này. Nếu làm ảnh hưởng đến cá nhân
                            hay tổ chức nào, khi được yêu cầu, chúng tôi sẽ xem xét và gỡ bỏ ngay lập tức. Các vấn
                            đề liên quan đến bản quyền hoặc thắc mắc khác, vui lòng liên hệ fanpage: <a
                                :href="`${runtimeConfig.public?.contactFb}`" target="_blank">MonkeyD</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <p class="mb-0 border-top pt-1">
            <NuxtLink to="/page/chinh-sach-va-quy-dinh-chung"><b>Chính sách và quy định chung</b></NuxtLink>
            -
            <NuxtLink to="/page/chinh-sach-bao-mat"><b>Chính sách bảo mật</b></NuxtLink>
            -
            <NuxtLink to="/sitemap.xml" external><b>Sitemap</b></NuxtLink>
            <br>
            Copyright © 2024. All right reserved.
        </p>
    </footer>
</template>
