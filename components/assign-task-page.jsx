import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const suggestedEmployees = [
  { _id: "1", fname: "Meet", lname: "Jain", email: "meet@test.com" },
];

export function AssignTaskPage() {
  const [assignments, setAssignments] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState({});

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
    console.log(data);
    setTasks(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    return data;
  }

  useEffect(() => {
    getEmp();
    getTasks();
    console.log(tasks);
  }, []);

  useEffect(() => {
    console.log(assignments);
  }, [assignments]);

  const handleAssign = async (taskId, memberId) => {
    setAssignments((prev) => ({ ...prev, [taskId]: memberId }));
    const response = await axios.post("http://localhost:3000/api/task/assign", {
      taskId: taskId,
      memberId: memberId,
    });
  };

  const handleSelectChange = (taskId, value) => {
    setSelectedMembers((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
        Assign Tasks
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="bg-white text-gray-900 border border-gray-200 shadow-lg hover:shadow-xl transform transition-transform hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                {task.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                {suggestedEmployees.map((employee) => (
                  <Button
                    key={employee._id}
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      // Set selected member to the one clicked
                      handleSelectChange(task._id, employee._id.toString());
                    }}
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-300"
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6 rounded-full ring-2 ring-gray-300">
                        <AvatarImage
                          src={employee.avatar}
                          alt={employee.fname[0] + employee.lname[0]}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-900">
                          {employee.fname[0] + employee.lname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {employee.fname + " " + employee.lname}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>

              <Select
                onValueChange={(value) => handleSelectChange(task._id, value)}
                value={selectedMembers[task._id] || ""}
              >
                <SelectTrigger className="bg-gray-100 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-200">
                  <SelectValue placeholder="Select other team members..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-100 text-gray-900 border border-gray-300 rounded-md">
                  {teamMembers.map((member) => (
                    <SelectItem key={member._id} value={member._id.toString()}>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-6 w-6 rounded-full">
                          <AvatarImage
                            src={member.avatar}
                            alt={member.fname[0] + member.lname[0]}
                          />
                          <AvatarFallback className="bg-gray-200 text-gray-900">
                            {member.fname[0] + member.lname[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.fname + " " + member.lname}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedMembers[task._id] && (
                <Button
                  onClick={() =>
                    handleAssign(task._id, selectedMembers[task._id])
                  }
                  className="mt-2 bg-blue-600 text-white rounded-md"
                >
                  Assign
                </Button>
              )}
            </CardContent>

            <CardFooter>
              {assignments[task._id] && (
                <p className="text-sm text-gray-600">
                  Assigned to:{" "}
                  {teamMembers.find(
                    (m) => m._id.toString() === assignments[task._id]
                  )
                    ? `${
                        teamMembers.find(
                          (m) => m._id.toString() === assignments[task._id]
                        ).fname
                      } ${
                        teamMembers.find(
                          (m) => m._id.toString() === assignments[task._id]
                        ).lname
                      }`
                    : "Unknown"}
                </p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
