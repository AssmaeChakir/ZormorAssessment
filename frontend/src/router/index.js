import { createRouter, createWebHistory } from 'vue-router';
import PlaceList from '../components/PlaceList.vue';
import CreatePlace from '../components/createPlace.vue';
import PlaceDetails from '../components/placeDetail.vue'; // Ensure this component exists

const routes = [
    { path: '/', name: 'placelist', component: PlaceList },
    { path: '/create', name: 'createplace', component: CreatePlace },
    { path: '/place/:id', name: 'placedetails', component: PlaceDetails }, // Ensure this route is defined
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
