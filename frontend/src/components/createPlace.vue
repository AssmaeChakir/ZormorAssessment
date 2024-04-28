<template>
  <div class="create-place-container">
    <h2>Create a New Place</h2>
    <form @submit.prevent="createPlace">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="location" required />
      </div>
      <div class="form-group">
        <label for="openHours">Open Hours:</label>
        <input type="text" id="openHours" v-model="openHours" required />
      </div>
      <div class="form-group">
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleFileUpload" />
      </div>
      <button type="submit" class="submit-button">Create Place</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '../api'; 

export default {
  data() {
    return {
      name: '',
      description: '',
      location: '',
      openHours: '',
      image: null,
    };
  },
 methods: {
  handleFileUpload(event) {
    this.image = event.target.files[0]; // Capture the selected file
  },
  async createPlace() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('location', this.location);
    formData.append('openHours', this.openHours);

    if (this.image) {
      formData.append('images', this.image); // Ensure the field name matches what `multer` expects
    }

    try {
      await axios.post(`${API_BASE_URL}places`, formData); // Send the form with the correct endpoint
    } catch (error) {
      console.error('Error creating place:', error); // Log errors for further debugging
    }
  },
}

};
</script>

<style scoped>
.create-place-container {
  padding: 20px;
  background-color: #f9f9f9; 
  border: 1px solid #ddd; 
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px; 
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"], 
textarea {
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ddd; 
  border-radius: 5px;
}

input[type="file"] {
  padding: 5px;
}

.submit-button {
  padding: 10px 20px; 
  background-color: #fbbb3d;
  color: white;
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
