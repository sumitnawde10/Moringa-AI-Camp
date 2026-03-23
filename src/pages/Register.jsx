import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormContext";

const Register = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [pmjay, setPmjay] = useState("");
  const [relation, setRelation] = useState("");

  const [formData, setLocalFormData] = useState({
    mobile: "",
    abha: "",
    aadhaar: "",
    pmjayId: "",
    name: "",
    age: "",
    gender: "",
    area: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLocalFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!relation) newErrors.relation = "Select relation";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.area) newErrors.area = "Area is required";
    if (!formData.occupation) newErrors.occupation = "Occupation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  SUBMIT
  const handleSubmit = () => {
    if (validate()) {
      setFormData((prev) => ({
        ...prev,
        step1: {
          ...formData,
          relation,
          pmjay,
        },
      }));

      navigate("/health");
    }
  };

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#fff",
      "&:hover fieldset": {
        borderColor: "#2e7d32",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2e7d32",
      },
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
          Medical Camp Registration
        </Typography>

        {/* Mobile */}
        <Typography mb={1}>Registered Mobile Number *</Typography>
        <TextField
          fullWidth
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          error={!!errors.mobile}
          helperText={errors.mobile}
          placeholder="Enter mobile number"
          sx={inputStyle}
        />

        {/* ABHA */}
        <Typography mb={1}>ABHA ID (Optional)</Typography>
        <TextField
          fullWidth
          name="abha"
          value={formData.abha}
          onChange={handleChange}
          placeholder="Enter ABHA ID"
          sx={inputStyle}
        />

        {/* Aadhaar */}
        <Typography mb={1}>Aadhaar Number (Optional)</Typography>
        <TextField
          fullWidth
          name="aadhaar"
          value={formData.aadhaar}
          onChange={handleChange}
          placeholder="Enter Aadhaar Number"
          sx={inputStyle}
        />

        {/* PMJAY */}
        <Typography mb={2}>Do you have a PMJAY ID?</Typography>
        <Grid container spacing={2} mb={2}>
          {["Yes", "No"].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={pmjay === item}
                onClick={() => setPmjay(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Conditional PMJAY input */}
        {pmjay === "Yes" && (
          <>
            <Typography mb={1}>PMJAY ID</Typography>
            <TextField
              fullWidth
              name="pmjayId"
              value={formData.pmjayId}
              onChange={handleChange}
              placeholder="Enter PMJAY ID"
              sx={inputStyle}
            />
          </>
        )}

        {/* Relation */}
        <Typography mb={2}>Who are you registering today? *</Typography>
        {errors.relation && (
          <Typography color="error" fontSize="12px" mb={1}>
            {errors.relation}
          </Typography>
        )}

        <Grid container spacing={2} mb={3}>
          {[
            "Self",
            "Spouse",
            "Parent",
            "Child",
            "Sibling",
            "Other Family Member",
          ].map((item) => (
            <Grid item xs={6} key={item}>
              <OptionCard
                label={item}
                selected={relation === item}
                onClick={() => setRelation(item)}
              />
            </Grid>
          ))}
        </Grid>

        {/* Name */}
        <Typography mb={1}>Patient Name *</Typography>
        <TextField
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          placeholder="Enter patient name"
          sx={inputStyle}
        />

        {/* Age + Gender */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={6} sx={{ flex: 1 }}>
            <Typography mb={1}>Age *</Typography>
            <TextField
              fullWidth
              name="age"
              value={formData.age}
              onChange={handleChange}
              error={!!errors.age}
              helperText={errors.age}
              placeholder="Enter age"
              sx={inputStyle}
            />
          </Grid>

          <Grid item xs={6} sx={{ flex: 1 }}>
            <Typography mb={1}>Gender *</Typography>
            <TextField
              select
              fullWidth
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) => {
                  if (!selected) {
                    return <span style={{ color: "#9e9e9e" }}>Enter gender</span>;
                  }

                  const genderLabels = {
                    male: "Male",
                    female: "Female",
                    Other: "Other",
                  };

                  return genderLabels[selected] || selected;
                },
              }}
              sx={inputStyle}
            >
              <MenuItem value="" disabled>
                Enter gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Area */}
        <Typography mb={1}>Area / Ward / Locality *</Typography>
        <TextField
          fullWidth
          name="area"
          value={formData.area}
          onChange={handleChange}
          error={!!errors.area}
          helperText={errors.area}
          placeholder="Enter area"
          sx={inputStyle}
        />

        {/* Occupation */}
        <Typography mb={1}>Occupation of the patient *</Typography>
        <TextField
          fullWidth
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          error={!!errors.occupation}
          helperText={errors.occupation}
          placeholder="Enter occupation"
          sx={inputStyle}
        />

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "600",
            borderRadius: "10px",
            backgroundColor: "#2e7d32",
            "&:hover": {
              backgroundColor: "#1b5e20",
            },
          }}
        >
          Continue to Health Assessment
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
