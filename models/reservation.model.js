const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
