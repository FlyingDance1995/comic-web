<script setup>
import { useConfigStore } from "~/store/config.js";

const emit = defineEmits(['on-click-aff-chuong'])

const configStore = useConfigStore();

const aff = computed(() => configStore.$state.affList?.find(x => x?.location === 1));

const handleAffClick = (link) => {
    sessionStorage.setItem('aff-chuong', link)
    window.open(link, "_blank")
    emit('on-click-aff-chuong');
}
</script>

<template>
    <div id="chuong_2_popup_content">
        <blockquote style="padding-left: 40px;">
            <p style="text-align: center;">&nbsp;Mời bạn CLICK vào liên kết bên dưới và</p>
        </blockquote>
        <p style="text-align: center;"><strong><span style="color: #ff0000;">MỞ ỨNG DỤNG SHOPEE
                </span></strong>để mở khóa toàn bộ chương truyện!</p>
        <p style="text-align: center;">
            <span style="text-decoration: underline; cursor: pointer;" @click="handleAffClick(aff?.link)">
                👉 <span id="shopee_link" rel="noopener">{{ aff?.link }}</span>
            </span>
        </p>
        <div
            style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-bottom: 20px; margin-top: 20px;">
            <img style="width: 40% !important;" fetchpriority="high" loading="lazy" decoding="async" :src="aff?.banner"
                alt="" width="427" height="427">
        </div>
        <p style="text-align: center;">Lưu ý: Nội dung trên chỉ xuất hiện 1 lần trong ngày, mong Quý độc
            giả ủng hộ.</p>
        <h3 style="text-align: center;"><span style="color: #993366;">Phetruyenn và đội ngũ Editor xin
                chân thành cảm ơn!</span></h3>
        <p>&nbsp;</p>
    </div>
</template>