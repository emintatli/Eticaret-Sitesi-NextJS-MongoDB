const Kategori = () => {
  return (
    <>
    <div className="main-category">
      <div className="main-cards container d-flex ">
        <div className="card border border-3">
          <div className="card-body">
            <a href="/urun/telefon">
            <i className="fas fa-mobile fa-5x"></i>
            <br />
            Telefonlar
            </a>
          </div>
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/elektronik">
            <i className="fas fa-camera fa-5x"></i>
            <br />
            Elektronik
            </a>
          </div>
          
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/giyim">
            <i className="fas fa-tshirt fa-5x"></i>
            <br />
            Giyim
            </a>
          </div>
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/spor">
            <i className="fas fa-volleyball-ball fa-5x"></i>
            <br />
            Spor
            </a>
          </div>
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/kitap">
            <i className="fas fa-book fa-5x"></i>
            <br />
            Kitap
            </a>
          </div>
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/ev">
            <i className="fas fa-couch fa-5x"></i>
            <br />
            Ev
            </a>
          </div>
        </div>
        <div className="card border border-3">
          <div className="card-body">
          <a href="/urun/anne-bebek">
            <i className="fas fa-baby-carriage fa-5x"></i>
            <br />
            Anne,Bebek
            </a>
          </div>
        </div>
        <div className="card border border-3 ">
          <div className="card-body ">
          <a href="/urun/hediyelik">
            <i className="fas fa-gifts fa-5x"></i>
            <br />
            Hediyelik
            </a>
          </div>
        </div>
      </div>
      </div>
      <div className="mobile-category">
        <div className="container my-3">

        
       <ul class="list-group ">
      <li class="list-group-item"><a href="/urun/telefon"><i className="fas fa-mobile fa-sm"></i> Telefonlar</a></li>
       <li class="list-group-item"> <a href="/urun/elektronik"><i className="fas fa-camera fa-sm"></i> Elektronik</a></li>
        <li class="list-group-item"><a href="/urun/giyim"><i className="fas fa-tshirt fa-sm"></i> Giyim</a></li>
       <li class="list-group-item"><a href="/urun/spor"><i className="fas fa-volleyball-ball fa-sm"></i> Spor</a></li>
       <li class="list-group-item"><a href="/urun/kitap"><i className="fas fa-book fa-sm"></i> Kitap</a></li>
       <li class="list-group-item"><a href="/urun/ev"><i className="fas fa-couch fa-sm"></i> Ev</a></li>
       <li class="list-group-item"><a href="/urun/anne-bebek"><i className="fas fa-baby-carriage fa-sm"></i> Anne,Bebek</a></li>
       <li class="list-group-item"><a href="/urun/hediyelik"><i className="fas fa-gifts fa-sm"></i> Hediyelik</a></li>
        </ul>
        </div>
      </div>
    </>
  );
};

export default Kategori;
