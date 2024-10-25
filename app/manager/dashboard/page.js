"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bell, Calendar, CheckCircle, Clock, Users, LayoutDashboard, UserCircle, ClipboardList } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TeamPage } from "@/components/team-page"
import { AddTaskButton } from "@/components/add-task-button"
import { AssignTaskPage } from "@/components/assign-task-page"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ManagerDashboard() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState("dashboard")

  // Chart data (same as before)
  const chartData = {
    labels: ["To Do", "In Progress", "Review", "Done"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [12, 19, 3, 5],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Distribution",
      },
    },
  }

  const renderPage = () => {
    switch (currentPage) {
      case "team":
        return <TeamPage />
      case "assign":
        return <AssignTaskPage />
      default:
        return (
          <>
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Summary cards (same as before) */}
            </section>
            <section className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <Bar data={chartData} options={chartOptions} />
                </CardContent>
              </Card>
              {/* Team Performance card (same as before) */}
            </section>
            <section className="grid gap-6 md:grid-cols-2">
              {/* Recent Activities and Project Progress cards (same as before) */}
            </section>
          </>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">GenAI Task Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Manager" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="w-64 bg-muted p-4">
          <div className="space-y-2">
            <Button
              variant={currentPage === "dashboard" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentPage("dashboard")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={currentPage === "team" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentPage("team")}
            >
              <UserCircle className="mr-2 h-4 w-4" />
              Team
            </Button>
            <Button
              variant={currentPage === "assign" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentPage("assign")}
            >
              <ClipboardList className="mr-2 h-4 w-4" />
              Assign Tasks
            </Button>
          </div>
        </nav>
        <main className="flex-1 p-6 space-y-6">
          {renderPage()}
        </main>
      </div>
      <AddTaskButton />
    </div>
  )
}