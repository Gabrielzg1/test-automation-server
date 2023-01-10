import mongoose from "mongoose";

const relatorySchema = new mongoose.Schema(
    {
        taskId: {
            type: String,
            require: true,
        },
        results: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);
export default mongoose.model("Relatory", relatorySchema);
