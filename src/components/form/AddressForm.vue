<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
    <!-- Mapa -->
    <div ref="mapContainer" class="h-64 md:h-full rounded border" />

    <!-- Formulario -->
    <form @submit.prevent="emitSubmit" class="space-y-4">
      <h2 class="text-xl font-semibold">FBC - Address</h2>
      <div>
        <label class="block mb-1 font-medium">Street</label>
        <input
          v-model="form.street"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Number</label>
        <input
          v-model="form.number"
          class="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Latitude</label>
        <input
          :value="form.latitude"
          readonly
          class="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>
      <div>
        <label class="block mb-1 font-medium">Longitude</label>
        <input
          :value="form.longitude"
          readonly
          class="w-full border px-3 py-2 rounded bg-gray-100"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import type { Address } from '@/models/Address'

const props = defineProps<{
  modelValue: Address
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Address): void
  (e: 'submit', val: Address): void
}>()

const form = ref<Address>({ ...props.modelValue })
const mapContainer = ref<HTMLElement | null>(null)
let map: maplibregl.Map | null = null
let marker: maplibregl.Marker | null = null

onMounted(() => {
  const lat = form.value.latitude ?? 5.06889
  const lng = form.value.longitude ?? -75.51738

  map = new maplibregl.default.Map({
    container: mapContainer.value!,
    style: 'https://demotiles.maplibre.org/style.json',
    center: [lng, lat],
    zoom: 13,
  })

  marker = new maplibregl.Marker({ draggable: true })
    .setLngLat([lng, lat])
    .addTo(map)

  marker.on('dragend', () => {
    const { lat, lng } = marker!.getLngLat()
    form.value.latitude = lat
    form.value.longitude = lng
  })
})

// Reaccionar a cambios de modelValue (ej. cuando llegan los datos del backend)
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal.latitude || !newVal.longitude) return
    form.value = { ...newVal }

    if (map && marker) {
      map.setCenter([newVal.longitude, newVal.latitude])
      marker.setLngLat([newVal.longitude, newVal.latitude])
    }
  },
  { immediate: true, deep: true }
)

watch(form, (val) => emit('update:modelValue', val), { deep: true })

const emitSubmit = () => {
  emit('submit', form.value)
}
</script>

<style scoped>
.maplibregl-map {
  border-radius: 0.5rem;
}
</style>
