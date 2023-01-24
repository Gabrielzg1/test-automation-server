/* 
import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Task from "../models/Task";
import createTask from "../scripts/folders/newTask";
import createUserFolder from "../scripts/folders/newUserFolder";
import fs from "fs-extra";
import generateOutput from "../scripts/output/output-base";
import generateUploadOutputs from "../scripts/output/output-upload";
import { getOutputs } from "../scripts/input/getInput"; */


const Users = require("../models/Users");
const Task = require("../models/Task");
const Subjects = require("../models/Subjects");
const createTask = require("../scripts/folders/newTask");
const createUserFolder = require("../scripts/folders/newUserFolder");
const fs = require("fs-extra");


const generateOutput = require("../scripts/output/output-base");
const generateUploadOutputs = require("../scripts/output/output-upload");
const getOutputs = require("../scripts/input/getInput").getOutputs;

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
			const { name, inputs, baseCode, description } = req.body;

			if (!name) return res.json({ msg: "nome Obrigatório" });

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
						inputs[i].split(", ").join("\n"),
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
	async sendFile(req, res) {
		if (req.file) {
			return res.json({
				erro: false,
				mensagem: "Upload realizado com sucesso!",
			});
		}

		return res.status(400).json({
			erro: true,
			mensagem: "Erro: Upload não realizado com sucesso!",
		});
	}
	async generateOutputs(req, res) {
		try {
			const { id, subject_id } = req.params;
			const task = await Task.findById(id);
			const subject = await Subjects.findById(subject_id);
			if (!task) return res.status(404).json({ msg: "Task not Found" });
			if (!subject) return res.status(404).json({ msg: "Subject not Found" });

			// Generate the Base outputs
			for (let i = 0; i < task.inputs.length; i++) {
				await generateOutput(i + 1, subject.name, task.name);
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
			for (let i = 0; i < 10; i++) {
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
	async userCreateFolder(req, res) {
		try {
			const { subject_id, task_id, id } = req.params;

			const subject = await Subjects.findById(subject_id);
			if (!subject) return res.status(402);
			const task = await Task.findById(task_id);
			if (!task) return res.status(402);
			const user = await Users.findById(id);
			if (!user) return res.status(402);
			await createUserFolder(subject.name, task.name, id);

			for (let i = 0; i < 10; i++) {
				await preexec(i + 1, subject.name, task.name, id);
			}

			for (let i = 0; i < 10; i++) {
				await generateUploadOutputs(i + 1, subject.name, task.name, id);
			}

			return res.status(200).json({ msg: "sucess" });
		} catch (error) {
			console.log(error);
			return res.status(500);
		}
	}
	async userSendFile(req, res) {
		if (!req.file) return res.status(404);
		else return res.status(200);
	}
	async destroy(req, res) {
		try {
			const { subject_id, id } = req.params;
			const subject = await Subjects.findById(subject_id);

			if (!subject) {
				return res.status(404).json({ msg: "Subject not found" });
			}
			const task = await Task.findById(id);
			if (!task) {
				return res.status(404).json({ msg: "Task not found" });
			}
			fs.remove(`./src/subjects/${subject.name}/${task.name}`, (err) => {
				if (err) return console.error(err);
			});

			await task.deleteOne();
			return res.status(200).json();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
module.exports = new TaskController();
