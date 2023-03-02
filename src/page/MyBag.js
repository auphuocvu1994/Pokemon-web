import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import './Home.css'


export default function Home() {
  const [rows,setRows] = useState([])

  useEffect(() => {
    const list = []

    for (let index = 0; index < localStorage.length; index++) {
      const element = localStorage.getItem(index);
      list.push({ index: index, detailItem: JSON.parse(element) })
    }
    setRows(list)
  }, [rows])

  const removeItem = (index) => {
    localStorage.removeItem(index)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Name</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="right">Height&nbsp;(g)</TableCell>
            <TableCell align="right">Weight&nbsp;(g)</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.detailItem.name}
              </TableCell>
              <TableCell align="right"><ImageListItem sx={{ width: 96, height: 96 }} key={rows.id}>
                <Avatar sx={{ bgcolor: grey['300'], width: 56, height: 56 }} alt={row.detailItem.image} src={row.detailItem.image} />
                {/* <img
                  src={row.detailItem.image}
                  alt={row.detailItem.image}
                  loading="lazy"
                /> */}
                <ImageListItemBar position="below" />
              </ImageListItem></TableCell>
              <TableCell align="right">{row.detailItem.height}</TableCell>
              <TableCell align="right">{row.detailItem.weight}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => removeItem(row.index)} aria-label="Example">
                  <DeleteForeverIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
