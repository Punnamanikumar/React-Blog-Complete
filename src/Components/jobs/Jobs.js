import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import Bottom from "../bottom/Bottom";

const Jobs = () => {
  const [jobs, setJobs] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("https://manikumar-react-blog-server.herokuapp.com/api/blog/")
      .then((res) => {
        setJobs(res.data);
      });
  }, []);

  return (
    <div>
      <h1 className="tollyh">Jobs</h1>
      <hr className="thhr" />
      {jobs
        .filter((render) => render.id > 8 && render.id < 13)
        .map((wood) => (
          <div key={jobs.imgt} className="tolly">
            <Link to={`/jobs/${wood.id}`} className="tolly">
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

export default Jobs;
