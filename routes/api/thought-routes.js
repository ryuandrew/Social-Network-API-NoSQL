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
    
router
    .route('/:thoughtId/:userId')
    .delete(deleteThought);

router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(deleteReaction);

router
    .route('/:thoughtId/reaction')
    .post(createReaction);

module.exports = router;