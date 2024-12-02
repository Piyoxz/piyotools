<template>
    <div class="min-h-full bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center py-10">
        <!-- Loading Overlay -->
        <div
            v-if="loading"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
            <div class="flex flex-col items-center">
                <VaSpinner size="large" color="white" />
                <p class="text-white mt-4 font-semibold text-lg">Loading, please wait...</p>
            </div>
        </div>

        <VaCard class="p-8 w-full max-w-3xl bg-white shadow-xl rounded-lg">
            <!-- Header -->
            <header class="text-center mb-8">
                <h1 class="text-3xl font-bold text-blue-600">{{ downloader.name }}</h1>
                <p class="text-gray-600 mt-2 text-base">{{ downloader.description }}</p>
            </header>

            <!-- Form Input -->
            <form @submit.prevent="handleSubmit" ref="formRef" class="space-y-6">
                <VaInput
                    v-for="param in downloader.parameter.filter(p => !(downloader.type && p === 'type'))"
                    :key="param"
                    v-model="formData[param]"
                    :label="`Enter ${param}`"
                    :placeholder="`Input ${param}`"
                    :rules="[v => !!v || `${param} is required`] "
                    class="w-full rounded-md"
                    outlined
                    required
                />

                <!-- Select Dropdown for Type -->
                <VaSelect
                    v-if="downloader.type"
                    v-model="selectedType"
                    :options="downloader.type.map(type => ({ label: type.toUpperCase(), value: type, text: type.toUpperCase() }))"
                    searchable
                    label="Select Type"
                    placeholder="Choose a type"
                    :rules="[v => !!v || 'Type is required']"
                    class="w-full rounded-md"
                    required
                />

                <!-- Submit Button -->
                <div class="text-center">
                    <VaButton
                        :disabled="!isFormValid || loading"
                        class="w-full md:w-1/2"
                        color="primary"
                        type="submit"
                        large
                    >
                        <template #default>
                            <span v-if="!loading">Submit</span>
                            <VaSpinner v-else size="small" class="inline-block ml-2" />
                        </template>
                    </VaButton>
                </div>
            </form>

            <!-- Output -->
            <div v-if="outputData" class="mt-10">
                <h2 class="text-lg font-semibold text-gray-800 mb-4 text-center">Output:</h2>

                <!-- Error Notification -->
                <VaAlert v-if="outputData.error || !outputData.status" color="danger" class="mb-6">
                    {{ outputData.error || outputData.message || 'An error occurred or no data found.' }}
                </VaAlert>

                <!-- Success Output -->
                <div v-if="outputData.status && !outputData.error" class="space-y-6">
                    <!-- Output Title -->
                    <div v-if="outputData.title" class="text-center">
                        <h3 class="text-blue-600 font-bold">{{ outputData.title }}</h3>
                    </div>

                    <!-- Output Array -->
                    <div v-if="Array.isArray(outputData.data)" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div
                            v-for="(item, index) in outputData.data"
                            :key="index"
                            class="rounded-lg p-4 bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all text-center"
                        >
                            <!-- Render Different Types -->
                            <img
                                v-if="item.type?.toLowerCase() === 'image' || item.filename?.endsWith('.jpg') || item.filename?.endsWith('.png') || item.url?.endsWith('.jpg') || item.url?.endsWith('.png')"
                                :src="item.url"
                                class="w-full h-48 object-cover rounded-lg mb-2"
                            />
                            <video
                                v-if="item.type?.toLowerCase() === 'video' || item.filename?.endsWith('.mp4') || item.url?.endsWith('.mp4')"
                                :src="item.url"
                                controls
                                class="w-full h-48 object-cover rounded-lg mb-2"
                            ></video>
                            <audio
                                v-if="item.type?.toLowerCase() === 'audio' || item.filename?.endsWith('.mp3') || item.url?.endsWith('.mp3')"
                                :src="item.url"
                                controls
                                class="w-full rounded-lg mb-2"
                            ></audio>
                            <p v-if="item.type?.toLowerCase() === 'text'" class="text-gray-700 text-sm mb-2">
                                {{ item.content || "No Content Available" }}
                            </p>

                            <!-- Download Button -->
                            <a
                                :href="item.url"
                                download
                                class="text-blue-500 hover:underline text-sm mt-2 block"
                            >
                                Download {{ item.type || "file" }}
                            </a>
                        </div>
                    </div>

                    <!-- Output Object -->
                    <div v-else class="rounded-lg p-4 bg-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all text-center">
                        <img
                            v-if="outputData.data.type?.toLowerCase() === 'image' || outputData.data.filename?.endsWith('.jpg') || outputData.data.filename?.endsWith('.png') || outputData.data.url?.endsWith('.jpg') || outputData.data.url?.endsWith('.png')"
                            :src="outputData.data.url"
                            class="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <video
                            v-if="outputData.data.type?.toLowerCase() === 'video' || outputData.data.filename?.endsWith('.mp4') || outputData.data.url?.endsWith('.mp4')"
                            :src="outputData.data.url"
                            controls
                            class="w-full h-48 object-cover rounded-lg mb-2"
                        ></video>
                        <audio
                            v-if="outputData.data.type?.toLowerCase() === 'audio' || outputData.data.filename?.endsWith('.mp3') || outputData.data.url?.endsWith('.mp3')"
                            :src="outputData.data.url"
                            controls
                            class="w-full rounded-lg mb-2"
                        ></audio>
                        <p v-if="outputData.data.type === 'text'" class="text-gray-700 text-sm mb-2">
                            {{ outputData.data.content || "No Content Available" }}
                        </p>
                        <a
                            :href="outputData.data.url"
                            download
                            class="text-blue-500 hover:underline text-sm mt-2 block"
                        >
                            Download {{ outputData.data.type || "file" }}
                        </a>
                    </div>
                </div>
            </div>
        </VaCard>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import downloaders from '../data/downloaders.json';

const selectedType = ref<string | null>(null);

const route = useRoute();
const id = route.params.id;

const downloader = computed(() => {
    const found = downloaders.find(d => d.no === Number(id));
    if (!found) throw new Error('Downloader not found');
    return found;
});

const formData = ref<Record<string, string>>({});
const outputData = ref<any>(null);
const loading = ref(false);
const formRef = ref<HTMLFormElement | null>(null);

// Check if form is valid
const isFormValid = computed(() => {
    if (formRef.value) {
        return formRef.value.checkValidity();
    }
    return false;
});
// Handle Submit
const handleSubmit = async () => {
    try {
        loading.value = true;

        const endpoint = `/api${downloader.value.action}`;
        const method = downloader.value.method || 'GET';

        if (selectedType.value) {
            formData.value['type'] = selectedType.value.value;
        }

        let response;
        if (method === 'GET') {
            const params = new URLSearchParams(formData.value).toString();
            if (endpoint.includes('?')) {
                response = await axios.get(`${endpoint}&${params}&apikey=piyokey`);
            } else {
                response = await axios.get(`${endpoint}?${params}&apikey=piyokey`);
            }
        } else if (method === 'POST') {
            response = await axios.post(endpoint, formData.value);
        }

        outputData.value = response?.data || { status: false, message: 'No data received.' };
    } catch (error) {
        outputData.value = { error: error.response?.data?.message || error.message, status: false };
    } finally {
        console.log(outputData)
        loading.value = false;
    }
};
</script>
