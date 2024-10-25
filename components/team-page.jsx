import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Sample team data if API is not available:
// const teamMembers = [
//   { name: "Olivia Martin", email: "olivia.martin@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 15, totalTasks: 20 },
//   { name: "Jackson Lee", email: "jackson.lee@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 12, totalTasks: 18 },
//   { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 10, totalTasks: 15 },
//   { name: "William Chen", email: "william.chen@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 8, totalTasks: 12 },
// ];

export function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);

  async function getEmp() {
    const response = await fetch(`/api/employees/all`, {
      method: "GET",
    });
    const data = await response.json();
    setTeamMembers(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  useEffect(() => {
    getEmp();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold tracking-tight text-white">Team Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.email} className="bg-[#111] text-white border border-gray-700 shadow-xl hover:shadow-2xl transform transition-transform hover:-translate-y-2">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Avatar className="h-14 w-14 rounded-full ring-2 ring-gray-600">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-gray-800 text-white text-lg font-bold">
                  {member.fname[0] + member.lname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle className="text-xl font-semibold text-white">{member.fname + " " + member.lname}</CardTitle>
                <p className="text-sm text-gray-400">{member.email}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Previously done tasks</span>
                <span className="text-sm text-gray-400">{member.pastTasks.length}</span>
              </div>
              <Progress value={(member.pastTasks.length / member.totalTasks) * 100} className="h-2 bg-gray-800 rounded-md" />
              <div className="text-sm text-gray-400">
                Completion rate: {((member.pastTasks.length / member.totalTasks) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
