const Place = require('../models/placesModels');

// Create a new placeS
exports.createPlace = async (req, res) => {
    try {
        const { name, description, location, openHours } = req.body;
        const images = req.files.map((file) => file.filename);

        const newPlace = new Place({ name, description, location, openHours, images });
        await newPlace.save();

        res.status(201).json({ message: 'Place created', place: newPlace });
    } catch (error) {
        res.status(500).json({ message: 'Error creating place', error });
    }
};



// Get all places
exports.getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json({ places });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving places', error });
    }
};

// Get a place by ID
exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Place not found' });
        }

        res.status(200).json({ place });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving place', error });
    }
};

// Update a place
exports.updatePlace = async (req, res) => {
    try {
        const { name, description, location, openHours } = req.body;
        const images = req.files.map((file) => file.filename);

        const updatedPlace = await Place.findByIdAndUpdate(
            req.params.id,
            { name, description, location, openHours, images },
            { new: true }
        );

        if (!updatedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }

        res.status(200).json({ message: 'Place updated', place: updatedPlace });
    } catch (error) {
        res.status(500).json({ message: 'Error updating place', error });
    }
};

// Delete a place
exports.deletePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);

        if (!deletedPlace) {
            return res.status(404).json({ message: 'Place not found' });
        }

        res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting place', error });
    }
};

