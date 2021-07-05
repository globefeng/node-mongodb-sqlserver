import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { 
      type: String,
    },
    description: { 
      type: String,
    },
    category: {
      type: String
    },
    price: {
      type: Number
    },
    created_date : {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Product', ProductSchema);
