const Thoughts = require('../models/Thoughts');
const User = require('../models/User');

// Function to get all thoughts 
async function getThoughts(req, res) {
    try {
        const allThought = await Thoughts.find();
        res.status(200).json(allThought)
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to create new thought
async function createThought(req, res) {
    try {
        const myUser = req.body.userId;
        const newThought = await Thoughts.create(req.body)
        const updateUser = await User.findOneAndUpdate(
            { _id: myUser },
            { $push: {thoughts: newThought._id }},
            { runValidators: true, new: true }
        )
        res.status(200).json({ message: "Thought posted successfully!" , updateUser})
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to get single thought by id
async function oneThought(req, res) {
    try {
        const myThought = await Thoughts.findOne({ _id: req.params.thoughtId });

        if (!myThought) {
            return res.status(404).json({ message: 'No thought with that ID found :-(' })
        }
        res.status(200).json(myThought);
    } catch (err) {
        res.status(500).json(err)
    }
};

// Function to update single thought by ID
async function updateThought(req, res) {
    try {
        const myThought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!myThought) {
            return res.status(404).json({ message: 'No thought with that ID found :-(' })
        }

        res.json(myThought)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Function to delete single thought by ID
async function deleteThought(req, res) {
    try {
        const myThought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

        if (!myThought) {
            return res.status(404).json({ message: 'No thought with that ID was found :-(' })
        }
        res.json({ message: 'Thought has been deleted!' })
    } catch (err) {
        res.status(500).json(err)
    }
}


async function createReaction(req, res) {
    try {
        
    } catch (err) {
        res.status(500).json(err)
    }
}


async function removeReaction(req, res) {
    try {

    } catch (err) {
        res.status(500).json(err)
    }
}


module.exports = {
    getThoughts,
    oneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction
}