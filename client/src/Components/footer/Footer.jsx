import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLatestPosts } from "../../hooks/usePosts";

const Footer = () => {
  const [load, setload] = useState(false);
  
  // Use local backend instead of old render API
  const { data } = useLatestPosts();
  
  const footerPosts = data?.posts?.slice(6, 10) || [];

  const loadMore = () => {
    setload(true);
  };
  const loadLess = () => {
    setload(false);
  };

  // If there are no posts after index 6, loop back to the beginning just for UI testing purposes
  const displayPosts = footerPosts.length > 0 ? footerPosts : (data?.posts?.slice(0, 3) || []);

  if (!data?.posts || data.posts.length === 0) return null;

  return (
    <div style={{ width: '100%', marginTop: '50px' }}>
      <div>
        {load ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              {displayPosts.map((latest, index) => (
                <React.Fragment key={`${latest._id}-${index}`}>
                  <div style={{ marginBottom: "20px" }}>
                    <Link to={`/${latest.category}/${latest.slug}`} style={{ display: "flex", gap: "20px", textDecoration: "none", color: "black", alignItems: "center", transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}>
                      <div style={{ flexShrink: 0 }}>
                        <img src={latest.img || 'https://placehold.co/400x300?text=No+Image'} alt={latest.title} style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "24px", marginBottom: "10px", marginTop: "0" }}>{latest.title}</h3>
                        <h5 style={{ color: "gray", fontSize: "16px", margin: "5px 0" }}>{new Date(latest.createdAt).toLocaleDateString()}</h5>
                        <h4 style={{ color: "gray", fontSize: "16px", textTransform: 'capitalize', margin: "0" }}>Category: {latest.category}</h4>
                      </div>
                    </Link>
                  </div>
                  <hr className="f50per" style={{ margin: "20px 0", width: '100%', border: 'none', borderTop: '1px solid #eaeaea' }} />
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
              <button
                className="loadmore"
                style={{ padding: '15px 40px', cursor: 'pointer', borderRadius: '30px', backgroundColor: '#e74c3c', color: 'white', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(231, 76, 60, 0.3)', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} 
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                onClick={loadLess}
              >
                LoadLess
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
            <button
              className="loadmore"
              style={{ padding: '15px 40px', cursor: 'pointer', borderRadius: '30px', backgroundColor: '#232eca', color: 'white', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(35, 46, 202, 0.3)', transition: 'transform 0.2s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} 
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              onClick={loadMore}
            >
              LoadMore
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
