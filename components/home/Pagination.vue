<script setup>
const props = defineProps({
    total: {
        type: Number,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    size: {
        type: Number,
        default: 10
    }
});
</script>

<template>
    <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link"
                   :class="{'disabled': page === 1}"
                   :href="`/truyen-moi?page=${page - 1}`"
                   tabindex="-1">
                    <i class="bx bx-chevrons-left"></i>
                </a>
            </li>

            <li class="page-item active"
                aria-current="page">
                <a class="page-link"
                   href="javascript:;">
                    {{page}}
                    <span class="visually-hidden">(current)</span>
                </a>
            </li>

            <li v-if="1 + page < Math.ceil(total / size)" class="page-item">
                <a class="page-link"
                   :href="`/truyen-moi?page=${1 + page}`">
                    {{1 + page}}
                </a>
            </li>

            <li v-if="2 + page < Math.ceil(total / size)" class="page-item">
                <a class="page-link"
                   :href="`/truyen-moi?page=${2 + page}`">
                    {{2 + page}}
                </a>
            </li>

            <li v-if="3 + page < Math.ceil(total / size)" class="page-item disabled">
                <a class="page-link"
                   href="javascript:;">
                    ...
                </a>
            </li>

            <li v-if="page !== Math.ceil(total / size)" class="page-item">
                <a class="page-link"
                   :href="`/truyen-moi?page=${Math.ceil(total / size)}`">
                    {{Math.ceil(total / size)}}
                </a>
            </li>

            <li class="page-item"
                :class="{'disabled': page === Math.ceil(total / size)}">
                <a class="page-link"
                   :href="`/truyen-moi?page=${1 + page}`">
                    <i class="bx bx-chevrons-right"></i>
                </a>
            </li>
        </ul>
    </nav>
</template>
