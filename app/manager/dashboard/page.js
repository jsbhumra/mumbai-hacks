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
        label: "Number of Tasks",
        data: [12, 19, 3, 5],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Task Distribution" },
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
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Summary cards with refined design */}
              <Card className="shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardHeader>
                  <CardTitle>Tasks Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-lg font-semibold">
                  Ongoing Tasks: 25
                </CardContent>
              </Card>
              {/* More cards for other metrics */}
            </section>
            <section className="grid gap-6 md:grid-cols-2">
              <Card className="shadow-lg bg-white border border-gray-200 rounded-lg">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg font-bold text-gray-700">
                    Task Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Bar data={chartData} options={chartOptions} />
                </CardContent>
              </Card>
              {/* Additional card for team performance or other metrics */}
            </section>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
        <h1 className="text-3xl font-bold">GenAI Task Management</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt="Manager" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="w-64 p-4 bg-white text-gray-700">
          <div className="space-y-4">
            <Button
              variant={currentPage === "dashboard" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPage === "dashboard" ? "text-blue-700" : "text-gray-700"
              }`}
              onClick={() => setCurrentPage("dashboard")}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Button>
            <Button
              variant={currentPage === "team" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPage === "team" ? "text-blue-700" : "text-gray-700"
              }`}
              onClick={() => setCurrentPage("team")}
            >
              <UserCircle className="mr-3 h-5 w-5" />
              Team
            </Button>
            <Button
              variant={currentPage === "assign" ? "secondary" : "ghost"}
              className={`w-full justify-start ${
                currentPage === "assign" ? "text-blue-700" : "text-gray-700"
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
        <Button className="fixed bottom-6 right-6 rounded-full h-16 w-16">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
