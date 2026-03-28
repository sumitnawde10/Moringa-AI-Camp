import React, { useContext, useEffect } from "react";
import { Alert, Box, Button, Container, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormContext";

const childEmergencyQuestions = [
  "Did the child get hit in the eye or have an injury recently?",
  "Do you see any white spot inside the eye?",
  "Do the eyes look crossed, turned, or unequal?",
  "Does the child avoid light or keep eyes closed?",
];

const adultEmergencyQuestions = [
  "Did you have sudden loss of vision?",
  "Do you have severe eye pain or headache with vomiting?",
  "Did anything hit your eye or go inside it?",
  "Do you see flashes of light or a dark curtain in vision?",
];

const SummaryPage = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const step1 = formData?.step1 || {};
  const step2 = formData?.step2 || {};
  const selectedCamp = formData?.selectedCamp || "";
  const eyeForm = formData?.eyeForm || {};
  const dentalForm = formData?.dentalForm || {};
  const malnutritionForm = formData?.malnutritionForm || {};
  const diabetesForm = formData?.diabetesForm || {};
  const heartForm = formData?.heartForm || {};

  const allCampAnswers = eyeForm.answers || {};
  const emergencyQuestions =
    eyeForm.patientType === "Child"
      ? childEmergencyQuestions
      : adultEmergencyQuestions;

  const emergencyAlerts = emergencyQuestions.filter(
    (question) => allCampAnswers[question] === "Yes"
  );

  const registrationItems = [
    { label: "Registered Mobile Number", value: step1.mobile },
    { label: "ABHA ID", value: step1.abha },
    { label: "Aadhaar Number", value: step1.aadhaar },
    { label: "PMJAY Status", value: step1.pmjay },
    { label: "PMJAY ID", value: step1.pmjayId },
    { label: "Relation", value: step1.relation },
    { label: "Patient Name", value: step1.name },
    { label: "Age", value: step1.age ? `${step1.age} years` : "" },
    { label: "Gender", value: step1.gender },
    { label: "Area / Ward / Locality", value: step1.area },
    { label: "Occupation", value: step1.occupation },
  ];

  const healthItems = [
    { label: "Height", value: step2.height ? `${step2.height} cm` : "" },
    { label: "Weight", value: step2.weight ? `${step2.weight} kg` : "" },
    { label: "Blood Pressure Status", value: step2.bp },
    { label: "Blood Sugar Status", value: step2.sugar },
    {
      label: "Diagnosed Medical Conditions",
      value: step2.conditions?.length ? step2.conditions.join(", ") : "",
    },
    { label: "Taking Regular Medication", value: step2.medication },
    { label: "Tobacco Usage", value: step2.tobacco },
    { label: "Alcohol Consumption", value: step2.alcohol },
    {
      label: "Visited Hospital In Last 6 Months",
      value: step2.hospitalVisit,
    },
    { label: "Recurring Issues", value: step2.recurring },
    {
      label: "Uploaded Medical Report",
      value: step2.medicalReport?.name,
    },
  ];

  const campItems = [
    {
      label: "Patient Type",
      value:
        eyeForm.patientType === "Child"
          ? "Child (Below 16 years)"
          : eyeForm.patientType === "Adult"
          ? "Adult (16+ years)"
          : "",
    },
    { label: "Main Eye Problem", value: eyeForm.mainProblem },
    { label: "Other Details", value: eyeForm.otherText },
  ];

  const dentalItems = [
    {
      label: "Dental Complaints",
      value: dentalForm.complaints?.length
        ? dentalForm.complaints.join(", ")
        : "",
    },
    { label: "Other Complaint Details", value: dentalForm.otherComplaint },
    {
      label: "Problem Duration",
      value: dentalForm.complaintDuration,
    },
    {
      label: "Brushing Frequency",
      value: dentalForm.brushingFrequency,
    },
    { label: "Brushing Tool", value: dentalForm.brushingTool },
    { label: "Do You Floss", value: dentalForm.flossing },
    {
      label: "Mouth Rinsing After Meals",
      value: dentalForm.mouthRinsing,
    },
    {
      label: "Tobacco Use",
      value: dentalForm.tobaccoUse?.length
        ? dentalForm.tobaccoUse.join(", ")
        : "",
    },
    {
      label: "Tobacco Use Duration",
      value: dentalForm.tobaccoDuration
        ? `${dentalForm.tobaccoDuration} years`
        : "",
    },
    {
      label: "Tobacco Use Frequency",
      value: dentalForm.tobaccoFrequency,
    },
    {
      label: "Alcohol Consumption",
      value: dentalForm.alcoholConsumption,
    },
    {
      label: "Past Dental History",
      value: dentalForm.pastDentalHistory?.length
        ? dentalForm.pastDentalHistory.join(", ")
        : "",
    },
    {
      label: "Problems After Previous Dental Treatment",
      value: dentalForm.pastTreatmentProblems,
    },
  ];

  const malnutritionItems = Object.entries(malnutritionForm.answers || {}).map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  const diabetesItems = Object.entries(diabetesForm.answers || {}).map(
    ([label, value]) => ({
      label,
      value,
    })
  );

  const heartItems = [
    ...Object.entries(heartForm.answers || {}).map(([label, value]) => ({
      label,
      value,
    })),
    {
      label: "Which medications",
      value: heartForm.medications,
    },
    {
      label: "Which procedure",
      value: heartForm.procedureDetails,
    },
    {
      label: "Tobacco Duration",
      value: heartForm.tobaccoDuration
        ? `${heartForm.tobaccoDuration} years`
        : "",
    },
    {
      label: "When was your last BP or sugar test",
      value: heartForm.lastTest,
    },
  ];

  const sectionBox = {
    p: 2.5,
    borderRadius: 3,
    backgroundColor: "#f3f4f6",
    mb: 3,
  };

  const greenContainedButton = {
    py: 1.5,
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor: "#2e7d32",
    "&:hover": {
      backgroundColor: "#1b5e20",
    },
  };

  const renderItems = (items) => {
    const visibleItems = items.filter((item) => item.value);

    if (visibleItems.length === 0) {
      return (
        <Typography color="text.secondary">
          No information available for this section yet.
        </Typography>
      );
    }

    return visibleItems.map((item) => (
      <Typography key={item.label} mb={1.2}>
        <strong>{item.label}:</strong> {item.value}
      </Typography>
    ));
  };

  const renderCampAnswers = () => {
    const entries = Object.entries(allCampAnswers);

    if (!entries.length) {
      return (
        <Typography color="text.secondary">
          No camp form answers were saved.
        </Typography>
      );
    }

    return entries.map(([question, answer]) => (
      <Box key={question} mb={2}>
        <Typography fontWeight="600">{question}</Typography>
        <Typography color="text.secondary">Selected answer: {answer}</Typography>
      </Box>
    ));
  };

  const renderDentalScreeningAnswers = () => {
    const entries = Object.entries(dentalForm.screeningAnswers || {});
    const filteredEntries = dentalForm.screeningUseDuration
      ? [
          ...entries,
          [
            "Duration of tobacco / betel nut use (years)",
            `${dentalForm.screeningUseDuration} years`,
          ],
        ]
      : entries;

    if (!filteredEntries.length) {
      return (
        <Typography color="text.secondary">
          No dental screening answers were saved.
        </Typography>
      );
    }

    return filteredEntries.map(([question, answer]) => (
      <Box key={question} mb={2}>
        <Typography fontWeight="600">{question}</Typography>
        <Typography color="text.secondary">Selected answer: {answer}</Typography>
      </Box>
    ));
  };

  const renderDentalComplaintDetails = () => {
    const entries = Object.entries(dentalForm.complaintDetails || {});

    if (!entries.length) {
      return (
        <Typography color="text.secondary">
          No complaint-specific dental answers were saved.
        </Typography>
      );
    }

    return entries.map(([complaint, answers]) => (
      <Box key={complaint} mb={2}>
        <Typography fontWeight="700" mb={1}>
          {complaint}
        </Typography>
        {Object.entries(answers).map(([questionKey, answer]) => (
          <Typography key={questionKey} color="text.secondary" mb={0.8}>
            <strong>{questionKey}:</strong>{" "}
            {Array.isArray(answer) ? answer.join(", ") : answer}
          </Typography>
        ))}
      </Box>
    ));
  };

  const handleRegisterAnother = () => {
    setFormData({
      step1: {},
      step2: {},
      selectedCamp: "",
      eyeForm: {},
      dentalForm: {},
      malnutritionForm: {},
      diabetesForm: {},
      heartForm: {},
    });
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          mb: 5,
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h3" color="#16a34a" fontWeight="700" mb={1}>
            Registration Complete!
          </Typography>
          <Typography color="text.secondary" fontSize="1.1rem">
            Your medical camp registration has been submitted successfully.
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" mb={2}>
          Registration Summary
        </Typography>
        <Box sx={sectionBox}>{renderItems(registrationItems)}</Box>

        <Typography variant="h5" mb={2}>
          Health Information
        </Typography>
        <Box sx={sectionBox}>{renderItems(healthItems)}</Box>

        <Typography variant="h5" mb={2}>
          Selected Camp
        </Typography>
        <Box
          sx={{
            ...sectionBox,
            backgroundColor: "#dbeafe",
            color: "#1d4ed8",
          }}
        >
          <Typography fontWeight="700" fontSize="1.05rem">
            {selectedCamp ? selectedCamp.toUpperCase() : "No camp selected"}
          </Typography>
        </Box>

        {selectedCamp === "eye" && (
          <>
            <Typography variant="h5" mb={2}>
              Eye Camp Summary
            </Typography>
            <Box sx={sectionBox}>{renderItems(campItems)}</Box>

            {emergencyAlerts.length > 0 && (
              <>
                <Typography variant="h6" mb={2}>
                  Alert Shown In Form
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="error" sx={{ mb: 2 }}>
                    Emergency detected. This patient requires immediate medical
                    attention.
                  </Alert>

                  {emergencyAlerts.map((question) => (
                    <Typography key={question} color="error" mb={1}>
                      {question}
                    </Typography>
                  ))}
                </Box>
              </>
            )}

            <Typography variant="h6" mb={2}>
              Camp Form Answers
            </Typography>
            <Box sx={sectionBox}>{renderCampAnswers()}</Box>
          </>
        )}

        {selectedCamp === "dental" && (
          <>
            <Typography variant="h5" mb={2}>
              Dental Camp Summary
            </Typography>
            <Box sx={sectionBox}>{renderItems(dentalItems)}</Box>

            <Typography variant="h6" mb={2}>
              Dental Complaint Details
            </Typography>
            <Box sx={sectionBox}>{renderDentalComplaintDetails()}</Box>

            <Typography variant="h6" mb={2}>
              Oral Cancer / Lesion Screening
            </Typography>
            <Box sx={sectionBox}>{renderDentalScreeningAnswers()}</Box>
          </>
        )}

        {selectedCamp === "malnutrition" && (
          <>
            <Typography variant="h5" mb={2}>
              Malnutrition Camp Summary
            </Typography>
            <Box sx={sectionBox}>{renderItems(malnutritionItems)}</Box>

            {malnutritionForm.warningShown && (
              <>
                <Typography variant="h6" mb={2}>
                  Warning Shown In Form
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="warning">
                    Concerning signs detected. Nutrition specialist follow-up is
                    recommended.
                  </Alert>
                </Box>
              </>
            )}
          </>
        )}

        {selectedCamp === "diabetes" && (
          <>
            <Typography variant="h5" mb={2}>
              Diabetes Camp Summary
            </Typography>
            <Box sx={sectionBox}>{renderItems(diabetesItems)}</Box>

            {diabetesForm.warningShown && (
              <>
                <Typography variant="h6" mb={2}>
                  Warning Shown In Form
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="warning">
                    Complication warning shown. Specialist follow-up is
                    recommended.
                  </Alert>
                </Box>
              </>
            )}

            {diabetesForm.criticalAlertShown && (
              <>
                <Typography variant="h6" mb={2}>
                  Critical Alert Shown In Form
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="error">
                    Critical diabetes concern detected. Immediate doctor review
                    is recommended.
                  </Alert>
                </Box>
              </>
            )}
          </>
        )}

        {selectedCamp === "heart" && (
          <>
            <Typography variant="h5" mb={2}>
              Heart Camp Summary
            </Typography>
            <Box sx={sectionBox}>{renderItems(heartItems)}</Box>

            {heartForm.highRiskShown && (
              <>
                <Typography variant="h6" mb={2}>
                  High Risk Alert Shown In Form
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Alert severity="error">
                    High-risk heart symptoms were reported. Urgent doctor review
                    is recommended.
                  </Alert>
                </Box>
              </>
            )}
          </>
        )}

        <Typography mt={3} mb={2} color="text.secondary">
          A confirmation message has been sent to your registered mobile number.
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={greenContainedButton}
          onClick={handleRegisterAnother}
        >
          Register Another Patient
        </Button>
      </Box>
    </Container>
  );
};

export default SummaryPage;
