import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, PlusCircle } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [openAddDoctor, setOpenAddDoctor] = useState(false);
  const [openEditAppointment, setOpenEditAppointment] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleTabChange = (_, newIndex) => setTabIndex(newIndex);

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenEditAppointment(true);
  };

  const handleCloseEditAppointment = () => {
    setSelectedAppointment(null);
    setOpenEditAppointment(false);
  };

  const dummyAppointments = [
    {
      id: 1,
      patient: "rajesh",
      date: "2025-07-21",
      time: "10:00 AM",
      reason: "General Checkup"
    },
    {
      id: 2,
      patient: "hariharasoodhan",
      date: "2025-07-22",
      time: "2:00 PM",
      reason: "Follow-up"
    }
  ];

  const doctors = [
    {
      name: "Dr. Alan Jibin",
      specialty: "Cardiologist",
      image: "../image/alan (2).jpg",
      bio: "Specialist in interventional cardiology with over 15 years of experience."
    },
    {
      name: "Dr. Yadhukrishna Hari",
      specialty: "Orthopedic Surgeon",
      image: "../image/YADHU.JPG",
      bio: "Expert in trauma and joint replacement surgeries."
    },
    {
      name: "Dr. Nandhana Biju",
      specialty: "Pediatrician",
      image: "src/image/WhatsApp Image 2025-07-12 at 13.42.13_3eee2df8.jpg",
      bio: "Focused on child wellness, immunization, and growth monitoring."
    },
    {
      name: "Dr. Nandhana Pradeep",
      specialty: "Neurologist",
      image: "src/image/WhatsApp Image 2025-07-12 at 13.42.12_a1a785ef.jpg",
      bio: "Experienced in treating epilepsy, stroke, and neurodegenerative disorders."
    }
  ];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <Button color="inherit" onClick={() => navigate("/")}>Logout</Button>
          <Button color="inherit" onClick={() => navigate("/appointment")}>Appointments</Button>
          <Button color="inherit" onClick={() => navigate("/doctors")}>Doctors</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 4 }}>
          <Tab label="Appointments" />
          <Tab label="Doctors" />
        </Tabs>

        {tabIndex === 0 && (
          <Box>
            <Typography variant="h5" mb={2}>Patient Appointments</Typography>
            {dummyAppointments.map((appt) => (
              <Paper key={appt.id} sx={{ p: 2, mb: 2 }}>
                <Typography><strong>Patient:</strong> {appt.patient}</Typography>
                <Typography><strong>Date:</strong> {appt.date}</Typography>
                <Typography><strong>Time:</strong> {appt.time}</Typography>
                <Typography><strong>Reason:</strong> {appt.reason}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  sx={{ mt: 1, mr: 1 }}
                  onClick={() => handleEditAppointment(appt)}
                >
                  Edit
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete />} sx={{ mt: 1 }}>Cancel</Button>
              </Paper>
            ))}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" mb={2}>Doctor Profiles</Typography>
            <Grid container spacing={3}>
              {doctors.map((doctor, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia component="img" height="300" image={doctor.image} alt={doctor.name} />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">{doctor.name}</Typography>
                      <Typography variant="subtitle1" color="text.secondary">{doctor.specialty}</Typography>
                      <Typography variant="body2" color="text.secondary">{doctor.bio}</Typography>
                      <Box mt={2}>
                        <Button variant="outlined" startIcon={<Edit />} sx={{ mr: 1 }}>Edit</Button>
                        <Button variant="outlined" color="error" startIcon={<Delete />}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box mt={4}>
              <Button
                variant="contained"
                startIcon={<PlusCircle />}
                onClick={() => setOpenAddDoctor(true)}
              >
                Add Doctor
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Edit Appointment Dialog */}
      <Dialog open={openEditAppointment} onClose={handleCloseEditAppointment}>
        <DialogTitle>Edit Appointment</DialogTitle>
        <DialogContent>
          <TextField label="Patient" value={selectedAppointment?.patient || ''} fullWidth margin="dense" />
          <TextField label="Date" value={selectedAppointment?.date || ''} fullWidth margin="dense" />
          <TextField label="Time" value={selectedAppointment?.time || ''} fullWidth margin="dense" />
          <TextField label="Reason" value={selectedAppointment?.reason || ''} fullWidth margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditAppointment}>Cancel</Button>
          <Button variant="contained">Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add Doctor Dialog */}
      <Dialog open={openAddDoctor} onClose={() => setOpenAddDoctor(false)}>
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" />
          <TextField label="Specialization" fullWidth margin="dense" />
          <TextField label="Image URL" fullWidth margin="dense" />
          <TextField label="Bio" fullWidth multiline rows={3} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDoctor(false)}>Cancel</Button>
          <Button variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;