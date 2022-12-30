import Users from "../models/Users";
import Subjects from "../models/Subjects";
import Task from "../models/Task";
import createTask from "../scripts/folders/newTask";
import Result from "../models/Result";

class TaskController {
  async index(req, res) {
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

      const result = await Result.find({
        userId: user_id,
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

      const task = await Subjects.findById(task_id);

      if (!task) {
        return res.status(404).json({ msg: "Subject not found" });
      }

      const newResult = await Result.create({
        userId: user_id,
        taskId: task_id,
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
        return res.status(404).json({ msg: "Subject not Found" });
      }
      const task = await Task.findById(task_id);
      if (!task) {
        return res.status(404).json({ msg: "Subject not Found" });
      }

      const result = await Result.findOne({
        userId: user_id,
        taskId: task_id,
        id,
      });

      await result.deleteOne();
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
export default new TaskController();
