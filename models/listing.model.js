const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  title: String,
  description: String,
  imageSrc: String,
  createdAt: { type: Date, default: Date.now },
  category: String,
  roomCount: Number,
  bathroomCount: Number,
  guestCount: Number,
  locationValue: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
