import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    image: String,
    hashedPassword: String,
    token: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    favoriteIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],

    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  });


const User=mongoose.model('User',userSchema);

export default User