import React, { useState, useEffect } from 'react'
import ItemDetail from '../component/ItemDetail';
import BackpackIcon from '@mui/icons-material/Backpack';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from '@mui/material/List';
import './Home.css'

export default function Home() {
  const [tableData, setTableData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
      .then((data) => data.json())
      .then((data) => setTableData(data.results))

  }, [])
  // console.log(tableData)

  return (
    <>
      <IconButton className='btnMybag' onClick={() => navigate(`/pokemon/mybag`)} aria-label="Example">
        <BackpackIcon color="primary" /> Mybag
      </IconButton>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {tableData.map((item) => (
          // <li  key={item.id}>
            <ItemDetail key={item.id} itemDetail={item}></ItemDetail>
          // </li>
        ))}
      </List>
    </>
  );
}
