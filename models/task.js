const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common fields for both bug and feature tasks
const baseTaskFields = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
    default: "MEDIUM",
  },
  deadline: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: String,
    },
  ],
  taskType: {
    type: String,
    enum: ["BUG", "FEATURE"],
    required: true,
  },
};

// Bug-specific fields
const bugFields = {
  stepsToReproduce: [
    {
      type: String,
    },
  ],
  expectedBehavior: {
    type: String,
    required: function () {
      return this.taskType === "BUG";
    },
  },
  actualBehavior: {
    type: String,
    required: function () {
      return this.taskType === "BUG";
    },
  },
};

// Feature-specific fields
const featureFields = {
  expectedOutcome: {
    type: String,
    required: function () {
      return this.taskType === "FEATURE";
    },
  },
};

const taskSchema = new Schema(
  {
    ...baseTaskFields,
    ...bugFields,
    ...featureFields,
  },
  {
    timestamps: true,
    discriminatorKey: "taskType",
  }
);

// Middleware to validate fields based on taskType
taskSchema.pre("save", function (next) {
  if (this.taskType === "BUG") {
    if (!this.severity || !this.expectedBehavior || !this.actualBehavior) {
      next(
        new Error(
          "Bug tasks require severity, expected behavior, and actual behavior"
        )
      );
    }
  } else if (this.taskType === "FEATURE") {
    if (!this.featureCategory || !this.businessValue || !this.estimatedEffort) {
      next(
        new Error(
          "Feature tasks require category, business value, and estimated effort"
        )
      );
    }
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);

// Create discriminators for specific task types
const BugTask = Task.discriminator("BUG", new Schema({}));
const FeatureTask = Task.discriminator("FEATURE", new Schema({}));

module.exports = {
  Task,
  BugTask,
  FeatureTask,
};
