import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <li
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="list-group-item list-group-item-action d-flex align-items-center"
      >
        <i className={props.icon}></i> An active item{" "}
        <i className="fas fa-chevron-right ms-auto"></i>
      </li>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <>
          <div className="d-flex">
            <div className="w-50">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">An item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A second item</li>
                <li className="list-group-item">A third item</li>
                <li className="list-group-item">A third item</li>
              </ul>
            </div>
            <div className="d-flex flex-row">
              <div className="card">
                <img
                  src="/brands/apple.webp"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button type="button" className="btn btn-outline-info">
                    Info
                  </button>
                </div>
              </div>
              <div className="card">
                <img
                  src="/brands/apple.webp"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button type="button" className="btn btn-outline-info">
                    Info
                  </button>
                </div>
              </div>
              <div className="card">
                <img
                  src="/brands/apple.webp"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body d-flex flex-column">
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <button type="button" className="btn btn-outline-info">
                    Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      </Popover>
    </div>
  );
}
