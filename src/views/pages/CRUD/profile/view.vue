<script setup>
import { ref, onMounted, computed } from 'vue'; // Added computed
import { useRoute } from 'vue-router';
// Adjust the import path and service methods as per your project structure.
import  ProfileService  from '@/service/crudServices/ProfileService'; // Assuming ProfileService.ts exists
import UserService from '@/service/crudServices/UserService'; // Assuming UserService.ts exists

const profile = ref(null);
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
const fetchedUserName = ref('');
const fetchedUserEmail = ref('');

const fullImageUrl = computed(() => {
  if (profile.value && profile.value.photo) {
    const baseUrl = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, ''); // Remove trailing slash
    const imagePath = String(profile.value.photo).replace(/^\//, ''); // Remove leading slash
    
    if (!imagePath.trim()) return null; // If imagePath is empty after processing, no valid image
    // console.log('Full image URL:', `${baseUrl}/${imagePath}`); // Debugging log
    return `${baseUrl}/${imagePath}`;
  }
  return null;
});

onMounted(async () => {
  const profileId = route.params.id;
  if (profileId) {
    try {
      isLoading.value = true;
      const response = await ProfileService.getProfile(profileId); 
      profile.value = response.data; 
      // console.log('Profile data fetched:', profile.value.photo); 

      if (profile.value && profile.value.user_id) {
        try {
          const userResponse = await UserService.getUser(profile.value.user_id); // Assuming getUserById exists
          if (userResponse && userResponse.data) {
            fetchedUserName.value = userResponse.data.name;
            fetchedUserEmail.value = userResponse.data.email;
          }
        } catch (userErr) {
          console.error('Failed to fetch user details:', userErr);
          // Optionally set a specific error for user data fetching
        }
      }
      error.value = null;
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      error.value = 'Failed to load profile data. ' + (err.message || '');
      profile.value = null;
    } finally {
      isLoading.value = false;
    }
  } else {
    error.value = 'No profile ID provided in the route.';
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div v-if="isLoading" class="flex justify-content-center">
          <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>
        <div v-else-if="error">
          <Message severity="error">{{ error }}</Message>
        </div>
        <div v-else-if="profile">
          <h5>{{ fetchedUserName || 'User' }} - Profile</h5>
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-3 flex align-items-center justify-content-center">
              <Image    v-if="fullImageUrl" :src="fullImageUrl" alt="Profile Image" width="150" preview />
              <div v-else class="flex align-items-center justify-content-center border-1 surface-border" style="height: 150px; width: 150px;">
                <i class="pi pi-image" style="font-size: 4rem"></i>
              </div>
            </div>
            <div class="field col-12 md:col-9">
              <div class="grid mt-3 md:mt-0">
                <div class="col-12 mb-3">
                  <span class="text-lg">Profile Name:</span>
                  <span class="text-lg ml-2">{{ fetchedUserName }}</span>
                </div>
                <div class="col-12 mb-3">
                  <span class="text-lg">Profile Email:</span>
                  <span class="text-lg ml-2">{{ fetchedUserEmail}}</span>
                </div>
                <div class="col-12 mb-3">
                  <span class="text-lg">Phone:</span>
                  <span class="text-lg ml-2">{{ profile.phone }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- You can add more profile details or actions here -->
          <!-- For example, a button to edit the profile -->
          <!--
          <div class="mt-4">
            <Button label="Edit Profile" icon="pi pi-pencil" class="p-button-info" @click="$router.push(`/profile/update/${route.params.id}`)" />
          </div>
          -->
        </div>
        <div v-else>
           <Message severity="warn">No profile data to display.</Message>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
.p-image-preview-indicator, .p-image-preview-icon {
    font-size: 1.5rem;
}
.border-1 {
    border-width: 1px !important;
    border-style: solid !important;
}
</style>