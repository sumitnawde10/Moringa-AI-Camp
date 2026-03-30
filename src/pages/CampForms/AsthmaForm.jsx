import React, { useContext, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionCard from "../../components/OptionCard";
import { FormContext } from "../../context/FormContext";

const AsthmaForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [urgentCheck, setUrgentCheck] = useState({ q1: "", q2: "", q3: "" });
  const [breathingProblems, setBreathingProblems] = useState({});
  const [pastHealth, setPastHealth] = useState({});
  const [habits, setHabits] = useState({});
  const [family, setFamily] = useState({});

  const showUrgentWarning = Object.values(urgentCheck).some(
    (val) => val === "Yes"
  );

  const sectionStyle = {
    p: 3,
    borderRadius: 3,
    mb: 4,
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
  };

  const dangerBoxStyle = {
    bgcolor: "#fff5f5",
    borderColor: "#feb2b2",
  };

  const greenButtonStyle = {
    py: 1.5,
    borderRadius: "10px",
    fontWeight: "600",
    backgroundColor: "#2e7d32",
    "&:hover": { backgroundColor: "#1b5e20" },
  };

  const handleUpdate = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      asthmaForm: {
        urgentCheck,
        breathingProblems,
        pastHealth,
        habits,
        family,
        urgentWarningShown: showUrgentWarning,
      },
    }));
    navigate("/summary");
  };

  const QuestionRow = ({
    question,
    value,
    onSelect,
    options = ["Yes", "No"],
  }) => (
    <Box sx={{ mb: 3 }}>
      <Typography fontWeight="600" mb={1.5} fontSize="0.95rem">
        {question} *
      </Typography>
      <Grid container spacing={2}>
        {options.map((opt) => (
          <Grid item xs={12} sm={options.length > 2 ? 4 : 6} key={opt}>
            <OptionCard
              label={opt}
              selected={value === opt}
              onClick={() => onSelect(opt)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: "white",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="h4" fontWeight="700" color="#2e7d32" mb={1}>
          Asthma/COPD Questionnaire
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Please answer the following questions about your breathing and
          respiratory health.
        </Typography>

        <Box sx={{ ...sectionStyle, ...dangerBoxStyle }}>
          <Typography variant="h6" color="#c53030" fontWeight="700" mb={1}>
            1. Urgent Check
          </Typography>
          <Typography
            variant="body2"
            color="#c53030"
            fontWeight="600"
            mb={3}
          >
            These questions help us identify if you need immediate medical
            attention.
          </Typography>

          <QuestionRow
            question="Are you finding it hard to breathe right now?"
            value={urgentCheck.q1}
            onSelect={(v) => handleUpdate(setUrgentCheck, "q1", v)}
          />
          <QuestionRow
            question="Did you have a sudden breathing attack today or yesterday?"
            value={urgentCheck.q2}
            onSelect={(v) => handleUpdate(setUrgentCheck, "q2", v)}
          />
          <QuestionRow
            question="Do you wake up at night because you cannot breathe properly?"
            value={urgentCheck.q3}
            onSelect={(v) => handleUpdate(setUrgentCheck, "q3", v)}
          />

          {showUrgentWarning && (
            <Alert severity="error" sx={{ mt: 2, border: "1px solid #ef4444" }}>
              <AlertTitle sx={{ fontWeight: "bold" }}>
                URGENT: Breathing Emergency Detected
              </AlertTitle>
              Please seek immediate medical attention. These symptoms require
              urgent evaluation by a healthcare provider.
            </Alert>
          )}
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>
            2. Breathing & Cough Problems
          </Typography>
          <QuestionRow question="Do you cough often?" value={breathingProblems.q1} onSelect={(v) => handleUpdate(setBreathingProblems, "q1", v)} />
          <QuestionRow question="Do you hear a whistling sound while breathing?" value={breathingProblems.q2} onSelect={(v) => handleUpdate(setBreathingProblems, "q2", v)} />
          <QuestionRow question="Do you feel breathless while walking or climbing steps?" value={breathingProblems.q3} onSelect={(v) => handleUpdate(setBreathingProblems, "q3", v)} />
          <QuestionRow question="Do you feel tightness or heaviness in the chest?" value={breathingProblems.q4} onSelect={(v) => handleUpdate(setBreathingProblems, "q4", v)} />
          <QuestionRow question="Do you cough more at night or early morning?" value={breathingProblems.q5} onSelect={(v) => handleUpdate(setBreathingProblems, "q5", v)} />
          <QuestionRow question="Do you get phlegm or mucus daily?" value={breathingProblems.q6} onSelect={(v) => handleUpdate(setBreathingProblems, "q6", v)} />
          <QuestionRow question="Do dust, smoke, or cold weather make breathing difficult?" value={breathingProblems.q7} onSelect={(v) => handleUpdate(setBreathingProblems, "q7", v)} />
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>
            3. Past Health
          </Typography>
          <QuestionRow question="Has any doctor ever told you that you have asthma or lung problem?" options={["Yes", "No", "Don't know"]} value={pastHealth.q1} onSelect={(v) => handleUpdate(setPastHealth, "q1", v)} />
          <QuestionRow question="Do you use an inhaler or breathing pump?" value={pastHealth.q2} onSelect={(v) => handleUpdate(setPastHealth, "q2", v)} />
          <QuestionRow question="Have you ever been admitted to hospital because of breathing trouble?" value={pastHealth.q3} onSelect={(v) => handleUpdate(setPastHealth, "q3", v)} />
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>
            4. Habits & Surroundings
          </Typography>
          <QuestionRow question="Do you smoke or chew tobacco?" options={["Yes", "No", "Used to, but quit"]} value={habits.q1} onSelect={(v) => handleUpdate(setHabits, "q1", v)} />
          <QuestionRow question="Do you cook using wood or coal smoke at home?" value={habits.q2} onSelect={(v) => handleUpdate(setHabits, "q2", v)} />
          <QuestionRow question="Are you around a lot of dust or smoke at work or home?" value={habits.q3} onSelect={(v) => handleUpdate(setHabits, "q3", v)} />
          <QuestionRow question="Do you do any exercise or walking daily?" options={["Yes", "No", "Sometimes"]} value={habits.q4} onSelect={(v) => handleUpdate(setHabits, "q4", v)} />
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={3}>
            5. Family
          </Typography>
          <QuestionRow question="Does anyone in your family have breathing problems or asthma?" options={["Yes", "No", "Don't know"]} value={family.q1} onSelect={(v) => handleUpdate(setFamily, "q1", v)} />
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/camp")}
              sx={{ py: 1.5, borderRadius: "10px", color: "#666", borderColor: "#ccc" }}
            >
              Back to Camp Selection
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button fullWidth variant="contained" onClick={handleSubmit} sx={greenButtonStyle}>
              Submit Assessment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AsthmaForm;
