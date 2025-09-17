// 代码生成时间: 2025-09-17 20:14:38
 * This module provides a simple interface to schedule tasks that can be run at
 * specific intervals or at specific times.
 */

// Import necessary modules
const { defineNuxtModule } = require('@nuxt/kit')
const { setIntervalAsync, clearIntervalAsync } = require('set-interval-async/dynamic')
const nodeSchedule = require('node-schedule')

// Define the scheduler module
export default defineNuxtModule({
    meta: {
        name: 'scheduler',
        compatibility: '2.12',
    },
    async setup(_, nuxt) {
        // Create a store for the scheduler
        nuxt.hook('app:created', () => {
            nuxt.$scheduler = {
                tasks: {},
                schedule: (taskName, taskFn, schedulePattern) => {
                    try {
                        // Schedule the task using node-schedule
                        const job = nodeSchedule.scheduleJob(schedulePattern, async () => {
                            await taskFn()
                        })
                        // Store the scheduled job
                        this.tasks[taskName] = job
                    } catch (err) {
                        // Log and handle any errors that occur during scheduling
                        console.error(`Error scheduling task '${taskName}':`, err)
                    }
                },
                cancel: (taskName) => {
                    // Cancel the scheduled task
                    if (this.tasks[taskName]) {
                        this.tasks[taskName].cancel()
                        delete this.tasks[taskName]
                    } else {
                        console.warn(`Task '${taskName}' not found.`)
                    }
                },
                cancelAll: () => {
                    // Cancel all scheduled tasks
                    Object.values(this.tasks).forEach((job) => job.cancel())
                    this.tasks = {}
                },
            }
        })
    },
})

// Example usage:
/*
nuxt.$scheduler.schedule('exampleTask', async () => {
    console.log('Task executed at:', new Date())
}, '*/5 * * * *') // Runs every 5 minutes
*/

/*
nuxt.$scheduler.cancel('exampleTask') // Cancels the 'exampleTask'
*/

/*
nuxt.$scheduler.cancelAll() // Cancels all scheduled tasks
*/