import React from "react";
import { Link, useParams } from "react-router-dom";
import Bottom from "../bottom/Bottom.jsx";
import Loading from "../loader/Loading.jsx";
import { usePosts } from "../../hooks/usePosts";

const ViewCategory = () => {
  const { category } = useParams();
  
  // Use React Query hook based on the URL parameter
  const { data, isLoading, isError } = usePosts(category);

  if (isLoading) return <Loading />;
  if (isError) return <div style={{textAlign: "center", color: "red", marginTop: "50px"}}>Failed to load posts.</div>;

  const categoryData = data?.posts || [];

  return (
    <div>
      <div className="categorydiv" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 className="tollyh" style={{ marginLeft: 0 }}>{category}</h1>
        <hr className="thhr" style={{ marginLeft: 0, marginBottom: '40px' }} />
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Main Content: Posts */}
          <div style={{ flex: 1 }}>
            {categoryData.length > 0 ? (
              categoryData.map((wood) => (
                <div key={wood._id} className="tolly" style={{ display: 'flex', gap: '20px', marginBottom: '40px', alignItems: 'flex-start', marginLeft: 0, marginTop: 0 }}>
                  <Link to={`/${category}/${wood.slug}`} style={{ flexShrink: 0 }}>
                    <img 
                      src={wood.img ? wood.img : 'https://placehold.co/300x200?text=No+Image'} 
                      alt={wood.title} 
                      style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  </Link>
                  <div style={{ flex: 1 }}>
                    <Link to={`/${category}/${wood.slug}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <h2 style={{ marginTop: 0, marginBottom: '10px' }}>{wood.title}</h2>
                    </Link>
                    <p style={{ color: '#555', marginBottom: '15px', lineHeight: '1.5' }}>{wood.description?.slice(0, 150)}...</p>
                    <h5 style={{ color: 'gray', margin: 0 }}>{new Date(wood.createdAt).toLocaleDateString()}</h5>
                  </div>
                </div>
              ))
            ) : (
              <h3>No posts found in this category.</h3>
            )}
            
            {categoryData.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', width: '100%' }}>
                <button className="loadmore" style={{ marginLeft: 0, padding: '15px 40px', cursor: 'pointer', borderRadius: '30px', backgroundColor: '#232eca', color: 'white', border: 'none', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(35, 46, 202, 0.3)', transition: 'transform 0.2s', width: 'auto', height: 'auto' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>LoadMore</button>
              </div>
            )}
          </div>

          {/* Sidebar: Advertisement */}
          <div style={{ width: '400px', flexShrink: 0, position: 'sticky', top: '20px' }}>
            <img
              src="https://placehold.co/400x600?text=Advertisement"
              alt="Ad"
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
          </div>

        </div>

        <div className="viewbott" style={{ marginTop: '50px' }}>
          <Bottom />
        </div>
      </div>
    </div>
  );
};

export default ViewCategory;
