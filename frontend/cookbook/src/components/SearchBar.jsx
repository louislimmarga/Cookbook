import React, { useState } from "react";
import PropTypes from 'prop-types';

import {InputBase, IconButton, Popper, Fade, Paper, Typography, ClickAwayListener, Button, Chip} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({
  root: {
    background: '#FFFFFF',
    borderRadius: '50px',
    width: '667px',
    padding: '1px 10px 1px 15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  popper: {
    zIndex: 11,
    width: '667px',
    
  },
  paper: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
  },
}));

function SearchBar({ width, placeholder, border, searchFunc, setSelected, labelOption }) {
  const [ search, setSearch ] = useState('');
  const [anchorEl, setAnchorEl] = useState('searchRoot');
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(false);
  const classes = useStyles();

  const handleSearch = () => {
    if (setSelected !== undefined) {
      setSelected({
        isSelected: false,
        product_id: '',
      })
    }
    if (label !== '') {
      label ? searchFunc(search, true) : searchFunc(search);
    }
  }

  const handleEnter = (e) => {
    if(e.key === 'Enter') {
      if (setSelected !== undefined) {
        setSelected({
          isSelected: false,
          product_id: '',
        })
      }
      if (label !== '') {
        label ? searchFunc(search, true) : searchFunc(search);
      }
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div id="searchRoot"className={classes.root} style={{ width: width, border: border }}>
        <Popper open={labelOption && open && !label} anchorEl={anchorEl} placement="bottom-start" transition className={classes.popper}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className={classes.paper}>
                <Typography sx={{ p: 2 }}>Search recipe with:</Typography>
                <Button variant="outlined" sx={{textTransform: 'none', marginRight: '5px', color: '#FE793D', border: '1px solid #E97048', fontWeight: 'bold'}} onClick={() => setLabel(true)}>Label</Button>
              </Paper>
            </Fade>
          )}
        </Popper>
        {label ? <Chip label="Label" onDelete={() => setLabel(false)} sx={{marginTop: '3px', marginRight: '3px'}}/> : null}
        <InputBase placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} sx={{width:'100%'}} onKeyPress={handleEnter} onFocus={handleClick}/>
        <IconButton type="submit" sx={{ padding: '7px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
        </IconButton>
      </div>
    </ClickAwayListener>
  );
}

SearchBar.propTypes = {
  width: PropTypes.string,
  placeholder: PropTypes.string,
  border: PropTypes.string,
  searchFunc: PropTypes.func,
  setSelected: PropTypes.func,
  labelOption: PropTypes.bool,
}

export default SearchBar;