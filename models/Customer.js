// models/Customer.js
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  memberNumber: { type: Number, required: true },
  interests: { type: String, required: true },
});

export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);