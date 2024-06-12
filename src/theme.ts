'use client';
import React from "react";
// import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
// import RouterLink, { LinkProps as RouterLinkProps } from 'next/link';
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#969696'
    },
    secondary: {
      main: '#dbefd1'
    }
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          background: 'white'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 24
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiListItemButton-root': {
            // paddingLeft: 10,
          }
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({theme}) => ( {
          borderRadius: 5,
          '&:hover': {
            background: theme.palette.secondary.main,
          }
        })
      }
    }
  },
});

export default theme;
