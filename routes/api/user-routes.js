const router = require('express').Router();

const {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// api/users
router
    .route('/')
    .get(getUsers)
    .post(postUser)

// api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// api/users/:/userId/friends/:friendId
router
    .route(':/userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;