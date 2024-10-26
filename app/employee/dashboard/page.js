"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchAISuggestions } from "@/utils/fetchAISuggestions";
import { useSession } from "next-auth/react";
import axios from "axios";
import BugTaskCard from "@/components/task-card";

// TaskStatus component with props
function TaskStatus({ assignedTask, handleStatusChange }) {
  return (
    <div className="lg:col-span-1">
      <Card className="shadow-lg h-full">
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
                  Click here when completed
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                           
                <Button
                  variant="outline"
                  onClick={() => handleStatusChange("Completed")}
                  className="w-full sm:w-auto"
                >
                  Completed
                </Button>
                
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// UserDashboard component as the parent
export default function UserDashboard() {
  const { data: session } = useSession();
  const [employeeName, setEmployeeName] = useState("Alex");
  const [assignedTask, setAssignedTask] = useState({
    status: "Not Started", // Initial status
    progress: 0, // Assuming you have progress
  });
  const [aiGeneratedContent, setAiGeneratedContent] = useState([]); // Define the missing state

  const handleStatusChange = (newStatus) => {
    setAssignedTask((prev) => ({
      ...prev,
      status: newStatus,
    }));
  };

  const fetchCurrentTask = async () => {
    if (!session) return;
    try {
      const resp = await axios.get(
        `http://localhost:3000/api/employees/current-task/${session.user._id}`
      );
      setAssignedTask(resp.data);
    } catch (error) {
      console.error("Error fetching assigned task:", error);
    }
  };

  useEffect(() => {
    fetchCurrentTask();
  }, [session]);

  useEffect(() => {
    const fetchAiGeneratedContent = async () => {
      try {
        const resp = await fetchAISuggestions({
          title: assignedTask.title,
          description: assignedTask.description,
        });
        const parsedData = JSON.parse(resp);
        setAiGeneratedContent(parsedData.reasons || []); // This line now works because setAiGeneratedContent is defined
      } catch (error) {
        console.error("Error fetching AI suggestions:", error);
      }
    };
    if (assignedTask?.title) fetchAiGeneratedContent();
  }, [assignedTask]);

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

          {/* Pass assignedTask and handleStatusChange as props */}
          <TaskStatus assignedTask={assignedTask} handleStatusChange={handleStatusChange} />
        </div>
      </main>
    </div>
  );
}
