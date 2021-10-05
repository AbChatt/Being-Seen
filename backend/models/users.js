import mongoose from "mongoose";

//
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },
});

//module.exports = mongoose.model("Posts", Postschema)

export default mongoose.model("users", UserSchema);
