import './ItemDetail.css';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';

function ItemDetail(props) {
  const navigate = useNavigate();

  // const [url, setUrl] = useState(props.url)
  const [itemDetail, setitemDetail] = useState([])

  useEffect(() => {
    fetch(props.itemDetail.url)
      .then((data) => data.json())
      .then((data) => setitemDetail(data))
  }, [props.itemDetail.url])

  return (
    <>
      <ListItem alignItems="center">
        <ListItemAvatar sx={{ marginRight:2 }}>
          <Avatar sx={{ bgcolor: grey['300'], width: 56, height: 56 }} alt={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} src={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} />
        </ListItemAvatar>
        <ListItemText
          primary={itemDetail.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Exp: {itemDetail.base_experience}

                <Button onClick={() => navigate(`/pokemon/detail/${itemDetail.id}`, {
                state: { itemId: itemDetail.id, otherParam: itemDetail }
              })}>more</Button>
              </Typography>
              <br></br>
              
              
            </React.Fragment>
          }
        />
      </ListItem>
      {/* <Divider variant="inset" component="li" /> */}
    </>
    
    // <div>
    //   <h1>{value.name}</h1>
    //   <ul>
    //     <img src={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default}></img>
    //     <li><b>Name:</b> {props.itemDetail.name}</li>
    //     <li><b>Base Experience:</b>  {itemDetail.base_experience}</li>
    //     <li> <button onClick={() => navigate(`/pokemon/detail/${itemDetail.id}`, {
    //       state: { itemId: itemDetail.id, otherParam: itemDetail }
    //     })}>More Information</button> </li>
    //   </ul>
    // </div>
  );
}

export default ItemDetail;
