<!-- components/DoughnutChart.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const doughnutData = ref(null);
const doughnutOptions = ref(null);

function setDoughnutChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    doughnutData.value = {
        labels: ['Cloud Services', 'Software Licenses', 'Business Consulting', 'Hardware & Devices'],
        datasets: [
            {
                data: [45, 25, 20, 10],
                backgroundColor: [
                    documentStyle.getPropertyValue('--p-primary-500'),
                    documentStyle.getPropertyValue('--p-orange-500'),
                    documentStyle.getPropertyValue('--p-cyan-500'),
                    documentStyle.getPropertyValue('--p-purple-500')
                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--p-primary-400'),
                    documentStyle.getPropertyValue('--p-orange-400'),
                    documentStyle.getPropertyValue('--p-cyan-400'),
                    documentStyle.getPropertyValue('--p-purple-400')
                ]
            }
        ]
    };

    doughnutOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        },
        cutout: '70%' // size of the hole in the center
    };
}

onMounted(setDoughnutChart);
watch([getPrimary, getSurface, isDarkTheme], setDoughnutChart, { immediate: true });
</script>

<template>
    <div class="card flex flex-col items-center">
        <div class="font-semibold text-xl mb-4">Revenue by Business Line</div>
        <Chart type="doughnut" :data="doughnutData" :options="doughnutOptions" />
    </div>
</template>
