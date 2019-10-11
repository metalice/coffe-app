import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,

    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,

    trim: true
  },
  password: {
    type: String,

    required: true
  },
  image: {
    type: String
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Groups"
    }
  ]
});

UserSchema.statics.findBy = async function(login) {
  const findBy = async field => await this.findOne({ [field]: login });
  return findBy("email") || findBy("username");
};

const User = mongoose.model("User", UserSchema);

export default User;
