import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { blue, green, orange } from '@mui/material/colors';

// Dummy master data
const masterData = [
  {
    id: 1,
    name: 'Project Alpha',
    owner: 'Alice',
    status: 'Active',
    color: blue[500],
    details: [
      { id: 101, task: 'Design UI', assignee: 'Bob', progress: 80 },
      { id: 102, task: 'Setup Backend', assignee: 'Charlie', progress: 60 },
    ],
  },
  {
    id: 2,
    name: 'Project Beta',
    owner: 'David',
    status: 'Planning',
    color: orange[500],
    details: [
      { id: 201, task: 'Requirement Gathering', assignee: 'Eve', progress: 30 },
      { id: 202, task: 'Wireframes', assignee: 'Frank', progress: 10 },
    ],
  },
  {
    id: 3,
    name: 'Project Gamma',
    owner: 'Grace',
    status: 'Completed',
    color: green[500],
    details: [
      { id: 301, task: 'Deployment', assignee: 'Heidi', progress: 100 },
      { id: 302, task: 'Testing', assignee: 'Ivan', progress: 100 },
    ],
  },
  {
    id: 4,
    name: 'Project Delta',
    owner: 'Judy',
    status: 'Active',
    color: blue[300],
    details: [
      { id: 401, task: 'API Integration', assignee: 'Mallory', progress: 50 },
      { id: 402, task: 'Frontend Polish', assignee: 'Oscar', progress: 20 },
    ],
  },
  {
    id: 5,
    name: 'Project Epsilon',
    owner: 'Peggy',
    status: 'Planning',
    color: orange[300],
    details: [
      { id: 501, task: 'Market Research', assignee: 'Sybil', progress: 10 },
      { id: 502, task: 'Initial Design', assignee: 'Trent', progress: 0 },
    ],
  },
  {
    id: 6,
    name: 'Project Zeta',
    owner: 'Victor',
    status: 'Completed',
    color: green[300],
    details: [
      { id: 601, task: 'Release', assignee: 'Walter', progress: 100 },
      { id: 602, task: 'Documentation', assignee: 'Yvonne', progress: 100 },
    ],
  },
];

const MasterDetailComplex: React.FC = () => {
  const [projects, setProjects] = useState(masterData);
  const [selectedProject, setSelectedProject] = useState(masterData[0]);
  const [filter, setFilter] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(filter.toLowerCase()) ||
    project.owner.toLowerCase().includes(filter.toLowerCase()) ||
    project.status.toLowerCase().includes(filter.toLowerCase())
  );

  const handleStatusChange = (id: number) => {
    setProjects((prev) => prev.map((proj) =>
      proj.id === id
        ? { ...proj, status: proj.status === 'Active' ? 'Planning' : 'Active' }
        : proj
    ));
    // If the selected project is updated, update its reference too
    setSelectedProject((prev) =>
      prev.id === id
        ? { ...prev, status: prev.status === 'Active' ? 'Planning' : 'Active' }
        : prev
    );
  };

  const handleTaskStatusChange = (projectId: number, detailId: number, newStatus: string) => {
    setProjects((prev) => prev.map((proj) =>
      proj.id === projectId
        ? {
            ...proj,
            details: proj.details.map((detail) =>
              detail.id === detailId ? { ...detail, status: newStatus } : detail
            ),
          }
        : proj
    ));
    // If the selected project is updated, update its reference too
    setSelectedProject((prev) =>
      prev.id === projectId
        ? {
            ...prev,
            details: prev.details.map((detail) =>
              detail.id === detailId ? { ...detail, status: newStatus } : detail
            ),
          }
        : prev
    );
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        p: { xs: 1, sm: 2, md: 4 },
        background: 'linear-gradient(120deg, #f5f7fa 60%, #c3cfe2 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ mt: 2 }}>
        Master-Detail Complex Report
      </Typography>
      <Divider sx={{ mb: 4 }} />
      <Grid container spacing={4} sx={{ flex: 1, minHeight: 0 }}>
        <Grid component="div" sx={{ width: { xs: '100%', md: '100%' }, height: { xs: 'auto', md: '100%' } }}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="h6" color="secondary" gutterBottom align="center">
                Projects
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <input
                  type="text"
                  placeholder="Filter by name, owner, or status"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: '1px solid #bdbdbd',
                    width: '90%',
                    fontSize: 16,
                  }}
                />
              </Box>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, maxHeight: { xs: 300, md: 'calc(100vh - 220px)' }, overflow: 'auto' }}>
                {filteredProjects.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    No projects found.
                  </Typography>
                ) : (
                  filteredProjects.map((project) => (
                    <Box
                      component="li"
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 1,
                        mb: 1,
                        background: selectedProject.id === project.id ? '#e3f2fd' : undefined,
                        cursor: 'pointer',
                        p: 1,
                        transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                        boxShadow: selectedProject.id === project.id ? 4 : undefined,
                        border: selectedProject.id === project.id ? '2px solid #1976d2' : '2px solid transparent',
                        '&:hover': {
                          background: selectedProject.id === project.id ? '#e3f2fd' : '#f0f4fa',
                          boxShadow: 3,
                          border: selectedProject.id === project.id ? '2px solid #1976d2' : '2px solid #90caf9',
                        },
                      }}
                    >
                      <Checkbox
                        checked={project.status === 'Active'}
                        onClick={e => { e.stopPropagation(); handleStatusChange(project.id); }}
                        sx={{ mr: 1 }}
                        inputProps={{ 'aria-label': 'Project running status' }}
                      />
                      <Avatar sx={{ bgcolor: project.color, mr: 2 }}>{project.name[0]}</Avatar>
                      <ListItemText
                        primary={project.name}
                        secondary={
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip label={project.status} size="small" color={project.status === 'Active' ? 'success' : project.status === 'Planning' ? 'warning' : 'default'} />
                            <Typography variant="caption" color="text.secondary" component="span">Owner: {project.owner}</Typography>
                          </Stack>
                        }
                        secondaryTypographyProps={{ component: 'span' }}
                      />
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid component="div" sx={{ width: { xs: '100%', md: '100%' }, height: { xs: 'auto', md: '100%' } }}>
          <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(120deg, #f5f7fa 60%, #e3eafc 100%)' }}>
            <CardContent sx={{ flex: 1, overflow: 'auto' }}>
              <Typography variant="h6" color="secondary" gutterBottom align="center">
                Project Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                <b>Project:</b> {selectedProject.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                <b>Owner:</b> {selectedProject.owner} | <b>Status:</b> {selectedProject.status}
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 0, borderRadius: 2, mt: 2, maxHeight: { xs: 300, md: 'calc(100vh - 300px)' }, overflow: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ background: '#f0f4c3' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Task</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Assignee</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Progress (%)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedProject.details.map((detail) => (
                      <TableRow key={detail.id} hover>
                        <TableCell>{detail.task}</TableCell>
                        <TableCell>{detail.assignee}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${detail.progress}%`}
                            color={detail.progress === 100 ? 'success' : detail.progress > 50 ? 'primary' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={detail.status || 'Not Started'}
                            onChange={e => handleTaskStatusChange(selectedProject.id, detail.id, e.target.value)}
                            sx={{ minWidth: 120 }}
                          >
                            <MenuItem value="Not Started">Not Started</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Blocked">Blocked</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MasterDetailComplex;
