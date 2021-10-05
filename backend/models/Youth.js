import mongoose from "mongoose";

//
const Schema = mongoose.Schema;

const YouthSchema = new Schema({
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
  story:{
      type: String,
      default: "enter your story here",
  },
  saving_plan:{
      type: String,
      default: "enter your saving plan here"
  }
});

//module.exports = mongoose.model("youth", Youthschema)

export default mongoose.model("youths", YouthSchema);