import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import Bottom from "../bottom/Bottom";
import Loading from "../loader/Loading";

const Jobs = () => {
  const [jobs, setJobs] = React.useState([]);
  React.useEffect(() => {
    axios.get("https://manikumar-react-blog-server.herokuapp.com/api/blog/jobs").then((res) => {
        setJobs(res.data);
      });
  }, []);
  return (
    <div>{(jobs.length!=0) ?
     <div className="categorydiv">
          <h1 className="tollyh">Jobs</h1>
          <hr className="thhr" />
          {jobs.map((wood) => (
          <div key={wood.imgt} className="tolly">
              <Link to={`/jobs/${wood.id}`} className="tolly">
                <div className="tollyi"><img src={wood.img} alt="" /></div>
                <h3 className="tollyt">{wood.det}</h3>
              </Link>
              <h5 className="tollyn">{wood.date}</h5><hr />
          </div>
          ))}
          <div className="adv">
            <img src="https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/03/radhe-shyam-001.jpg" className="adv" alt="" />
          </div><br />
          <button className="loadmore">LoadMore</button>
          <div className='viewbott'><Bottom/></div>
      </div> :<Loading/>}
    </div>
  );
};

export default Jobs;
