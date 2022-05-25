const mongoose = require('mongoose');

// connect('mongodb://localhost/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialmedia', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose.connection;
