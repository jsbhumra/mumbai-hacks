import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const tasks = [
//   { id: 1, title: "Implement user authentication", description: "Set up JWT-based authentication for the API" },
//   { id: 2, title: "Design dashboard UI", description: "Create a responsive dashboard layout using Figma" },
//   { id: 3, title: "Fix pagination bug", description: "Resolve issue with pagination on the search results page" },
//   { id: 4, title: "Optimize database queries", description: "Improve performance of slow-running database queries" },
// ];

const suggestedEmployees = [
  { _id: '1', fname: 'Meet', lname: 'Jain', email: 'meet@test.com' }
];

export function AssignTaskPage() {
  const [assignments, setAssignments] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  async function getEmp() {
    const response = await fetch(`/api/employees/available`, {
      method: "GET",
    });
    const data = await response.json();
    setTeamMembers(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  async function getTasks() {
    const response = await fetch(`/api/task/pending`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data)
    setTasks(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  useEffect(() => {
    getEmp();
    getTasks();
    console.log(tasks)
  }, []);

  useEffect(() => {
    console.log(assignments);
  }, [assignments]);

  const handleAssign = (taskId, memberId) => {
    setAssignments((prev) => ({ ...prev, [taskId]: memberId }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold tracking-tight text-white">Assign Tasks</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task._id} className="bg-[#1a1a1a] text-white border border-gray-700 shadow-lg hover:shadow-2xl transform transition-transform hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white">{task.title}</CardTitle>
              <CardDescription className="text-gray-400">{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                {suggestedEmployees.length > 0 && suggestedEmployees.map((employee) => (
                  <Button
                    key={employee._id}
                    variant="primary"
                    size="sm"
                    onClick={() => handleAssign(task.id, employee._id.toString())}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6 rounded-full ring-2 ring-gray-600">
                        <AvatarImage src={employee.avatar} alt={employee.fname[0] + employee.lname[0]} />
                        <AvatarFallback className="bg-gray-900 text-white">
                          {employee.fname[0] + employee.lname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{employee.fname + " " + employee.lname}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <Select onValueChange={(value) => handleAssign(task._id, value)}>
                <SelectTrigger className="bg-gray-800 text-white border border-gray-600 rounded-md hover:bg-gray-700">
                  <SelectValue placeholder="Select other team members..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white border border-gray-600 rounded-md">
                  {teamMembers.map((member) => (
                    <SelectItem key={member._id} value={member._id.toString()}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-6 w-6 rounded-full">
                          <AvatarImage src={member.avatar} alt={member.fname[0] + member.lname[0]} />
                          <AvatarFallback className="bg-gray-900 text-white">
                            {member.fname[0] + member.lname[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.fname + " " + member.lname}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>

            <CardFooter>
              {assignments[task.id] && (() => {
                const member = teamMembers.find((m) => m._id.toString() === assignments[task._id]);
                return (
                  <p className="text-sm text-gray-400">
                    Assigning to: {member ? `${member.fname} ${member.lname}` : 'Unknown'}
                  </p>
                );
              })()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
