const router = require('express').Router();
const {
    getThoughts,
    oneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// "/api/thoughts" - Routes to get all thoughts and to create a new one
router.route('/').get(getThoughts).post(createThought);

// "/api/thoughts/:thoughtId" - Routes to get, update or delete a single thought
router.route('/:thoughtId').get(oneThought).put(updateThought).delete(deleteThought);

// "api/thoughts/:thoughtId/reactions" - Routes to create or remove a reaction to a single thought
router.route(':thoughtId/reactions').post(createReaction).delete(removeReaction)

module.exports = router;
