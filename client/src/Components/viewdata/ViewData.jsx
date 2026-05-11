import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Bottom from "../bottom/Bottom.jsx";
import Loading from "../loader/Loading.jsx";
import { usePostDetails } from "../../hooks/usePosts";

const ViewData = () => {
  const { slug } = useParams();
  
  // Fetch specific post using slug
  const { data, isLoading, isError } = usePostDetails(slug);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [slug]);

  if (isLoading) return <Loading />;
  if (isError || !data?.post) {
    return <div style={{textAlign: "center", color: "red", marginTop: "50px", fontSize: "24px"}}>Post not found.</div>;
  }

  const post = data.post;

  return (
    <div>
      <div className="viewdata" style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <h1 className="vih1" style={{ textTransform: "capitalize", marginLeft: 0 }}>{post.category}</h1>
        <hr className="thhr" style={{ marginLeft: 0, marginBottom: '40px' }} />
        
        {/* Article Header */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 20px 0', lineHeight: '1.2', fontFamily: '"Poppins", sans-serif', color: '#111' }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', padding: '15px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ color: '#555', fontSize: '1.1rem', fontWeight: 'bold' }}>
                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span style={{ color: '#aaa' }}>•</span>
              <span style={{ color: '#232eca', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                {post.category}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '1.2rem', color: '#555' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-eye" style={{ color: '#888' }}></i>
                <span style={{ fontWeight: 'bold' }}>{post.views || 0}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ cursor: 'pointer', transition: 'transform 0.2s', display: 'inline-block' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                  👏
                </span>
                <span style={{ fontWeight: 'bold' }}>{post.likes?.length || 500}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Article Body */}
        <div className="viewD" style={{ margin: '0', width: '100%', border: 'none', boxShadow: 'none' }}>
          <div>
            <div className="vimg" style={{ margin: '0 0 40px 0', width: '100%' }}>
              <img src={post.img || 'https://via.placeholder.com/1000x500'} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '20px', margin: '0', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
            </div>
            
            <div className="vp" style={{ margin: '0', width: '100%', fontSize: '1.3rem', lineHeight: '1.9', color: '#333', fontFamily: '"Outfit", sans-serif', textAlign: 'left' }}>
              <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{post.content}</p>
            </div>
          </div>
        </div>
        
        <div className="viewbottom" style={{ marginTop: '60px' }}>
          <Bottom />
        </div>
      </div>
    </div>
  );
};

export default ViewData;
