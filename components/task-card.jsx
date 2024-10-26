import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar, User, Clock } from "lucide-react";

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

const statusColors = {
  PENDING: "bg-gray-100 text-gray-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export default function BugTaskCard({ task }) {
  if (!task) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No task data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className={statusColors[task.status]}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Deadline: {new Date(task.deadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Assigned to: {task.assignedTo}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Updated: {new Date(task.updatedAt).toLocaleString()}</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Steps to Reproduce:</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground">
            {task.stepsToReproduce ? String(task.stepsToReproduce).split(",").map((step, index) => (
              <li key={index}>{step}</li>
            )) : <li>No steps provided</li>}

          </ol>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Expected Behavior:</h3>
          <p className="text-sm text-muted-foreground">
            {task.expectedBehavior}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Actual Behavior:</h3>
          <p className="text-sm text-muted-foreground">{task.actualBehavior}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {task.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
