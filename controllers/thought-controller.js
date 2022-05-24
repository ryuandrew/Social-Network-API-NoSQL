const {Thought, User} = require('../models');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
        const dbThought = await Thought.find()
        res.json(dbThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //get single thought by id
    async getThoughtById(req, res) {
        try {
            const dbThoughtById = await Thought.findById(req.params.thoughtId)//.populate('thoughts')
            res.json(dbThoughtById)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //post new thought
    //create thought find user by id and push the thought id to the thought field
    async postThought(req, res) {
        try {
            const dbPostThought = await Thought.create(req.body)
            const dbUser = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: {thoughts: dbPostThought._id}}
            )
            res.json(dbPostThought)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //update thought by id
    async updateThought(req, res) {
        try {
            const updateThought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                req.body,
                {new: true},
            )
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //delete thought by id
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thought.findOneAndRemove(
                {_id: req.params.thoughtId},
            )
            const deleteUserThought = await User.findOneAndUpdate(
                {_id: req.params.userId},
                {$pull: req.params.thoughtId}
            )
            res.json({message: "User's thought has been deleted"})
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //post reaction
    async createReaction(req, res) {
        try {
            const dbReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: req.body}},
                {new: true}
            )
            res.json(dbReaction)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    //delete reaction
    async deleteReaction(req, res) {
        try {
            const dbReaction = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$pull: {reactions: {reactionId: req.params.reactionId}}},
                {new: true}
            )
            res.json({message: "User's reaction has been removed"})
        } catch (err) {
            res.status(500).json(err)
        }
    },
}
