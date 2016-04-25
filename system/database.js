const mongoose = require('mongoose');
module.exports = (config) => {

    mongoose.connect(config.MONGO + config.MONGODB);

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection connected to ' + config.MONGO);
    });
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    mongoose.connection.on('open', function () {
        console.log('Mongoose default connection is open');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through coe termination');
            process.exit(0);
        });
    });
}
