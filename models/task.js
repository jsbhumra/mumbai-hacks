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
    // required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
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

// Define the schema
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
    if (!this.expectedBehavior || !this.actualBehavior) {
      return next(
        new Error(
          "Bug tasks require expected behavior and actual behavior"
        )
      );
    }
  } else if (this.taskType === "FEATURE") {
    if (!this.expectedOutcome) {
      return next(
        new Error(
          "Feature tasks require an expected outcome"
        )
      );
    }
  }
  next();
});

// Check if the models already exist to prevent OverwriteModelError
let Task;
let BugTask;
let FeatureTask;

if (mongoose.models.Task) {
  Task = mongoose.model("Task");
} else {
  Task = mongoose.model("Task", taskSchema);
}

if (mongoose.models.BUG) {
  BugTask = mongoose.models.BUG;
} else {
  BugTask = Task.discriminator("BUG", new Schema({}));
}

if (mongoose.models.FEATURE) {
  FeatureTask = mongoose.models.FEATURE;
} else {
  FeatureTask = Task.discriminator("FEATURE", new Schema({}));
}

module.exports = {
  Task,
  BugTask,
  FeatureTask,
};
