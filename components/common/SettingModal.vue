<script setup>
import {useConfigStore} from "~/store/config.js";
import {clickOutSide as vClickOutSide} from '@mahdikhashan/vue3-click-outside'

const configStore = useConfigStore();

const settingModal = computed(() => configStore.$state.settingModal);

const key = 'settingFont';

const isOpen = ref(false);
const isBlock = ref(false);
const form = reactive({
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18',
    lineHeight: '140',
});

if (process.client) {
    try {
        const settingFont = localStorage.getItem('settingFont');
        if (settingFont) {
            const parseSettingFont = JSON.parse(settingFont);
            form.fontFamily = parseSettingFont?.fontFamily || 'Roboto, sans-serif';
            form.fontSize = parseSettingFont?.fontSize || '18';
            form.lineHeight = parseSettingFont?.lineHeight || '140';
        }
    } catch (e) {
        Object.assign(form, {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '18',
            lineHeight: '140',
        });
        console.log(e);
    }
}

const handleClickOutside = () => {
    if (settingModal.value) configStore.setSettingModal(false);
};

const closeSetting = () => {
    configStore.setSettingModal(false);
};

watch(settingModal, () => {
    if (settingModal.value) {
        isBlock.value = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            isOpen.value = true;
        }, 150);
    } else {
        isOpen.value = false;
        document.body.style.overflow = '';
        setTimeout(() => {
            isBlock.value = false;
        }, 150);
    }
});

watch(form, () => {
    localStorage.setItem(key, JSON.stringify(form));
    const event = new CustomEvent('localStorageChanged', { detail: { key, form } });
    window.dispatchEvent(event);
}, {deep: true});
</script>

<template>
    <div class="modal fade"
         :class="isOpen ? 'show' : ''"
         id="settingModal" tabindex="-1" role="dialog"
         aria-labelledby="settingModalLabel" :aria-modal="settingModal" :aria-hidden="!settingModal"
         :style="{display: isBlock ? 'block' : 'none'}">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="settingModalLabel">Cài đặt</h5>
                </div>

                <div v-click-out-side="handleClickOutside"
                     class="modal-body">
                    <div class="setting">
                        <div id="optFont" class="input-field mb-2">
                            <label for="selectFont">Font:</label>
                            <select v-model="form.fontFamily"
                                    id="selectFont"
                                    data-change="changeFont"
                                    class="initialized form-control">
                                <option value="Arial, sans-serif" style="font-family: Arial, sans-serif;">
                                    Arial
                                </option>
                                <option value="Roboto, sans-serif" style="font-family: Roboto, sans-serif;">
                                    Roboto
                                </option>
                                <option value="Tahoma, Geneva, sans-serif" style="font-family: Tahoma, Geneva, sans-serif;">
                                    Tahoma
                                </option>
                                <option value="'Times New Roman', Times, serif" style="font-family: 'Times New Roman', Times, serif;">
                                    Times New Roman
                                </option>
                                <option value="'Verdana', Geneva, sans-serif" style="font-family: 'Verdana', Geneva, sans-serif;">
                                    Verdana
                                </option>
                            </select>
                        </div>

                        <div id="optSize" class="input-field mb-2">
                            <label for="selectSize">Size:</label>
                            <select v-model="form.fontSize"
                                    id="selectSize"
                                    data-change="changeSize"
                                    class="initialized form-control">
                                <option value="14">14</option>
                                <option value="16">16</option>
                                <option value="18">18</option>
                                <option value="20">20</option>
                                <option value="22">22</option>
                                <option value="24">24</option>
                                <option value="26">26</option>
                                <option value="28">28</option>
                                <option value="30">30</option>
                            </select>
                        </div>

                        <div id="optLine" class="input-field mb-2">
                            <label for="selectLine">Line:</label>
                            <select v-model="form.lineHeight"
                                    id="selectLine"
                                    data-change="changeLine"
                                    class="initialized form-control">
                                <option value="120">120%</option>
                                <option value="140">140%</option>
                                <option value="160">160%</option>
                                <option value="180">180%</option>
                                <option value="200">200%</option>
                                <option value="220">220%</option>
                            </select>
                        </div>

                        <div class="mb-3 mt-3">
                            <button type="button" class="btn btn-success"
                                    @click="closeSetting">
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
