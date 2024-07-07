<script setup>
    import { useCategoryStore } from '@/store/category'

    const categoryStore = useCategoryStore()

    onMounted(() => {
        categoryStore.fetchCategory()
    })

    const { category, loading, error } = storeToRefs(categoryStore)
</script>

<template>
    <div class="primary-menu">
        <nav class="navbar navbar-expand-lg align-items-center">
            <div class="container">
                <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                     aria-labelledby="offcanvasNavbarLabel">
                    <div class="offcanvas-header border-bottom">
                        <div class="d-flex align-items-center">
                            <div class="">
                                <a href="https://monkeyd.vn">
                                    <img src="https://monkeyd.vn/images/logo/Logo-MonkeyD.png" class="logo-icon"
                                         alt="MonkeyD - Chuyên cập nhật các truyện tiểu thuyết, ngôn tình, truyện ngắn hot nhất 2024">
                                </a>
                            </div>
                        </div>

                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                                aria-label="Close">
                        </button>
                    </div>

                    <div class="offcanvas-body">
                        <ul class="navbar-nav align-items-center flex-grow-1">
                            <li class="nav-item">
                                <a class="nav-link" href="https://monkeyd.vn">
                                    <div class="menu-title d-flex align-items-center">Trang chủ</div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="https://monkeyd.vn/truyen-moi.html">
                                    <div class="menu-title d-flex align-items-center">Truyện mới</div>
                                </a>
                            </li>

                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle dropdown-toggle-nocaret" href="javascript:;"
                                   data-bs-toggle="dropdown">
                                    <div class="parent-icon"><i class="bx bx-list-ol"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Thể loại</div>
                                    <div class="ms-auto dropy-icon"><i class="bx bx-chevron-down"></i></div>
                                </a>
                                
                                <ul class="dropdown-menu scroll-menu ps ps--active-x ps--active-y ps--scrolling-y">
                                    <li v-for="(item, index) in category" :key="index">
                                        <a class="dropdown-item"
                                            :href="`http://localhost:3000/the-loai/${item.slug}.html`">
                                            <i class="bx bx-chevron-right"></i>{{ item.name }} 
                                        </a>
                                    </li>

                                    <li v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 250px;">
                                        Loading...
                                    </li>

                                    <li v-if="error" class="d-flex justify-content-center align-items-center" style="height: 250px;">
                                        {{ error }}
                                    </li>

                                    <div class="ps__rail-x" style="left: 0px; bottom: -485px; width: 224px;">
                                        <div class="ps__thumb-x" tabindex="0"
                                             style="left: 0px; width: 201px;"></div>
                                    </div>
                                    <div class="ps__rail-y" style="top: 485px; right: 0px; height: 450px;">
                                        <div class="ps__thumb-y" tabindex="0"
                                             style="top: 98px; height: 91px;"></div>
                                    </div>
                                </ul>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="https://monkeyd.vn/truyen-hoan-thanh.html">
                                    <div class="menu-title d-flex align-items-center">Truyện Full</div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="https://monkeyd.vn/truyen-sang-tac.html">
                                    <div class="menu-title d-flex align-items-center">
                                        <div class="parent-icon">
                                            <i class="bx bx-star"></i>
                                        </div>
                                        Truyện Sáng Tác
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="https://monkeyd.vn/danh-sach-nhom-dich">
                                    <div class="parent-icon">
                                        <i class="bx bx-group"></i>
                                    </div>
                                    <div class="menu-title d-flex align-items-center">Team</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>

</style>
