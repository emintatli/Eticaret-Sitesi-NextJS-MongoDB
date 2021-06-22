import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
        <div className="m-3">
      {props.type==="success"&&<Alert severity="success">{props.text}</Alert>}
      {props.type==="warning"&&<Alert severity="warning">{props.text}</Alert>}
      {props.type==="info"&&<Alert severity="info">{props.text}</Alert>}
      {props.type==="error"&&<Alert severity="error">{props.text}</Alert>}
      </div>
    </div>
  );
}
