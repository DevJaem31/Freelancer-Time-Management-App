const TaskModel = require('../model/task-model')
const cron = require('node-cron')
const Project = require('../model/project-model')

const CreateTask = async (req, res) => {
  try {
    const { projectID } = req.params
    const {
      title,
      description,
      dueDate,
      startedAt,
      completedAt,
      assignedTo,
      tags,
      priority,
      status,
    } = req.body
    const userId = req.session.id

    if (!title || !userId) {
      return res.status(400).json({ message: 'Title and userId are required.' })
    }

    const newTask = new TaskModel({
      title,
      description: description || '',
      project: projectID,
      dueDate,
      startedAt,
      completedAt,
      assignedTo: assignedTo || userId,
      tags: tags || [],
      priority: priority || 'Medium',
      status: status || 'Not Started',
    })

    await newTask.save()

    await Project.findByIdAndUpdate(projectID, {
      $push: { tasks: newTask._id },
    })

    res
      .status(201)
      .json({ message: 'Task created successfully', task: newTask })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const fetchProjectTask = async (req, res) => {
  try {
    const { projectID } = req.params

    const foundTask = await TaskModel.find({ project: projectID })
      .populate('project', 'title')
      .populate('assignedTo', 'fullname')

    if (!foundTask) {
      console.error('Failed to find tasks')
    }

    res.status(200).json({ foundTask })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const fetchTaskByID = async (req, res) => {
  try {
    const { tasksID } = req.params

    if (!tasksID) {
      return res.status(404).json({ message: 'No tasks found' })
    }

    const Tasks = await TaskModel.findById(tasksID).populate(
      'assignedTo',
      'fullname'
    )

    res.status(200).json({ Tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const setMissedTask = async (req, res) => {
  try {
    const { projectID } = req.params
    const userId = req.session?.id

    const now = new Date()

    const query = {
      dueDate: { $lt: now },
      status: { $ne: 'Completed' },
    }

    if (projectID) query.project = projectID
    if (userId) query.assignedTo = userId

    const result = await TaskModel.updateMany(query, {
      $set: { status: 'Missed' },
    })

    res.status(200).json({
      message: 'Missed tasks updated successfully',
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error('Error setting missed tasks:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const initTaskCronJob = () => {
  cron.schedule('0 * * * *', async () => {
    const now = new Date()
    try {
      const result = await TaskModel.updateMany(
        { dueDate: { $lt: now }, status: { $ne: 'Completed' } },
        { $set: { status: 'Missed' } }
      )
      console.log(`[Cron] Missed tasks updated: ${result.modifiedCount}`)
    } catch (err) {
      console.error('[Cron] Failed to update missed tasks:', err)
    }
  })
}

initTaskCronJob()

module.exports = { CreateTask, fetchProjectTask, fetchTaskByID, setMissedTask }
