import React, { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const Latest = () => {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    axios
      .get("https://manikumar-react-blog-server.herokuapp.com/api/latest")
      .then((res) => {
        setLatest(res.data);
      });
  }, []);
  return (
    <div>
      <div>The Latest</div>
      <hr className="hlhr" />
      <div className="flex2">
        <div className="hc1">
          {latest.map((latest) => (
              <Link to={`/tollywood/${latest.id}`} key={latest.id} className="hcc1">
                <div className="himg"><img src={latest.img} alt="" /></div>
                <div className="c1h3"><h3>{latest.det}</h3></div>
                <div className="c1h5"><h5>{latest.id}</h5></div>
                <div className="c1h4"><h4>Category: {latest.category}</h4></div>
              </Link>
            ))}
        </div><br />
      </div>
      <div style={{ marginLeft: "-8.5%", marginTop: "2%" }}><Footer /></div>
    </div>
  );
};

export default Latest;
