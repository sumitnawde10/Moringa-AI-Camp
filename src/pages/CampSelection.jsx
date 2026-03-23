import React, { useState, useContext } from "react";
import { FormContext } from "../context/FormContext";
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AirIcon from "@mui/icons-material/Air";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import OpacityIcon from "@mui/icons-material/Opacity";

const camps = [
  { name: "Eye", color: "linear-gradient(135deg, #a855f7, #9333ea)", icon: <VisibilityIcon fontSize="large" /> },
  { name: "Dental", color: "linear-gradient(135deg, #14b8a6, #0d9488)", icon: <MedicalServicesIcon fontSize="large" /> },
  { name: "Malnutrition", color: "linear-gradient(135deg, #f97316, #ea580c)", icon: <RestaurantIcon fontSize="large" /> },
  { name: "Diabetes", color: "linear-gradient(135deg, #3b82f6, #2563eb)", icon: <OpacityIcon fontSize="large" /> },
  { name: "Heart", color: "linear-gradient(135deg, #ef4444, #dc2626)", icon: <FavoriteIcon fontSize="large" /> },
  { name: "Cancer", color: "linear-gradient(135deg, #ec4899, #db2777)", icon: <LocalHospitalIcon fontSize="large" /> },
  { name: "Tuberculosis", color: "linear-gradient(135deg, #6366f1, #4f46e5)", icon: <MonitorHeartIcon fontSize="large" /> },
  { name: "Orthopaedic", color: "linear-gradient(135deg, #22c55e, #16a34a)", icon: <LocalHospitalIcon fontSize="large" /> },
  { name: "Asthma/COPD", color: "linear-gradient(135deg, #06b6d4, #0891b2)", icon: <AirIcon fontSize="large" /> },
];

const CampSelection = () => {
  const navigate = useNavigate();
  const [selectedCamp, setSelectedCamp] = useState("");
  const { setFormData } = useContext(FormContext);

  const greenOutlinedButton = {
    mt: 4,
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

  const handleSelect = (camp) => {
  setSelectedCamp(camp);

  setFormData((prev) => ({
    ...prev,
    selectedCamp: camp.toLowerCase(),
  }));

  navigate(`/camp/${camp.toLowerCase()}`);
};

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 5,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="h4" fontWeight="600" color="#2e7d32" mb={1}>
          Select Camp
        </Typography>

        <Typography mb={4} color="text.secondary">
          Choose the medical camp you would like to consult
        </Typography>

        {/* Camps Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {camps.map((camp) => (
            <Box
              key={camp.name}
              sx={{
                width: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "190px",
                },
              }}
            >
              <Box
                onClick={() => handleSelect(camp.name)}
                sx={{
                  cursor: "pointer",
                  p: 4,
                  width: "100%",
                  minHeight: 180,
                  boxSizing: "border-box",
                  borderRadius: 3,
                  color: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  background: camp.color,
                  boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                  transition: "0.3s",
                  border:
                    selectedCamp === camp.name
                      ? "2px solid rgba(255,255,255,0.9)"
                      : "2px solid transparent",

                  "&:hover": {
                    boxShadow: "0 10px 22px rgba(0,0,0,0.18)",
                  },
                }}
              >
                {camp.icon}

                <Typography mt={2} fontWeight="600" fontSize="18px">
                  {camp.name}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Back Button */}
        <Button
          fullWidth
          variant="outlined"
          sx={greenOutlinedButton}
          onClick={() => navigate("/health")}
        >
          Back to Health Assessment
        </Button>
      </Box>
    </Container>
  );
};

export default CampSelection;
