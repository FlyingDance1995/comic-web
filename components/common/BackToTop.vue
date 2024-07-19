<script setup>
onMounted(() => {
    $(document).ready(function () {
        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 300) {
                $(".back-to-top").fadeIn();
            } else {
                $(".back-to-top").fadeOut();
            }
        });

        $(".back-to-top").on("click", function () {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        });
    })
});
</script>

<template>
    <a href="javaScript:;" class="back-to-top" style="display: none;">
        <i class="bx bxs-up-arrow-alt"/>
    </a>
</template>
