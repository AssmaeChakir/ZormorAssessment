<template>
  <div class="place-details-container">
    <h2 class="header">Place Details</h2>
    <p v-if="error" class="error-message">{{ error }}</p> 
    <div class="container" v-else>
         <div v-if="place.images && place.images.length > 0" class="image-container">
        <img :src="`http://localhost:3000/uploads/${place.images[0]}`" alt="Place Image" class="place-image" />
      </div>
    <div class="info">
      <p class="place-info"><strong>Name:</strong> {{ place.name }}</p>
      <p class="place-info"><strong>Description:</strong> {{ place.description }}</p>
      <p class="place-info"><strong>Location:</strong> {{ place.location }}</p>
      <p class="place-info"><strong>Open Hours:</strong> {{ place.openHours }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../api';
export default {
  data() {
    return {
      place: {}, 
      error: null,
      loading: true,
    };
  },
  async created() {
    const placeId = this.$route.params.id; 
    try {
      const response = await axios.get(`${API_BASE_URL}places/${placeId}`);
      this.place = response.data.place; // Assign the fetched data
    } catch (error) {
      console.error('Error fetching place details:', error);
      this.error = 'Error fetching place details';
    }
  },
};
</script>

<style scoped>
.place-details-container {
  padding: 20px; 
  background-color: #f9f9f9;
  border: 1px solid #ddd; 
  border-radius: 10px; 
}

.header {
  font-size: 1.5em;
  color: #333;
}

.error-message {
  color: #e74c3c; 
}

.place-info {
  margin-bottom: 10px; 
}
.container{
    display: flex;
    align-content: center;

}

.image-container {
  margin-top: 20px;
}

.place-image {
  max-width: 20%; 
  height: auto; 
  border: 1px solid #ddd; 
  border-radius: 10px; 
}
.info{
    position:absolute;
    margin-left: 20%;
}
</style>
