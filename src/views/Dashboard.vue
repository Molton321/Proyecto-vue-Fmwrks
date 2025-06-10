<script setup>
import BestSellingWidget from '@/components/dashboard/BestSellingWidget.vue';
import RevenueStreamWidget from '@/components/dashboard/RevenueStreamWidget.vue';
import LineChart from '@/components/dashboard/LineChart.vue';
import DoughnutChart from '@/components/dashboard/DoughnutChart.vue';
</script>

<template>
    <div class="grid grid-cols-12 gap-8">


        <div class="col-span-12 xl:col-span-6">
            <BestSellingWidget />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <RevenueStreamWidget />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <LineChart />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <DoughnutChart />
            </div>
    </div>
</template>
