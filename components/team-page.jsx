import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const teamMembers = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 15, totalTasks: 20 },
  { name: "Jackson Lee", email: "jackson.lee@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 12, totalTasks: 18 },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 10, totalTasks: 15 },
  { name: "William Chen", email: "william.chen@email.com", avatar: "/placeholder-avatar.jpg", tasksCompleted: 8, totalTasks: 12 },
]

export function TeamPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Team Overview</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.email}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle>{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tasks Progress</span>
                <span className="text-sm text-muted-foreground">
                  {member.tasksCompleted}/{member.totalTasks}
                </span>
              </div>
              <Progress value={(member.tasksCompleted / member.totalTasks) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}