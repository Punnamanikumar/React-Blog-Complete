import axios from "axios";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import Bottom from "../bottom/Bottom";
import Loading from "../loader/Loading";

const ViewCategory = () => {
  const [categoryData, setCategoryData] = React.useState([]);
  const { category } = useParams();
  React.useEffect(() => {
    axios
      .get(
        `https://manikumar-react-blog-server.onrender.com/api/blog/${category}`
      )
      .then((res) => {
        setCategoryData(res.data);
      });
  }, [category]);
  return (
    <div>
      {category.length !== 0 ? (
        <div className="categorydiv">
          <h1 className="tollyh">{category}</h1>
          <hr className="thhr" />
          {categoryData.map((wood) => (
            <div key={wood.imgt} className="tolly">
              <Link to={`/${category}/${wood.id}`} className="tolly">
                <div className="tollyi">
                  <img src={wood.img} alt="" />
                </div>
                <h3 className="tollyt">{wood.det}</h3>
              </Link>
              <h5 className="tollyn">{wood.date}</h5>
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
          <div className="viewbott">
            <Bottom />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ViewCategory;
