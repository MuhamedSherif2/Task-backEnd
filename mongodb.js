const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://Mag:mohammed26122003@mohammed.kxps2xh.mongodb.net/?appName=Mohammed', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

// mongoose.connect()
//     .then(() => console.log('✅ MongoDB connected'))
//     .catch(err => console.error('❌ Connection error:', err)
// );


module.exports = dbConnect;