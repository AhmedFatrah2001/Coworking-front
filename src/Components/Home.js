import React from "react";
import {
  Typography,
  Container,
  Box,
  Paper,
  Grid,
  CardMedia,
} from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import Footer from "./Footer";
import Header from "./Header";

function Home() {
  const points = [
    {
      title: "Quickly visualize processes",
      description:
        "Use CoWorking’s powerful cards to add tasks with just a few clicks. Avoid wasting time with complicated workflows, and simplify your process using the default setup or customize the Kanban board according to your needs.",
      icon: <PsychologyIcon color="secondary" />,
    },
    {
      title: "Flexible Kanban creation",
      description:
        "CoWorking’s Kanban board has a flexible structure. Drag and drop tasks, and your Kanban board will reformat the cards automatically. Or customize your Kanban tool by color-coding tasks, adding more columns and swimlanes, everything to fit your workflow needs.",
      icon: <EditNoteIcon color="secondary" />,
    },
    {
      title: "Focus on what matters",
      description:
        "Simplify workflows and bring focus to teams with CoWorking’s Kanban tool. Improve collaboration by giving everyone task visibility, quickly predicting outcomes, and changing direction if needed.",
      icon: <CenterFocusStrongIcon color="secondary" />,
    },
    {
      title: "Save time with easy navigation",
      description:
        "Use hotkey shortcuts to create Kanban boards quickly, and tag and assign tasks in just a few clicks. Reduce time prepping and focus more on your strategy and delivery. ",
      icon: <MoreTimeIcon color="secondary" />,
    },
  ];
  return (
    <>
      <Header/>
      <div
        style={{
          background: `url("/images/wave.svg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          width: "100%",
          height: "100vh",
          opacity: 0.25,
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>
      <Container maxWidth="lg" sx={{ mt: 4, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              gutterBottom
              component="div"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.dark",
              }}
            >
              Welcome to CoWorking
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              A Kanban tool for visual planning.
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "left", mt: 2, color: "primary" }}
            >
              Stay organized and quickly visualize processes with a Kanban tool.
              Work in one shared space, and move teams toward the same
              objectives, surfacing dependencies and anticipating what’s next.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image="/images/kanban-board.svg"
              alt="Kanban Board"
              sx={{ borderRadius: 2, maxWidth: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {points.map((point, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={3}
                sx={{ p: 2, display: "flex", alignItems: "center" }}
              >
                <Box sx={{ marginRight: 2, fontSize: 40 }}>{point.icon}</Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1">{point.description}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
