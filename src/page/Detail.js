import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import './Detail.css';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Detail() {

  const { state } = useLocation();
  const { itemId, otherParam } = state;
  const [itemDetail] = useState(() => otherParam)
  const [alertContent, setAlertContent] = useState('Are you save to my bag')
  const [alertTitle, setAlertTitle] = useState('Congratution ! ')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [openDailog2nd, setOpenDailog2nd] = useState(false);
  const [random_boolean, setRandom_boolean] = useState(false);
  const [textInput, setTextInput] = useState(() => itemDetail.name);

  useEffect(() => {
    // setLoading(true)
    // fetch(`https://pokeapi.co/api/v2/pokemon/${itemId}`)
    //   .then((data) => data.json())
    //   .then((data) => {
    //     setitemDetail(data)
    //     setTimeout(() => {
    //       setLoading(false)
    //     }, 3000);
    //   })

  }, [itemId])

  const handleSave = () => {
    setOpen(false);

    if (random_boolean) {
      setOpenDailog2nd(true)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTextInput(event.target.value)
  }

  const handleCloseDailog2nd = (event) => {
    setOpenDailog2nd(false);
  };

  const handleSaveDailog2nd = (event) => {
    setOpenDailog2nd(false);
    var key = localStorage.length;
    localStorage.setItem(key++,
      JSON.stringify({
        "name": `${textInput}`,
        "image": `${itemDetail.sprites?.front_default || itemDetail.sprites?.back_default}`,
        "id": `${itemDetail.id}`,
        "height": `${itemDetail.height}`,
        "weight": `${itemDetail.weight}`
      }))
      ;
  };

  function catchPokemon() {
    setLoading(true)

    var random_boolean = Math.random() < 0.5;
    setRandom_boolean(random_boolean)

    setTimeout(() => {
      setLoading(false)
      setOpen(true);
    }, 3000);

    if (!random_boolean) {
      setAlertTitle('Good luck for you in next time ^^')
      setAlertContent('Are you try again ?')
    }
  }

  return (
    <>
      <div>
        <h1>{itemDetail.name}</h1>

        <div className='avt'>
          <Avatar className='avt_img' sx={{ bgcolor: grey['300'], width: 300, height: 300 }} alt={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} src={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} />
          <Button className='btn_Add' variant="contained" onClick={() => catchPokemon()}>ADD</Button>
        </div>

        <div className='sub-detail'>
          <div class="type large POKEMON_TYPE_GRASS"><b>Weight:</b>  {itemDetail.weight}</div>
          <div class="type large subtype POKEMON_TYPE_POISON"><b>Height:</b>  {itemDetail.height}</div>
        </div>

        <ul className='main-detail'>
          <li><b>Type:</b>
            <ul className='ul_3'>
              {itemDetail?.types?.map((item) => (
                <li key={item.id}>
                  <span>{item.type.name}</span>
                </li>
              ))}
            </ul>
          </li>
          <li><b>Abilities:</b>
            <ul className='ul_3'>
              {itemDetail?.abilities?.map((item) => (
                <li key={item.id}>
                  <span>{item.ability.name}</span>
                </li>
              ))}
            </ul>
          </li>
          <li><b>Move:</b>
            <ul className='ul_3'>
              {itemDetail?.moves?.map((item) => (
                <li key={item.id}>
                  <span>{item.move.name}</span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{alertTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {alertContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSave}>Agree</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDailog2nd}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{'Information Pokemon'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <h1>{itemDetail.name}</h1>

              <Avatar className='avt_img' sx={{ bgcolor: grey['300'], width: 300, height: 300 }} alt={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} src={itemDetail.sprites?.front_default || itemDetail.sprites?.back_default} />

              <div className='txtName'>
                <TextField
                  required
                  id="filled-required"
                  label="Change Name"
                  variant="filled"
                  value={textInput}
                  onChange={handleChange}
                />
              </div>

              <div className='sub-detail'>
                <div class="type large POKEMON_TYPE_GRASS"><b>Weight:</b>  {itemDetail.weight}</div>
                <div class="type large subtype POKEMON_TYPE_POISON"><b>Height:</b>  {itemDetail.height}</div>
              </div>

              <ul className='main-detail'>
                <li><b>Type:</b>
                  <ul className='ul_3'>
                    {itemDetail?.types?.map((item) => (
                      <li key={item.id}>
                        <span>{item.type.name}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDailog2nd}>Cancel</Button>
            <Button onClick={handleSaveDailog2nd}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
      {loading && <div className="loadingWrapper"><div className="lds-hourglass"></div></div>}
    </>
  );
}
