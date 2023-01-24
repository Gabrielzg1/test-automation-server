/* import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Task from "../models/Task";
import { getRelatory } from "../scripts/getRelatory";
import Result from "../models/Result";
import clear from "../scripts/clear/clear"; */

const Users = require("../models/Users")
const Task = require("../models/Task")
const getRelaroty = require("../scripts/getRelatory")
const Result = require("../models/Result")
const clear = require("../scripts/clear/clear")
const Subjects = require("../models/Subjects")

class ResultController {
	//Show one Result - to display in the user interface
	async show(req, res) {
		try {
			const { user_id, task_id } = req.params;
			const user = await Users.findById(user_id);
			if (!user) {
				return res.status(404).json({ msg: "Subject not Found" });
			}
			const task = await Task.findById(task_id);
			if (!task) {
				return res.status(404).json({ msg: "Subject not Found" });
			}

			const result = await Result.findOne({
				userId: user_id,
				taskId: task_id,
			});

			return res.json(result);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	//Show All Results to the specific task
	async index(req, res) {
		try {
			const { task_id } = req.params;
			const task = await Task.findById(task_id);
			if (!task) {
				return res.status(404).json({ msg: "Task not Found" });
			}
			const result = await Result.find({
				taskId: task_id,
			});
			return res.json(result);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	async create(req, res) {
		try {
			const { user_id, task_id } = req.params;
			const task = await Task.findById(task_id);
			if (!task) {
				return res.status(404).json({ msg: "Task not found" });
			}
			const subject = await Subjects.findById(task.subjectId);
			if (!subject) return res.status(404).json({ msg: "Subject not Found" });

			const user = await Users.findById(user_id);
			if (!user) return res.status(404).json({ msg: "User not Found" });

			const result = await getRelaroty(subject.name, task.name, user_id);

			const newResult = await Result.create({
				userId: user_id,
				taskId: task_id,
				result,
				userName: user.username,
			});

			return res.status(201).json(newResult);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
	async destroy(req, res) {
		try {
			const { user_id, task_id, id } = req.params;
			const user = await Users.findById(user_id);
			if (!user) {
				return res.status(404).json({ msg: "User not Found" });
			}
			const task = await Task.findById(task_id);
			if (!task) {
				return res.status(404).json({ msg: "Task not Found" });
			}
			const subject = await Subjects.findById(task.subjectId);
			if (!subject) {
				return res.status(404).json({ msg: "Subject not Found" });
			}

			const result = await Result.findOne({
				userId: user_id,
				taskId: task_id,
				id,
			});
			for (let i = 0; i < 10; i++) {
				clear(i + 1, subject.name, task.name, user_id);
			}
			await result.deleteOne();
			return res.status(200).json();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
module.exports = new ResultController();
