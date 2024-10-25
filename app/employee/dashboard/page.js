"use client"

import React from "react"
import { Bell, CheckCircle, Clock, HelpCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for user tasks
const userTasks = [
  { id: 1, title: "Implement user authentication", status: "In Progress", dueDate: "2023-06-30", progress: 60 },
  { id: 2, title: "Design dashboard UI", status: "To Do", dueDate: "2023-07-05", progress: 0 },
  { id: 3, title: "Optimize database queries", status: "In Progress", dueDate: "2023-07-02", progress: 30 },
  { id: 4, title: "Write unit tests for API endpoints", status: "To Do", dueDate: "2023-07-10", progress: 0 },
]

// Mock AI analysis function
const getAIAnalysis = (taskTitle) => {
  // In a real application, this would make an API call to an AI service
  return {
    problem: `The task "${taskTitle}" requires careful consideration of the following aspects...`,
    solution: `To address this task effectively, consider the following steps:\n1. Analyze the current system\n2. Identify potential bottlenecks\n3. Implement optimizations\n4. Test and validate improvements`,
  }
}

export default function UserDashboard() {
  const [selectedTask, setSelectedTask] = React.useState(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Task Management Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Your Tasks</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userTasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription>Due: {task.dueDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    {task.status === "In Progress" ? (
                      <Clock className="h-4 w-4 text-blue-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-sm font-medium">{task.status}</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedTask(task)}>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        AI Analysis
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>AI Analysis for {selectedTask?.title}</DialogTitle>
                        <DialogDescription>
                          Problem breakdown and suggested solution
                        </DialogDescription>
                      </DialogHeader>
                      {selectedTask && (
                        <Tabs defaultValue="problem" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="problem">Problem</TabsTrigger>
                            <TabsTrigger value="solution">Solution</TabsTrigger>
                          </TabsList>
                          <TabsContent value="problem">
                            <Card>
                              <CardHeader>
                                <CardTitle>Problem Analysis</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{getAIAnalysis(selectedTask.title).problem}</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="solution">
                            <Card>
                              <CardHeader>
                                <CardTitle>Suggested Solution</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p>{getAIAnalysis(selectedTask.title).solution}</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}