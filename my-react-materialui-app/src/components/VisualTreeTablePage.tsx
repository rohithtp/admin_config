import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Divider,
  useTheme,
  Chip,
  Fade,
  Tooltip,
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';
import CategoryIcon from '@mui/icons-material/Category';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Dummy tree data
const treeData = [
  {
    id: '1',
    name: 'Fruits',
    icon: <EmojiNatureIcon color="success" />,
    children: [
      { id: '2', name: 'Apple' },
      { id: '3', name: 'Banana' },
      { id: '4', name: 'Orange' },
    ],
  },
  {
    id: '5',
    name: 'Vegetables',
    icon: <RestaurantIcon color="warning" />,
    children: [
      { id: '6', name: 'Carrot' },
      { id: '7', name: 'Broccoli' },
    ],
  },
];

// Dummy table data
const tableData: Record<string, { id: number; detail: string; tag: string; color: string }[]> = {
  '2': [{ id: 1, detail: 'Apple is red.', tag: 'Fruit', color: 'success' }],
  '3': [{ id: 2, detail: 'Banana is yellow.', tag: 'Fruit', color: 'warning' }],
  '4': [{ id: 3, detail: 'Orange is orange.', tag: 'Fruit', color: 'error' }],
  '6': [{ id: 4, detail: 'Carrot is orange.', tag: 'Vegetable', color: 'warning' }],
  '7': [{ id: 5, detail: 'Broccoli is green.', tag: 'Vegetable', color: 'success' }],
};

function renderTree(nodes: any) {
  return (
    <TreeItem key={nodes.id} itemId={nodes.id} label={
      <Box display="flex" alignItems="center" gap={1}>
        {nodes.icon && nodes.icon}
        <span>{nodes.name}</span>
      </Box>
    }>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );
}

const VisualTreeTablePage: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const theme = useTheme();

  const getAllLeafIds = (node: any): string[] => {
    if (!node.children) return [node.id];
    return node.children.flatMap(getAllLeafIds);
  };

  const getSelectedTableRows = () => {
    if (!selected) return [];
    // If a root node is selected, show all its leaf children
    const rootNode = treeData.find((n) => n.id === selected);
    if (rootNode && rootNode.children) {
      // Collect all leaf ids under this root
      const leafIds = getAllLeafIds(rootNode).filter((id) => tableData[id]);
      return leafIds.flatMap((id) => tableData[id]);
    }
    // Otherwise, show the selected leaf node's data
    return tableData[selected] || [];
  };

  return (
    <Fade in timeout={600}>
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          minHeight: '80vh',
          background: `linear-gradient(120deg, ${theme.palette.background.default} 60%, ${theme.palette.secondary.light} 100%)`,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Card sx={{ minWidth: 300, boxShadow: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6" color="secondary" gutterBottom align="center">
              <CategoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Visual Category Tree
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <SimpleTreeView
              selectedItems={selected}
              onSelectedItemsChange={(_e, itemId) => setSelected(itemId)}
              sx={{
                minHeight: 320,
                px: 1,
                py: 1,
                background: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              {treeData.map((node) => renderTree(node))}
            </SimpleTreeView>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, boxShadow: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
          <CardContent>
            <Typography variant="h6" color="secondary" gutterBottom align="center">
              Details Table (Visual)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TableContainer component={Paper} sx={{ boxShadow: 0, borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: theme.palette.action.hover }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Detail</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Tag</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSelectedTableRows().length > 0 ? (
                    getSelectedTableRows().map((row: { id: number; detail: string; tag: string; color: string }) => (
                      <TableRow key={row.id} hover>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <Tooltip title={row.detail} arrow>
                            <span>{row.detail}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Chip label={row.tag} color={row.color as any} size="small" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Typography color="text.secondary" variant="body2">
                          Select a category or item to see details
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default VisualTreeTablePage;
