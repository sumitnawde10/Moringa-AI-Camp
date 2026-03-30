import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../context/FormContext";

const OrthopaedicForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [problems, setProblems] = useState([]);
  const [otherProblem, setOtherProblem] = useState("");
  const [duration, setDuration] = useState("");
  const [onset, setOnset] = useState("");
  const [severity, setSeverity] = useState("");
  const [painIncreases, setPainIncreases] = useState([]);
  const [trauma, setTrauma] = useState("");
  const [associatedSymptoms, setAssociatedSymptoms] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);
  const [examination, setExamination] = useState({
    site: "",
    swelling: "",
    tenderness: "",
    movement: "",
    deformity: "",
  });
  const [investigations, setInvestigations] = useState([]);
  const [treatment, setTreatment] = useState("");
  const [advice, setAdvice] = useState("");

  const toggleSelection = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      orthopaedicForm: {
        problems,
        otherProblem,
        duration,
        onset,
        severity,
        painIncreases,
        trauma,
        associatedSymptoms,
        pastHistory,
        examination,
        investigations,
        treatment,
        advice,
      },
    }));
    navigate("/summary");
  };

  const sectionStyle = {
    p: 3,
    borderRadius: 3,
    mb: 4,
    bgcolor: "#fff",
    border: "1px solid #e2e8f0",
  };
  const greenButtonStyle = {
    py: 1.5,
    borderRadius: "10px",
    fontWeight: "600",
    bgcolor: "#2e7d32",
    "&:hover": { bgcolor: "#1b5e20" },
  };

  const OptionBox = ({ label, selected, onClick, multi = false }) => (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        border: "1px solid",
        borderRadius: 2,
        cursor: "pointer",
        borderColor: selected ? "#2e7d32" : "#e2e8f0",
        bgcolor: selected ? "#e6f6ed" : "transparent",
        display: "flex",
        alignItems: "center",
        transition: "0.2s",
        "&:hover": { borderColor: "#2e7d32" },
      }}
    >
      {multi ? (
        <Checkbox checked={selected} color="success" size="small" sx={{ p: 0, mr: 1 }} />
      ) : (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: selected ? "#2e7d32" : "#cbd5e1",
            mr: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selected && (
            <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#2e7d32" }} />
          )}
        </Box>
      )}
      <Typography variant="body2" fontWeight={selected ? "600" : "500"}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <Typography variant="h4" fontWeight="700" color="#2e7d32" mb={1}>
          Orthopedic Questionnaire
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Please answer the following questions about your orthopedic condition
        </Typography>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={1}>
            1. Current Orthopedic Problem
          </Typography>
          <Typography variant="body2" mb={2}>
            What is your current problem? *
          </Typography>
          <Grid container spacing={2}>
            {["Knee pain", "Back pain", "Neck pain", "Shoulder pain", "Hip pain", "Joint stiffness", "Swelling", "Difficulty walking"].map((item) => (
              <Grid item xs={12} sm={6} key={item}>
                <OptionBox label={item} multi selected={problems.includes(item)} onClick={() => toggleSelection(problems, setProblems, item)} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <OptionBox label="Others:" multi selected={problems.includes("Others")} onClick={() => toggleSelection(problems, setProblems, "Others")} />
                <TextField fullWidth size="small" placeholder="Please specify" disabled={!problems.includes("Others")} value={otherProblem} onChange={(e) => setOtherProblem(e.target.value)} />
              </Box>
            </Grid>
          </Grid>
          {problems.length > 0 && (
            <Box sx={{ mt: 3, p: 2, bgcolor: "#f0faf5", borderRadius: 2 }}>
              <Typography variant="body2" fontWeight="600" mb={1}>
                Duration: *
              </Typography>
              <TextField fullWidth size="small" placeholder="e.g., 2 weeks, 3 months" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </Box>
          )}
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            2. History of Present Illness
          </Typography>
          <Typography variant="body2" fontWeight="600" mb={1.5}>
            Onset: *
          </Typography>
          <Grid container spacing={2} mb={3}>
            {["Sudden", "Gradual"].map((opt) => (
              <Grid item xs={6} key={opt}>
                <OptionBox label={opt} selected={onset === opt} onClick={() => setOnset(opt)} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" fontWeight="600" mb={1.5}>
            Pain severity: *
          </Typography>
          <Grid container spacing={2} mb={3}>
            {["Mild", "Moderate", "Severe"].map((opt) => (
              <Grid item xs={4} key={opt}>
                <OptionBox label={opt} selected={severity === opt} onClick={() => setSeverity(opt)} />
              </Grid>
            ))}
          </Grid>
          <Typography variant="body2" fontWeight="600" mb={1.5}>
            Pain increases on: *
          </Typography>
          <Grid container spacing={2}>
            {["Walking", "Standing", "Bending", "Lifting weight"].map((item) => (
              <Grid item xs={6} key={item}>
                <OptionBox label={item} multi selected={painIncreases.includes(item)} onClick={() => toggleSelection(painIncreases, setPainIncreases, item)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            3. History of Trauma / Injury
          </Typography>
          <Typography variant="body2" fontWeight="600" mb={1.5}>
            Any fall or accident? *
          </Typography>
          <Grid container spacing={2}>
            {["Yes", "No"].map((opt) => (
              <Grid item xs={6} key={opt}>
                <OptionBox label={opt} selected={trauma === opt} onClick={() => setTrauma(opt)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={1}>
            4. Associated Symptoms
          </Typography>
          <Typography variant="body2" mb={2}>
            Select all that apply:
          </Typography>
          <Grid container spacing={2}>
            {["Swelling", "Morning stiffness", "Numbness / tingling", "Weakness", "Restricted movement", "Fever", "Weight loss"].map((item) => (
              <Grid item xs={6} key={item}>
                <OptionBox label={item} multi selected={associatedSymptoms.includes(item)} onClick={() => toggleSelection(associatedSymptoms, setAssociatedSymptoms, item)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={1}>
            5. Past Medical History
          </Typography>
          <Typography variant="body2" mb={2}>
            Select all that apply:
          </Typography>
          <Grid container spacing={2}>
            {["Arthritis", "Osteoporosis", "Previous surgery"].map((item) => (
              <Grid item xs={6} key={item}>
                <OptionBox label={item} multi selected={pastHistory.includes(item)} onClick={() => toggleSelection(pastHistory, setPastHistory, item)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            6. Local Examination (Affected Area)
          </Typography>
          <Typography variant="body2" fontWeight="600" mb={1}>
            Site:
          </Typography>
          <TextField fullWidth size="small" placeholder="Specify the affected site" sx={{ mb: 3 }} value={examination.site} onChange={(e) => setExamination({ ...examination, site: e.target.value })} />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="600" mb={1}>
                Swelling: *
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Present", "Absent"].map((opt) => (
                  <Button key={opt} fullWidth variant={examination.swelling === opt ? "contained" : "outlined"} color="success" size="small" onClick={() => setExamination({ ...examination, swelling: opt })}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="600" mb={1}>
                Tenderness: *
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Present", "Absent"].map((opt) => (
                  <Button key={opt} fullWidth variant={examination.tenderness === opt ? "contained" : "outlined"} color="success" size="small" onClick={() => setExamination({ ...examination, tenderness: opt })}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="600" mb={1}>
                Range of movement: *
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Normal", "Restricted"].map((opt) => (
                  <Button key={opt} fullWidth variant={examination.movement === opt ? "contained" : "outlined"} color="success" size="small" onClick={() => setExamination({ ...examination, movement: opt })}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="600" mb={1}>
                Deformity: *
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["Yes", "No"].map((opt) => (
                  <Button key={opt} fullWidth variant={examination.deformity === opt ? "contained" : "outlined"} color="success" size="small" onClick={() => setExamination({ ...examination, deformity: opt })}>
                    {opt}
                  </Button>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={1}>
            7. Provisional Diagnosis
          </Typography>
          <Typography variant="body2" mb={2}>
            Investigations (if advised):
          </Typography>
          <Grid container spacing={2}>
            {["X-ray", "Blood tests", "Not required"].map((item) => (
              <Grid item xs={6} key={item}>
                <OptionBox label={item} multi selected={investigations.includes(item)} onClick={() => toggleSelection(investigations, setInvestigations, item)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            8. Treatment Given
          </Typography>
          <TextField fullWidth multiline minRows={3} placeholder="Describe the treatment provided" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
        </Box>

        <Box sx={sectionStyle}>
          <Typography variant="h6" fontWeight="700" mb={2}>
            9. Advice Given
          </Typography>
          <TextField fullWidth multiline minRows={3} placeholder="Provide advice for the patient" value={advice} onChange={(e) => setAdvice(e.target.value)} />
        </Box>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="outlined" onClick={() => navigate("/camp")} sx={{ py: 1.5, borderRadius: "10px", color: "#666", borderColor: "#ccc" }}>
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button fullWidth variant="contained" onClick={handleSubmit} sx={greenButtonStyle}>
              Submit Orthopedic Assessment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default OrthopaedicForm;
