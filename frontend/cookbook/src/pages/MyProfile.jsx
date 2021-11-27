import React, { useState } from "react";
import { Stack } from "@mui/material";

import Navbar from "../components/Navbar";
import MyProfilePicture from "../components/MyProfile/MyProfilePicture";
import DashboardOption from "../components/MyProfile/DashboardOption";
import OrderDashboard from "../components/MyProfile/OrderDashboard";
import RecipeDashboardAdmin from "../components/MyProfile/RecipeDashboardAdmin";
import RecipeDashboardUser from "../components/MyProfile/RecipeDashboardUser";
import ProductDashboard from "../components/MyProfile/ProductDashboard";
import SettingsDashboard from "../components/MyProfile/SettingsDashboard";
import SalesDashboard from "../components/MyProfile/SalesDashboard";

function MyProfile() {
  const [option, setOption] = useState('ORDERS');
  const [admin, setAdmin] = useState(false);

  React.useEffect(() => {
    fetch('http://127.0.0.1:5000/admin/check', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("cookbook-token"),
        Accept: 'applicaton/json',
        'Content-Type': 'application/json'
      },
    }).then((data) => {
      if (data.status === 200) {
        data.json().then((res) => {
          setAdmin(res.admin);
        })
      }
    })
  }, [])

  const handleOption = (event, newOption) => {
    if (newOption !== null) {
      setOption(newOption);
    }
  }

  return (
    <div style={{ backgroundColor:'#F9FAF9', minHeight: '100vh' }}>
      <Navbar />
      <Stack
        spacing={5}
        sx={{ backgroundColor:'#F9FAF9' }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ width: '100%', margin: '50px auto ' }}
          spacing={5}
        >
          <Stack
            alignItems="center"
            pt={15}
            spacing={5}
          >
            <MyProfilePicture />
            <DashboardOption value={option} callback={handleOption} admin={admin}/>
          </Stack>
          <Stack
            alignItems="center"
            pt={15}
            sx={{ width: '60vw' }}
          >
            {option === 'ORDERS' && <OrderDashboard admin={admin} />}
            {option === 'RECIPES' && admin && <RecipeDashboardAdmin />}
            {option === 'RECIPES' && !admin && <RecipeDashboardUser />}
            {option === 'PRODUCTS' && <ProductDashboard />}
            {option === 'SALES' && <SalesDashboard />}
            {option === 'SETTINGS' && <SettingsDashboard />}
          </Stack>
        </Stack>
      </Stack>
    </div>
  )
}

export default MyProfile;