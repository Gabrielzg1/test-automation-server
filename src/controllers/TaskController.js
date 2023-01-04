import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Task from "../models/Task";
import createTask from "../scripts/folders/newTask";
import fs from "fs-extra";
import generateOutputs from "../scripts/output/output-base";
import { getOutputs } from "../scripts/input/getInput";

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

			//Atualizar as Tasks dos usuarios
			const newtTask_ = subjects.tasks;
			newtTask_.push(name);
			await subjects.updateOne({ tasks: newtTask_ });

			//Create the task folder
			await createTask(subjects.name, name);

			//Write the inputs
			const generateInputs = async () => {
				for (let i = 0; i < inputs.length; i++) {
					fs.writeFile(
						`./src/subjects/${subjects.name}/${name}/input/input${i + 1}.txt`,
						inputs[i].split(" ").join("\n"),
						(err) => {
							if (err) console.log(err);
						}
					);
				}
			};
			await generateInputs();

			return res.status(201).json(newTask);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
	async generateOutputs(req, res) {
		try {
			const { id, subject_id } = req.params;
			const task = await Task.findById(id);
			const subject = await Subjects.findById(subject_id);
			if (!task) return res.status(404).json({ msg: "Task not Found" });

			// Generate the Base outputs
			for (let i = 0; i < task.inputs.length; i++) {
				await generateOutputs(i + 1, subject.name, task.name);
			}
			return res.status(200).json();
		} catch (err) {
			console.log(err);
			res.status(500).json({ err: "Internal server error" });
		}
	}
	async updateOutputs(req, res) {
		try {
			const { id, subject_id } = req.params;
			const task = await Task.findById(id);
			const subject = await Subjects.findById(subject_id);
			if (!task) return res.status(404).json({ msg: "Task not Found" });
			if (!subject) return res.status(404).json({ msg: "Subject Not Found" });

			// Generate the Base outputs
			const outputs = new Array();
			for (let i = 0; i < task.inputs.length; i++) {
				outputs.push(
					await getOutputs(i + 1, subject.name, task.name).toString()
				);
			}
			await task.updateOne({ outputs: outputs });
			return res.status(200).json();
		} catch (err) {
			console.log(err);
			res.status(500).json({ err: "Internal server error" });
		}
	}

	async destroy(req, res) {
		try {
			const { subject_id, id } = req.params;
			const subject = await Subjects.findById(subject_id);

			if (!subject) {
				return res.status(404).json({ msg: "Subject not found" });
			}
			const task = await Task.findOne({
				subjectId: subject_id,
				id,
			});
			if (!task) {
				return res.status(404).json({ msg: "Task not found" });
			}
			fs.remove(`./src/subjects/${subject.name}/${task.name}`, (err) => {
				if (err) return console.error(err);
				console.log("success!");
			});

			await task.deleteOne();
			return res.status(200).json();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
export default new TaskController();
