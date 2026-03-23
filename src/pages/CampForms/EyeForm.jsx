import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/FormContext";
import OptionCard from "../../components/OptionCard";

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

const mainProblemOptions = [
  "Cannot see far clearly",
  "Cannot see near / while reading",
  "Eye pain or redness",
  "Watering or itching",
  "No problem, just check-up",
  "Other",
];

const visionDetailQuestions = [
  {
    question: "Is the problem in one eye or both eyes?",
    options: ["Right eye only", "Left eye only", "Both eyes"],
    style: ["#eef2ff", "#b6c3ff"],
  },
  {
    question: "Did this problem start suddenly or slowly?",
    options: ["Suddenly (within hours/days)", "Slowly (over weeks/months/years)"],
    style: ["#ecfeff", "#99f6e4"],
  },
  {
    question: "Is vision getting worse with time?",
    options: ["Yes", "No", "Not sure"],
    style: ["#fdf2f8", "#f9a8d4"],
  },
];

const EyeForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [patientType, setPatientType] = useState("");

  const [answers, setAnswers] = useState({});
  const [mainProblem, setMainProblem] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleSelect = (q, val) => {
    setAnswers({ ...answers, [q]: val });
  };

  const handleMainProblemChange = (value) => {
    setMainProblem(value);

    if (value !== "Other") {
      setOtherText("");
    }

    if (value === "No problem, just check-up") {
      setAnswers((prev) => {
        const updatedAnswers = { ...prev };

        visionDetailQuestions.forEach(({ question }) => {
          delete updatedAnswers[question];
        });

        return updatedAnswers;
      });
    }
  };

  const handleNext = () => {
    setFormData((prev) => ({
      ...prev,
      eyeForm: { patientType, answers, mainProblem, otherText },
    }));
    // alert("Eye Form Saved ✅");
    navigate("/summary");
  };

  const sectionStyle = (bg, border) => ({
    p: 2,
    borderRadius: 2,
    mb: 3,
    backgroundColor: bg,
    border: `1px solid ${border}`,
  });

  const showChildEmergencyAlert =
    patientType === "Child" &&
    childEmergencyQuestions.some((question) => answers[question] === "Yes");

  const showAdultEmergencyAlert =
    patientType === "Adult" &&
    adultEmergencyQuestions.some((question) => answers[question] === "Yes");

  const showVisionDetailQuestions =
    !!mainProblem && mainProblem !== "No problem, just check-up";

  const greenContainedButton = {
    py: 1.5,
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor: "#2e7d32",
    "&:hover": {
      backgroundColor: "#1b5e20",
    },
  };

  const greenOutlinedButton = {
    py: 1.5,
    borderRadius: "10px",
    fontWeight: "600",
    borderColor: "#2e7d32",
    color: "#2e7d32",
    "&:hover": {
      borderColor: "#1b5e20",
      backgroundColor: "#e8f5e9",
    },
  };

  const renderVisionDetailQuestions = (sectionNumber) => (
    <>
      <Typography fontWeight="600" mt={2}>
        {sectionNumber}. Vision Detail Questions
      </Typography>

      {visionDetailQuestions.map(({ question, options, style }) => (
        <Box sx={sectionStyle(style[0], style[1])} key={question}>
          <Typography mb={1}>{question} *</Typography>
          <Grid container spacing={2}>
            {options.map((opt) => (
              <Grid item xs={12} sm={12 / options.length} key={opt}>
                <OptionCard
                  label={opt}
                  selected={answers[question] === opt}
                  onClick={() => handleSelect(question, opt)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </>
  );

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h4" fontWeight="600" color="#2e7d32" mb={2}>
          Eye Questionnaire
        </Typography>

        {/* 1 Patient Type */}
        <Typography fontWeight="600">1. Patient Type *</Typography>

        <Grid container spacing={2} mb={3}>
          {["Child", "Adult"].map((type) => (
            <Grid item xs={6} key={type}>
              <OptionCard
                label={
                  type === "Child"
                    ? "Child (Below 16 years)"
                    : "Adult (16+ years)"
                }
                selected={patientType === type}
                onClick={() => setPatientType(type)}
              />
            </Grid>
          ))}
        </Grid>

        {/* ================= CHILD ================= */}
        {patientType === "Child" && (
          <>
            {showChildEmergencyAlert && (
              <Box sx={sectionStyle("#fff5f5", "#ff4d4f")}>
                <Typography color="error" fontWeight="700" mb={1}>
                  EMERGENCY DETECTED
                </Typography>
                <Typography color="error" fontWeight="600" mb={1}>
                  This patient requires immediate medical attention!
                </Typography>
                <Typography color="error">
                  Please prioritize this case and refer to an ophthalmologist
                  or emergency department immediately.
                </Typography>
              </Box>
            )}

            {/* 2 Emergency */}
            <Box sx={sectionStyle("#ffecec", "#ffb3b3")}>
              <Typography color="error" fontWeight="600">
                2. Emergency Check (Child)
              </Typography>

              {childEmergencyQuestions.map((q) => (
                <Box key={q} mb={2}>
                  <Typography mb={1}>{q} *</Typography>
                  <Grid container spacing={2}>
                    {["Yes", "No"].map((opt) => (
                      <Grid item xs={6} key={opt}>
                        <OptionCard
                          label={opt}
                          selected={answers[q] === opt}
                          onClick={() => handleSelect(q, opt)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>

            {/* 3 Vision */}
            <Typography fontWeight="600">3. Vision Behavior Questions</Typography>

            {[
              "Does the child sit very close to the TV?",
              "Does the child hold books very close while reading?",
              "Does the child squint or close one eye to see?",
              "Does the child complain of headache after school?",
            ].map((q) => (
              <Box sx={sectionStyle("#e8f1ff", "#90caf9")} key={q}>
                <Typography mb={1}>{q} *</Typography>
                <Grid container spacing={2}>
                  {["Yes", "No", "Sometimes"].map((opt) => (
                    <Grid item xs={4} key={opt}>
                      <OptionCard
                        label={opt}
                        selected={answers[q] === opt}
                        onClick={() => handleSelect(q, opt)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {/* 4 Eye Problem */}
            <Typography fontWeight="600">4. Eye Problem Check</Typography>

            {[
              "Are the child's eyes often red or watery?",
              "Is there yellow or sticky discharge from the eyes?",
              "Are the eyelids swollen?",
            ].map((q) => (
              <Box sx={sectionStyle("#fff4e5", "#ffcc80")} key={q}>
                <Typography mb={1}>{q} *</Typography>
                <Grid container spacing={2}>
                  {["Yes", "No", "Sometimes"].map((opt) => (
                    <Grid item xs={4} key={opt}>
                      <OptionCard
                        label={opt}
                        selected={answers[q] === opt}
                        onClick={() => handleSelect(q, opt)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}

            {/* 5 Nutrition */}
            <Box sx={sectionStyle("#fffde7", "#fdd835")}>
              <Typography fontWeight="600">
                5. Nutrition & Night Vision
              </Typography>

              {[
                "Does the child have difficulty seeing at night?",
                "Does the child get frequent eye infections?",
                "Does the child eat few fruits or vegetables?",
              ].map((q) => (
                <Box key={q} mb={2}>
                  <Typography mb={1}>{q} *</Typography>
                  <Grid container spacing={2}>
                    {["Yes", "No", "Not Sure"].map((opt) => (
                      <Grid item xs={4} key={opt}>
                        <OptionCard
                          label={opt}
                          selected={answers[q] === opt}
                          onClick={() => handleSelect(q, opt)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>

            {/* 6 Main Problem */}
            <Typography fontWeight="600">6. Main Eye Problem</Typography>

            {mainProblemOptions.map((item) => (
              <Box key={item} mb={1}>
                <OptionCard
                  label={item}
                  selected={mainProblem === item}
                  onClick={() => handleMainProblemChange(item)}
                />
              </Box>
            ))}

            {mainProblem === "Other" && (
              <TextField
                fullWidth
                placeholder="Please specify"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                sx={{ mt: 1 }}
              />
            )}

            {showVisionDetailQuestions && renderVisionDetailQuestions(7)}
          </>
        )}

        {/* ================= ADULT ================= */}
        {patientType === "Adult" && (
          <>
            {showAdultEmergencyAlert && (
              <Box sx={sectionStyle("#fff5f5", "#ff4d4f")}>
                <Typography color="error" fontWeight="700" mb={1}>
                  EMERGENCY DETECTED
                </Typography>
                <Typography color="error" fontWeight="600" mb={1}>
                  This patient requires immediate medical attention!
                </Typography>
                <Typography color="error">
                  Please prioritize this case and refer to an ophthalmologist
                  or emergency department immediately.
                </Typography>
              </Box>
            )}

            {/* Emergency */}
            <Box sx={sectionStyle("#ffecec", "#ffb3b3")}>
              <Typography color="error" fontWeight="600">
                2. Emergency Check (Adult)
              </Typography>

              {adultEmergencyQuestions.map((q) => (
                <Box key={q} mb={2}>
                  <Typography mb={1}>{q} *</Typography>
                  <Grid container spacing={2}>
                    {["Yes", "No"].map((opt) => (
                      <Grid item xs={6} key={opt}>
                        <OptionCard
                          label={opt}
                          selected={answers[q] === opt}
                          onClick={() => handleSelect(q, opt)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>

            {/* Main Problem */}
            <Typography fontWeight="600">3. Main Eye Problem</Typography>

            {mainProblemOptions.map((item) => (
              <Box key={item} mb={1}>
                <OptionCard
                  label={item}
                  selected={mainProblem === item}
                  onClick={() => handleMainProblemChange(item)}
                />
              </Box>
            ))}

            {mainProblem === "Other" && (
              <TextField
                fullWidth
                placeholder="Please specify"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                sx={{ mt: 1, mb: 2 }}
              />
            )}

            {showVisionDetailQuestions && renderVisionDetailQuestions(4)}

            {/* Age Questions */}
            <Typography fontWeight="600" mt={2}>
              5. Age-Related Questions
            </Typography>

            {[
              "Do you have difficulty reading small letters?",
              "Is your vision becoming cloudy or dull?",
            ].map((q) => (
              <Box sx={sectionStyle("#f5f5f5", "#ccc")} key={q}>
                <Typography mb={1}>{q}</Typography>
                <Grid container spacing={2}>
                  {["Yes", "No", "Sometimes"].map((opt) => (
                    <Grid item xs={4} key={opt}>
                      <OptionCard
                        label={opt}
                        selected={answers[q] === opt}
                        onClick={() => handleSelect(q, opt)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </>
        )}

        {/* Buttons */}
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={greenOutlinedButton}
              onClick={() => navigate("/camp")}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={greenContainedButton}
              onClick={handleNext}
            >
              Complete Eye Assessment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EyeForm;
