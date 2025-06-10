<!-- components/LineChart.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const lineData = ref(null);
const lineOptions = ref(null);

function setLineChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    lineData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'SaaS Revenue (USD, thousands)',
                data: [120, 135, 150, 160, 175, 190, 210],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
                borderColor: documentStyle.getPropertyValue('--p-primary-500'),
                tension: 0.4
            },
            {
                label: 'Professional Services Revenue (USD, thousands)',
                data: [90, 100, 95, 105, 115, 125, 140],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--p-primary-200'),
                borderColor: documentStyle.getPropertyValue('--p-primary-200'),
                tension: 0.4
            }
        ]
    };

    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: { color: textColorSecondary },
                grid: { color: surfaceBorder, drawBorder: false }
            },
            y: {
                ticks: { color: textColorSecondary },
                grid: { color: surfaceBorder, drawBorder: false }
            }
        }
    };
}

onMounted(setLineChart);
watch([getPrimary, getSurface, isDarkTheme], setLineChart, { immediate: true });
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Monthly Revenue Trends</div>
        <Chart type="line" :data="lineData" :options="lineOptions" />
    </div>
</template>
