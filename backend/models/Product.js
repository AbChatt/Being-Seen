import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  store_owner_username: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("products", ProductSchema);
