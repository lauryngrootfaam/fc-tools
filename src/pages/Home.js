import { useContext } from "react"
import { Link } from "react-router-dom"
import {UserContext} from '../UserContext'


function Home() {
  const {token, setToken} = useContext(UserContext);
  return (
    <>
    <div>Home</div>

    setToken
    <ul>
          {/* <li><Link to="/pac">Product availability check</Link></li> */}
          <li><Link to="/login">Login</Link></li>
    </ul>
    <div className="container">
  <div className="row row-cols-1 row-cols-md-2 g-4">
    <div className="col">
    <Link to="/pac">
      <div className="card">
        {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" className="card-img-top" alt="Hollywood Sign on The Hill" /> */}
        <div className="card-body">
          <h5 className="card-title">Product availability check</h5>
          <p className="card-text">
            This is a longer card with supporting text below as a natural lead-in to
            additional content. This content is a little bit longer.
          </p>
        </div>
      </div>
      </Link>
    </div>
  </div>
 
</div>


    </>
    
  )
}

export default Home