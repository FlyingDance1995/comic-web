<script setup>
import {useCategoryStore} from '@/store/category'

const isExpand = ref(true);
const categoryStore = useCategoryStore()

const {category, loading, error} = storeToRefs(categoryStore);

const handleExpand = (value) => {
    isExpand.value = !value;
};
</script>

<template>
    <section class="section-categories">
        <div class="container">
            <div class="list-story-categories">
                <div class="clear">
                    <div class="blog-heading fl">Thể Loại</div>
                    <a class="btn btn-genres icon ion-md-arrow-dropdown fr" @click="handleExpand(isExpand)"></a>
                </div>

                <div v-if="isExpand" class="show-list-categories active">
                    <div class="row">
                        <div v-for="(item, index) in category" :key="index"
                             class="col-6 col-sm-4 col-md-3">
                            <h4 class="item-category">
                                <a :href="`/the-loai/${item.slug}`">
                                    <i class="bx bx-caret-right"></i>
                                    {{ item.name }}
                                </a>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
