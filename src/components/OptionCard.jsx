import React from "react";
import { Box, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const OptionCard = ({ label, selected, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1.5,
        borderRadius: 2,
        border: selected ? "2px solid #2e7d32" : "1px solid #dcdcdc",
        backgroundColor: selected ? "#e8f5e9" : "#fff",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "#2e7d32",
          backgroundColor: "#f1f8f4",
        },
      }}
    >
      {selected ? (
        <CheckBoxIcon sx={{ color: "#2e7d32" }} />
      ) : (
        <CheckBoxOutlineBlankIcon />
      )}
      <Typography fontSize="14px">{label}</Typography>
    </Box>
  );
};

export default OptionCard;