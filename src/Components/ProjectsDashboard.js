import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Typography,
  Divider,
  Drawer,
  Card,
  Grid,
  IconButton,
  Collapse,
  Modal,
  Backdrop,
  TextField,
  Paper,
  Avatar,
  Fade,
  CircularProgress,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  CardActions,
  CardContent,
} from "@mui/material";
import axios from "axios";
import Header from "./Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import ProjectList from "./ProjectList";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
function ProjectsDashboard() {
  const userId = localStorage.getItem("userId");
  const [projects, setProjects] = useState({ owned: [], participated: [] });
  const [selectedProject, setSelectedProject] = useState(null);
  const [tables, setTables] = useState([]);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [participants, setParticipants] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newParticipantEmail, setNewParticipantEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [tableauModalOpen, setTableauModalOpen] = useState(false);
  const navigate = useNavigate()
  const drawerWidth = 240;

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteParticipant = async (utilisateurId) => {
    const token = localStorage.getItem("jwtToken");
    try {
      await axios.delete(
        `http://localhost:8080/projets/${selectedProject.id}/participants/${utilisateurId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParticipants((prev) => prev.filter((p) => p.id !== utilisateurId)); // Update participants list
    } catch (error) {
      console.error("Error removing participant:", error);
      alert(
        "Failed to remove participant: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };

  const handleCreateProject = async () => {
    const token = localStorage.getItem("jwtToken");
    const ownerId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        "http://localhost:8080/projets",
        {
          nom: newProjectName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: {
            ownerId: ownerId,
          },
        }
      );
      setProjects((prevProjects) => ({
        ...prevProjects,
        owned: [...prevProjects.owned, response.data],
      }));
      setCreateModalOpen(false);
      setNewProjectName("");
    } catch (error) {
      console.error("Error creating project:", error);
      alert(
        "Failed to create project: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };
  const handleDeleteProject = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      await axios.delete(`http://localhost:8080/projets/${projectToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setProjects(prevProjects => ({
        owned: Array.isArray(prevProjects.owned) ? prevProjects.owned.filter(p => p.id !== projectToDelete) : [],
        participated: Array.isArray(prevProjects.participated) ? prevProjects.participated.filter(p => p.id !== projectToDelete) : []
      }));
  
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(
        "Failed to delete project: " +
        (error.response?.data?.message || "Server error")
      );
    }
  };
  
  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const fetchProjects = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("jwtToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    try {
      const [ownedResponse, participatedResponse] = await Promise.all([
        axios.get(`http://localhost:8080/projets/owner/${userId}`, config),
        axios.get(`http://localhost:8080/projets/participant/${userId}`, config),
      ]);
  
      setProjects({
        owned: Array.isArray(ownedResponse.data) ? ownedResponse.data : [],
        participated: Array.isArray(participatedResponse.data) ? participatedResponse.data : []
      });
    } catch (error) {
      console.log("Error fetching projects not projects");
      setProjects({ owned: [], participated: [] });
    }
  };
  

  const handleProjectSelect = async (project) => {
    setSelectedProject(project);
    fetchTables(project);
    fetchParticipants(project);
  };

  const fetchTables = async (project) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/tableaux/by-projet/${project.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTables(response.data || []);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTables([]);
    }
  };
  const fetchParticipants = async (project) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/projets/${project.id}/participants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setParticipants(response.data || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
      setParticipants([]);
    }
  };

  const handleAddParticipant = async () => {
    setLoading(true);
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        `http://localhost:8080/projets/${selectedProject.id}/add-participant`,
        { email: newParticipantEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setParticipants((prev) => [...prev, response.data]);
        setNewParticipantEmail("");
        handleCloseModal();
      }
    } catch (error) {
      console.error(
        "Error adding participant:",
        error.response ? error.response.data : "Unknown error"
      );
      alert(
        "Failed to add participant: " +
          (error.response?.data?.message || "Server error")
      );
    } finally {
      setLoading(false);
    }
  };
  const submitNewTableau = async (name) => {
    const token = localStorage.getItem("jwtToken");
    const tableauData = {
      nom: name,
      projet: {
        id: selectedProject.id,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/tableaux",
        tableauData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTables((prevTables) => [...prevTables, response.data]);
      setTableauModalOpen(false);
    } catch (error) {
      console.error("Error creating tableau:", error);
      alert(
        "Failed to create tableau: " +
          (error.response?.data?.message || "Server error")
      );
    }
  };

  const handleDeleteParticipantClick = (event, utilisateurId) => {
    event.stopPropagation();
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this participant?"
    );
    if (confirmDelete) {
      deleteParticipant(utilisateurId);
    }
  };

  const toggleParticipants = () => {
    setParticipantsOpen(!participantsOpen);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setNewParticipantEmail("");
  };
  const handleOpenAddTableauModal = () => {
    setTableauModalOpen(true);
  };
  const handleViewBoard = (boardId) => {
    navigate(`/kanbanapp/${boardId}`);
  };

  const isOwner =
    selectedProject && selectedProject.owner.id.toString() === userId;
  return (
    <>
      <Header />
      <Box display="flex" sx={{ pt: 8 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              top: 64,
            },
          }}
        >
          <ListItem>
            <Button
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
              color="primary"
              fullWidth
            >
              Create New Project
            </Button>
          </ListItem>
          <Divider />
          <ProjectList
            projects={projects.owned}
            handleProjectSelect={handleProjectSelect}
            handleDeleteClick={handleDeleteClick}
            type="owned"
          />
          <ProjectList
            projects={projects.participated}
            handleProjectSelect={handleProjectSelect}
            type="participated"
          />

        </Drawer>

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
        >
          {selectedProject ? (
            <>
              <Typography variant="h4">{selectedProject.nom}</Typography>
              {isOwner ? (
                <>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    <IconButton onClick={toggleParticipants} color="primary">
                      {participantsOpen ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </IconButton>
                    Participants
                  </Typography>
                  <Collapse in={participantsOpen} timeout="auto" unmountOnExit>
                    <List sx={{ width: "100%" }}>
                      {participants && participants.length > 0 ? (
                        participants.map((participant, idx) => (
                          <Paper
                            elevation={1}
                            sx={{
                              margin: 1,
                              padding: 1.5,
                              width: "fit-content",
                              maxWidth: "100%",
                              bgcolor: "background.paper",
                            }}
                            key={idx}
                          >
                            <ListItem
                              key={participant.id}
                              secondaryAction={
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={(e) =>
                                    handleDeleteParticipantClick(
                                      e,
                                      participant.id
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <PersonIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={participant.username}
                                secondary={participant.email}
                              />
                            </ListItem>
                          </Paper>
                        ))
                      ) : (
                        <Typography sx={{ mx: 2 }}>No participants</Typography>
                      )}
                      <ListItem>
                        <Button
                          onClick={handleOpenModal}
                          startIcon={<AddCircleOutlineIcon />}
                          variant="outlined"
                        >
                          Add Participant
                        </Button>
                      </ListItem>
                    </List>
                  </Collapse>
                </>
              ) : (
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 2, display: "flex", alignItems: "center" }}
                >
                  <PersonIcon color="action" sx={{ mr: 1 }} />
                  <strong>Owner : </strong> {selectedProject.owner.username}
                </Typography>
              )}

              <Grid container spacing={2} sx={{ mt: 2 }}>
                {tables.map((table, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{ minWidth: 275, boxShadow: 3, position: "relative" }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {table.nom}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {}}
                          color="error"
                          sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Button size="small" color="primary" onClick={() => handleViewBoard(table.id)}>
                          View Board
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                {isOwner && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        boxShadow: 3,
                      }}
                    >
                      <IconButton
                        onClick={handleOpenAddTableauModal}
                        color="primary"
                        size="large"
                      >
                        <AddCircle sx={{ fontSize: "3rem" }} />
                      </IconButton>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <Typography variant="h6">
              Select a project to see the details
            </Typography>
          )}
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={modalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              outline: 0,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add New Participant
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={newParticipantEmail}
              onChange={(e) => setNewParticipantEmail(e.target.value)}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleAddParticipant}
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Add"}
              </Button>
              <Button
                onClick={handleCloseModal}
                color="secondary"
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={createModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              outline: 0,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create New Project
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="project-name"
              label="Project Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={handleCreateProject} color="primary">
                Create
              </Button>
              <Button
                onClick={() => setCreateModalOpen(false)}
                color="secondary"
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDeleteProject} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={tableauModalOpen}
        onClose={() => setTableauModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={tableauModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              outline: 0,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create New Tableau
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="tableau-name"
              label="Tableau Name"
              type="text"
              fullWidth
              variant="outlined"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => submitNewTableau(newProjectName)}
                color="primary"
              >
                Create
              </Button>
              <Button
                onClick={() => setTableauModalOpen(false)}
                color="secondary"
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default ProjectsDashboard;
