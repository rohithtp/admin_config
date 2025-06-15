import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
    <Box display="flex" gap={4}>
      <Box minWidth={240}>
        <Typography variant="h6">Tree</Typography>
        <SimpleTreeView
          selectedItems={selected}
          onSelectedItemsChange={(_e, itemId) => setSelected(itemId)}
        >
          {treeData.map((node) => renderTree(node))}
        </SimpleTreeView>
      </Box>
      <Box flex={1}>
        <Typography variant="h6">Details Table</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Detail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getSelectedTableRows().length > 0 ? (
                getSelectedTableRows().map((row: { id: number; detail: string }) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.detail}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Select a leaf node to see details
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TreeTablePage;
