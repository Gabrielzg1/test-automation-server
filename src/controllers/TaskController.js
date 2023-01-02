import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Task from "../models/Task";
import createTask from "../scripts/folders/newTask";

class TaskController {
	async index(req, res) {
		try {
			const { subject_id } = req.params;
			const subject = await Subjects.findById(subject_id);
			if (!subject) {
				return res.status(404).json({ msg: "Subject not Found" });
			}
			const task = await Task.find({
				subjectId: subject_id,
			});

			return res.json(task);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	async show(req, res) {
		try {
			const { subject_id, id } = req.params;
			console.log(id);
			const subject = Subjects.findById(subject_id);
			if (!subject) return res.status(404).json({ msg: "Subject not found" });
			const task = await Task.findById(id);
			if (!task) return res.status(404).json({ msg: "Task not found" });
			return res.json(task);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Internal server error." });
		}
	}

	async create(req, res) {
		try {
			const { subject_id } = req.params;
			const { name, inputs, baseCode, tips, description } = req.body;

			if (!name) res.json({ msg: "nome Obrigatório" });

			const subjects = await Subjects.findById(subject_id);

			if (!subjects) {
				return res.status(404).json({ msg: "Subject not found" });
			}
			const task = await Task.findOne({ name, subjectId: subject_id });
			if (task) {
				return res.status(422).json({ message: `Task ${name} alreary exists` });
			}

			const newTask = await Task.create({
				name,
				subjectId: subject_id,
				users: subjects.users,
				inputs,
				baseCode,
				tips,
				description,
			});
			const newtTask_ = subjects.tasks;
			newtTask_.push(name);
			await subjects.updateOne({ tasks: newtTask_ });

			//createTask(subjects.name, name);
			return res.status(201).json(newTask);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { feedback } = req.body;

			const task = await Task.findById(id);
			if (!task) return res.status(404).json({ msg: "Task not Found" });

			await task.updateOne({ feedback });
			return res.status(200).json();
		} catch (err) {
			console.log(err);
			res.status(500).json({ err: "Internal server error" });
		}
	}

	async destroy(req, res) {
		try {
			const { user_id, subject_id, id } = req.params;
			const user = await Users.findById(user_id);
			const subject = await Subjects.findById(subject_id);
			if (!user) {
				return res.status(404).json({ msg: "User not found" });
			}
			if (!subject) {
				return res.status(404).json({ msg: "Subject not found" });
			}

			const task = await Task.findOne({
				userId: user_id,
				subjectId: subject_id,
				id,
			});
			if (!task) {
				return res.status(404).json({ msg: "Subject not found" });
			}
			await task.deleteOne();
			return res.status(200).json();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
export default new TaskController();
