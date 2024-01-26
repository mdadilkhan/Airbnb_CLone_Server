


const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  provider: String,
  providerAccountId: String,
  refresh_token: { type: String, index: true },
  access_token: { type: String, index: true },
  expires_at: Number,
  token_type: String,
  scope: String,
  id_token: { type: String, index: true },
  session_state: String,

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
