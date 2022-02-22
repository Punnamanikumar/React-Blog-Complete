import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Bottom from "../bottom/Bottom";
import axios from "axios";

const Technology = () => {
  const [technology, setTechnology] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://manikumar-react-blog-server.herokuapp.com/api/blog/technology"
      )
      .then((res) => {
        setTechnology(res.data);
      });
  }, []);

  return (
    <div>
      <h1 className="tollyh">Technology</h1>
      <hr className="thhr" />
      {technology
        .filter((render) => render.id > 4 && render.id < 9)
        .map((tec) => (
          <div key={technology.id} className="tolly">
            <Link to={`/technology/${tec.id}`} className="tolly">
              <div className="tollyi">
                <img src={tec.img} alt="" />
              </div>
              <h3 className="tollyt">{tec.det}</h3>
            </Link>
            <h5 className="tollyd">{tec.date}</h5>
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

export default Technology;
