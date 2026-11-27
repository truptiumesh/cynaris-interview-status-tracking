const PIPELINE_STAGES = [
  "Screening",
  "Technical Round 1",
  "Technical Round 2",
  "HR Round",
  "Offered",
  "Rejected",
];

const applicants = [];

const updatePipelineStage = (applicantId, stage) => {
  if (!applicantId || typeof applicantId !== "string") {
    throw new Error("A valid applicant ID is required.");
  }

  if (!PIPELINE_STAGES.includes(stage)) {
    throw new Error("Invalid pipeline stage.");
  }

  const applicant = applicants.find((item) => item.id === applicantId);

  if (!applicant) {
    throw new Error("Applicant not found.");
  }

  applicant.pipelineStage = stage;
  return applicant;
};

module.exports = {
  PIPELINE_STAGES,
  applicants,
  updatePipelineStage,
};