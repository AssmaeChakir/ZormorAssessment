<template>
  <div class="place-list-container">
    <p v-if="loading" class="loading">Loading places...</p>
    <ul v-else class="horizontal-list">
      <li v-for="place in places" :key="place._id" class="place-item">
        <div v-if="place.images && place.images.length > 0" class="image-wrapper">
          <img 
            :src="`http://localhost:3000/uploads/${place.images[0]}`" 
            alt="Place Image" 
            class="place-image"
          />
        </div>
        <router-link :to="`/place/${place._id}`" class="place-link">{{ place.name }}</router-link>
      </li>
    </ul>
    <p v-if="!loading && places.length === 0" class="no-places">No places found.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../api';

export default {
  data() {
    return {
      places: [],
      error: null,
      loading: true,
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_BASE_URL}places`);
      this.places = response.data.places;
    } catch (error) {
      console.error('Error fetching places:', error);
      this.error = 'Error fetching places';
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.place-list-container {
  padding: 50px;
  background-color: #f9f9f9; 
}

.loading {
  font-size: 1.2em;
  color: #3498db; 
}

.horizontal-list {
  list-style: none; 
  display: flex; 
  flex-wrap: wrap; 
  align-content: center;
  gap: 13rem; 
}

.place-item {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  text-align: center; 
  width: 150px; 
}

.image-wrapper {
  margin-bottom: 10px; 
}

.place-image {
  width: 300px; 
  height: 300px; 
  object-fit: cover; 
  border-radius: 10px; 
  border: 1px solid #ddd; 
}

.place-link {
  text-decoration: none;
  color: #333; 
  transition: color 0.3s;
  font-weight: bold;
}

.place-link:hover {
  color: #f39c12; 
}

.no-places {
  color: #e74c3c;
}
</style>
