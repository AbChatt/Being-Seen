import mongoose from "mongoose";

//
const Schema = mongoose.Schema;

const DonorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },

  profile_picture: {
    type: String,
    default: "abc balaba",
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  credit_card: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    default: "None",
  },
});

//module.exports = mongoose.model("Posts", Postschema)

export default mongoose.model("donors", DonorSchema);
