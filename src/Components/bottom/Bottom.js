import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bottom = () => {
  const [bottom, setBottom] = useState([]);
  useEffect(() => {
    axios
      .get("https://manikumar-react-blog-server.herokuapp.com/view/latest")
      .then((res) => {
        setBottom(res.data);
        // console.log(res.data, "resss");
      });
  }, []);
  return (
    <div className="h1">
      <div>
        <div style={{ margin: "2% 2% 2% 0%", color: "red" }}>
          You May Also Like
        </div>
        <hr className="thhr" style={{ marginLeft: "15px" }} />
        <div className="flex2">
          <div className="hc1">
            {bottom
              .filter((data) => data.id === "4")
              .map((latest) => (
                <Link to={`/tollywood/${latest.id}`} key={bottom.id} className="hcc1">
                  <div className="himg"><img src={latest.img} alt="" /></div>
                  <div className="c1h3"><h3>{latest.det}</h3></div>
                  <div className="c1h5"><h5>{latest.date}</h5></div>
                  <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                </Link>
              ))}
          </div>
          <div className="hc1">
            {bottom.filter((data) => data.id === "7").map((latest) => (
                <Link to={`/technology/${latest.id}`} key={bottom.id} className="hcc1">
                  <div className="himg"><img src={latest.img} alt="" /></div>
                  <div className="c1h3"><h3>{latest.det}</h3></div>
                  <div className="c1h5"><h5>{latest.date}</h5></div>
                  <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                </Link>
              ))}
          </div>
          <div className="hc1">
            {bottom.filter((data) => data.id === "11").map((latest) => (
                <Link to={`/jobs/${latest.id}`} key={bottom.id} className="hcc1">
                  <div className="himg"><img src={latest.img} alt="" /></div>
                  <div className="c1h3"><h3>{latest.det}</h3></div>
                  <div className="c1h5"><h5>{latest.date}</h5></div>
                  <div className="c1h4"><h4>Category: {latest.category}</h4></div>
                </Link>
              ))}
          </div><br />
        </div>
      </div>
    </div>
  );
};

export default Bottom;
