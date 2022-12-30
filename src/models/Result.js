import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    taskId: {
      type: String,
      require: true,
    },
    result: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Result", resultSchema);
