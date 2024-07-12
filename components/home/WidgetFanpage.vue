<script setup>
const linkFanpage = "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmonkeyd.vn&amp;tabs&amp;width=340&amp;height=130&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=439215208546321";
</script>

<template>
    <div class="col-lg-3 col-md-3 col-12">
        <div class="widget-fanpage mb-3 text-center">
            <iframe
                :src="linkFanpage"
                width="340" height="130" 
                style="border:none;overflow:hidden" 
                scrolling="no" 
                frameborder="0"
                allowfullscreen="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>

        <div class="row">
            <CommonTableTop/>

            <CommonTableTopView/>

            <CommonTableTopDonate/>
        </div>
    </div>
</template>
