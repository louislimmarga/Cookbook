import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';

import OrderCard from "./OrderCard";

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '95%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    margin: '30px',

    overflow: 'hidden',
  },
})

function DashboardContainer({ data, handleMove, admin }) {
  const classes = useStyles();
  const [lst, setLst] = useState([]);

  React.useEffect(() => {
    setLst(data);
  }, [data])

  return (
    <div className={classes.root}>
        {lst.map((data, index) => {
          return (
            <OrderCard key={index} order={data} handleMove={handleMove} admin={admin}/>
          )
        })}
    </div>
  )
}

DashboardContainer.propTypes = {
  data: PropTypes.array,
  handleMove: PropTypes.func,
  admin: PropTypes.bool,
}

export default DashboardContainer;