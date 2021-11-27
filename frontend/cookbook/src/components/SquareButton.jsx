/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const BrownButton = styled(Button)(() => ({
  backgroundColor: '#89623D',
  color: "#ffffff",
  borderRadius: '3px',
  border: 'none',
  width: '151px',
  height: '45px',
  '&:hover': {
    backgroundColor: '#89623D',
  },
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '500',
}));

function SquareButton({ name, onClick, disabled }) {
  return (
    <BrownButton variant= "outlined" onClick={onClick} disabled={disabled}>
      {name}
    </BrownButton>
  );
}

export default SquareButton;