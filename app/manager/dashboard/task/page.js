"use client";

import { useState, memo } from "react";
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
import { refineDataWithGemini } from "@/utils/refineDataWithGemini";
import axios from "axios";
import { useRouter } from "next/navigation";

// Memoized form field components
const FormInput = memo(({ label, ...props }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={props.id}>{label}</Label>
    <Input {...props} />
  </div>
));
FormInput.displayName = "FormInput";

const defaultFormData = {
  title: "",
  description: "",
  priority: "LOW",
  deadline: "",
  stepsToReproduce: "",
  expectedBehavior: "",
  actualBehavior: "",
  expectedOutcome: "",
  tags: [],
}

const FormTextarea = memo(({ label, ...props }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor={props.id}>{label}</Label>
    <Textarea {...props} />
  </div>
));
FormTextarea.displayName = "FormTextarea";

const FormSelect = memo(({ label, value, onValueChange }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor="priority">{label}</Label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id="priority">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="LOW">Low</SelectItem>
        <SelectItem value="MEDIUM">Medium</SelectItem>
        <SelectItem value="HIGH">High</SelectItem>
      </SelectContent>
    </Select>
  </div>
));
FormSelect.displayName = "FormSelect";

const TagsInput = memo(({ tags, onTagAdd, onTagRemove }) => (
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor="tags">Tags</Label>
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="px-2 py-1">
          {tag}
          <button onClick={() => onTagRemove(tag)} className="ml-2 text-xs">
            &times;
          </button>
        </Badge>
      ))}
    </div>
    <Input
      id="tags"
      placeholder="Enter tags (press Enter to add)"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
          e.preventDefault();
          onTagAdd(e.currentTarget.value.trim());
          e.currentTarget.value = "";
        }
      }}
    />
  </div>
));
TagsInput.displayName = "TagsInput";

const CommonFields = memo(
  ({ formData, onInputChange, onPriorityChange, onTagAdd, onTagRemove }) => (
    <div className="grid w-full items-center gap-4">
      <FormInput
        id="title"
        name="title"
        label="Title"
        value={formData.title}
        onChange={onInputChange}
        placeholder="Enter title"
      />
      <FormTextarea
        id="description"
        name="description"
        label="Description"
        value={formData.description}
        onChange={onInputChange}
        placeholder="Enter description"
      />
      <FormSelect
        label="Priority"
        value={formData.priority}
        onValueChange={onPriorityChange}
      />
      <FormInput
        id="deadline"
        name="deadline"
        label="Deadline"
        type="date"
        value={formData.deadline}
        onChange={onInputChange}
      />
      <TagsInput
        tags={formData.tags}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
      />
    </div>
  )
);
CommonFields.displayName = "CommonFields";

const BugFields = memo(({ formData, onInputChange }) => (
  <div className="grid w-full items-center gap-4 mt-4">
    <FormTextarea
      id="stepsToReproduce"
      name="stepsToReproduce"
      label="Steps to Reproduce"
      value={formData.stepsToReproduce}
      onChange={onInputChange}
      placeholder="Enter steps to reproduce"
    />
    <FormTextarea
      id="expectedBehavior"
      name="expectedBehavior"
      label="Expected Behavior"
      value={formData.expectedBehavior}
      onChange={onInputChange}
      placeholder="Enter expected behavior"
    />
    <FormTextarea
      id="actualBehavior"
      name="actualBehavior"
      label="Actual Behavior"
      value={formData.actualBehavior}
      onChange={onInputChange}
      placeholder="Enter actual behavior"
    />
  </div>
));
BugFields.displayName = "BugFields";

const FeatureFields = memo(({ formData, onInputChange }) => (
  <div className="grid w-full items-center gap-4 mt-4">
    <FormTextarea
      id="expectedOutcome"
      name="expectedOutcome"
      label="Expected Outcome"
      value={formData.expectedOutcome}
      onChange={onInputChange}
      placeholder="Enter expected outcome"
    />
  </div>
));
FeatureFields.displayName = "FeatureFields";

export default function BugFeatureEntry() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("BUG");
  const [formData, setFormData] = useState(defaultFormData);

  const changeActiveTab = (e) => {
    // e.preventDefault()
    setActiveTab(e.value)
    setFormData(defaultFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    const temp = formData
    temp['activeTab'] = activeTab
    console.log(temp)
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(temp),
      });

      const res = await response.json()
      console.log(res)
      router.back()
    } catch (error) {}
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value) => {
    setFormData((prev) => ({ ...prev, priority: value }));
  };

  const handleTagAdd = (newTag) => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleRefineAi = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData))
    const temp = formData
    temp['activeTab'] = activeTab
    const result = await JSON.parse(await refineDataWithGemini(temp));
    // console.log(result)
    setFormData(result);
  };

  return (
    <Card className="w-2/3 mx-auto mt-8">
      <CardHeader>
        <CardTitle>Bug / Feature Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={changeActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="BUG">Bug</TabsTrigger>
            <TabsTrigger value="FEATURE">Feature</TabsTrigger>
          </TabsList>
          <TabsContent value="BUG">
            <form onSubmit={handleSubmit}>
              <CommonFields
                formData={formData}
                onInputChange={handleInputChange}
                onPriorityChange={handlePriorityChange}
                onTagAdd={handleTagAdd}
                onTagRemove={handleTagRemove}
              />
              <BugFields
                formData={formData}
                onInputChange={handleInputChange}
              />
              <CardFooter className="flex justify-between mt-6">
                <Button type="submit">Submit Bug</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleRefineAi}
                >
                  Refine AI
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="FEATURE">
            <form onSubmit={handleSubmit}>
              <CommonFields
                formData={formData}
                onInputChange={handleInputChange}
                onPriorityChange={handlePriorityChange}
                onTagAdd={handleTagAdd}
                onTagRemove={handleTagRemove}
              />
              <FeatureFields
                formData={formData}
                onInputChange={handleInputChange}
              />
              <CardFooter className="flex justify-between mt-6">
                <Button type="submit">Submit Feature</Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleRefineAi}
                >
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
