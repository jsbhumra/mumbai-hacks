"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { fetchAISuggestions } from "@/utils/fetchAISuggestions";
import { useSession } from "next-auth/react";
import axios from "axios";
import BugTaskCard from "@/components/task-card";

// Mock data for the assigned task
const assignedTaskData = {
  id: 1,
  title: "What is the weather so bad in Bangalore?",
  description: "Give reasons for bad weather.",
  status: "In Progress",
  dueDate: "2024-11-15",
  progress: 55,
};

function TaskStatus() {
  const { data: session, status } = useSession();
  const [assignedTask, setAssignedTask] = useState({
    status: "Not Started", // Initial status
    progress: 0, // Assuming you have progress
  });

  const handleStatusChange = (newStatus) => {
    setAssignedTask((prev) => ({
      ...prev,
      status: newStatus, // Update the status based on button clicked
    }));
  };
  console.log(session);

  const fetchCurrentTask = async () => {
    const resp = await axios.get(
      `http://localhost:3000/api/employees/current-task/${session.user._id}`
    );
    setAssignedTask(resp.data);
  };
  useEffect(() => {
    if (session) fetchCurrentTask();
  }, [session]);
  console.log(assignedTask);

  return (
    <div className="lg:col-span-1">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">{assignedTask?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Current Status:</span>
              <Badge
                variant={
                  assignedTask.status === "In Progress"
                    ? "default"
                    : "secondary"
                }
              >
                {assignedTask.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Status Options
                </span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("Not Started")}
                >
                  Not Started
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("In Progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("Completed")}
                >
                  Completed
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("Blocked")}
                >
                  Blocked
                </Button>
              </div>
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
  );
}

export default function UserDashboard() {
  const [employeeName, setEmployeeName] = useState("Alex");
  const [aiGeneratedContent, setAiGeneratedContent] = useState([]);

  const [assignedTask, setAssignedTask] = useState({
    status: "Not Started", // Initial status
    progress: 0, // Assuming you have progress
  });

  const fetchAiGeneratedContent = async () => {
    try {
      const resp = await fetchAISuggestions({
        title: assignedTaskData.title,
        description: assignedTaskData.description,
      });
      // console.log(resp);
      const parsedData = JSON.parse(resp);
      setAiGeneratedContent(parsedData.reasons || []);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
    }
  };

  useEffect(() => {
    fetchAiGeneratedContent();
  }, []);

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
            <BugTaskCard task={assignedTask} />
          </div>

          {/* Include the TaskStatus component here */}
          <TaskStatus />
        </div>
      </main>
    </div>
  );
}
