import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        images:{
          twoD:  [String],
          threeD:[String],
          // interior:[String]
        },
        architectId: String
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);