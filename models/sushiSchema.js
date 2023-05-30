const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sushiSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "",
  },
});

const Sushi = mongoose.model("Pizza", sushiSchema);

module.exports = Sushi;
