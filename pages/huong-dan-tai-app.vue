<script setup>
const runtimeConfig = useRuntimeConfig();

const {SITE_URL} = runtimeConfig.public;
</script>

<template>
    <Head>
        <Title>Hướng dẫn tải APP</Title>
    </Head>

    <div class="container">
        <h1 class="mb-0 text-uppercase">Hướng dẫn tải APP cho IOS</h1>
        <hr>
        <div class="row">
            <div class="col-lg-9 col-md-9 col-12">
                <div class="card">
                    <div class="card-body">
                        <p><strong>BƯỚC 1: TRUY CẬP VÀO TRÌNH DUYỆT SAFARI TRÊN IPHONE CỦA BẠN</strong></p>
                        <p class="d-flex justify-content-center">
                            <img src="/images/guide/b1.png" alt="" width="300"/>
                        </p>
                        <p><strong>BƯỚC 2: TRUY CẬP WEBSITE CỦA PHÊ TRUYỆN ({{SITE_URL}})</strong></p>
                        <p class="d-flex justify-content-center">
                            <img src="/images/guide/b2.jpg" alt="" width="300"/>
                        </p>
                        <p><strong>BƯỚC 3: NHẤN VÀO NÚT "CHIA SẺ"</strong></p>
                        <p class="d-flex justify-content-center">
                            <img src="/images/guide/b3.jpg" alt="" width="300"/>
                        </p>
                        <p><strong>BƯỚC 4: TÌM VÀ CHỌN DÒNG "THÊM VÀO MÀN HÌNH CHÍNH" HOẶC "ADD TO HOME SCREEN"</strong></p>
                        <p class="d-flex justify-content-center">
                            <img src="/images/guide/b4.jpg" alt="" width="300"/>
                        </p>
                        <p><strong>BƯỚC 5: NHẤN NÚT "THÊM" ĐỂ HOÀN TẤT CÀI ĐẶT</strong></p>
                        <p class="d-flex justify-content-center">
                            <img src="/images/guide/b5.jpg" alt="" width="300"/>
                        </p>
                    </div>
                </div>
            </div>

            <HomeWidgetFanpage/>
        </div>
    </div>
</template>
