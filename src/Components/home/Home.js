import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Loading from "../loader/Loading";

const Home = () => {
  const [home, setHome] = useState([]);

  useEffect(() => {
    axios
      .get("https://manikumar-react-blog-server.herokuapp.com/api/blog")
      .then((res) => {
        setHome(res.data);
      });
  }, []);
  return (
    <div>
      {home.length!=0 ?
          <div className="h1">
           <div className="grid1">
            <Link to="/nature/13" className="one">
              <img src="https://media.cntraveler.com/photos/60596b398f4452dac88c59f8/16:9/w_3999,h_2249,c_limit/MtFuji-GettyImages-959111140.jpg" alt="" />
              <div className="onet"> Look deep into nature, and then you will understand everything better.</div>
            </Link>
            {home.filter((disp) => disp.id === "10").map((job) => (
                <Link to={`/jobs/${job.id}`} className="two">
                  <img src={job.img} alt="" />
                  <div className="twot"> Hyderabad: <br /> Good news for job seekers</div>
                </Link>
            ))}
            {home.filter((disp) => disp.id === "5").map((tec) => (
                <Link to={`/technology/${tec.id}`} className="three">
                  <img src={tec.img} alt="" />
                  <div className="threet"> Samsung Galaxy <br /> S22 Series</div>
                </Link>
            ))}
           </div>
    
           <div className="homelate2">
            <div className="thelate">The Latest</div>
            <hr className="hlhr" />
            <div className="flex2">
              <div className="hc1">
                {home.filter((data) => data.id === "1").map((latest) => (
                    <Link to={`/tollywood/${latest.id}`} key={latest.id} className="hcc1">
                      <div className="himg"><img src={latest.img} alt="" /></div>
                      <div className="c1h3"><h3>{latest.det}</h3></div>
                      <div className="c1h5"><h5>{latest.date}</h5></div>
                      <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                    </Link>
                ))}
              </div>
              <div className="hc1">
                {home.filter((data) => data.id === "5").map((latest) => (
                    <Link to={`/technology/${latest.id}`} key={latest.id} className="hcc1">
                     <div className="himg"><img src={latest.img} alt="" /></div>
                     <div className="c1h3"><h3>{latest.det}</h3></div>
                     <div className="c1h5"><h5>{latest.date}</h5></div>
                     <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                    </Link>
                ))}
              </div>
              <div className="hc1">
                {home.filter((data) => data.id === "9").map((latest) => (
                    <Link to={`/jobs/${latest.id}`} key={latest.id} className="hcc1">
                      <div className="himg"><img src={latest.img} alt="" /></div>
                      <div className="c1h3"><h3>{latest.det}</h3></div>
                      <div className="c1h5"><h5>{latest.date}</h5></div>
                      <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                    </Link>
                ))}
              </div><br />
            </div>
            <div style={{ marginLeft: "-8.5%" }} className="homefooter">
              <Footer />
            </div>
            <div className="flex3">
              <div className="advs">
                <img src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/03/radhe-shyam-001.jpg" className="advr" alt="" />
              </div><br />
    
              <div>Latest Articles</div>
              <hr className="hlhr" />
              <div className="hc2">
                {home.filter((data) => data.id === "2").map((latest) => (
                    <Link to={`/tollywood/${latest.id}`} key={latest.id} className="hcc2">
                      <div className="tollyi"><img src={latest.img} alt="" /></div>
                      <div className="tollyt"><h3>{latest.det}</h3></div>
                      <div className="c2h5 rc2h5"><h5>{latest.date}</h5></div>
                      <div className="c1h7 rc1h7"><h4>Category: {latest.category}</h4></div>
                    </Link>
                ))}
              </div>
              <hr className="f50per" />
              <div className="hc2">
                {home.filter((data) => data.id === "6").map((latest) => (
                    <Link to={`/technology/${latest.id}`} key={latest.id} className="hcc2">
                      <div className="tollyi"> <img src={latest.img} alt="" /> </div>
                      <div className="tollyt"> <h3>{latest.det}</h3> </div>
                      <div className="c2h5 rc2h5"><h5>{latest.date}</h5></div>
                      <div className="c1h7 rc1h7"><h4>Category: {latest.category}</h4></div>
                    </Link>
                ))}
              </div>
              <hr className="f50per" />
              <div className="hc2">
                {home.filter((data) => data.id === "9").map((latest) => (
                    <Link to={`/nature/${latest.id}`} key={latest.id} className="hcc2">
                      <div className="tollyi"><img src={latest.img} alt="" /></div>
                      <div className="tollyt"><h3>{latest.det}</h3></div>
                      <div className="c2h5 rc2h5"><h5>{latest.date}</h5></div>
                      <div className="c1h7 rc1h7"><h4>Category: {latest.category}</h4></div>
                    </Link>
                 ))}
              </div><br />
            </div>
           </div>
         </div> :<Loading/>}
    </div>
  );
};

export default Home;
