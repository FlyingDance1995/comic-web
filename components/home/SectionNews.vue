<script setup>
import { useStoryStore, useStoryStore1 } from '@/store/storys'

const storyStore = useStoryStore()
const storyStore1 = useStoryStore1()

onMounted(() => {
    const params = {
        ordering: "-modification_time"
    }

    const params1 = {
        status: "finish"
    }

    storyStore.fetchStorys(params)
    storyStore1.fetchStorys(params1)
})

const { storys, loading, error } = storeToRefs(storyStore)
const { storys1, loading1, error1 } = storeToRefs(storyStore1)
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
                                            <a :href="`http://localhost:3000/${item.slug}.html`">
                                                <img onerror="this.src=`https:/${item.avatar_uri}`"
                                                    class="lazyload card-img-top" :alt="`${item.name}`"
                                                    :data-src="`${item.avatar}`" :src="`${item.avatar}`" 
                                                    width="200"
                                                    height="260">
                                            </a>
                                            <div class="story-meta-data d-flex justify-content-start">
                                                <span><i class="bx bx-show"></i>{{ item.statistics.total_watched }}</span>
                                                <span><i class="bx bx-bookmark-alt"></i>{{ item.statistics.total_follow
                                                }}</span>
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
                                                    <a :href="`http://localhost:3000/${item.slug}/chuong-${item.last_chapter
                                                        ? item.last_chapter.chapter_number : 1}.html`">
                                                        Chương {{ item.last_chapter ? item.last_chapter.chapter_number : 1
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
                                        <li class="page-item"><a class="page-link" href="https://monkeyd.vn?page=2">2</a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="https://monkeyd.vn?page=3">3</a>
                                        </li>


                                        <li class="page-item disabled">
                                            <a class="page-link" href="javascript:;">
                                                ...
                                            </a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="https://monkeyd.vn?page=66">66</a>
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
                                                                            <img src="https://monkeyd.vn/img/ajax-loading.gif"
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
                                                                            <img src="https://monkeyd.vn/img/ajax-loading.gif"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/18/1718719356-cung-chi-do-doc-qua-nhieu-truyen-thoi.jpg"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-cam-giac-khi-hai-ta-gap-nhau.jpg"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719545661-mot-giac-mong.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719545661-mot-giac-mong.jpg"
                                                                                alt="MỘT GIẤC MỘNG" width="200" height="260"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/25/1719289732-hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/25/1719289732-hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.jpg"
                                                                                alt="Hồi Ức Thanh Xuân Tươi Đẹp Của Chúng Ta"
                                                                                width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/hoi-uc-thanh-xuan-tuoi-dep-cua-chung-ta.html">
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/05/14/1715701051-hoi-tam-do.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/05/14/1715701051-hoi-tam-do.jpg"
                                                                                alt="Hối Tâm Đồ" width="200" height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/hoi-tam-do.html">Hối Tâm
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719335737-nguoi-yeu-vo-tri-cua-quai-vat.jpg"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/05/13/1715612000-nhat-tieu-hong-tran.jpg"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/21/1718958214-em-trai-ban-than-de-y-toi.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/21/1718958214-em-trai-ban-than-de-y-toi.jpg"
                                                                                alt="Em Trai Bạn Thân Để Ý Tôi" width="200"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718522477-xuyen-thanh-cau-ngoc-nhieu-tien.jpg"
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
                                                                            <img src="https://monkeyd.vn/images/story/thumbs/290/2024/05/24/1716488122-blstory-oneshot.jpg"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/05/24/1716488122-blstory-oneshot.jpg"
                                                                                alt="BLSTORY ONESHOT" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/blstory-oneshot.html">BLSTORY
                                                                            ONESHOT</a></h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="owl-item" style="width: 139px; margin-right: 20px;">
                                                            <div class="single-story-block">
                                                                <div class="single-story-wrap">
                                                                    <div class="single-story-img">
                                                                        <a href="https://monkeyd.vn/quan-lau-tren-doi.html">
                                                                            <img src="https://monkeyd.vn/img/ajax-loading.gif"
                                                                                class="lazyload"
                                                                                data-src="https://monkeyd.vn/images/story/thumbs/290/2024/06/13/1718289501-quan-lau-tren-doi.jpg"
                                                                                alt="Quản Lẩu Trên Đồi" width="200"
                                                                                height="260"
                                                                                onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="single-story-details">
                                                                    <h3><a href="https://monkeyd.vn/quan-lau-tren-doi.html">Quản
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
                                                                            <img src="https://monkeyd.vn/img/ajax-loading.gif"
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
                                                                            <img src="https://monkeyd.vn/img/ajax-loading.gif"
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
                                                <div class="owl-nav disabled"><button type="button" role="presentation"
                                                        class="owl-prev"><span
                                                            aria-label="Previous">‹</span></button><button type="button"
                                                        role="presentation" class="owl-next"><span
                                                            aria-label="Next">›</span></button></div>
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
                            <a href="http://localhost:3000/truyen-hoan-thanh.html"
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
                                                <span><i class="bx bx-show"></i>{{ item.statistics.total_watched }}</span>
                                                <span><i class="bx bx-bookmark-alt"></i> {{ item.statistics.total_follow
                                                }}</span>
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
                                                    <a :href="`http://localhost:3000/${item.slug}/chuong-${item.last_chapter
                                                        ? item.last_chapter.chapter_number : 1}.html`">
                                                        Chương {{ item.last_chapter ? item.last_chapter.chapter_number : 1
                                                        }}</a>
                                                </span>
                                                <span class="post-on font-meta">6 phút trước</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mb-4 pagination justify-content-center">
                                <a href="http://localhost:3000/truyen-hoan-thanh.html" class="btn btn-sm btn-primary">Xem
                                    thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-12">
                    <div class="widget-fanpage mb-3 text-center">
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmonkeyd.vn&amp;tabs&amp;width=340&amp;height=130&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=439215208546321"
                            width="340" height="130" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card widget-top">
                                <div class="card-body p-2">
                                    <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">Bảng xếp hạng
                                    </h5>
                                    <ul class="nav nav-pills mb-3 justify-content-center" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-bs-toggle="pill" href="#top-day" role="tab"
                                                aria-selected="true">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Hôm nay</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="pill" href="#top-week" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Tuần này</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="pill" href="#top-month" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Tháng này</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="top-day" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719664562-khong-viec-gi-thi-dung-lam-tra-xanh.jpg"
                                                        alt="KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/khong-viec-gi-thi-dung-lam-tra-xanh.html">
                                                            KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 12
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 13,505
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719748540-ban-cung-phong-tinh-dam-nhu-hoa-cuc.jpg"
                                                        alt="Bạn cùng phòng tính đạm như hoa cúc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ban-cung-phong-tinh-dam-nhu-hoa-cuc.html">
                                                            Bạn cùng phòng tính đạm như hoa cúc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 9
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 13,171
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">3</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719751494-phong-vu-lan.jpg"
                                                        alt="PHONG VŨ LAN"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phong-vu-lan.html">
                                                            PHONG VŨ LAN
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 16 + Ngoại truyện
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 11,752
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">4</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/11/1718112990-song-lai-ta-dich-than-day-do-quy-tu-quy-nu.jpg"
                                                        alt="Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/song-lai-ta-dich-than-day-do-quy-tu-quy-nu.html">
                                                            Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 517: KẾT THÚC
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 10,972
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">5</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719716801-thu-tri-mo-vu.jpg"
                                                        alt="THU TRÌ MỘ VŨ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/thu-tri-mo-vu.html">
                                                            THU TRÌ MỘ VŨ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 37 - 38 - 39 (HOÀN)
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 10,326
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">6</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-ba-mai-tra-xanh.jpg"
                                                        alt="Bà Mai Trà Xanh"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ba-mai-tra-xanh.html">
                                                            Bà Mai Trà Xanh
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 11: Kết
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 8,370
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">7</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719644767-ngoc-thai.jpg"
                                                        alt="Ngọc Thai"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ngoc-thai.html">
                                                            Ngọc Thai
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Hoàn
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 8,198
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">8</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718510976-ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-nuoi-con.jpg"
                                                        alt="Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-cham-soc-con.html">
                                                            Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 96 (PN 2)
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 7,431
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">9</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719395313-uyen-uyen-van-quan-an.jpg"
                                                        alt="Uyên Uyên Vấn Quân An"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/uyen-uyen-van-quan-an.html">
                                                            Uyên Uyên Vấn Quân An
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 8: Ngoại truyện
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 7,389
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">10</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719565691-phu-quan-takhong-duoc.jpg"
                                                        alt="Phu quân ta...không được!!!"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phu-quan-takhong-duoc.html">
                                                            Phu quân ta...không được!!!
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            End
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 6,366
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-week" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719664562-khong-viec-gi-thi-dung-lam-tra-xanh.jpg"
                                                        alt="KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/khong-viec-gi-thi-dung-lam-tra-xanh.html">
                                                            KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 12
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 13,482
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719748540-ban-cung-phong-tinh-dam-nhu-hoa-cuc.jpg"
                                                        alt="Bạn cùng phòng tính đạm như hoa cúc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ban-cung-phong-tinh-dam-nhu-hoa-cuc.html">
                                                            Bạn cùng phòng tính đạm như hoa cúc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 9
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 13,157
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">3</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719751494-phong-vu-lan.jpg"
                                                        alt="PHONG VŨ LAN"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phong-vu-lan.html">
                                                            PHONG VŨ LAN
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 16 + Ngoại truyện
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 11,741
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">4</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/11/1718112990-song-lai-ta-dich-than-day-do-quy-tu-quy-nu.jpg"
                                                        alt="Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/song-lai-ta-dich-than-day-do-quy-tu-quy-nu.html">
                                                            Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 517: KẾT THÚC
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 10,953
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">5</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719716801-thu-tri-mo-vu.jpg"
                                                        alt="THU TRÌ MỘ VŨ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/thu-tri-mo-vu.html">
                                                            THU TRÌ MỘ VŨ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 37 - 38 - 39 (HOÀN)
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 10,326
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">6</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-ba-mai-tra-xanh.jpg"
                                                        alt="Bà Mai Trà Xanh"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ba-mai-tra-xanh.html">
                                                            Bà Mai Trà Xanh
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 11: Kết
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 8,351
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">7</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719644767-ngoc-thai.jpg"
                                                        alt="Ngọc Thai"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ngoc-thai.html">
                                                            Ngọc Thai
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Hoàn
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 8,198
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">8</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718510976-ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-nuoi-con.jpg"
                                                        alt="Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-cham-soc-con.html">
                                                            Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 96 (PN 2)
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 7,410
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">9</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719395313-uyen-uyen-van-quan-an.jpg"
                                                        alt="Uyên Uyên Vấn Quân An"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/uyen-uyen-van-quan-an.html">
                                                            Uyên Uyên Vấn Quân An
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 8: Ngoại truyện
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 7,381
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">10</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719565691-phu-quan-takhong-duoc.jpg"
                                                        alt="Phu quân ta...không được!!!"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phu-quan-takhong-duoc.html">
                                                            Phu quân ta...không được!!!
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            End
                                                        </div>
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 6,351
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-month" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719664562-khong-viec-gi-thi-dung-lam-tra-xanh.jpg"
                                                        alt="KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/khong-viec-gi-thi-dung-lam-tra-xanh.html">
                                                            KHÔNG VIỆC GÌ THÌ ĐỪNG LÀM TRÀ XANH
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 12
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 13,454
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719748540-ban-cung-phong-tinh-dam-nhu-hoa-cuc.jpg"
                                                        alt="Bạn cùng phòng tính đạm như hoa cúc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ban-cung-phong-tinh-dam-nhu-hoa-cuc.html">
                                                            Bạn cùng phòng tính đạm như hoa cúc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 9
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 13,139
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">3</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719751494-phong-vu-lan.jpg"
                                                        alt="PHONG VŨ LAN"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phong-vu-lan.html">
                                                            PHONG VŨ LAN
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 16 + Ngoại truyện
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 11,733
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">4</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/11/1718112990-song-lai-ta-dich-than-day-do-quy-tu-quy-nu.jpg"
                                                        alt="Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/song-lai-ta-dich-than-day-do-quy-tu-quy-nu.html">
                                                            Sống Lại, Ta Đích Thân Dạy Dỗ Quý Tử, Quý Nữ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 517: KẾT THÚC
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 10,932
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">5</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/30/1719716801-thu-tri-mo-vu.jpg"
                                                        alt="THU TRÌ MỘ VŨ"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/thu-tri-mo-vu.html">
                                                            THU TRÌ MỘ VŨ
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 37 - 38 - 39 (HOÀN)
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 10,326
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">6</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719584080-ba-mai-tra-xanh.jpg"
                                                        alt="Bà Mai Trà Xanh"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ba-mai-tra-xanh.html">
                                                            Bà Mai Trà Xanh
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 11: Kết
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 8,336
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">7</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/29/1719644767-ngoc-thai.jpg"
                                                        alt="Ngọc Thai"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/ngoc-thai.html">
                                                            Ngọc Thai
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Hoàn
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 8,196
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">8</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/16/1718510976-ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-nuoi-con.jpg"
                                                        alt="Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a
                                                            href="https://monkeyd.vn/ac-doc-nu-xung-duong-oa-ky-nu-phu-ac-doc-cham-soc-con.html">
                                                            Ác độc nữ xứng dưỡng oa ký (Nữ phụ ác độc chăm sóc con)
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 96 (PN 2)
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 7,397
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">9</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/26/1719395313-uyen-uyen-van-quan-an.jpg"
                                                        alt="Uyên Uyên Vấn Quân An"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/uyen-uyen-van-quan-an.html">
                                                            Uyên Uyên Vấn Quân An
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            Chương 8: Ngoại truyện
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 7,370
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">10</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/story/thumbs/290/2024/06/28/1719565691-phu-quan-takhong-duoc.jpg"
                                                        alt="Phu quân ta...không được!!!"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/phu-quan-takhong-duoc.html">
                                                            Phu quân ta...không được!!!
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="last_chapter">
                                                            End
                                                        </div>
                                                        <p class="view">
                                                            <i class="bx bx-show"></i> 6,332
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card widget-top top-user-view">
                                <div class="card-body p-2">
                                    <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">Top View</h5>
                                    <ul class="nav nav-pills mb-3 justify-content-center" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-bs-toggle="pill" href="#top-user-view-day"
                                                role="tab" aria-selected="true">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Hôm nay</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="pill" href="#top-user-view-week" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Tuần này</div>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="pill" href="#top-user-view-month" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                <div class="d-flex align-items-center">
                                                    <div class="tab-title">Tháng này</div>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active" id="top-user-view-day" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/20/1710950875-958.jpg"
                                                        class="border-50" alt="Bao đồng một mối lương duyên?"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/958">
                                                            Bao đồng một mối lương duyên?
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 31,854
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/01/1714501943-3254.jpg"
                                                        class="border-50" alt="Xoăn dịch truyện"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/3254">
                                                            Xoăn dịch truyện
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 26,040
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">3</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/17/1715953258-2238.jpg"
                                                        class="border-50" alt="Anan"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2238">
                                                            Anan
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 25,259
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">4</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/27/1714193978-2837.jpg"
                                                        class="border-50" alt="Chuồng nhỏ của Hoài"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2837">
                                                            Chuồng nhỏ của Hoài
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 20,811
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">5</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710300907-3.jpg"
                                                        class="border-50" alt="Tớ Là Con Ma Nè"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/3">
                                                            Tớ Là Con Ma Nè
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 19,315
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">6</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/30/1714433206-2431.jpg"
                                                        class="border-50" alt="Anh Lanh Chanh"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2431">
                                                            Anh Lanh Chanh
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 17,836
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">7</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/21/1711034053-287.jpg"
                                                        class="border-50" alt="Yêu Phi Họa Quốc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/287">
                                                            Yêu Phi Họa Quốc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 17,363
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">8</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710310901-7.jpg"
                                                        class="border-50" alt="Tiểu Lạc Lạc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/7">
                                                            Tiểu Lạc Lạc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 16,053
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">9</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/12/1715497276-4471.jpg"
                                                        class="border-50" alt="Một Chiếc Chanh Vô Tree"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/4471">
                                                            Một Chiếc Chanh Vô Tree
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 15,792
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">10</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/31/1711873411-424.jpg"
                                                        class="border-50" alt="Cá Mặn Rất Mặn"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/424">
                                                            Cá Mặn Rất Mặn
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 14,304
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-user-view-week" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/20/1710950875-958.jpg"
                                                        class="border-50" alt="Bao đồng một mối lương duyên?"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/958">
                                                            Bao đồng một mối lương duyên?
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 31,803
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/01/1714501943-3254.jpg"
                                                        class="border-50" alt="Xoăn dịch truyện"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/3254">
                                                            Xoăn dịch truyện
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 26,008
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">3</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/17/1715953258-2238.jpg"
                                                        class="border-50" alt="Anan"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2238">
                                                            Anan
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 25,203
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">4</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/27/1714193978-2837.jpg"
                                                        class="border-50" alt="Chuồng nhỏ của Hoài"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2837">
                                                            Chuồng nhỏ của Hoài
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 20,799
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">5</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710300907-3.jpg"
                                                        class="border-50" alt="Tớ Là Con Ma Nè"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/3">
                                                            Tớ Là Con Ma Nè
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 19,301
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">6</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/30/1714433206-2431.jpg"
                                                        class="border-50" alt="Anh Lanh Chanh"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/2431">
                                                            Anh Lanh Chanh
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 17,804
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">7</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/21/1711034053-287.jpg"
                                                        class="border-50" alt="Yêu Phi Họa Quốc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/287">
                                                            Yêu Phi Họa Quốc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 17,340
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">8</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710310901-7.jpg"
                                                        class="border-50" alt="Tiểu Lạc Lạc"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/7">
                                                            Tiểu Lạc Lạc
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 16,024
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">9</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/12/1715497276-4471.jpg"
                                                        class="border-50" alt="Một Chiếc Chanh Vô Tree"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/4471">
                                                            Một Chiếc Chanh Vô Tree
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 15,756
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">10</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/31/1711873411-424.jpg"
                                                        class="border-50" alt="Cá Mặn Rất Mặn"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/424">
                                                            Cá Mặn Rất Mặn
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 14,276
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="top-user-view-month" role="tabpanel">
                                            <div class="d-flex top-item">
                                                <div class="stt">1</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/20/1710950875-958.jpg"
                                                        class="border-50" alt="Bao đồng một mối lương duyên?"
                                                        onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                                </div>
                                                <div class="detail">
                                                    <h3>
                                                        <a href="https://monkeyd.vn/nhom-dich/958">
                                                            Bao đồng một mối lương duyên?
                                                        </a>
                                                    </h3>
                                                    <div class="d-flex justify-content-between">
                                                        <div class="view">
                                                            <i class="bx bx-show"></i> 31,752
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex top-item">
                                                <div class="stt">2</div>
                                                <div class="thumbnail">
                                                    <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/01/1714501943-3254.jpg"
                                                    class="border-50" alt="Xoăn dịch truyện"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/3254">
                                                        Xoăn dịch truyện
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 25,971
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">3</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/17/1715953258-2238.jpg"
                                                    class="border-50" alt="Anan"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2238">
                                                        Anan
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 25,157
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">4</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/27/1714193978-2837.jpg"
                                                    class="border-50" alt="Chuồng nhỏ của Hoài"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2837">
                                                        Chuồng nhỏ của Hoài
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 20,784
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">5</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710300907-3.jpg"
                                                    class="border-50" alt="Tớ Là Con Ma Nè"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/3">
                                                        Tớ Là Con Ma Nè
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 19,284
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">6</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/30/1714433206-2431.jpg"
                                                    class="border-50" alt="Anh Lanh Chanh"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2431">
                                                        Anh Lanh Chanh
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 17,770
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">7</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/21/1711034053-287.jpg"
                                                    class="border-50" alt="Yêu Phi Họa Quốc"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/287">
                                                        Yêu Phi Họa Quốc
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 17,319
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">8</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710310901-7.jpg"
                                                    class="border-50" alt="Tiểu Lạc Lạc"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/7">
                                                        Tiểu Lạc Lạc
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 15,995
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">9</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/12/1715497276-4471.jpg"
                                                    class="border-50" alt="Một Chiếc Chanh Vô Tree"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/4471">
                                                        Một Chiếc Chanh Vô Tree
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 15,728
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">10</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/31/1711873411-424.jpg"
                                                    class="border-50" alt="Cá Mặn Rất Mặn"
                                                    onerror="this.src='https://monkeyd.vn/img/no-image.png'">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/424">
                                                        Cá Mặn Rất Mặn
                                                    </a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="view">
                                                        <i class="bx bx-show"></i> 14,253
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card widget-top top-user-contributions">
                            <div class="card-body p-2">
                                <h5 class="text-center text-uppercase mb-3 mt-2" style="font-weight: bold">Đóng góp</h5>
                                <ul class="nav nav-pills nav-pills-danger mb-3 justify-content-center" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <a class="nav-link active" data-bs-toggle="pill" href="#top-contributions"
                                            role="tab" aria-selected="true">
                                            <div class="d-flex align-items-center">
                                                <div class="tab-title">Cống hiến</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="tab-content" id="danger-pills-tabContent">
                                    <div class="tab-pane fade show active" id="top-contributions" role="tabpanel">
                                        <div class="d-flex top-item">
                                            <div class="stt">1</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/17/1715953258-2238.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2238">Anan</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 59
                                                    </div>
                                                    <div class="view">
                                                        TOP 1
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">2</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/18/1710773836-689.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/689">Nguyệt Nhi</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 59
                                                    </div>
                                                    <div class="view">
                                                        TOP 2
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">3</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/13/1710310901-7.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/7">Tiểu Lạc Lạc</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 57
                                                    </div>
                                                    <div class="view">
                                                        TOP 3
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">4</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/20/1710950875-958.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/958">Bao đồng một mối lương
                                                        duyên?</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 57
                                                    </div>
                                                    <div class="view">
                                                        TOP 4
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">5</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/03/31/1711873411-424.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/424">Cá Mặn Rất Mặn</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 50
                                                    </div>
                                                    <div class="view">
                                                        TOP 5
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">6</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/01/1714501943-3254.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/3254">Xoăn dịch truyện</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 45
                                                    </div>
                                                    <div class="view">
                                                        TOP 6
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">7</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/27/1714193978-2837.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2837">Chuồng nhỏ của Hoài</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 44
                                                    </div>
                                                    <div class="view">
                                                        TOP 7
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">8</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/05/12/1715497276-4471.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/4471">Một Chiếc Chanh Vô
                                                        Tree</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 22
                                                    </div>
                                                    <div class="view">
                                                        TOP 8
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">9</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/30/1714433206-2431.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/2431">Anh Lanh Chanh</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 5
                                                    </div>
                                                    <div class="view">
                                                        TOP 9
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex top-item">
                                            <div class="stt">10</div>
                                            <div class="thumbnail">
                                                <img src="https://monkeyd.vn/images/avatar/thumbs/290/2024/04/29/1714358429-3064.jpg"
                                                    alt="" class="border-50"
                                                    onerror="this.src='https://monkeyd.vn/img/avata.png';">
                                            </div>
                                            <div class="detail">
                                                <h3>
                                                    <a href="https://monkeyd.vn/nhom-dich/3064">Đan Linh</a>
                                                </h3>
                                                <div class="d-flex justify-content-between">
                                                    <div class="last_chapter">
                                                        <i class="bx bx-book-alt"></i> 4
                                                    </div>
                                                    <div class="view">
                                                        TOP 10
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section></template>
