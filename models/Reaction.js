const {Schema, model, Types} = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Types.ObjectId, 
            default: new Types.ObjectId() // telling it to create the Id since this is only a schema
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
                type: String,
                required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MM DD YYYY [at] hh:mm a')
        }
    },
    {
        // Schema option to transform Objects after querying MongoDb
        toJSON: {
            getters: true
        },
        id: false
    }
);


module.exports = reactionSchema;