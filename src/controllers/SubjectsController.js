import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Admin from "../models/Admin";
import createFolder from "../scripts/folders/newSubject";
import fs from "fs";
import fs_ from "fs-extra";

class SubjectsController {
	async index_admin(req, res) {
		try {
			const { admin_id } = req.params;
			const admin = await Admin.findById(admin_id);

			if (!admin) {
				return res.status(404).json({ msg: "Admin not Found" });
			}

			const subjects = await Subjects.find({
				adminId: admin_id,
			});

			return res.json(subjects);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}

	async create(req, res) {
		try {
			const { admin_id } = req.params;
			const { name, users } = req.body;

			if (!name) res.json({ msg: "nome Obrigatório" });
			if (!admin_id) res.json({ msg: "Admin id falho" });

			const admin = await Admin.findById(admin_id);

			if (!admin) {
				return res.status(404).json("Usuário não encontrado");
			}
			const subjects = await Subjects.findOne({
				name,
				adminId: admin_id,
			});

			if (subjects) {
				return res
					.status(422)
					.json({ message: `Subject ${name} already exist` });
			}
			const newSubject = await Subjects.create({
				name,
				adminId: admin_id,
				users,
			});

			//Atualizar as materias de todos os users registrados na materia
			for (let i = 0; i < users.length; i++) {
				const updateUser = await Users.findOne({ username: users[i] });
				const upDated = updateUser.subjects;
				upDated.push(name);
				await updateUser.updateOne({ subjects: upDated });
			}
			// Atualizar As materias registradas do admin
			const newSubjects = admin.subjects;
			newSubjects.push(name);
			await admin.updateOne({ subjects: newSubjects });

			createFolder(name);
			return res.status(201).json(newSubject);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
	async destroy(req, res) {
		try {
			const { admin_id, id } = req.params;
			const admin = await Admin.findById(admin_id);
			if (!admin) {
				return res.status(404).json({ msg: "Admin not found" });
			}
			const subjects = await Subjects.findOne({
				adminId: admin_id,
				id: id,
			});
			if (!subjects) {
				return res.status(404).json({ msg: "Subject not found" });
			}
			const users = subjects.users;
			//Atualiza todos os Usuarios registrados

			for (let i = 0; i < users.length; i++) {
				const updateUser = await Users.findOne({ username: users[i] });
				const upDated = updateUser.subjects;

				const index = upDated.indexOf(subjects.name);
				upDated.splice(index, 1);

				await updateUser.updateOne({ subjects: upDated });
			}
			// Deletar A materia registrada do admin
			const newSubjects = admin.subjects;
			const index = newSubjects.indexOf(subjects.name);
			newSubjects.splice(index, 1);
			await admin.updateOne({ subjects: newSubjects });

			fs_.remove(`./src/subjects/${subjects.name}`, (err) => {
				if (err) return console.error(err);
				console.log("success!");
			});

			await subjects.deleteOne();
			return res.status(200).json();
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: "Internal server error" });
		}
	}
}
export default new SubjectsController();
