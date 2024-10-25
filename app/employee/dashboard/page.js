"use client"

import React from "react"
import { Bell, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

// Mock data for the assigned task
const assignedTask = {
  id: 1,
  title: "Optimize Database Queries for User Authentication",
  description: "Improve the performance of database queries related to user authentication to reduce login times and enhance overall system responsiveness.",
  status: "In Progress",
  dueDate: "2023-07-15",
  progress: 35,
}

// Mock AI-generated reasons and solutions
const aiGeneratedContent = [
  {
    reason: "Inefficient SQL Queries",
    solution: "Analyze and optimize SQL queries using indexing and query plan analysis. Consider using database-specific optimization techniques."
  },
  {
    reason: "Lack of Caching Mechanism",
    solution: "Implement a caching layer using Redis or Memcached to store frequently accessed user data and reduce database load."
  },
  {
    reason: "Unoptimized Database Schema",
    solution: "Review and normalize the database schema. Consider denormalization for frequently accessed data to improve query performance."
  }
]

export default function UserDashboard() {
  const [employeeName, setEmployeeName] = React.useState("Alex")

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Hey, {employeeName}!
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Your Current Task</CardTitle>
                <CardDescription>Focus on this to meet your deadline</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">{assignedTask.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{assignedTask.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium">Due: {assignedTask.dueDate}</span>
                  </div>
                  <Progress value={assignedTask.progress} className="w-1/3" />
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">Common Issues & Solutions</h4>
                  <TooltipProvider>
                    <div className="space-y-2">
                      {aiGeneratedContent.map((item, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                              <AlertCircle className="h-5 w-5 text-yellow-500" />
                              <span className="text-sm font-medium">{item.reason}</span>
                              <ChevronRight className="h-4 w-4 ml-auto" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-sm">
                            <p>{item.solution}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Task Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Current Status:</span>
                    <Badge variant={assignedTask.status === "In Progress" ? "default" : "secondary"}>
                      {assignedTask.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="text-sm font-medium">{assignedTask.progress}%</span>
                    </div>
                    <Progress value={assignedTask.progress} className="w-full" />
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-lg font-semibold mb-2">Next Steps</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li>Review current database schema</li>
                      <li>Identify slow queries</li>
                      <li>Implement caching mechanism</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}