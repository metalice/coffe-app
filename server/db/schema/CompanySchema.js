import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  company: {
    name: { type: String, required: true, trim: true },
    groups: { type: mongoose.Schema.Types.ObjectId, ref: "Groups", trim: true }
  }
});

CompanySchema.statics.findByName = async function(name) {
  const company = await this.findOne({ name });
  return company;
};

const Company = mongoose.model("Company", CompanySchema);

export default Company;
