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

const TuberculosisForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [patientType, setPatientType] = useState("");
  const [childDanger, setChildDanger] = useState({});
  const [childSymptoms, setChildSymptoms] = useState({});
  const [childHistory, setChildHistory] = useState({});
  const [childNutrition, setChildNutrition] = useState({});
  const [childImpact, setChildImpact] = useState({});
  const [adultDanger, setAdultDanger] = useState({});
  const [adultSymptoms, setAdultSymptoms] = useState({});
  const [adultHistory, setAdultHistory] = useState({});
  const [adultRisks, setAdultRisks] = useState({});
  const [adultLiving, setAdultLiving] = useState({});
  const [adultImpact, setAdultImpact] = useState({});

  const showChildWarning = Object.values(childDanger).some((val) => val === "Yes");
  const showAdultWarning = Object.values(adultDanger).some((val) => val === "Yes");

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
      tuberculosisForm: {
        patientType,
        data:
          patientType === "Child"
            ? {
                childDanger,
                childSymptoms,
                childHistory,
                childNutrition,
                childImpact,
              }
            : {
                adultDanger,
                adultSymptoms,
                adultHistory,
                adultRisks,
                adultLiving,
                adultImpact,
              },
        urgentWarningShown:
          patientType === "Child" ? showChildWarning : showAdultWarning,
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
          <Grid item xs={12} sm={6} key={opt}>
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

  const UrgentWarning = ({ message }) => (
    <Alert severity="error" sx={{ mb: 4, border: "1px solid #ef4444" }}>
      <AlertTitle sx={{ fontWeight: "bold" }}>
        URGENT: IMMEDIATE REFERRAL REQUIRED
      </AlertTitle>
      {message}
    </Alert>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <Typography variant="h4" fontWeight="700" color="#2e7d32" mb={1}>
          Tuberculosis Screening
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Please select the patient type and answer the questions carefully to assess TB risk.
        </Typography>

        <Box sx={sectionStyle}>
          <QuestionRow
            question="Select Patient Type"
            options={["Child (Questions for Parent/Guardian)", "Adult (16 years and above)"]}
            value={
              patientType === "Child"
                ? "Child (Questions for Parent/Guardian)"
                : patientType === "Adult"
                ? "Adult (16 years and above)"
                : ""
            }
            onSelect={(v) => setPatientType(v.includes("Child") ? "Child" : "Adult")}
          />
        </Box>

        {patientType === "Child" && (
          <Box>
            <Box sx={{ ...sectionStyle, ...dangerBoxStyle }}>
              <Typography variant="h6" color="#c53030" fontWeight="700" mb={1}>
                Child Danger Check (Ask First)
              </Typography>
              <Typography variant="body2" color="#c53030" fontWeight="600" mb={3}>
                If YES to any, refer immediately
              </Typography>
              <QuestionRow question="Is the child having very fast or difficult breathing?" value={childDanger.q1} onSelect={(v) => handleUpdate(setChildDanger, "q1", v)} />
              <QuestionRow question="Has the child been very weak, sleepy, or not eating?" value={childDanger.q2} onSelect={(v) => handleUpdate(setChildDanger, "q2", v)} />
              <QuestionRow question="Has the child had high fever for many days?" value={childDanger.q3} onSelect={(v) => handleUpdate(setChildDanger, "q3", v)} />
              {showChildWarning && (
                <UrgentWarning message="The child shows danger signs and needs immediate medical attention." />
              )}
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Child TB Symptom Screening
              </Typography>
              <QuestionRow question="Has the child been coughing for 2 weeks or more?" value={childSymptoms.q1} onSelect={(v) => handleUpdate(setChildSymptoms, "q1", v)} />
              <QuestionRow question="Does the child have fever that comes daily or mostly at night?" value={childSymptoms.q2} onSelect={(v) => handleUpdate(setChildSymptoms, "q2", v)} />
              <QuestionRow question="Is the child losing weight or not gaining weight?" value={childSymptoms.q3} onSelect={(v) => handleUpdate(setChildSymptoms, "q3", v)} />
              <QuestionRow question="Does the child sweat a lot at night?" value={childSymptoms.q4} onSelect={(v) => handleUpdate(setChildSymptoms, "q4", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                TB Contact History
              </Typography>
              <QuestionRow question="Does anyone at home have TB or long-term cough?" value={childHistory.q1} onSelect={(v) => handleUpdate(setChildHistory, "q1", v)} />
              <QuestionRow question="Has the child lived with someone taking TB medicines?" value={childHistory.q2} onSelect={(v) => handleUpdate(setChildHistory, "q2", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Nutrition & Immunity Check
              </Typography>
              <QuestionRow question="Is the child underweight or weak?" value={childNutrition.q1} onSelect={(v) => handleUpdate(setChildNutrition, "q1", v)} />
              <QuestionRow question="Does the child fall sick again and again?" value={childNutrition.q2} onSelect={(v) => handleUpdate(setChildNutrition, "q2", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Impact Assessment
              </Typography>
              <QuestionRow question="Has this illness affected school or daily play?" value={childImpact.q1} onSelect={(v) => handleUpdate(setChildImpact, "q1", v)} />
            </Box>
          </Box>
        )}

        {patientType === "Adult" && (
          <Box>
            <Box sx={{ ...sectionStyle, ...dangerBoxStyle }}>
              <Typography variant="h6" color="#c53030" fontWeight="700" mb={1}>
                Adult Danger Check (Ask Everyone)
              </Typography>
              <Typography variant="body2" color="#c53030" fontWeight="600" mb={3}>
                If YES to any, refer immediately
              </Typography>
              <QuestionRow question="Are you having severe breathing difficulty?" value={adultDanger.q1} onSelect={(v) => handleUpdate(setAdultDanger, "q1", v)} />
              <QuestionRow question="Have you coughed blood recently?" value={adultDanger.q2} onSelect={(v) => handleUpdate(setAdultDanger, "q2", v)} />
              <QuestionRow question="Are you extremely weak or unable to work?" value={adultDanger.q3} onSelect={(v) => handleUpdate(setAdultDanger, "q3", v)} />
              {showAdultWarning && (
                <UrgentWarning message="You show critical danger signs. Please seek emergency medical help immediately." />
              )}
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Core TB Screening Questions
              </Typography>
              <QuestionRow question="Have you been coughing for 2 weeks or more?" value={adultSymptoms.q1} onSelect={(v) => handleUpdate(setAdultSymptoms, "q1", v)} />
              <QuestionRow question="Do you have fever for many days, especially at night?" value={adultSymptoms.q2} onSelect={(v) => handleUpdate(setAdultSymptoms, "q2", v)} />
              <QuestionRow question="Do you sweat a lot at night?" value={adultSymptoms.q3} onSelect={(v) => handleUpdate(setAdultSymptoms, "q3", v)} />
              <QuestionRow question="Have you lost weight or appetite?" value={adultSymptoms.q4} onSelect={(v) => handleUpdate(setAdultSymptoms, "q4", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                TB Transmission & History
              </Typography>
              <QuestionRow question="Has anyone in your house had TB?" value={adultHistory.q1} onSelect={(v) => handleUpdate(setAdultHistory, "q1", v)} />
              <QuestionRow question="Have you taken TB medicines before?" value={adultHistory.q2} onSelect={(v) => handleUpdate(setAdultHistory, "q2", v)} />
              <QuestionRow question="Did you stop TB medicines early at any time?" value={adultHistory.q3} onSelect={(v) => handleUpdate(setAdultHistory, "q3", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Risk Factor Screening
              </Typography>
              <QuestionRow question="Do you have diabetes (sugar)?" value={adultRisks.q1} onSelect={(v) => handleUpdate(setAdultRisks, "q1", v)} />
              <QuestionRow question="Do you smoke or chew tobacco?" value={adultRisks.q2} onSelect={(v) => handleUpdate(setAdultRisks, "q2", v)} />
              <QuestionRow question="Do you drink alcohol daily?" value={adultRisks.q3} onSelect={(v) => handleUpdate(setAdultRisks, "q3", v)} />
              <QuestionRow question="Do you have HIV or weak immunity?" value={adultRisks.q4} onSelect={(v) => handleUpdate(setAdultRisks, "q4", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Work & Living Conditions
              </Typography>
              <QuestionRow question="Do you live in a crowded house?" value={adultLiving.q1} onSelect={(v) => handleUpdate(setAdultLiving, "q1", v)} />
              <QuestionRow question="Do you work in mines, factories, or dusty places?" value={adultLiving.q2} onSelect={(v) => handleUpdate(setAdultLiving, "q2", v)} />
            </Box>

            <Box sx={sectionStyle}>
              <Typography variant="h6" fontWeight="700" mb={3}>
                Quality of Life Assessment
              </Typography>
              <QuestionRow question="Is this illness affecting your work or daily life?" value={adultImpact.q1} onSelect={(v) => handleUpdate(setAdultImpact, "q1", v)} />
            </Box>
          </Box>
        )}

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" onClick={() => navigate("/camp")} sx={{ py: 1.5, borderRadius: "10px", color: "#666", borderColor: "#ccc" }}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button fullWidth variant="contained" onClick={handleSubmit} disabled={!patientType} sx={greenButtonStyle}>
              Submit Tuberculosis Screening
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TuberculosisForm;
