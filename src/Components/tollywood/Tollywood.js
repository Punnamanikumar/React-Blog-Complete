import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bottom from "../bottom/Bottom";
import axios from "axios";

const Tollywood = () => {
  const [tolly, setTolly] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://manikumar-react-blog-server.herokuapp.com/api/blog/tollywood"
      )
      .then((res) => {
        console.log(res);
        setTolly(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div>
      <h1 className="tollyh">TollyWood</h1>
      <hr className="thhr" />
      {tolly
        .filter((render) => render.id < 5)
        .map((wood) => (
          <div key={tolly.id} className="tolly">
            <Link to={`/tollywood/${wood.id}`} className="tolly">
              <div className="tollyi">
                <img src={wood.img} alt="" />
              </div>
              <h3 className="tollyt">{wood.det}</h3>
            </Link>
            <h5 className="tollyd">{wood.date}</h5>
            <hr />
          </div>
        ))}

      <div className="adv">
        <img
          src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/03/radhe-shyam-001.jpg"
          className="adv"
          alt=""
        />
      </div>
      <br />
      <button className="loadmore">LoadMore</button>
      <Bottom />
    </div>
  );
};

export default Tollywood;
