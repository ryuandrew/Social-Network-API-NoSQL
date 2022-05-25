const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');


const thoughtSchema = new Schema(
    {
        thoughtname: { 
            type: String, 
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM DD YYYY [at] hh:mm a')
        },
        username: {
                type: String,
                required: true,
        },
        reactions: [reactionSchema]
    },
    {
        // Schema option to transform Objects after querying MongoDb
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// get total count of friends
thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length
});

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

//schema is a structure of the data
//model is a method on how to monipulate the data