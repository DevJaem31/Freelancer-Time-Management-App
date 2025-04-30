import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchTasksStats } from '../../../services/stats-service'

function LandingPageDashboard() {
  const [tasksStats, setTasksStats] = useState({
    tasksDueThisWeek: 0,
    projectsDueThisWeek: 0,
  })

  const stats = {
    activeTimers: [],
    pendingInvoices: 5,
    pendingBudgets: 2,
  }

  useEffect(() => {
    const loadStats = async () => {
      const result = await fetchTasksStats()
      console.log('📊 Dashboard stats:', result)
      if (result) {
        setTasksStats((prev) => ({
          ...prev,
          tasksDueThisWeek: result.tasksDueThisWeek || 0,
          projectsDueThisWeek: result.projectsDueThisWeek || 0,
        }))
      }
    }

    loadStats()
  }, [])

  const timeToSeconds = (timeStr) => {
    const [h, m, s] = timeStr.split(':').map(Number)
    return h * 3600 + m * 60 + s
  }

  const shortestTimer = stats.activeTimers.length
    ? stats.activeTimers.reduce((shortest, current) =>
        timeToSeconds(current.time) < timeToSeconds(shortest.time)
          ? current
          : shortest
      )
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[var(--card-accent-color)] p-6 rounded-lg shadow-lg">
        <div className="p-6 shadow-md bg-[var(--card-background-color)] rounded-md ">
          <h3 className="font-medium text-gray-400 mb-1">Active Timer</h3>

          {shortestTimer ? (
            <div className="p-4 rounded-md">
              <p className="text-sm text-gray-500">{shortestTimer.task}</p>
              <p className="text-xl font-semibold text-blue-600">
                {shortestTimer.time}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center p-4">
              No active timers
            </p>
          )}
        </div>

        <div className="p-6 shadow-md bg-[var(--card-background-color)] rounded-md">
          <h3 className="font-medium text-gray-400 mb-1">
            This Week's Overview
          </h3>

          {tasksStats.tasksDueThisWeek > 0 ? (
            <p className="text-xl font-semibold mt-4 text-blue-600 text-center">
              {tasksStats.tasksDueThisWeek} Tasks
            </p>
          ) : (
            <p className="text-sm text-gray-400 text-center p-4">
              No tasks due this week
            </p>
          )}

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-purple-500">
                {tasksStats.projectsDueThisWeek}
              </span>{' '}
              projects due this week
            </p>
          </div>
        </div>

        <div className="p-6 shadow-md bg-[var(--card-background-color)] rounded-md">
          <h3 className="font-medium text-gray-400 mb-1">Pending Invoices</h3>
          {stats.pendingInvoices > 0 ? (
            <p className="text-xl font-semibold mt-4 text-blue-600 text-center">
              {stats.pendingInvoices} Invoices
            </p>
          ) : (
            <p className="text-sm text-gray-400 text-center p-4">
              No available invoices
            </p>
          )}
        </div>

        <div className="p-6 shadow-md bg-[var(--card-background-color)] rounded-md">
          <h3 className="font-medium text-gray-400 mb-1">Pending Budgets</h3>
          {stats.pendingBudgets > 0 ? (
            <p className="text-xl font-semibold mt-4 text-blue-600 text-center">
              {stats.pendingBudgets} Budgets
            </p>
          ) : (
            <p className="text-sm text-gray-400 text-center p-4">
              No available budgets
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className=" p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-600">
            Resource Library Highlights
          </h3>
          <p className="text-gray-500">
            Quick access to your most used resources.
          </p>
        </div>
        <div className=" p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-600">Tip of the Day</h3>
          <p className="text-gray-500">
            “Break tasks into smaller chunks to improve productivity!”
          </p>
        </div>
        <div className=" p-6 rounded-lg shadow-md">
          <h3 className="font-medium text-gray-600">Notifications</h3>
          <p className="text-gray-500">
            You have 3 new notifications from clients.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default LandingPageDashboard
