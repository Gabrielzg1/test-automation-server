import mongoose from "mongoose";

const repositorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },

    tasks: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Subjects", repositorySchema);
