import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			index: {
				unique: true,
			},
		},
		adminId: {
			type: String,
			required: true,
		},

		tasks: {
			type: Array,
		},
		users: {
			type: Array,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model("Subjects", subjectSchema);
