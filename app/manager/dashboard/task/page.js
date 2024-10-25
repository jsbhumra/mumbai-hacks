"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BugFeatureEntry() {
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAskAi = () => {
    // Simulate AI response
    setAiResponse("AI is analyzing your input...");
    setTimeout(() => {
      setAiResponse(
        "Based on the information provided, this appears to be a high-priority bug that needs immediate attention. I suggest assigning it to your senior developer and setting a deadline for next week."
      );
    }, 2000);
  };

  const CommonFields = () => (
    <>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter title" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter description" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">Status</Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="priority">Priority</Label>
          <Select>
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="deadline">Deadline</Label>
          <Input id="deadline" type="date" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="createdBy">Created By</Label>
          <Input id="createdBy" placeholder="Enter creator's name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="assignedTo">Assigned To</Label>
          <Input id="assignedTo" placeholder="Enter assignee's name" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="tags">Tags</Label>
          <Input id="tags" placeholder="Enter tags (comma-separated)" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="taskType">Task Type</Label>
          <Select>
            <SelectTrigger id="taskType">
              <SelectValue placeholder="Select task type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bug / Feature Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bug" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bug">Bug</TabsTrigger>
              <TabsTrigger value="feature">Feature</TabsTrigger>
            </TabsList>
            <TabsContent value="bug">
              <form onSubmit={handleSubmit}>
                <CommonFields />
                <div className="grid w-full items-center gap-4 mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="stepsToReproduce">Steps to Reproduce</Label>
                    <Textarea
                      id="stepsToReproduce"
                      placeholder="Enter steps to reproduce"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="expectedBehavior">Expected Behavior</Label>
                    <Textarea
                      id="expectedBehavior"
                      placeholder="Enter expected behavior"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="actualBehavior">Actual Behavior</Label>
                    <Textarea
                      id="actualBehavior"
                      placeholder="Enter actual behavior"
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-between mt-6">
                  <Button type="submit">Submit Bug</Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" onClick={handleAskAi}>
                        Ask AI
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>AI Analysis</SheetTitle>
                        <SheetDescription>
                          Here's what the AI thinks about your input:
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-4">
                        <p>{aiResponse}</p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </form>
            </TabsContent>
            <TabsContent value="feature">
              <form onSubmit={handleSubmit}>
                <CommonFields />
                <div className="grid w-full items-center gap-4 mt-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="expectedOutcome">Expected Outcome</Label>
                    <Textarea
                      id="expectedOutcome"
                      placeholder="Enter expected outcome"
                    />
                  </div>
                </div>
                <CardFooter className="flex justify-between mt-6">
                  <Button type="submit">Submit Feature</Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" onClick={handleAskAi}>
                        Ask AI
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>AI Analysis</SheetTitle>
                        <SheetDescription>
                          Here's what the AI thinks about your input:
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-4">
                        <p>{aiResponse}</p>
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
