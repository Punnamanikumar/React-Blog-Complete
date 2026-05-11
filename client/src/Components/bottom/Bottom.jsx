import React from "react";
import { Link } from "react-router-dom";
import Loading from "../loader/Loading.jsx";
import { useLatestPosts } from "../../hooks/usePosts";

const Bottom = () => {
  const { data, isLoading, isError } = useLatestPosts();

  if (isLoading) return <div className="h1"><Loading /></div>;
  if (isError) return null;

  const bottomPosts = data?.posts?.slice(0, 3) || [];

  return (
    <div style={{ width: '100%', marginTop: '50px' }}>
      {bottomPosts.length !== 0 ? (
        <div>
          <div style={{ color: "red", fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>
            You May Also Like
          </div>
          <hr className="thhr" style={{ margin: '0 0 30px 0', width: '9%' }} />
          <div className="flex2" style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
            {bottomPosts.map((latest) => (
              <div className="hc1" key={latest._id} style={{ flex: 1, minWidth: 0, height: 'auto', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Link
                  to={`/${latest.category}/${latest.slug}`}
                  className="hcc1"
                  style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}
                >
                  <div className="himg" style={{ width: '100%', flexShrink: 0 }}>
                    <img src={latest.img || 'https://via.placeholder.com/500'} alt={latest.title} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
                    <div className="c1h3" style={{ marginBottom: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{latest.title}</h3>
                    </div>
                    <div className="c1h5" style={{ marginBottom: '5px' }}>
                      <h5 style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>{new Date(latest.createdAt).toLocaleDateString()}</h5>
                    </div>
                    <div className="c1h4" style={{ marginTop: 'auto' }}>
                      <h4 style={{ margin: 0, color: 'gray', textTransform: 'capitalize', fontSize: '0.9rem' }}>Category: {latest.category}</h4>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Bottom;
