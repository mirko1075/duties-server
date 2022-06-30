const mongoose = require("mongoose");
const { Schema } = mongoose;

const dutiesSchema = new Schema(
  {
    Id: String,
    Name: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Duties = mongoose.model("duties", dutiesSchema);

module.exports = Duties;
