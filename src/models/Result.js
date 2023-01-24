//import mongoose from "mongoose";
const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		userName: {
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
module.exports = mongoose.model("Result", resultSchema);
