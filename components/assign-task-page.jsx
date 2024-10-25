import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tasks = [
  { id: 1, title: "Implement user authentication", description: "Set up JWT-based authentication for the API" },
  { id: 2, title: "Design dashboard UI", description: "Create a responsive dashboard layout using Figma" },
  { id: 3, title: "Fix pagination bug", description: "Resolve issue with pagination on the search results page" },
  { id: 4, title: "Optimize database queries", description: "Improve performance of slow-running database queries" },
];

const teamMembers = [
  { id: 1, name: "Olivia Martin", avatar: "/placeholder-avatar.jpg" },
  { id: 2, name: "Jackson Lee", avatar: "/placeholder-avatar.jpg" },
  { id: 3, name: "Isabella Nguyen", avatar: "/placeholder-avatar.jpg" },
  { id: 4, name: "William Chen", avatar: "/placeholder-avatar.jpg" },
];

export function AssignTaskPage() {
  const [assignments, setAssignments] = useState({});

  const handleAssign = (taskId, memberId) => {
    setAssignments((prev) => ({ ...prev, [taskId]: memberId }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Assign Tasks</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => handleAssign(task.id, parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {member.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              {assignments[task.id] && (
                <p className="text-sm text-muted-foreground">
                  Assigned to: {teamMembers.find((m) => m.id === assignments[task.id])?.name}
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
