// models/Car.js
import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  version: { type: String, required: true },
  odometer: { type: Number, required: true },
  year: { type: Number, required: true },
  vinNumber: { type: String, required: true },
  price: { type: Number, required: true },
  dealership: { 
    type: String, 
    enum: ['Mega Autos', 'external'],
    required: true 
  },
  favorite: { type: Boolean, default: false },
  photos: {
    type: [String],
    required: false,
  },
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);
