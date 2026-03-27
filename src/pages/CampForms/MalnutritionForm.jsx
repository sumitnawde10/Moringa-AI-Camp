import React, { useContext, useState } from "react";
import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionCard from "../../components/OptionCard";
import { FormContext } from "../../context/FormContext";

const yesNoOptions = ["Yes", "No"];

const bodyStrengthQuestions = [
  "Do you feel weak or tired most of the time?",
  "Have you lost weight without trying?",
  "Do your clothes feel loose compared to before?",
  "Do you fall sick often?",
  "Do you have hair fall or dry hair?",
  "Do you feel less hungry than before?",
  "Do you have swelling on face or feet?",
];

const eatingHabitQuestions = [
  {
    question: "How many times do you eat in a day?",
    options: ["1 time", "2 times", "3 times", "4 or more"],
  },
  {
    question:
      "Do you skip meals sometimes because food is not available or time is less?",
    options: yesNoOptions,
  },
  {
    question: "Do you eat vegetables or fruits most days?",
    options: yesNoOptions,
  },
  {
    question: "Do you eat milk, dal, eggs, or protein food regularly?",
    options: yesNoOptions,
  },
  {
    question: "Do you drink enough water in a day?",
    options: ["Yes", "No", "Not sure"],
  },
];

const healthConditionQuestions = [
  "Do you have any long-term illness?",
  "Have you been admitted to hospital in the last few months?",
  "Are you taking regular medicines?",
];

const dailyLifeQuestions = [
  "Do you do heavy physical work every day?",
  "Do you sometimes have difficulty buying enough food?",
  "Do you smoke, chew tobacco, or drink alcohol?",
  "Do you get proper sleep at night?",
];

const helpAwarenessQuestions = [
  "Have you ever received food or nutrition advice before?",
  "Would you like simple diet guidance?",
  "Would you like help from a doctor or nutrition worker?",
];

const childFollowUpQuestions = [
  {
    question: "Is the child active or mostly tired?",
    options: ["Active", "Mostly tired"],
  },
  {
    question: "Does the child eat properly every day?",
    options: yesNoOptions,
  },
  {
    question: "Does the child fall sick often?",
    options: yesNoOptions,
  },
  {
    question: "Is the child growing in height and weight?",
    options: ["Yes", "No", "Not sure"],
  },
];

const sectionStyle = (bg, border) => ({
  p: 2,
  borderRadius: 3,
  mb: 2.5,
  backgroundColor: bg,
  border: `1px solid ${border}`,
});

const sectionHeadingStyle = (color) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  color,
  fontWeight: "700",
  fontSize: "1.5rem",
  mb: 1.5,
});

const sectionDotStyle = (gradient) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: gradient,
  flexShrink: 0,
});

const greenContainedButton = {
  py: 1.5,
  borderRadius: "10px",
  fontWeight: "600",
  backgroundColor: "#0daf3e",
  "&:hover": {
    backgroundColor: "#0b8f33",
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

const MalnutritionForm = () => {
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
    setFormData((prev) => ({
      ...prev,
      malnutritionForm: {
        answers,
        warningShown:
          answers["Have you lost weight without trying?"] === "Yes" ||
          answers["Do you have swelling on face or feet?"] === "Yes",
      },
    }));

    navigate("/summary");
  };

  const renderQuestionBlock = (question, options, index, sm = 6) => (
    <Box key={question} mb={2.5}>
      <Typography fontWeight="600" mb={2} fontSize="1.02rem">
        {index}. {question} *
      </Typography>
      <Grid container spacing={2}>
        {options.map((option) => (
          <Grid item xs={12} sm={sm} key={option}>
            <OptionCard
              label={option}
              selected={answers[question] === option}
              onClick={() => handleAnswer(question, option)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const shouldShowConcernWarning =
    answers["Have you lost weight without trying?"] === "Yes" ||
    answers["Do you have swelling on face or feet?"] === "Yes";

  const isChildAssessment = answers["Is this assessment for a child?"] === "Yes";

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
        <Typography variant="h4" fontWeight="700" color="#0ea63b" mb={1}>
          Malnutrition Screening Questionnaire
        </Typography>

        <Typography mb={3} color="text.secondary">
          Please answer the following questions to help us assess your
          nutritional health
        </Typography>

        <Box mb={3}>
          <Box sx={sectionHeadingStyle("#059669")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #86efac, #34d399)")} />
            <Typography fontWeight="700" fontSize="inherit">
              1. Body & Strength
            </Typography>
          </Box>

          <Typography mb={3} color="text.secondary">
            These questions help us understand your physical well-being.
          </Typography>

          {bodyStrengthQuestions.map((question, index) =>
            renderQuestionBlock(question, yesNoOptions, index + 1)
          )}

          {shouldShowConcernWarning && (
            <Alert
              severity="warning"
              sx={{
                mt: 1,
                mb: 1,
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
                WARNING: Concerning Signs Detected
              </Typography>
              <Typography>
                You have reported symptoms that may indicate malnutrition.
                Please consult a healthcare provider or nutrition specialist for
                proper assessment and support.
              </Typography>
            </Alert>
          )}
        </Box>

        <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 3, mb: 3 }}>
          <Box sx={sectionHeadingStyle("#2563eb")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #93c5fd, #2563eb)")} />
            <Typography fontWeight="700" fontSize="inherit">
              2. Eating Habits
            </Typography>
          </Box>

          <Typography mb={3} color="text.secondary">
            Understanding your eating patterns helps us provide better care.
          </Typography>

          {eatingHabitQuestions.map(({ question, options }, index) =>
            renderQuestionBlock(
              question,
              options,
              index + 8,
              options.length === 4 ? 3 : 4
            )
          )}
        </Box>

        <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 3, mb: 3 }}>
          <Box sx={sectionHeadingStyle("#7c3aed")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #c4b5fd, #7c3aed)")} />
            <Typography fontWeight="700" fontSize="inherit">
              3. Health & Special Conditions
            </Typography>
          </Box>

          {healthConditionQuestions.map((question, index) =>
            renderQuestionBlock(question, yesNoOptions, index + 13)
          )}

          <Box sx={sectionStyle("#fdf2f8", "#f9a8d4")}>
            {renderQuestionBlock(
              "(For women) Are you pregnant or breastfeeding?",
              ["Yes", "No", "Not Applicable"],
              16,
              4
            )}
          </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 3, mb: 3 }}>
          <Box sx={sectionHeadingStyle("#ea580c")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #fdba74, #fb7185)")} />
            <Typography fontWeight="700" fontSize="inherit">
              4. Daily Life & Living Conditions
            </Typography>
          </Box>

          {dailyLifeQuestions.map((question, index) =>
            renderQuestionBlock(question, yesNoOptions, index + 17)
          )}
        </Box>

        <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 3, mb: 3 }}>
          <Box sx={sectionHeadingStyle("#0891b2")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #86efac, #67e8f9)")} />
            <Typography fontWeight="700" fontSize="inherit">
              5. Child Questions
            </Typography>
          </Box>

          <Typography mb={3} color="text.secondary">
            If this assessment is for a child, please answer these questions.
          </Typography>

          <Box sx={sectionStyle("#ecfeff", "#67e8f9")}>
            {renderQuestionBlock(
              "Is this assessment for a child?",
              yesNoOptions,
              21
            )}
          </Box>

          {isChildAssessment && (
            <Box>
              {childFollowUpQuestions.map(({ question, options }, index) =>
                renderQuestionBlock(
                  question,
                  options,
                  index + 22,
                  options.length === 2 ? 6 : 4
                )
              )}
            </Box>
          )}
        </Box>

        <Box sx={{ borderTop: "1px solid #e5e7eb", pt: 3, mb: 3 }}>
          <Box sx={sectionHeadingStyle("#4338ca")}>
            <Box sx={sectionDotStyle("linear-gradient(135deg, #93c5fd, #4f46e5)")} />
            <Typography fontWeight="700" fontSize="inherit">
              6. Help & Awareness
            </Typography>
          </Box>

          <Box mb={3}>
            {renderQuestionBlock(helpAwarenessQuestions[0], yesNoOptions, 26)}
          </Box>

          <Box sx={sectionStyle("#f0fdf4", "#86efac")}>
            {renderQuestionBlock(helpAwarenessQuestions[1], yesNoOptions, 27)}
          </Box>

          <Box sx={sectionStyle("#eff6ff", "#93c5fd")}>
            {renderQuestionBlock(helpAwarenessQuestions[2], yesNoOptions, 28)}
          </Box>
        </Box>

        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={greenOutlinedButton}
              onClick={() => navigate("/camp")}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              sx={greenContainedButton}
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

export default MalnutritionForm;
