<script setup>
import {useStoryStore, useStoryStore1} from '@/store/storys'

const storyStore = useStoryStore()
const storyStore1 = useStoryStore1()

const {storys} = storeToRefs(storyStore)
const {storys1} = storeToRefs(storyStore1)
</script>

<template>
    <section class="section-news py-4">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-9 col-12">
                    <div id="news" class="">
                        <h5 class="mb-0 text-uppercase">Truyện mới cập nhật</h5>
                        <hr>
                        <div id="new-story">
                            <div class="row product-grid">
                                <div v-for="(item, index) in storys" :key="index" class="col-md-3 col-4">
                                    <div class="card">
                                        <div class="position-relative">
                                            <a :href="`/${item.slug}`">
                                                <img onerror="this.src=`/no-image.png`"
                                                     class="lazyload card-img-top" :alt="`${item.name}`"
                                                     :data-src="`${item.avatar}`" :src="`${item.avatar}`"
                                                     width="200"
                                                     height="260">
                                            </a>

                                            <div class="story-meta-data d-flex justify-content-start">
                                                <span>
                                                    <i class="bx bx-show"></i>
                                                    {{
                                                        item.statistics.total_watched
                                                    }}
                                                </span>

                                                <span>
                                                    <i class="bx bx-bookmark-alt"></i>
                                                    {{
                                                        item.statistics.total_follow
                                                    }}
                                                </span>
                                            </div>

                                            <div v-if="item.statistics.status === 'finish'"
                                                 class="position-absolute top-0 end-0 m-1 product-discount">
                                                <div class="hot-item"><span class="is-full">FULL</span></div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <h6 class="card-title cursor-pointer story-item-title">
                                                <a :href="`http://localhost:3000/${item.slug}.html`">
                                                    {{ item.description }}
                                                </a>
                                            </h6>

                                            <div class="d-flex justify-content-between">
                                                <span class="chapter font-meta">
                                                    <a :href="`/${item.slug}/chuong-${item.last_chapter
                                                        ? item.last_chapter.chapter_number : 1}`">
                                                        Chương {{
                                                            item.last_chapter ? item.last_chapter.chapter_number : 1
                                                        }}
                                                    </a>
                                                </span>
                                                <span class="post-on font-meta">6 phút trước</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <!-- Pagination -->
                                <nav aria-label="...">
                                    <ul class="pagination">

                                        <li class="page-item disabled">
                                            <a class="page-link" href="javascript:;" tabindex="-1" aria-disabled="true">
                                                <i class="bx bx-chevrons-left"></i>
                                            </a>
                                        </li>


                                        <li class="page-item active" aria-current="page">
                                            <a class="page-link" href="javascript:;">1 <span
                                                class="visually-hidden">(current)</span></a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=2">2</a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=3">3</a>
                                        </li>


                                        <li class="page-item disabled">
                                            <a class="page-link" href="javascript:;">
                                                ...
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link"
                                                                 href="https://monkeyd.vn?page=66">66</a>
                                        </li>


                                        <li class="page-item"><a class="page-link" href="https://monkeyd.vn?page=2"><i
                                            class="bx bx-chevrons-right"></i></a>
                                        </li>
                                    </ul>
                                </nav>
                                <!-- Pagination -->
                            </div>
                        </div>
                    </div>

                    <section class="creative-stories-home mt-5">
                        <div class="container">
                            <div class="top-ten-stories-area">
                                <div class="slider-recommend-right background-primary">
                                    <div class="total-item-show position-relative">
                                        <h5 class="mb-0 text-uppercase"><i class="bx bx-star"></i> Truyện Sáng Tác </h5>
                                        <hr>
                                        <a href="http://localhost:3000/truyen-sang-tac.html"
                                           class="read-more-story btn btn-outline-primary radius-30 btn-sm">Xem thêm</a>
                                    </div>
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="creative-stories-slider owl-carousel owl-loaded owl-drag"
                                                 id="propose-story-slider">

                                                <div class="owl-stage-outer">
                                                    <div class="owl-stage"
                                                         style="transform: translate3d(-954px, 0px, 0px); transition: all 1.2s ease 0s; width: 2385px;">
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/quy-trong-rung-dung-mo-cua-luc-nua-dem.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719722549-quy-trong-rung-dung-mo-cua-luc-nua-dem.jpg"
                                                                                alt="Quỷ Trong Rừng - Đừng Mở Cửa Lúc Nửa Đêm"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/quy-trong-rung-dung-mo-cua-luc-nua-dem.html">Quỷ
                                                                        Trong Rừng - Đừng Mở Cửa Lúc Nửa Đêm</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/glbl-ke-hoach-day-bao-nu-chinh-huong-thien.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/25/1719288306-glbl-ke-hoach-day-bao-nu-chinh-huong-thien.jpg"
                                                                                alt="[GL/BL] Kế Hoạch Dạy Bảo Nữ Chính Hướng Thiện"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/glbl-ke-hoach-day-bao-nu-chinh-huong-thien.html">[GL/BL]
                                                                        Kế Hoạch Dạy Bảo Nữ Chính Hướng Thiện</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/cung-chi-do-doc-qua-nhieu-truyen-thoi.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/18/1718719356-cung-chi-do-doc-qua-nhieu-truyen-thoi.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/18/1718719356-cung-chi-do-doc-qua-nhieu-truyen-thoi.jpg"
                                                                                alt="Cũng chỉ do đọc quá nhiều truyện thôi!"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/cung-chi-do-doc-qua-nhieu-truyen-thoi.html">Cũng
                                                                        chỉ do đọc quá nhiều truyện thôi!</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/cam-giac-khi-hai-ta-gap-nhau.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-cam-giac-khi-hai-ta-gap-nhau.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-cam-giac-khi-hai-ta-gap-nhau.jpg"
                                                                                alt="CẢM GIÁC KHI HAI TA GẶP NHAU"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/cam-giac-khi-hai-ta-gap-nhau.html">CẢM
                                                                        GIÁC KHI HAI TA GẶP NHAU</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/mot-giac-mong.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719545661-mot-giac-mong.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719545661-mot-giac-mong.jpg"
                                                                                alt="MỘT GIẤC MỘNG" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/mot-giac-mong.html">MỘT
                                                                        GIẤC MỘNG</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/25/1719289732-hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/25/1719289732-hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.jpg"
                                                                                alt="Hồi Ức Thanh Xuân Tươi Đẹp Của Chúng Ta"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.html">
                                                                        Hồi Ức Thanh Xuân Tươi Đẹp Của Chúng Ta
                                                                    </a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item active"
                                                             style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/hoi-tam-do.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/05/14/1715701051-hoi-tam-do.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/05/14/1715701051-hoi-tam-do.jpg"
                                                                                alt="Hối Tâm Đồ" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/hoi-tam-do.html">Hối
                                                                        Tâm
                                                                        Đồ</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item active"
                                                             style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/nguoi-yeu-vo-tri-cua-quai-vat.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719335737-nguoi-yeu-vo-tri-cua-quai-vat.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719335737-nguoi-yeu-vo-tri-cua-quai-vat.jpg"
                                                                                alt="Người yêu vô tri của Quái Vật"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/nguoi-yeu-vo-tri-cua-quai-vat.html">Người
                                                                        yêu vô tri của Quái Vật</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item active"
                                                             style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/nhat-tieu-hong-tran.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/05/13/1715612000-nhat-tieu-hong-tran.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/05/13/1715612000-nhat-tieu-hong-tran.jpg"
                                                                                alt="Nhất Tiếu Hồng Trần" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/nhat-tieu-hong-tran.html">Nhất
                                                                        Tiếu Hồng Trần</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item active"
                                                             style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/em-trai-ban-than-de-y-toi.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/21/1718958214-em-trai-ban-than-de-y-toi.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/21/1718958214-em-trai-ban-than-de-y-toi.jpg"
                                                                                alt="Em Trai Bạn Thân Để Ý Tôi"
                                                                                width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/em-trai-ban-than-de-y-toi.html">Em
                                                                        Trai Bạn Thân Để Ý Tôi</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item active"
                                                             style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/xuyen-thanh-cau-ngoc-nhieu-tien.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718522477-xuyen-thanh-cau-ngoc-nhieu-tien.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718522477-xuyen-thanh-cau-ngoc-nhieu-tien.jpg"
                                                                                alt="Xuyên thành cậu ngốc nhiều tiền"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/xuyen-thanh-cau-ngoc-nhieu-tien.html">Xuyên
                                                                        thành cậu ngốc nhiều tiền</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/blstory-oneshot.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/images/story/thumbs/290/2024/05/24/1716488122-blstory-oneshot.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/05/24/1716488122-blstory-oneshot.jpg"
                                                                                alt="BLSTORY ONESHOT" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/blstory-oneshot.html">BLSTORY
                                                                        ONESHOT</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/quan-lau-tren-doi.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/13/1718289501-quan-lau-tren-doi.jpg"
                                                                                alt="Quản Lẩu Trên Đồi" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/quan-lau-tren-doi.html">Quản
                                                                        Lẩu Trên Đồi</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a
                                                                            href="https://monkeyd.vn/hoi-chuong-im-lang.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/01/1717235731-hoi-chuong-im-lang.jpg"
                                                                                alt="Hồi chuông im lặng" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a
                                                                        href="https://monkeyd.vn/hoi-chuong-im-lang.html">Hồi
                                                                        chuông im lặng</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/trom-mong.html">
                                                                            <img
                                                                                src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/09/1717941797-trom-mong.jpg"
                                                                                alt="Trộm Mộng" width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/trom-mong.html">Trộm
                                                                        Mộng</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="owl-nav disabled">
                                                    <button type="button" role="presentation"
                                                            class="owl-prev"><span
                                                        aria-label="Previous">‹</span></button>
                                                    <button type="button"
                                                            role="presentation" class="owl-next"><span
                                                        aria-label="Next">›</span></button>
                                                </div>
                                                <div class="owl-dots disabled"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div id="news" class="mt-5">
                        <div class="total-item-show position-relative">
                            <h5 class="mb-0 text-uppercase">Truyện đã hoàn thành</h5>
                            <hr>
                            <a href="/truyen-hoan-thanh"
                               class="read-more-story btn btn-outline-primary radius-30 btn-sm">Xem thêm</a>
                        </div>

                        <div id="new-story">
                            <div class="row product-grid">
                                <div v-for="(item, index) in storys1" :key="index" class="col-md-3 col-4">
                                    <div class="card">
                                        <div class="position-relative">
                                            <a :href="`http://localhost:3000/${item.slug}.html`">
                                                <img onerror="this.src=`https:/${item.avatar_uri}`"
                                                     class="card-img-top lazyload" :alt="`${item.name}`"
                                                     :data-src="`${item.avatar}`" :src="`${item.avatar}`" width="200"
                                                     height="260">
                                            </a>
                                            <div class="story-meta-data d-flex justify-content-start">
                                                <span>
                                                    <i class="bx bx-show"></i>
                                                    {{
                                                        item.statistics.total_watched
                                                    }}
                                                </span>
                                                <span>
                                                    <i class="bx bx-bookmark-alt"></i>
                                                    {{
                                                        item.statistics.total_follow
                                                    }}
                                                </span>
                                            </div>

                                            <div v-if="item.statistics.status === 'finish'"
                                                 class="position-absolute top-0 end-0 m-1 product-discount">
                                                <div class="hot-item">
                                                    <span class="is-full">FULL</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card-body">
                                            <h6 class="card-title cursor-pointer story-item-title">
                                                <a :href="`/${item.slug}`">
                                                    {{ item.description }}
                                                </a>
                                            </h6>
                                            <div class="d-flex justify-content-between">
                                                <span class="chapter font-meta">
                                                    <a :href="`/${item.slug}/chuong-${item.last_chapter
                                                        ? item.last_chapter.chapter_number : 1}`">
                                                        Chương {{
                                                            item.last_chapter ? item.last_chapter.chapter_number : 1
                                                        }}
                                                    </a>
                                                </span>

                                                <span class="post-on font-meta">6 phút trước</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-center mb-4 pagination justify-content-center">
                                <a href="/truyen-hoan-thanh"
                                   class="btn btn-sm btn-primary">
                                    Xem thêm
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <HomeWidgetFanpage/>
            </div>
        </div>
    </section>
</template>
