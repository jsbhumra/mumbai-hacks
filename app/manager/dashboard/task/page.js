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
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BugFeatureEntry() {
  const [activeTab, setActiveTab] = useState("bug");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    expectedOutcome: "",
    tags: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleRefineAi = () => {
    // Simulating AI response
    setTimeout(() => {
      const aiSuggestion = {
        title: "Login page not responsive",
        description:
          "The login page is not displaying correctly on mobile devices",
        priority: "high",
        deadline: "2023-06-30",
        stepsToReproduce:
          "1. Open the login page on a mobile device\n2. Observe the layout",
        expectedBehavior:
          "The login form should be centered and all elements should be visible",
        actualBehavior:
          "The login form is cut off on the right side and some fields are not visible",
        expectedOutcome:
          "A fully responsive login page that works on all device sizes",
        tags: ["mobile", "responsive", "login"],
      };
      setFormData((prev) => ({ ...prev, ...aiSuggestion }));
    }, 1000);
  };

  const CommonFields = () => (
    <>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, priority: value }))
            }
          >
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
          <Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="px-2 py-1">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-2 text-xs">
                  &times;
                </button>
              </Badge>
            ))}
          </div>
          <Input
            id="tags"
            placeholder="Enter tags (press Enter to add)"
            onKeyDown={handleTagInput}
          />
        </div>
      </div>
    </>
  );

  return (
    <Card className="w-2/3 mx-auto mt-8">
      <CardHeader>
        <CardTitle>Bug / Feature Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    name="stepsToReproduce"
                    value={formData.stepsToReproduce}
                    onChange={handleInputChange}
                    placeholder="Enter steps to reproduce"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expectedBehavior">Expected Behavior</Label>
                  <Textarea
                    id="expectedBehavior"
                    name="expectedBehavior"
                    value={formData.expectedBehavior}
                    onChange={handleInputChange}
                    placeholder="Enter expected behavior"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="actualBehavior">Actual Behavior</Label>
                  <Textarea
                    id="actualBehavior"
                    name="actualBehavior"
                    value={formData.actualBehavior}
                    onChange={handleInputChange}
                    placeholder="Enter actual behavior"
                  />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-6">
                <Button type="submit">Submit Bug</Button>
                <Button variant="outline" onClick={handleRefineAi}>
                  Refine AI
                </Button>
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
                    name="expectedOutcome"
                    value={formData.expectedOutcome}
                    onChange={handleInputChange}
                    placeholder="Enter expected outcome"
                  />
                </div>
              </div>
              <CardFooter className="flex justify-between mt-6">
                <Button type="submit">Submit Feature</Button>
                <Button variant="outline" onClick={handleRefineAi}>
                  Refine AI
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
