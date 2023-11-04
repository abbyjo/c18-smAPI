const router = require('express').Router();
const { getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

// "/api/users" - Routes to get all users and create a new user 
router.route('/').get(getUsers).post(createUser);

// "/api/users/:userId" - Routes to get, update and delete a single user by ID 
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// "/api/users/:userId/friends/:friendId" - Routes to add or remove friends from single user's list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;