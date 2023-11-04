const User = require('../models/User');

// Function to get all users
async function getUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to create a new user
async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to get single user by ID 
async function getOneUser(req, res) {
    try {
        const myUser = await User.findOne({ _id: req.params.userId })

        if (!myUser) {
            return res.status(404).json({ message: 'No user with that ID found :-(' })
        }
        res.status(200).json(myUser)
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to update single user by ID 
async function updateUser(req, res) {
    try {
        const myUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!myUser) {
            return res.status(404).json({ message: 'No user with that ID found :-(' })
        }

        res.json(myUser)
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to delete a single user by ID 
async function deleteUser(req, res) {
    try {
        const myUser = await User.findOneAndDelete({ _id: req.params.userId });

        if (!myUser) {
            return res.status(404).json({ message: 'No user with that ID was found :-(' })
        }
        res.json({ message: 'User has been deleted!' })
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to add friend to user
async function addFriend(req, res) {
    try {
        const myFriend = req.params.friendId;
        const myUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: myFriend } },
            { runValidators: true, new: true }
        )

        if (!myUser | !myFriend) {
            res.status(404).json({ message: 'No users with that ID were found. Please try again!' })
        }
        res.json({ message: 'Friend added! :-)' })
    } catch (err) {
        res.status(500).json(err)
    }
};

//function to remove friend from user
async function removeFriend(req, res) {
    try {
        const myEnemy = req.params.friendId;
        const myUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: myEnemy } },
            { runValidators: true, new: true }
        )
        if (!myUser | !myEnemy) {
            res.status(404).json({ message: 'No users with that ID were found. Please try again!' })
        }

        res.json({ message: 'Friend removed!' })
    } catch (err) {
        res.status(500).json(err)
    }
};

module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
}