const {Thought, User} = require('../models')

module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(500).json(err));
    },
    //get single user by id
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(user)
            )
            .catch(err => res.status(500).json(err));
    },
    //post new user
    postUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    //update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            req.body,
            {new: true}
        )
            .then((dbUserData) => {
                !dbUserData
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },
    //delete a user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: req.params.id})
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : res.json({message: 'User deleted'})
            )
            .catch(err => res.status(500).json(err));
    },
    //add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {friends: req.params.friendId}},
            {new: true}
        )
            .then((user) => {
                !user
                    ? res.status(404).json({message: 'No friend with that ID'})
                    : res.json(user)
            })
            .catch(err => res.status(500).json(err));
    },
    //delete a friend
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: req.params.id},
            {$pull: {friends: req.params.friendId}},
            {new: true}
        )
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No friend with that ID'})
                    : res.json(user)
            )
            .catch(err => res.status(500).json(err))
    }

}