<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
    <!-- Mapa -->
    <div>
      <div ref="mapContainer" class="h-64 md:h-full rounded border" />
      <p class="mt-2 text-sm text-gray-500">
        Haz clic en el mapa para seleccionar la ubicación.
      </p>
    </div>

    <!-- Formulario -->
    <form @submit.prevent="emitSubmit" class="space-y-4">
      <h2 class="text-xl font-semibold">Nueva Dirección</h2>
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
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Guardar Dirección
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Address } from '@/models/Address';

const props = defineProps<{
  modelValue?: Address
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: Address): void
  (e: 'submit', val: Address): void
}>();

const form = ref<Address>({
  street: '',
  number: '',
  latitude: 5.06889,
  longitude: -75.51738,
  ...props.modelValue
});

const mapContainer = ref<HTMLElement | null>(null);
let map: maplibregl.Map | null = null;
let marker: maplibregl.Marker | null = null;

onMounted(() => {
  const lat = form.value.latitude ?? 5.06889;
  const lng = form.value.longitude ?? -75.51738;

  map = new maplibregl.default.Map({
    container: mapContainer.value!,
    style: 'https://demotiles.maplibre.org/style.json',
    center: [lng, lat],
    zoom: 13,
  });

  marker = new maplibregl.Marker({ draggable: true })
    .setLngLat([lng, lat])
    .addTo(map);

  // Permitir seleccionar la ubicación haciendo clic en el mapa
  map.on('click', (e) => {
    const { lat, lng } = e.lngLat;
    form.value.latitude = lat;
    form.value.longitude = lng;
    marker?.setLngLat([lng, lat]);
  });

  marker.on('dragend', () => {
    const { lat, lng } = marker!.getLngLat();
    form.value.latitude = lat;
    form.value.longitude = lng;
  });
});

// Reaccionar a cambios de modelValue (ej. cuando llegan los datos del backend)
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) return;
    form.value = { ...form.value, ...newVal };
    if (map && marker && newVal.latitude && newVal.longitude) {
      map.setCenter([newVal.longitude, newVal.latitude]);
      marker.setLngLat([newVal.longitude, newVal.latitude]);
    }
  },
  { immediate: true, deep: true }
);

watch(form, (val) => emit('update:modelValue', val), { deep: true });

const emitSubmit = () => {
  emit('submit', form.value);
};
</script>

<style scoped>
.maplibregl-map {
  border-radius: 0.5rem;
}
</style>