import SimplePopover from "../PopOver";

const Indexmain1 = () => {
  return (
    <>
      <div className="container d-flex flex-row align-items-center">
        
        <ul className="list-group w-25 main-list main-ul">
          
          <SimplePopover icon="fas fa-dumbbell fa-lg me-2" />
          <SimplePopover icon="fas fa-camera fa-lg me-2" />
          <SimplePopover icon="fas fa-baby-carriage fa-lg me-2" />
          <SimplePopover icon="fas fa-arrow-circle-right fa-lg me-2" />
          <SimplePopover icon="fas fa-air-freshener fa-lg me-2" />
          <SimplePopover icon="fas fa-dumbbell fa-lg me-2" />
          <SimplePopover icon="fas fa-camera fa-lg me-2" />
          <SimplePopover icon="fas fa-baby-carriage fa-lg me-2" />
          <SimplePopover icon="fas fa-arrow-circle-right fa-lg me-2" />
          <SimplePopover icon="fas fa-air-freshener fa-lg me-2" />
          <SimplePopover icon="fas fa-arrow-circle-right fa-lg me-2" />
          <SimplePopover icon="fas fa-air-freshener fa-lg me-2" />
          
        </ul>
        
      <div className="pc">
      <div
          id="carouselExampleControls"
          className="carousel w-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ms-1">
            <div className="carousel-item active">
              <img
                src="/c1.jpg"
                height="495px"
                className="d-block w-100 "
                alt="..."
              />
              
            </div>
            <div className="carousel-item">
              <img
                src="/c2.png"
                height="495px"
                className="d-block  w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/c3.jpg"
                height="495px"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
       
    <div className="container mobile">
      
       

        
      <div
          id="carouselExampleControls"
          className="carousel w-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ms-1">
            <div className="carousel-item active">
              <img
                src="/mobile1.png"
                height="200px"
                className="d-block w-100 "
                alt="..."
              />
              
            </div>
            <div className="carousel-item">
              <img
                src="/mobile2.png"
                height="200px"
                className="d-block  w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="/mobile3.png"
                height="200px"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      
       



      </div>
      </div>
    </>
  );
};

export default Indexmain1;
