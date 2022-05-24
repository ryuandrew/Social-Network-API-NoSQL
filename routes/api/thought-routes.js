const router = require('express').Router();

const{
    getThoughts,
    getThoughtById,
    postThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// /api/thoughts
router
    .route('/')
    .get(getThoughts)
    .post(postThought);

// api/thoughts/:userId/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);
    
// api/thoughts/:thoughtId/:userId
router
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

// api/thoughts/:thoughtId/reaction/:reactionId
router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction);

// api/thoughts/:thoughtId/reaction
router
    .route('/:thoughtId/reaction')
    .post(createReaction);

module.exports = router;