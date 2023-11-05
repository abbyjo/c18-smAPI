const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

// Schema for reaction subdocs
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dayjs(date).format('MMM,DD YYYY [at] hh:mmA')
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// Schema for Thoughts 
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => dayjs(date).format('MMM,DD YYYY [at] hh:mmA')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

// Virtual for thought schema - gets length of reaction array 
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
