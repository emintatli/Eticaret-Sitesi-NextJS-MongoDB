import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Link from 'next/link'
import {useState} from "react"

import { useRouter } from "next/router";

export default function SimpleBottomNavigation() {
  const router = useRouter();
  const onLink = (href) => {
    router.push(href);
  };
     
      const useStyles = makeStyles({
        root: {
          width: 300,
          height:50
        },
      });
    

  


  return (
    <BottomNavigation
      
      onChange={(event, newValue) => {
        
      }}
      showLabels
      
    >
    <BottomNavigationAction label="Mağaza" icon={<StorefrontIcon />} onClick={() => onLink("/")} />
    <BottomNavigationAction label="Sepet" icon={<ShoppingBasketIcon />} onClick={() => onLink("/sepet")} />
    <BottomNavigationAction label="Hesabım" icon={<AccountCircleIcon />} onClick={() => onLink("/uye/profil")} />
      
     
    </BottomNavigation>
  );
}
