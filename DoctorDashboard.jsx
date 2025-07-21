// src/components/DoctorDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

const mockAppointments = [
  { id: 1, patient: "rajesh", date: "2025-07-13", time: "10:00 AM" },
  { id: 2, patient: "hariharasoodhan", date: "2025-07-14", time: "2:30 PM" },
];

const mockHistory = [
  { date: "2025-06-12", notes: "Flu symptoms treated with rest and fluids." },
  { date: "2025-05-01", notes: "Follow-up for high blood pressure." },
];

export default function DoctorDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSave = () => {
    alert("Patient information saved.");
    setDiagnosis("");
    setTreatment("");
    setNotes("");
    setPrescription("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
          Doctor Dashboard
        </Typography>

        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Appointments" />
          <Tab label="Patient Records" />
          <Tab label="Medical History" />
          <Tab label="e-Prescriptions" />
        </Tabs>

        <Divider sx={{ my: 3 }} />

        {/* 🗓️ Upcoming Appointments */}
        {selectedTab === 0 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Upcoming Appointments
            </Typography>
            <List>
              {mockAppointments.map((appt) => (
                <ListItem key={appt.id} divider>
                  <ListItemText
                    primary={`${appt.patient} - ${appt.date}`}
                    secondary={`Time: ${appt.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* 📋 Patient Record Entry */}
        {selectedTab === 1 && (
          <Box component="form" onSubmit={(e) => e.preventDefault()}>
            <Typography variant="h6" mb={2}>
              Add Diagnosis & Treatment
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Diagnosis"
                  fullWidth
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Treatment"
                  fullWidth
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  multiline
                  rows={4}
                  fullWidth
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleSave}>
                  Save Record
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* 📜 Medical History */}
        {selectedTab === 2 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Medical History
            </Typography>
            <List>
              {mockHistory.map((entry, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={entry.date}
                    secondary={entry.notes}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* 💊 E-Prescription */}
        {selectedTab === 3 && (
          <Box>
            <Typography variant="h6" mb={2}>
              Write e-Prescription
            </Typography>
            <TextField
              label="Prescription Details"
              multiline
              rows={5}
              fullWidth
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />
            <Button sx={{ mt: 2 }} variant="contained" onClick={handleSave}>
              Submit Prescription
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}