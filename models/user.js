import mongoose from "mongoose";
import validator from "validator";
import { compare, hash } from "bcryptjs";

var Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: { type: String, required: true },
  type: {
    type: String,
    default: 'employee',
    enum: ['manager', 'employee'],
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  skills: {
    type: [String],
    default: [],
  },
  pastTasks: {
    type: [Schema.Types.ObjectId],
    ref: 'Task',
    default: [],
  },
  availability: {
    type: String,
    enum: ['available', 'assigned', 'unavailable'],
    default: 'available',
  },
  currentTask: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    default: null,
  },
});


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

let User;
try {
    User = mongoose.model("User");
  } catch (e) {
    User = mongoose.model("User", userSchema);
  }

export default User;