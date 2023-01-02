import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		subjectId: {
			type: String,
			require: true,
		},
		inputs: {
			type: Array,
			require: true,
		},
		outputs: {
			type: Array,
		},
		baseCode: {
			type: String,
			require: true,
		},
		tips: {
			type: Array,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		users: {
			type: Array,
		},
		feedback: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("Task", taskSchema);
