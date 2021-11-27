import React from "react";
import PropTypes from 'prop-types';

import { makeStyles, styled } from '@mui/styles';
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFFFFF',
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  title: {
    marginTop: '15px',
    width: '90%',

    display: 'flex',
    flexDirection: 'row',

    color: 'rgba(0, 0, 0, 0.54)',
  },
})

const StyledToggleButtonGroup = styled(ToggleButtonGroup) ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '15px',
    border: 0,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    justifyContent: 'space-between',
  }
})


function DashboardOption({ value, callback, admin }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div className={classes.title}>
          <ViewHeadlineIcon fontSize='medium'/>
          <Typography>Dashboard</Typography>
        </div>
        <StyledToggleButtonGroup
          orientation="vertical"
          exclusive
          sx={{ width:'90%' }}
          value={value}
          onChange={callback}
        >
          <ToggleButton value="ORDERS">
            Orders
            <ArrowForwardIosIcon fontSize='inherit' />
          </ToggleButton>

          <ToggleButton value="RECIPES">
            Recipes
            <ArrowForwardIosIcon fontSize='inherit' />
          </ToggleButton>
          {admin &&
            <ToggleButton value="PRODUCTS">
              Products
              <ArrowForwardIosIcon fontSize='inherit' />
            </ToggleButton>
          }

          {admin &&
            <ToggleButton value="SALES">
              Sales
              <ArrowForwardIosIcon fontSize='inherit' />
            </ToggleButton>
          }

          <ToggleButton value="SETTINGS">
            Settings
            <ArrowForwardIosIcon fontSize='inherit' />
          </ToggleButton>
        </StyledToggleButtonGroup>
    </div>
  )
}

DashboardOption.propTypes = {
  value: PropTypes.string,
  callback: PropTypes.func,
  admin: PropTypes.bool,
}



export default DashboardOption;