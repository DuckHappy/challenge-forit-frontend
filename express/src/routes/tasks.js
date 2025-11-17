import { Router } from "express";
import { prisma } from "../db.js";

const router = Router()

//collect all db data 
router.get("/api/tasks", async (req, res) => {
    const tasks = await prisma.task.findMany()
    return res.json(tasks)
})


router.get("/api/tasks/:id", async (req, res) => {
    const {id} = req.params
    const task = await prisma.task.findUnique({ where: { id } });

    if (!task) {
        throw new Error(`La tarea con el ${id} no fue encontrado`);
    }
    return res.json(task)
})

router.post("/api/tasks", async (req, res) => {
    const { title, description } = req.body;

    const newTask = await prisma.task.create({
        data: { title, description },
    });

    res.json(newTask);
})

router.put("/api/tasks/:id", async (req, res) => {
    const data = req.body
    const {id} = req.params

    const task = await prisma.task.update({ where: { id }, data });

    if (!task) {
        throw new Error(`La tarea con el ${id} no fue encontrado`);
    }
    return res.json(task)
})

router.delete("/api/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const task = await prisma.task.delete({ where: { id } });

    if (!task) {
        throw new Error(`La tarea con el ${id} no fue encontrado`);
    }
    return res.json(task)
})

export default router;

