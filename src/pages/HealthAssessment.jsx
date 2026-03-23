import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
} from "@mui/material";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormContext";

const HealthAssessment = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [formData, setLocalFormData] = useState({
    height: "",
    weight: "",
  });

  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");
  const [conditions, setConditions] = useState([]);
  const [medication, setMedication] = useState("");
  const [tobacco, setTobacco] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [hospitalVisit, setHospitalVisit] = useState("");
  const [recurring, setRecurring] = useState("");
  const [medicalReport, setMedicalReport] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLocalFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setMedicalReport(e.target.files[0]);
  };

  //  MULTI SELECT
  const toggleCondition = (item) => {
    setConditions((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  //  VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.height) newErrors.height = "Required";
    if (!formData.weight) newErrors.weight = "Required";
    if (!bp) newErrors.bp = "Select BP status";
    if (!sugar) newErrors.sugar = "Select sugar status";
    if (conditions.length === 0)
      newErrors.conditions = "Select medical condition";
    if (!medication) newErrors.medication = "Required";
    if (!tobacco) newErrors.tobacco = "Required";
    if (!alcohol) newErrors.alcohol = "Required";
    if (!hospitalVisit) newErrors.hospitalVisit = "Required";
    if (!recurring) newErrors.recurring = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  SUBMIT
  const handleNext = () => {
    if (validate()) {
      setFormData((prev) => ({
        ...prev,
        step2: {
          ...formData,
          bp,
          sugar,
          conditions,
          medication,
          tobacco,
          alcohol,
          hospitalVisit,
          recurring,
          medicalReport,
        },
      }));

    //   alert("Step 2 Saved ✅");
    navigate("/camp");
    }
  };

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      "&:hover fieldset": { borderColor: "#2e7d32" },
      "&.Mui-focused fieldset": { borderColor: "#2e7d32" },
    },
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
        <Typography variant="h4" fontWeight="600" color="#2e7d32" mb={3}>
          Health Assessment
        </Typography>

        {/* Height & Weight */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Height (cm) *</Typography>
            <TextField
              fullWidth
              name="height"
              value={formData.height}
              onChange={handleChange}
              error={!!errors.height}
              helperText={errors.height}
              placeholder="Enter height"
              sx={inputStyle}
            />
          </Grid>

          <Grid item xs={6}>
            <Typography>Weight (kg) *</Typography>
            <TextField
              fullWidth
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              error={!!errors.weight}
              helperText={errors.weight}
              placeholder="Enter weight"
              sx={inputStyle}
            />
          </Grid>
        </Grid>

        {/* BP */}
        <Typography mt={2}>Blood Pressure Status *</Typography>
        {errors.bp && <Typography color="error">{errors.bp}</Typography>}
        {["Normal", "Previously High", "Not Checked"].map((item) => (
          <Box mb={1} key={item}>
            <OptionCard
              label={item}
              selected={bp === item}
              onClick={() => setBp(item)}
            />
          </Box>
        ))}

        {/* Sugar */}
        <Typography mt={2}>Blood Sugar Status *</Typography>
        {errors.sugar && <Typography color="error">{errors.sugar}</Typography>}
        {["Normal", "Previously High", "Not Checked"].map((item) => (
          <Box mb={1} key={item}>
            <OptionCard
              label={item}
              selected={sugar === item}
              onClick={() => setSugar(item)}
            />
          </Box>
        ))}

        {/* Conditions */}
        <Typography mt={2}>
          Do you have any diagnosed medical condition? *
        </Typography>
        {errors.conditions && (
          <Typography color="error">{errors.conditions}</Typography>
        )}
        <Grid container spacing={2} mb={2}>
          {[
            "Diabetes",
            "Hypertension",
            "Heart Disease",
            "Respiratory Problem",
            "Joint / Bone Issues",
            "None",
          ].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={conditions.includes(item)}
                onClick={() => toggleCondition(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Medication */}
        <Typography>Taking regular medication? *</Typography>
        {errors.medication && (
          <Typography color="error">{errors.medication}</Typography>
        )}
        <Grid container spacing={2} mb={2}>
          {["Yes", "No"].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={medication === item}
                onClick={() => setMedication(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Tobacco */}
        <Typography>Tobacco Usage *</Typography>
        {errors.tobacco && (
          <Typography color="error">{errors.tobacco}</Typography>
        )}
        {["Smoking", "Chewing", "None"].map((item) => (
          <Box mb={1} key={item}>
            <OptionCard
              label={item}
              selected={tobacco === item}
              onClick={() => setTobacco(item)}
            />
          </Box>
        ))}

        {/* Alcohol */}
        <Typography>Alcohol Consumption *</Typography>
        {errors.alcohol && (
          <Typography color="error">{errors.alcohol}</Typography>
        )}
        {["Regular", "Occasional", "None"].map((item) => (
          <Box mb={1} key={item}>
            <OptionCard
              label={item}
              selected={alcohol === item}
              onClick={() => setAlcohol(item)}
            />
          </Box>
        ))}

        {/* Hospital Visit */}
        <Typography mt={2}>
          Have you visited a hospital in last 6 months? *
        </Typography>
        {errors.hospitalVisit && (
          <Typography color="error">{errors.hospitalVisit}</Typography>
        )}
        <Grid container spacing={2} mb={2}>
          {["Yes", "No"].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={hospitalVisit === item}
                onClick={() => setHospitalVisit(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Recurring */}
        <Typography>Do you have recurring issues? *</Typography>
        {errors.recurring && (
          <Typography color="error">{errors.recurring}</Typography>
        )}
        <Grid container spacing={2} mb={2}>
          {["Yes", "No"].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={recurring === item}
                onClick={() => setRecurring(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Upload */}
        <Typography mt={2}>Upload Medical Report (Optional):</Typography>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            border: "1px solid #dcdcdc",
            borderRadius: "10px",
            p: 1.5,
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" component="label" sx={greenOutlinedButton}>
            Choose File
            <input type="file" hidden onChange={handleFileChange} />
          </Button>

          <Typography fontSize="14px">
            {medicalReport ? medicalReport.name : "No file chosen"}
          </Typography>
        </Box>

        {/* Buttons */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              sx={greenOutlinedButton}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={greenContainedButton}
              onClick={handleNext}
            >
              Continue to Camp Selection
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HealthAssessment;
