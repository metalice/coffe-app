import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, trim: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", trim: true }],
  name: { type: String, required: true }
});

GroupSchema.statics.findById = async function(data) {
  const group = await this.findOne({ id: data });
  return group;
};

GroupSchema.statics.findByName = async function(data) {
  const group = await this.findOne({ name: data });
  return group;
};

const Group = mongoose.model("Group", GroupSchema);

export default Group;
