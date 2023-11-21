import React from 'react';
import { CircularProgress, Grid } from '@mui/material';

export const Loading = () => {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh'
      }}
    >
      <CircularProgress />
    </Grid>
  );
};
