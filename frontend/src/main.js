import { createApp } from 'vue'; // Importing Vue
import App from './App.vue'; // Main App component
import router from './router'; // Corrected router import

const app = createApp(App); // Create the Vue app instance

app.use(router); // Use the router
app.mount('#app'); // Mount to the DOM element with ID "app"
