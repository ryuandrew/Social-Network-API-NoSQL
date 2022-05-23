const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            // must match a valid email address (matching validation)
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, // can only store an ObjectId
                ref: 'Thought' 
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Schema option to transform Objects after querying MongoDb
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);


// get total count of friends
userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length
})

// Initialize User model
const User = model('User', userSchema);

module.exports = User;
