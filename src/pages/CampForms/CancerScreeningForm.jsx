import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionCard from "../../components/OptionCard";
import { FormContext } from "../../context/FormContext";

const CancerScreeningForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [generalSigns, setGeneralSigns] = useState({});
  const [unusualChanges, setUnusualChanges] = useState({});
  const [digestiveSymptoms, setDigestiveSymptoms] = useState({});
  const [chestSymptoms, setChestSymptoms] = useState({});
  const [familyHistory, setFamilyHistory] = useState("");
  const [pastHistory, setPastHistory] = useState({});
  const [lifestyle, setLifestyle] = useState({});
  const [gender, setGender] = useState("");
  const [genderSpecificAnswers, setGenderSpecificAnswers] = useState({});

  const sectionStyle = (bg, border) => ({
    p: 3,
    borderRadius: 3,
    mb: 4,
    backgroundColor: bg,
    border: `1px solid ${border}`,
  });

  const yellowHighlightBox = {
    bgcolor: "#ffffff",
    p: 2,
    borderRadius: 2,
    border: "1px solid #fde68a",
    mb: 2,
  };

  const highlightedBoxStyle = {
    bgcolor: "white",
    p: 2,
    borderRadius: 2,
    border: "1px solid #fdba74",
    mb: 3,
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
      cancerForm: {
        generalSigns,
        unusualChanges,
        digestiveSymptoms,
        chestSymptoms,
        familyHistory,
        pastHistory,
        lifestyle,
        gender,
        genderSpecificAnswers,
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

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <Typography variant="h4" fontWeight="700" color="#2e7d32" mb={1}>
          Cancer Screening Questionnaire
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Please answer the following questions to help us assess your cancer risk and screening needs.
        </Typography>

        <Box sx={sectionStyle("#f0fdfa", "#99f6e4")}>
          <Typography variant="h6" color="#134e4a" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#2dd4bf", borderRadius: "50%", mr: 1.5 }} />
            1. General Warning Signs
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            These symptoms may indicate various health conditions including cancer.
          </Typography>
          <QuestionRow question="Have you experienced unexplained weight loss recently?" value={generalSigns.q1} onSelect={(v) => handleUpdate(setGeneralSigns, "q1", v)} />
          <QuestionRow question="Do you feel persistent tiredness or weakness without clear reason?" value={generalSigns.q2} onSelect={(v) => handleUpdate(setGeneralSigns, "q2", v)} />
          <QuestionRow question="Have you had fever that comes and goes for many weeks?" value={generalSigns.q3} onSelect={(v) => handleUpdate(setGeneralSigns, "q3", v)} />
          <QuestionRow question="Have you noticed a decrease in appetite?" value={generalSigns.q4} onSelect={(v) => handleUpdate(setGeneralSigns, "q4", v)} />
          <QuestionRow question="Do you have pain that does not improve with usual treatment?" value={generalSigns.q5} onSelect={(v) => handleUpdate(setGeneralSigns, "q5", v)} />
        </Box>

        <Box sx={sectionStyle("#fffbeb", "#fef3c7")}>
          <Typography variant="h6" color="#92400e" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#fbbf24", borderRadius: "50%", mr: 1.5 }} />
            2. Unusual Body Changes
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Physical changes that persist should be evaluated by a doctor.
          </Typography>
          <Box sx={yellowHighlightBox}>
            <QuestionRow question="Have you noticed any lump, swelling, or thickening anywhere on your body?" value={unusualChanges.q6} onSelect={(v) => handleUpdate(setUnusualChanges, "q6", v)} />
          </Box>
          <Box sx={yellowHighlightBox}>
            <QuestionRow question="Has any wound, ulcer, or sore not healed for a long time?" value={unusualChanges.q7} onSelect={(v) => handleUpdate(setUnusualChanges, "q7", v)} />
          </Box>
          <Box sx={yellowHighlightBox}>
            <QuestionRow question="Have you noticed unusual bleeding or discharge from any part of the body?" value={unusualChanges.q8} onSelect={(v) => handleUpdate(setUnusualChanges, "q8", v)} />
          </Box>
          <QuestionRow question="Have you seen changes in skin color, moles, or patches that are growing or changing?" value={unusualChanges.q9} onSelect={(v) => handleUpdate(setUnusualChanges, "q9", v)} />
          <QuestionRow question="Have you experienced persistent cough or change in voice?" value={unusualChanges.q10} onSelect={(v) => handleUpdate(setUnusualChanges, "q10", v)} />
        </Box>

        <Box sx={sectionStyle("#fff7ed", "#fed7aa")}>
          <Typography variant="h6" color="#9a3412" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#f97316", borderRadius: "50%", mr: 1.5 }} />
            3. Digestive & Urinary Symptoms
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Persistent digestive or urinary issues need medical attention.
          </Typography>
          <QuestionRow question="Have you had long-term indigestion or difficulty swallowing?" value={digestiveSymptoms.q11} onSelect={(v) => handleUpdate(setDigestiveSymptoms, "q11", v)} />
          <QuestionRow question="Have your bowel habits changed for a long time (constipation/diarrhea)?" value={digestiveSymptoms.q12} onSelect={(v) => handleUpdate(setDigestiveSymptoms, "q12", v)} />
          <Box sx={highlightedBoxStyle}>
            <QuestionRow question="Have you noticed blood in stool or black-colored stools?" value={digestiveSymptoms.q13} onSelect={(v) => handleUpdate(setDigestiveSymptoms, "q13", v)} />
          </Box>
          <Box sx={highlightedBoxStyle}>
            <QuestionRow question="Have you noticed blood in urine or difficulty in passing urine?" value={digestiveSymptoms.q14} onSelect={(v) => handleUpdate(setDigestiveSymptoms, "q14", v)} />
          </Box>
          <QuestionRow question="Do you experience persistent abdominal bloating or discomfort?" value={digestiveSymptoms.q15} onSelect={(v) => handleUpdate(setDigestiveSymptoms, "q15", v)} />
        </Box>

        <Box sx={sectionStyle("#eff6ff", "#bfdbfe")}>
          <Typography variant="h6" color="#1e40af" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#3b82f6", borderRadius: "50%", mr: 1.5 }} />
            4. Chest, Breathing & Systemic Symptoms
          </Typography>
          <QuestionRow question="Do you experience breathlessness or chest discomfort frequently?" value={chestSymptoms.q16} onSelect={(v) => handleUpdate(setChestSymptoms, "q16", v)} />
          <QuestionRow question="Do you have chest pain that is not related to exertion?" value={chestSymptoms.q17} onSelect={(v) => handleUpdate(setChestSymptoms, "q17", v)} />
          <QuestionRow question="Have you noticed frequent respiratory infections or prolonged cough?" value={chestSymptoms.q18} onSelect={(v) => handleUpdate(setChestSymptoms, "q18", v)} />
        </Box>

        <Box sx={sectionStyle("#faf5ff", "#e9d5ff")}>
          <Typography variant="h6" color="#581c87" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#a855f7", borderRadius: "50%", mr: 1.5 }} />
            5. Family & Past Medical History
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Family history and past medical history help assess your risk.
          </Typography>
          <QuestionRow question="Is there a history of cancer in your family?" options={["Parents", "Siblings", "Extended family", "None"]} value={familyHistory} onSelect={setFamilyHistory} />
          <QuestionRow question="Have you ever been diagnosed with cancer earlier?" value={pastHistory.q20} onSelect={(v) => handleUpdate(setPastHistory, "q20", v)} />
          <QuestionRow question="Have you undergone any cancer screening tests before?" value={pastHistory.q21} onSelect={(v) => handleUpdate(setPastHistory, "q21", v)} />
          <QuestionRow question="Have you ever received radiation therapy or chemotherapy in the past?" value={pastHistory.q22} onSelect={(v) => handleUpdate(setPastHistory, "q22", v)} />
        </Box>

        <Box sx={sectionStyle("#fef2f2", "#fecaca")}>
          <Typography variant="h6" color="#991b1b" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#ef4444", borderRadius: "50%", mr: 1.5 }} />
            6. Lifestyle & Exposure Risks
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            These factors can increase cancer risk.
          </Typography>
          <QuestionRow question="Do you smoke or chew tobacco in any form?" value={lifestyle.q23} onSelect={(v) => handleUpdate(setLifestyle, "q23", v)} />
          <QuestionRow question="Do you consume alcohol regularly?" value={lifestyle.q24} onSelect={(v) => handleUpdate(setLifestyle, "q24", v)} />
          <QuestionRow question="Have you been exposed to chemicals, dust, or fumes at your workplace?" value={lifestyle.q25} onSelect={(v) => handleUpdate(setLifestyle, "q25", v)} />
          <QuestionRow question="Are you frequently exposed to second-hand smoke?" value={lifestyle.q26} onSelect={(v) => handleUpdate(setLifestyle, "q26", v)} />
        </Box>

        <Box sx={sectionStyle("#eff6ff", "#bfdbfe")}>
          <Typography variant="h6" color="#1e40af" fontWeight="700" mb={1} display="flex" alignItems="center">
            <Box sx={{ width: 12, height: 12, bgcolor: "#3b82f6", borderRadius: "50%", mr: 1.5 }} />
            7. Gender-Specific General Screening
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please select your gender and answer the relevant questions.
          </Typography>
          <QuestionRow question="Select your gender:" options={["Female", "Male"]} value={gender} onSelect={setGender} />
          {gender === "Male" && (
            <Box sx={{ mt: 2, p: 3, borderRadius: 2, bgcolor: "#f0f7ff", border: "1px solid #cce3ff" }}>
              <Typography variant="h6" color="#1e40af" fontWeight="700" mb={3}>
                For Men
              </Typography>
              <QuestionRow question="Do you have difficulty or pain during urination?" value={genderSpecificAnswers.q29} onSelect={(v) => handleUpdate(setGenderSpecificAnswers, "q29", v)} />
              <QuestionRow question="Have you noticed swelling or pain in the testicular area?" value={genderSpecificAnswers.q30} onSelect={(v) => handleUpdate(setGenderSpecificAnswers, "q30", v)} />
            </Box>
          )}
          {gender === "Female" && (
            <Box sx={{ mt: 2, p: 3, borderRadius: 2, bgcolor: "#fdf2f8", border: "1px solid #fbcfe8" }}>
              <Typography variant="h6" color="#9d174d" fontWeight="700" mb={3}>
                For Women
              </Typography>
              <QuestionRow question="Have you noticed any lumps or changes in your breasts?" value={genderSpecificAnswers.q27} onSelect={(v) => handleUpdate(setGenderSpecificAnswers, "q27", v)} />
              <QuestionRow question="Do you experience unusual vaginal bleeding or discharge?" value={genderSpecificAnswers.q28} onSelect={(v) => handleUpdate(setGenderSpecificAnswers, "q28", v)} />
            </Box>
          )}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" onClick={() => navigate("/camp")} sx={{ py: 1.5, borderRadius: "10px", color: "#666", borderColor: "#ccc" }}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button fullWidth variant="contained" onClick={handleSubmit} sx={greenButtonStyle}>
              Submit Cancer Screening
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CancerScreeningForm;
