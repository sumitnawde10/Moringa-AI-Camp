import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/FormContext";

const moringaGreen = "#2e7d32";
const moringaGreenDark = "#1b5e20";
const moringaGreenLight = "#e8f5e9";

const currentSymptomQuestions = [
  "Do you experience chest pain or discomfort?",
  "Do you feel shortness of breath while walking or climbing stairs?",
  "Do you experience palpitations (fast or irregular heartbeat)?",
  "Do you feel excessive fatigue during routine activities?",
  "Have you had dizziness or fainting episodes?",
  "Do you notice swelling in feet or ankles?",
  "Do you experience left arm, jaw, or back pain?",
];

const medicalHistoryQuestions = [
  "High cholesterol?",
  "Heart disease?",
  "Are you currently taking medication for any of the above?",
  "Have you ever been hospitalized for heart-related problems?",
  "Have you undergone any heart procedure (angioplasty, stent, bypass)?",
];

const familyHistoryQuestions = [
  "Does anyone in your immediate family have heart disease?",
  "Family history of diabetes?",
  "Family history of hypertension?",
  "Family history of sudden cardiac death?",
];

const lifestyleQuestions = [
  {
    question: "Do you smoke or use tobacco?",
    options: ["Never", "Former", "Current"],
  },
  {
    question: "Do you consume alcohol?",
    options: ["Never", "Occasionally", "Regularly"],
  },
  {
    question: "How often do you exercise?",
    options: ["Daily", "Weekly", "Rarely", "Never"],
  },
  {
    question: "Do you follow a healthy diet?",
    options: ["Yes", "No"],
  },
  {
    question: "Do you consume high-salt or fried food frequently?",
    options: ["Yes", "No"],
  },
];

const riskIdentificationQuestions = [
  "Have you had chest pain in the last 7 days?",
  "Do you get breathless at rest?",
  "Any sudden onset of symptoms today?",
];

const awarenessQuestions = [
  {
    question: "Have you had a heart check-up before?",
    options: ["Yes", "No"],
  },
  {
    question: "Are you aware of heart attack warning signs?",
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
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: moringaGreenLight,
  color: moringaGreen,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "1.05rem",
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
  fontSize: "0.98rem",
  justifyContent: "center",
  textTransform: "none",
  minHeight: 48,
  "&:hover": {
    borderColor: moringaGreen,
    backgroundColor: selected ? moringaGreenDark : "#f1f8f4",
  },
});

const HeartForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);
  const [answers, setAnswers] = useState({});
  const [lastTest, setLastTest] = useState("");
  const [medications, setMedications] = useState("");
  const [procedureDetails, setProcedureDetails] = useState("");
  const [tobaccoDuration, setTobaccoDuration] = useState("");

  const handleAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    const highRiskShown = riskIdentificationQuestions.some(
      (question) => answers[question] === "Yes"
    );

    setFormData((prev) => ({
      ...prev,
      heartForm: {
        answers,
        lastTest,
        medications,
        procedureDetails,
        tobaccoDuration,
        highRiskShown,
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

  const renderSection = (number, title, children) => (
    <Box mb={4}>
      <Box sx={sectionHeadingSx}>
        <Box sx={sectionBadgeSx}>{number}</Box>
        <Typography fontSize="1.25rem" fontWeight="600" color="#111827">
          {title}
        </Typography>
      </Box>
      {children}
      {number !== 6 && <Divider sx={{ mt: 2 }} />}
    </Box>
  );

  const showMedicationInput =
    answers["Are you currently taking medication for any of the above?"] ===
    "Yes";
  const showProcedureInput =
    answers[
      "Have you undergone any heart procedure (angioplasty, stent, bypass)?"
    ] === "Yes";
  const showTobaccoDuration =
    answers["Do you smoke or use tobacco?"] === "Former" ||
    answers["Do you smoke or use tobacco?"] === "Current";
  const showHighRiskAlert = riskIdentificationQuestions.some(
    (question) => answers[question] === "Yes"
  );

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
            <FavoriteIcon sx={{ fontSize: 30 }} />
          </Box>
          <Typography variant="h4" fontWeight="700" color={moringaGreen}>
            Heart Questionnaire
          </Typography>
        </Box>

        <Typography mb={3} color="text.secondary">
          Please answer the following questions about your heart health
        </Typography>

        {renderSection(
          1,
          "Current Symptoms",
          currentSymptomQuestions.map((question) =>
            renderQuestion(question, ["Yes", "No"], 2)
          )
        )}

        {renderSection(
          2,
          "Medical History",
          <>
            {medicalHistoryQuestions.map((question) => (
              <Box key={question}>
                {renderQuestion(question, ["Yes", "No"], 2)}

                {question ===
                  "Are you currently taking medication for any of the above?" &&
                  showMedicationInput && (
                    <TextField
                      fullWidth
                      placeholder="Which medications?"
                      value={medications}
                      onChange={(e) => setMedications(e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  )}

                {question ===
                  "Have you undergone any heart procedure (angioplasty, stent, bypass)?" &&
                  showProcedureInput && (
                    <TextField
                      fullWidth
                      placeholder="Which procedure?"
                      value={procedureDetails}
                      onChange={(e) => setProcedureDetails(e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  )}
              </Box>
            ))}
          </>
        )}

        {renderSection(
          3,
          "Family History",
          familyHistoryQuestions.map((question) =>
            renderQuestion(question, ["Yes", "No"], 2)
          )
        )}

        {renderSection(
          4,
          "Lifestyle & Risk Factors",
          <>
            {lifestyleQuestions.map((item) => (
              <Box key={item.question}>
                {renderQuestion(
                  item.question,
                  item.options,
                  item.options.length >= 4 ? 2 : 2
                )}

                {item.question === "Do you smoke or use tobacco?" &&
                  showTobaccoDuration && (
                    <TextField
                      fullWidth
                      placeholder="Duration (in years)"
                      value={tobaccoDuration}
                      onChange={(e) => setTobaccoDuration(e.target.value)}
                      sx={{ mb: 3 }}
                    />
                  )}
              </Box>
            ))}
          </>
        )}

        {renderSection(
          5,
          "Risk Identification",
          <>
            {showHighRiskAlert && (
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
                  High Risk Alert
                </Typography>
                <Typography>
                  Based on your responses, you may need immediate medical
                  attention. Please consult a doctor urgently.
                </Typography>
              </Alert>
            )}

            {riskIdentificationQuestions.map((question) =>
              renderQuestion(question, ["Yes", "No"], 2)
            )}
          </>
        )}

        {renderSection(
          6,
          "Awareness & Preventive Care",
          <>
            {awarenessQuestions.map((item) =>
              renderQuestion(item.question, item.options, 2)
            )}

            <Box mb={3}>
              <Typography
                fontWeight="600"
                fontSize="1rem"
                mb={1.25}
                color="#1f2937"
              >
                When was your last BP or sugar test?
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g., Last month, 6 months ago, Never"
                value={lastTest}
                onChange={(e) => setLastTest(e.target.value)}
              />
            </Box>
          </>
        )}

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
              Back to Departments
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
              Submit Heart Assessment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HeartForm;
