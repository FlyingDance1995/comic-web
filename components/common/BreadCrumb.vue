<script setup>
const props = defineProps({
    name: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div class="page-breadcrumb d-flex align-items-center mb-3">
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item">
                        <NuxtLink to="/">Trang chủ</NuxtLink>
                    </li>
<!--                    <i class='bx bx-chevron-right'></i>-->
                    <li class="breadcrumb-item active" aria-current="page">
                        {{name}}
                    </li>
                </ol>
            </nav>
        </div>
    </div>
</template>
