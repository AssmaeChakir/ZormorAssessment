const express = require('express');
const multer = require('multer');
const path = require('path');
const { createPlace, getAllPlaces, getPlaceById, updatePlace, deletePlace } = require('../controller/placesController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Ensure the path exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
}); 

const upload = multer({ storage });

// CRUD Routes
/**
 * @swagger
 * /places:
 *   post:
 *     summary: Create a new place
 *     consumes: 
 *       - multipart/form-data
 *     parameters: 
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: location
 *         in: formData
 *         required: true
 *         type: string
 *       - name: openHours
 *         in: formData
 *         required: true
 *         type: string
 *       - name: images
 *         in: formData
 *         required: false
 *         type: file
 *         description: Image file
 *     responses:
 *       201:
 *         description: Created a new place
 */
router.post('/', upload.array('images', 5), createPlace);

/**
 * @swagger
 * /places:
 *   get:
 *     summary: Get all places
 *     responses:
 *       200:
 *         description: Retrieved all places
 */
router.get('/', getAllPlaces);

/**
 * @swagger
 * /places/{id}:
 *   get:
 *     summary: Get a place by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retrieved the place by ID
 */
router.get('/:id', getPlaceById);

/**
 * @swagger
 * /places/{id}:
 *   put:
 *     summary: Update a place by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: name
 *         in: formData
 *         required: false
 *         type: string
 *       - name: description
 *         in: formData
 *         required: false
 *         type: string
 *       - name: location
 *         in: formData
 *         required: false
 *         type: string
 *       - name: openHours
 *         in: formData
 *         required: false
 *         type: string
 *       - name: images
 *         in: formData
 *         required: false
 *         type: file
 *         description: Image file
 *     responses:
 *       200:
 *         description: Updated the place
 */
router.put('/:id', upload.array('images', 5), updatePlace);

/**
 * @swagger
 * /places/{id}:
 *   delete:
 *     summary: Delete a place by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Deleted the place
 */
router.delete('/:id', deletePlace);

module.exports = router;
