import React from 'react';
import {
  List, ListItem, ListItemText, IconButton, Typography, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ProjectList({ projects, handleProjectSelect, handleDeleteClick, type }) {
  if (!projects || projects.length === 0) {
    return null; 
  }

  return (
    <>
      <Typography variant="h6" sx={{ mx: 2 }}>
        {type === 'owned' ? 'Owned Projects' : 'Participated Projects'}
      </Typography>
      <List>
        {projects.map((project, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleProjectSelect(project)}
            secondaryAction={
              type === 'owned' && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(e, project.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
          >
            <ListItemText primary={project.nom} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </>
  );
}

export default ProjectList;
