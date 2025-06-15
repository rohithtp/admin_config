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
} from '@mui/material';
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';

// Dummy tree data
const treeData = [
  {
    id: '1',
    name: 'Fruits',
    children: [
      { id: '2', name: 'Apple' },
      { id: '3', name: 'Banana' },
      { id: '4', name: 'Orange' },
    ],
  },
  {
    id: '5',
    name: 'Vegetables',
    children: [
      { id: '6', name: 'Carrot' },
      { id: '7', name: 'Broccoli' },
    ],
  },
];

// Dummy table data
const tableData: Record<string, { id: number; detail: string }[]> = {
  '2': [{ id: 1, detail: 'Apple is red.' }],
  '3': [{ id: 2, detail: 'Banana is yellow.' }],
  '4': [{ id: 3, detail: 'Orange is orange.' }],
  '6': [{ id: 4, detail: 'Carrot is orange.' }],
  '7': [{ id: 5, detail: 'Broccoli is green.' }],
};

function renderTree(nodes: any) {
  return (
    <TreeItem key={nodes.id} itemId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: any) => renderTree(node))
        : null}
    </TreeItem>
  );
}

const TreeTablePage: React.FC = () => {
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
    <Box
      display="flex"
      gap={4}
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        minHeight: '80vh',
        background: `linear-gradient(135deg, ${theme.palette.background.default} 60%, ${theme.palette.primary.light} 100%)`,
        p: 4,
        borderRadius: 3,
        height: 500,
      }}
    >
      <Card sx={{ minWidth: 280, boxShadow: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h6" color="primary" gutterBottom align="center">
            Category Tree
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <SimpleTreeView
              selectedItems={selected}
              onSelectedItemsChange={(_e, itemId) => setSelected(itemId)}
              sx={{
                flex: 1,
                minHeight: 0,
                px: 1,
                py: 1,
                background: theme.palette.background.paper,
                borderRadius: 1,
                overflow: 'auto',
              }}
            >
              {treeData.map((node) => renderTree(node))}
            </SimpleTreeView>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, boxShadow: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Typography variant="h6" color="primary" gutterBottom align="center">
            Details Table
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer component={Paper} sx={{ boxShadow: 0, borderRadius: 2, flex: 1, minHeight: 0, overflow: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ background: theme.palette.action.hover }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Detail</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getSelectedTableRows().length > 0 ? (
                  getSelectedTableRows().map((row: { id: number; detail: string }) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.detail}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
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
  );
};

export default TreeTablePage;
