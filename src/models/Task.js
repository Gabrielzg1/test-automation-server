import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    subjectId: {
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
export default mongoose.model("Task", repositorySchema);
