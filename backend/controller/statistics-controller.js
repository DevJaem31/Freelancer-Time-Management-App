const TaskModel = require('../model/task-model')
const Project = require('../model/project-model')
const mongoose = require('mongoose')

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.session.user?.id
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })

    const now = new Date()
    const dayOfWeek = now.getDay()

    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)

    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const [tasksWeek, projectsWeek] = await Promise.all([
      TaskModel.countDocuments({
        assignedTo: userId,
        dueDate: { $gte: startOfWeek, $lte: endOfWeek },
      }),
      Project.countDocuments({
        collaborators: userId,
        dueDate: { $gte: startOfWeek, $lte: endOfWeek },
      }),
    ])

    res.status(200).json({
      tasksDueThisWeek: tasksWeek,
      projectsDueThisWeek: projectsWeek,
    })
  } catch (err) {
    console.error('Error fetching stats:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = { getDashboardStats }
