"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bell, LayoutDashboard, UserCircle, ClipboardList } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamPage } from "@/components/team-page";
import { AssignTaskPage } from "@/components/assign-task-page";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ManagerDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState("dashboard");

  // Chart data
  const chartData = {
    labels: ["To Do", "In Progress", "Review", "Done"],
    datasets: [
      {
        label: "Tasks",
        data: [12, 19, 3, 5],
        backgroundColor: ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: {
        display: true,
        text: "Task Progress Overview",
        color: "#fff",
      },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  const renderPage = () => {
    switch (currentPage) {
      case "team":
        return <TeamPage />;
      case "assign":
        return <AssignTaskPage />;
      default:
        return (
          <>
            <section className="flex justify-center">
              <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-0">
                <Card className="bg-black text-white shadow-lg border border-gray-300 hover:shadow-2xl transform transition-transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Ongoing Tasks</CardTitle>
                  </CardHeader>
                  <CardContent className="text-4xl font-semibold">25</CardContent>
                </Card>
                {/* You can add more cards here */}
              </div>
              {/* Add more cards here */}
            </section>
            <section className="grid gap-6 md:grid-cols-2">
              <Card className="bg-black shadow-lg border-none rounded-lg">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl font-bold text-white">
                    Task Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Bar data={chartData} options={chartOptions} />
                </CardContent>
              </Card>

              {/* Add a card for project activity */}
              <Card className="bg-black shadow-lg border-none rounded-lg">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl font-bold text-white">
                    Team Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-lg text-gray-300">Performance overview here...</p>
                </CardContent>
              </Card>
            </section>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-100">
      <header className="flex items-center justify-between px-8 py-5 bg-black shadow-md">
        <h1 className="text-3xl font-bold">GenAI Task Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6 text-white" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Manager" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1">
        <nav className="w-64 p-4 bg-black text-gray-300">
          <div className="space-y-4">
            <Button
              variant={currentPage === "dashboard" ? "secondary" : "ghost"}
              className={`w-full justify-start ${currentPage === "dashboard" ? "text-blue-300" : "text-gray-300"
                }`}
              onClick={() => setCurrentPage("dashboard")}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>

            <Button
              variant={currentPage === "team" ? "secondary" : "ghost"}
              className={`w-full justify-start ${currentPage === "team" ? "text-blue-300" : "text-gray-300"
                }`}
              onClick={() => setCurrentPage("team")}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Team
            </Button>

            <Button
              variant={currentPage === "assign" ? "secondary" : "ghost"}
              className={`w-full justify-start ${currentPage === "assign" ? "text-blue-300" : "text-gray-300"
                }`}
              onClick={() => setCurrentPage("assign")}
            >
              <ClipboardList className="mr-3 h-5 w-5" />
              Assign Tasks
            </Button>
          </div>
        </nav>

        <main className="flex-1 p-8 space-y-8">{renderPage()}</main>
      </div>

      <Link href="/manager/dashboard/task">
        <Button className="fixed bottom-6 right-6 rounded-full h-16 w-16 bg-blue-500 hover:bg-blue-600">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </Link>
    </div>
  );
}
