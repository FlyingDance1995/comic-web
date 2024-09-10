<script setup>
import {useMenuStore} from "~/store/menu.js";

useSchemaOrg([
    {
        "@context": "http://schema.org",
        "@type": "Organization",
        "url": "https://phetruyenn.com",
        "foundingDate": "2024",
        "founders": [
            {
                "@type": "Person",
                "name": "Phê Truyện"
            }],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "email": "phetruyenn@gmail.com"
        },
        "sameAs": ["https://www.facebook.com/fanpage/"],
        "@id": "#organization",
        "name": "Phê Truyện",
        "logo": "/images/logo/Logo.svg"
    }
]);

const route = useRoute();
const menuStore = useMenuStore();

const openMenu = computed(() => menuStore.$state.open);
</script>

<template>
    <NuxtLoadingIndicator color="#bb85be"/>
    <!--ads-->
    <ClientOnly>
        <CommonAffLayer/>
    </ClientOnly>
    <!--wrapper-->
    <div class="wrapper"
         :class="openMenu ? 'toggled' : ''">
        <!--start header wrapper-->
        <div class="header-wrapper">
            <!--start header -->
            <CommonHeader/>
            <!--end header -->
            <!--navigation-->
            <CommonNavigation/>
            <!--end navigation-->
        </div>
        <!--end header wrapper-->
        <!--start page wrapper -->
        <div class="page-wrapper">
            <div class="page-content">
                <slot/>
            </div>
        </div>
        <ClientOnly>
            <!-- search modal -->
            <CommonSearchModal/>
            <!-- end search modal -->
            <!-- Report License Modal -->
            <CommonReportLicenseModal/>
            <!-- Report Error Modal -->
            <CommonReportErrorModal/>
            <!-- Setting Modal -->
            <CommonSettingModal/>
            <!--start overlay-->
            <CommonOverlay/>
            <!--end overlay-->
            <!--Start Back To Top Button-->
            <!--<CommonBackToTop/>-->
        </ClientOnly>
        <!--End Back To Top Button-->
        <CommonFooter/>
    </div>

    <ClientOnly>
        <!-- loading -->
        <CommonLoadingModal/>
        <!-- swal -->
        <CommonSwal/>
        <!-- modal backdrop-->
        <CommonBackDropModal/>
    </ClientOnly>
</template>

<style scoped>

</style>
