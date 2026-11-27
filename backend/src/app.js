
const express = require("express");
const {
  PIPELINE_STAGES,
  applicants,
  updatePipelineStage,
} = require("./applicantService");

const app = express();

app.use(express.json());

// Add sample applicants
applicants.push(
  { id: "APP001", name: "Trupti Umesh", pipelineStage: "Screening" },
  { id: "APP002", name: "Arun Kumar", pipelineStage: "Technical Round 1" },
  { id: "APP003", name: "Swathi Prasad", pipelineStage: "HR Round" }
);

// Get all applicants
app.get("/api/applicants", (req, res) => {
  res.json(applicants);
});

// Get available pipeline stages
app.get("/api/pipeline-stages", (req, res) => {
  res.json(PIPELINE_STAGES);
});

// Update an applicant's pipeline stage
app.patch("/api/applicants/:id/stage", (req, res) => {
  try {
    const { stage } = req.body;
    const updatedApplicant = updatePipelineStage(req.params.id, stage);
    res.json(updatedApplicant);
  } catch (error) {
    const status = error.message === "Applicant not found." ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
});

// Count applicants by stage
app.get("/api/dashboard", (req, res) => {
  const counts = Object.fromEntries(
    PIPELINE_STAGES.map((stage) => [
      stage,
      applicants.filter((applicant) => applicant.pipelineStage === stage).length,
    ])
  );

  res.json(counts);
});

module.exports = app;
