import List from "../../components/List";
import {MongoClient} from "mongodb";
export async function getServerSideProps(context){
  const urlId= context.params.kategori ;
	const req= context.req;
	const res = context.res; // incoming request things
  const uri ="MONGO_DB_ADRESS";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  try{
    await client.connect();
    const database = client.db("alisveris_db");
    const movies = database.collection("urunler");
    const finder=await movies.find({category:urlId}).toArray().then(docs =>docs)
  
    console.log(finder)
    if(finder){
      
      await client.close();
      return{
        props:{
        urun:JSON.stringify(finder) ,
        kategori:urlId,
        }
        }
      
    }
    else{
      console.log("not found")
    }
  }
  catch(err){
    console.log(err.toString())
  }

    
  }

const Kategori = (props) => {
  return (
    <>
      <div className="container card noshadow">
        <div className="card-body">
         

          <div className="card">
          <ul className="p-3">
            <li>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Kategori</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{props.kategori}</a>
                  </li>
                  
                </ol>
              </nav>
            </li>
            
          </ul>
            <div className="card-body">
              <List urun={JSON.parse(props.urun)}/>

              <nav aria-label="navigation">
                <ul className="pagination p-3 d-flex justify-content-center">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Kategori;
