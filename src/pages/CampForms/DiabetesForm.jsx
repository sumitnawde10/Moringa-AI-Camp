import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/FormContext";

const moringaGreen = "#2e7d32";
const moringaGreenDark = "#1b5e20";
const moringaGreenLight = "#e8f5e9";

const highSugarQuestion = "Have you ever been told that your blood sugar might be high?";
const checkedSugarQuestion = "Have you ever checked your blood sugar before?";
const diagnosedQuestion = "Have you been officially diagnosed with diabetes?";
const hospitalizedQuestion =
  "Have you ever been hospitalized due to sugar-related issues?";

const earlyRiskQuestions = [
  {
    question: "Have you ever been told that your blood sugar might be high?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    question:
      "Do you feel unusually thirsty even after drinking enough water?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Do you urinate more frequently than usual, especially at night?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Do you feel tired or weak most days without heavy physical work?",
    options: ["Yes", "No"],
  },
  {
    question: "Have you noticed unexplained weight change in the past year?",
    options: ["Weight loss", "Weight gain", "No change"],
  },
];

const metabolicSignalQuestions = [
  "Do you feel hungry again very soon after meals?",
  "Do you feel sleepy, heavy, or uncomfortable after eating?",
  "Do small cuts or wounds take longer than usual to heal?",
  "Do you experience frequent skin itching or infections?",
  "Do you feel weakness or dizziness if meals are delayed?",
];

const medicalFamilyQuestions = [
  {
    question: checkedSugarQuestion,
    options: ["Yes", "No"],
  },
  {
    question: "Is there a family history of diabetes?",
    options: ["Parents", "Siblings", "Both", "None"],
  },
  {
    question:
      "Were you ever advised diet or lifestyle changes by a doctor?",
    options: ["Yes", "No"],
  },
];

const diagnosisQuestions = [
  {
    question: diagnosedQuestion,
    options: ["Yes", "No"],
  },
];

const complicationQuestions = [
  "Do you feel tingling, numbness, or burning in your feet?",
  "Has your eyesight reduced gradually over time?",
  "Do your feet or ankles swell by the end of the day?",
  "Do you get frequent urinary or gum infections?",
  "Have you ever been hospitalized due to sugar-related issues?",
];

const lifestyleQuestions = [
  {
    question: "How physically active are you during the day?",
    options: ["Mostly sitting", "Moderate activity", "Active"],
  },
  {
    question: "How often do you consume sweets or sugary drinks?",
    options: ["Daily", "Occasionally", "Rarely"],
  },
  {
    question: "Do you use tobacco in any form?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you consume alcohol?",
    options: ["Regular", "Occasional", "No"],
  },
  {
    question: "Do you attend regular health check-ups?",
    options: ["Yes", "No"],
  },
  {
    question:
      "Would you like digital reminders and follow-ups for diabetes care?",
    options: ["Yes", "No"],
  },
];

const sectionHeadingSx = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  mb: 2,
};

const sectionBadgeSx = {
  width: 38,
  height: 38,
  borderRadius: "50%",
  backgroundColor: moringaGreenLight,
  color: moringaGreen,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "1rem",
  flexShrink: 0,
};

const choiceCardSx = (selected) => ({
  py: 1.2,
  px: 1.5,
  borderRadius: 2,
  border: selected ? `2px solid ${moringaGreen}` : "1px solid #dcdcdc",
  backgroundColor: selected ? moringaGreen : "#fff",
  color: selected ? "#fff" : "#1f2937",
  fontWeight: "500",
  fontSize: "0.95rem",
  justifyContent: "center",
  textTransform: "none",
  minHeight: 48,
  "&:hover": {
    borderColor: moringaGreen,
    backgroundColor: selected ? moringaGreenDark : "#f1f8f4",
  },
});

const DiabetesForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    const earlyRiskYesCount = [
      highSugarQuestion,
      "Do you feel unusually thirsty even after drinking enough water?",
      "Do you urinate more frequently than usual, especially at night?",
      "Do you feel tired or weak most days without heavy physical work?",
    ].filter((question) => answers[question] === "Yes").length;

    setFormData((prev) => ({
      ...prev,
      diabetesForm: {
        answers,
        warningShown: earlyRiskYesCount >= 2,
        criticalAlertShown: answers[hospitalizedQuestion] === "Yes",
      },
    }));
    navigate("/summary");
  };

  const renderQuestion = (question, options, sm = 2) => (
    <Box key={question} mb={3}>
      <Typography fontWeight="600" fontSize="1rem" mb={1.25} color="#1f2937">
        {question}
      </Typography>
      <Grid container spacing={1.25}>
        {options.map((option) => (
          <Grid item xs={12} sm={sm} key={option}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => handleAnswer(question, option)}
              sx={choiceCardSx(answers[question] === option)}
            >
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderSection = (number, title, questions, smResolver) => (
    <Box mb={4}>
      <Box sx={sectionHeadingSx}>
        <Box sx={sectionBadgeSx}>{number}</Box>
        <Typography fontSize="1.25rem" fontWeight="600" color="#111827">
          {title}
        </Typography>
      </Box>
      {questions.map((item) =>
        renderQuestion(
          item.question,
          item.options,
          smResolver ? smResolver(item) : item.options.length >= 4 ? 3 : 2
        )
      )}
      {number !== 6 && <Divider sx={{ mt: 2 }} />}
    </Box>
  );

  const earlyRiskYesCount = [
    highSugarQuestion,
    "Do you feel unusually thirsty even after drinking enough water?",
    "Do you urinate more frequently than usual, especially at night?",
    "Do you feel tired or weak most days without heavy physical work?",
  ].filter((question) => answers[question] === "Yes").length;

  const showComplicationWarning = earlyRiskYesCount >= 2;
  const showHighReadingQuestion = answers[checkedSugarQuestion] === "Yes";
  const showDiagnosisSubQuestions = answers[diagnosedQuestion] === "Yes";
  const showCriticalAlert = answers[hospitalizedQuestion] === "Yes";

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          p: 3.5,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: moringaGreen,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <OpacityIcon sx={{ fontSize: 30 }} />
          </Box>
          <Typography variant="h4" fontWeight="700" color={moringaGreen}>
            Diabetes Questionnaire
          </Typography>
        </Box>

        <Typography mb={3} color="text.secondary">
          Please answer the following questions about diabetes risk and
          management
        </Typography>

        {showComplicationWarning && (
          <Alert
            severity="warning"
            sx={{
              mb: 3,
              alignItems: "flex-start",
              borderLeft: "4px solid #ea580c",
              backgroundColor: "#fff7ed",
              color: "#9a3412",
              "& .MuiAlert-icon": {
                color: "#ea580c",
                mt: 0.2,
              },
            }}
          >
            <Typography fontWeight="700" mb={0.5}>
              Complication Warning
            </Typography>
            <Typography>
              Multiple diabetes complications detected. Please schedule a
              comprehensive check-up with a specialist soon.
            </Typography>
          </Alert>
        )}

        {renderSection(1, "Early Risk & Awareness", earlyRiskQuestions, (item) =>
          item.options.length === 3 ? 2 : 2
        )}

        {renderSection(
          2,
          "Body Response & Metabolic Signals",
          metabolicSignalQuestions.map((question) => ({
            question,
            options: ["Yes", "No"],
          }))
        )}

        <Box mb={4}>
          <Box sx={sectionHeadingSx}>
            <Box sx={sectionBadgeSx}>3</Box>
            <Typography fontSize="1.25rem" fontWeight="600" color="#111827">
              Medical & Family Context
            </Typography>
          </Box>
          {medicalFamilyQuestions.map((item) =>
            renderQuestion(
              item.question,
              item.options,
              item.options.length >= 4 ? 3 : 2
            )
          )}
          {showHighReadingQuestion &&
            renderQuestion(
              "If yes, were the readings ever high?",
              ["Yes", "No", "Don't remember"],
              2
            )}
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box mb={4}>
          <Box sx={sectionHeadingSx}>
            <Box sx={sectionBadgeSx}>4</Box>
            <Typography fontSize="1.25rem" fontWeight="600" color="#111827">
              Diagnosis & Control (If Known)
            </Typography>
          </Box>
          {diagnosisQuestions.map((item) =>
            renderQuestion(item.question, item.options, 2)
          )}
          {showDiagnosisSubQuestions && (
            <>
              {renderQuestion(
                "How long ago were you diagnosed?",
                ["<1 year", "1-5 years", ">5 years"],
                2
              )}
              {renderQuestion(
                "Are you currently on any diabetes medication?",
                ["Yes", "No"],
                2
              )}
            </>
          )}
          <Divider sx={{ mt: 2 }} />
        </Box>

        <Box mb={4}>
          <Box sx={sectionHeadingSx}>
            <Box sx={sectionBadgeSx}>5</Box>
            <Typography fontSize="1.25rem" fontWeight="600" color="#111827">
              Complication Warning Signs
            </Typography>
          </Box>

          {showCriticalAlert && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                alignItems: "flex-start",
                borderLeft: "4px solid #dc2626",
                backgroundColor: "#fef2f2",
                color: "#b91c1c",
                "& .MuiAlert-icon": {
                  color: "#dc2626",
                  mt: 0.2,
                },
              }}
            >
              <Typography fontWeight="700" mb={0.5}>
                Critical Alert
              </Typography>
              <Typography>
                Your responses indicate serious diabetes management concerns.
                Please consult a doctor immediately and ensure regular
                medication compliance.
              </Typography>
            </Alert>
          )}

          {complicationQuestions.map((question) =>
            renderQuestion(question, ["Yes", "No"], 2)
          )}
          <Divider sx={{ mt: 2 }} />
        </Box>

        {renderSection(6, "Lifestyle & Future Risk", lifestyleQuestions)}

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                py: 1.4,
                borderRadius: "10px",
                fontWeight: "600",
                borderColor: moringaGreen,
                color: moringaGreen,
                "&:hover": {
                  borderColor: moringaGreenDark,
                  backgroundColor: moringaGreenLight,
                },
              }}
              onClick={() => navigate("/camp")}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                py: 1.4,
                borderRadius: "10px",
                fontWeight: "700",
                backgroundColor: moringaGreen,
                "&:hover": {
                  backgroundColor: moringaGreenDark,
                },
              }}
              onClick={handleSubmit}
            >
              Submit Assessment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DiabetesForm;
