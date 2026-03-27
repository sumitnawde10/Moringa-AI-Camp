import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import OptionCard from "../../components/OptionCard";
import { FormContext } from "../../context/FormContext";

const complaintOptions = [
  "Tooth pain",
  "Swelling",
  "Bleeding gums",
  "Loose teeth",
  "Bad breath",
  "Difficulty chewing or opening mouth",
  "Ulcer / mouth lesion",
  "None",
  "Others",
];

const complaintDurationOptions = ["Days", "Weeks", "Months", "Years"];

const complaintDetailConfigs = {
  "Tooth pain": {
    title: "About Your Tooth Pain:",
    style: ["#fff1f2", "#fda4af"],
    sections: [
      {
        question: "When does the pain occur?",
        type: "multi",
        key: "painTiming",
        options: [
          "While eating (hot/cold/sweet)",
          "Continuous (all the time)",
          "Occasional (comes and goes)",
          "At night",
          "When biting down",
        ],
      },
      {
        question: "Pain severity:",
        type: "single",
        key: "painSeverity",
        options: ["Mild", "Moderate", "Severe"],
      },
    ],
  },
  Swelling: {
    title: "About Your Swelling:",
    style: ["#fff7ed", "#fdba74"],
    sections: [
      {
        question: "Where is the swelling?",
        type: "single",
        key: "swellingLocation",
        options: ["Face/cheek", "Gums", "Jaw", "Neck", "Under tongue"],
      },
      {
        question: "Size of swelling:",
        type: "single",
        key: "swellingSize",
        options: [
          "Small (pea-sized)",
          "Medium (grape-sized)",
          "Large (walnut-sized or bigger)",
        ],
      },
      {
        question: "Is the swelling painful?",
        type: "single",
        key: "swellingPainful",
        options: ["Yes", "No"],
      },
    ],
  },
  "Bleeding gums": {
    title: "About Your Bleeding Gums:",
    style: ["#fdf2f8", "#f9a8d4"],
    sections: [
      {
        question: "When do your gums bleed?",
        type: "multi",
        key: "bleedingTiming",
        options: [
          "While brushing",
          "While flossing",
          "While eating",
          "Spontaneously",
          "At night",
        ],
      },
      {
        question: "How often does it bleed?",
        type: "single",
        key: "bleedingFrequency",
        options: ["Rarely", "Sometimes", "Frequently", "Every time I brush"],
      },
    ],
  },
  "Loose teeth": {
    title: "About Your Loose Teeth:",
    style: ["#fefce8", "#fde047"],
    sections: [
      {
        question: "How many teeth feel loose?",
        type: "single",
        key: "looseTeethCount",
        options: ["One tooth", "2-3 teeth", "4-6 teeth", "More than 6"],
      },
      {
        question: "How loose are they?",
        type: "single",
        key: "looseTeethSeverity",
        options: [
          "Slightly mobile",
          "Moderately mobile (moves when touched)",
          "Very loose (about to fall out)",
        ],
      },
    ],
  },
  "Bad breath": {
    title: "About Your Bad Breath:",
    style: ["#faf5ff", "#d8b4fe"],
    sections: [
      {
        question: "Who noticed the bad breath?",
        type: "single",
        key: "badBreathNoticedBy",
        options: ["I noticed it myself", "Someone else told me", "Both"],
      },
      {
        question: "When is it most noticeable?",
        type: "single",
        key: "badBreathTiming",
        options: [
          "In the morning",
          "After meals",
          "Throughout the day",
          "When hungry",
        ],
      },
    ],
  },
  "Difficulty chewing or opening mouth": {
    title: "About Your Chewing Difficulty:",
    style: ["#eef2ff", "#a5b4fc"],
    sections: [
      {
        question: "Which side is affected?",
        type: "single",
        key: "chewingSide",
        options: ["Right side", "Left side", "Both sides", "Jaw joint (TMJ)"],
      },
      {
        question: "Is there pain when chewing?",
        type: "single",
        key: "chewingPain",
        options: ["Yes, severe pain", "Yes, mild pain", "No pain, just difficulty"],
      },
    ],
  },
  "Ulcer / mouth lesion": {
    title: "About Your Ulcer/Lesion:",
    style: ["#fef2f2", "#fca5a5"],
    sections: [
      {
        question: "Where is the ulcer/lesion?",
        type: "single",
        key: "ulcerLocation",
        options: [
          "Tongue",
          "Inner cheek",
          "Gums",
          "Lips",
          "Floor of mouth",
          "Palate/roof of mouth",
        ],
      },
      {
        question: "How long has the ulcer been there?",
        type: "single",
        key: "ulcerDuration",
        options: ["Less than 1 week", "1-2 weeks", "2-4 weeks", "More than 1 month"],
      },
      {
        question: "Is the ulcer painful?",
        type: "single",
        key: "ulcerPain",
        options: ["Very painful", "Somewhat painful", "Not painful"],
      },
    ],
  },
};

const brushingFrequencyOptions = [
  "Twice daily",
  "Once daily",
  "Occasionally",
  "Rarely or never",
];

const brushingToolOptions = [
  "Toothbrush with toothpaste",
  "Toothbrush with tooth powder",
  "Neem stick/Miswak",
  "Finger with tooth powder",
  "Other",
];

const flossOptions = ["Yes, regularly", "Yes, sometimes", "No"];

const mouthRinsingOptions = ["Always", "Sometimes", "Rarely", "Never"];

const tobaccoUseOptions = [
  "Smoking (cigarettes/beedis)",
  "Gutka/Paan masala",
  "Khaini",
  "Paan with tobacco",
  "Hookah/Shisha",
  "None",
];

const alcoholOptions = [
  "No",
  "Yes, occasionally",
  "Yes, regularly",
  "Yes, daily",
];

const tobaccoFrequencyOptions = [
  "Multiple times daily",
  "Once daily",
  "Few times a week",
  "Occasionally",
];

const cancerScreeningQuestions = [
  {
    question: "Do you have any non-healing ulcer or white or red patch in your mouth?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    question: "Burning sensation while eating spicy food?",
    options: ["Yes, severe", "Yes, mild", "No"],
  },
  {
    question: "Difficulty swallowing / change in voice?",
    options: ["Yes", "No", "Sometimes"],
  },
  {
    question: "History of tobacco / betel nut use?",
    options: ["Yes, current user", "Yes, former user", "No, never used"],
  },
];

const pastDentalHistoryOptions = [
  "Tooth extraction",
  "Tooth filling/cavity filling",
  "Root canal treatment (RCT)",
  "Dentures / false teeth",
  "Braces/orthodontic treatment",
  "Scaling/cleaning",
  "None",
];

const DentalForm = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [complaints, setComplaints] = useState([]);
  const [otherComplaint, setOtherComplaint] = useState("");
  const [complaintDuration, setComplaintDuration] = useState("");
  const [complaintDetails, setComplaintDetails] = useState({});
  const [brushingFrequency, setBrushingFrequency] = useState("");
  const [brushingTool, setBrushingTool] = useState("");
  const [flossing, setFlossing] = useState("");
  const [mouthRinsing, setMouthRinsing] = useState("");
  const [tobaccoUse, setTobaccoUse] = useState([]);
  const [tobaccoDuration, setTobaccoDuration] = useState("");
  const [tobaccoFrequency, setTobaccoFrequency] = useState("");
  const [alcoholConsumption, setAlcoholConsumption] = useState("");
  const [screeningAnswers, setScreeningAnswers] = useState({});
  const [screeningUseDuration, setScreeningUseDuration] = useState("");
  const [pastDentalHistory, setPastDentalHistory] = useState([]);
  const [pastTreatmentProblems, setPastTreatmentProblems] = useState("");

  const sectionStyle = (bg, border) => ({
    p: 2,
    borderRadius: 2,
    mb: 3,
    backgroundColor: bg,
    border: `1px solid ${border}`,
  });

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

  const handleTobaccoUseToggle = (value) => {
    if (value === "None") {
      setTobaccoUse(["None"]);
      setTobaccoDuration("");
      setTobaccoFrequency("");
      return;
    }

    const withoutNone = tobaccoUse.filter((item) => item !== "None");
    const updatedValues = withoutNone.includes(value)
      ? withoutNone.filter((item) => item !== value)
      : [...withoutNone, value];

    setTobaccoUse(updatedValues);

    if (updatedValues.length === 0) {
      setTobaccoDuration("");
      setTobaccoFrequency("");
    }
  };

  const handleComplaintToggle = (value) => {
    if (value === "None") {
      setComplaints(["None"]);
      setOtherComplaint("");
      setComplaintDuration("");
      setComplaintDetails({});
      return;
    }

    const withoutNone = complaints.filter((item) => item !== "None");
    const isRemoving = withoutNone.includes(value);
    const updatedComplaints = isRemoving
      ? withoutNone.filter((item) => item !== value)
      : [...withoutNone, value];

    setComplaints(updatedComplaints);

    if (value === "Others" && isRemoving) {
      setOtherComplaint("");
    }

    if (isRemoving && complaintDetailConfigs[value]) {
      setComplaintDetails((prev) => {
        const updatedDetails = { ...prev };
        delete updatedDetails[value];
        return updatedDetails;
      });
    }

    if (updatedComplaints.length === 0) {
      setComplaintDuration("");
    }
  };

  const handleComplaintDetailSingleSelect = (complaint, fieldKey, value) => {
    setComplaintDetails((prev) => ({
      ...prev,
      [complaint]: {
        ...prev[complaint],
        [fieldKey]: value,
      },
    }));
  };

  const handleComplaintDetailMultiToggle = (complaint, fieldKey, value) => {
    setComplaintDetails((prev) => {
      const currentValues = prev[complaint]?.[fieldKey] || [];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [complaint]: {
          ...prev[complaint],
          [fieldKey]: updatedValues,
        },
      };
    });
  };

  const handleScreeningAnswer = (question, value) => {
    setScreeningAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));

    if (
      question === "History of tobacco / betel nut use?" &&
      value === "No, never used"
    ) {
      setScreeningUseDuration("");
    }
  };

  const handlePastDentalHistoryToggle = (value) => {
    if (value === "None") {
      setPastDentalHistory(["None"]);
      setPastTreatmentProblems("");
      return;
    }

    const withoutNone = pastDentalHistory.filter((item) => item !== "None");
    const updatedValues = withoutNone.includes(value)
      ? withoutNone.filter((item) => item !== value)
      : [...withoutNone, value];

    setPastDentalHistory(updatedValues);

    if (updatedValues.length === 0) {
      setPastTreatmentProblems("");
    }
  };

  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      dentalForm: {
        complaints,
        otherComplaint,
        complaintDuration,
        complaintDetails,
        brushingFrequency,
        brushingTool,
        flossing,
        mouthRinsing,
        tobaccoUse,
        tobaccoDuration,
        tobaccoFrequency,
        alcoholConsumption,
        screeningAnswers,
        screeningUseDuration,
        pastDentalHistory,
        pastTreatmentProblems,
      },
    }));

    navigate("/summary");
  };

  const renderOptionGrid = (options, selectedValue, onSelect, xs = 12, sm = 6) => (
    <Grid container spacing={2}>
      {options.map((option) => (
        <Grid item xs={xs} sm={sm} key={option}>
          <OptionCard
            label={option}
            selected={selectedValue === option}
            onClick={() => onSelect(option)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderMultiSelectGrid = (
    options,
    selectedValues,
    onToggle,
    xs = 12,
    sm = 6
  ) => (
    <Grid container spacing={2}>
      {options.map((option) => (
        <Grid item xs={xs} sm={sm} key={option}>
          <OptionCard
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => onToggle(option)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const selectedComplaints = complaints.filter((item) => item !== "None");
  const shouldShowComplaintFollowUps = selectedComplaints.length > 0;
  const selectedComplaintSubForms = selectedComplaints.filter(
    (item) => item !== "Others" && complaintDetailConfigs[item]
  );
  const shouldShowTobaccoFollowUp =
    tobaccoUse.length > 0 && !tobaccoUse.includes("None");
  const shouldShowScreeningUseDuration =
    screeningAnswers["History of tobacco / betel nut use?"] &&
    screeningAnswers["History of tobacco / betel nut use?"] !== "No, never used";
  const shouldShowPastTreatmentProblems =
    pastDentalHistory.length > 0 && !pastDentalHistory.includes("None");

  const renderComplaintSection = (complaint) => {
    const config = complaintDetailConfigs[complaint];

    if (!config) {
      return null;
    }

    return (
      <Box
        key={complaint}
        sx={sectionStyle(config.style[0], config.style[1])}
      >
        <Typography fontWeight="700" color="#b45309" fontSize="1.2rem" mb={2}>
          {config.title}
        </Typography>

        {config.sections.map((section) => (
          <Box key={section.key} mb={3}>
            <Typography fontWeight="600" mb={2}>
              {section.question} *
            </Typography>

            {section.type === "single" &&
              renderOptionGrid(
                section.options,
                complaintDetails[complaint]?.[section.key] || "",
                (value) =>
                  handleComplaintDetailSingleSelect(
                    complaint,
                    section.key,
                    value
                  ),
                12,
                section.options.length <= 3 ? 4 : 6
              )}

            {section.type === "multi" &&
              renderMultiSelectGrid(
                section.options,
                complaintDetails[complaint]?.[section.key] || [],
                (value) =>
                  handleComplaintDetailMultiToggle(
                    complaint,
                    section.key,
                    value
                  ),
                12,
                12
              )}
          </Box>
        ))}
      </Box>
    );
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
          Dental Questionnaire
        </Typography>

        <Typography mb={4} color="text.secondary">
          Please answer the following questions about your dental health.
        </Typography>

        <Typography fontWeight="600" fontSize="1.5rem" mb={2}>
          1. Dental Complaint
        </Typography>

        <Box sx={sectionStyle("#eef2ff", "#c7d2fe")}>
          <Typography fontWeight="600" mb={2}>
            What is your main dental problem? *
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Select all that apply
          </Typography>

          {renderMultiSelectGrid(
            complaintOptions,
            complaints,
            handleComplaintToggle
          )}

          {complaints.includes("Others") && !complaints.includes("None") && (
            <TextField
              fullWidth
              placeholder="Please specify"
              value={otherComplaint}
              onChange={(e) => setOtherComplaint(e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Box>

        {shouldShowComplaintFollowUps && (
          <Box sx={sectionStyle("#eff6ff", "#93c5fd")}>
            <Typography fontWeight="600" mb={2}>
              How long have you had this problem? *
            </Typography>
            {renderOptionGrid(
              complaintDurationOptions,
              complaintDuration,
              setComplaintDuration,
              12,
              3
            )}
          </Box>
        )}

        {selectedComplaintSubForms.map(renderComplaintSection)}

        <Typography fontWeight="600" fontSize="1.5rem" mb={2}>
          2. Oral Hygiene & Habits
        </Typography>

        <Box sx={sectionStyle("#ecfeff", "#a5f3fc")}>
          <Typography fontWeight="600" mb={2}>
            Brushing frequency: *
          </Typography>
          {renderOptionGrid(
            brushingFrequencyOptions,
            brushingFrequency,
            setBrushingFrequency,
            12,
            12
          )}

          <Typography fontWeight="600" mt={3} mb={2}>
            Brushing tool: *
          </Typography>
          {renderOptionGrid(
            brushingToolOptions,
            brushingTool,
            setBrushingTool
          )}

          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6}>
              <Typography fontWeight="600" mb={2}>
                Do you floss? *
              </Typography>
              {renderOptionGrid(flossOptions, flossing, setFlossing, 12, 12)}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography fontWeight="600" mb={2}>
                Mouth rinsing after meals: *
              </Typography>
              {renderOptionGrid(
                mouthRinsingOptions,
                mouthRinsing,
                setMouthRinsing,
                12,
                12
              )}
            </Grid>
          </Grid>

          <Typography fontWeight="600" mt={3} mb={2}>
            Tobacco use: *
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Select all that apply
          </Typography>
          {renderMultiSelectGrid(
            tobaccoUseOptions,
            tobaccoUse,
            handleTobaccoUseToggle
          )}

          {shouldShowTobaccoFollowUp && (
            <Box sx={{ ...sectionStyle("#fff7ed", "#fdba74"), mt: 3, mb: 0 }}>
              <Typography fontWeight="600" mb={2}>
                How long have you been using tobacco? *
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter duration in years"
                value={tobaccoDuration}
                onChange={(e) => setTobaccoDuration(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">years</InputAdornment>
                  ),
                }}
              />

              <Typography fontWeight="600" mb={2}>
                How frequently do you use tobacco? *
              </Typography>
              {renderOptionGrid(
                tobaccoFrequencyOptions,
                tobaccoFrequency,
                setTobaccoFrequency,
                12,
                3
              )}
            </Box>
          )}

          <Typography fontWeight="600" mt={3} mb={2}>
            Alcohol consumption: *
          </Typography>
          {renderOptionGrid(
            alcoholOptions,
            alcoholConsumption,
            setAlcoholConsumption,
            12,
            12
          )}
        </Box>

        <Typography fontWeight="600" fontSize="1.5rem" mb={2}>
          3. Oral Cancer / Lesion Screening
        </Typography>

        <Box sx={sectionStyle("#fff7ed", "#fdba74")}>
          {cancerScreeningQuestions.map(({ question, options }) => (
            <Box key={question} mb={3}>
              <Typography fontWeight="600" mb={2}>
                {question} *
              </Typography>
              <Grid container spacing={2}>
                {options.map((option) => (
                  <Grid item xs={12} sm={4} key={option}>
                    <OptionCard
                      label={option}
                      selected={screeningAnswers[question] === option}
                      onClick={() => handleScreeningAnswer(question, option)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          {shouldShowScreeningUseDuration && (
            <Box sx={{ ...sectionStyle("#fff7ed", "#fdba74"), mb: 0 }}>
              <Typography fontWeight="600" mb={2}>
                Duration of tobacco / betel nut use (years): *
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter duration in years"
                value={screeningUseDuration}
                onChange={(e) => setScreeningUseDuration(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">years</InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </Box>

        <Typography fontWeight="600" fontSize="1.5rem" mb={2}>
          4. Past Dental History
        </Typography>

        <Box sx={sectionStyle("#f0fdf4", "#86efac")}>
          <Typography fontWeight="600" mb={2}>
            Did you have any of these treatments before?
          </Typography>
          <Typography color="text.secondary" mb={2}>
            Select all that apply
          </Typography>

          {renderMultiSelectGrid(
            pastDentalHistoryOptions,
            pastDentalHistory,
            handlePastDentalHistoryToggle
          )}

          {shouldShowPastTreatmentProblems && (
            <Box mt={3}>
              <Typography fontWeight="600" mb={2}>
                Did you have any problems after your previous dental treatment? *
              </Typography>
              {renderOptionGrid(
                ["Yes", "No", "Not sure"],
                pastTreatmentProblems,
                setPastTreatmentProblems,
                12,
                4
              )}
            </Box>
          )}
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

export default DentalForm;
