import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import Loading from "../loader/Loading.jsx";
import { usePosts, useLatestPosts } from "../../hooks/usePosts";

const Home = () => {
  // Fetch data using React Query
  const { data: postsData, isLoading: postsLoading } = usePosts();
  const { data: latestData, isLoading: latestLoading } = useLatestPosts();

  if (postsLoading || latestLoading) return <Loading />;

  const posts = postsData?.posts || [];
  const latestPosts = latestData?.posts || [];

  // Fallback if no posts exist yet
  if (posts.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>No posts available yet!</div>;
  }

  // Pick some posts for the hero grid
  const heroMain = posts.find(p => p.category === 'nature') || posts[0];
  const heroSub1 = posts.find(p => p.category === 'jobs') || posts[1];
  const heroSub2 = posts.find(p => p.category === 'technology') || posts[2];

  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "250px 250px", gap: "20px", marginTop: "20px", width: "100%" }}>
          {heroMain && (
            <Link to={`/${heroMain.category}/${heroMain.slug}`} style={{ gridColumn: "1/2", gridRow: "1/3", position: "relative", borderRadius: "15px", overflow: "hidden", display: "block", height: "100%" }}>
              <img src={heroMain.img || 'https://placehold.co/600x500?text=No+Image'} alt={heroMain.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white", padding: "30px 20px 20px 20px", boxSizing: "border-box" }}>
                <h2 style={{ margin: 0, fontSize: "28px", textShadow: "1px 1px 3px black" }}>{heroMain.title}</h2>
              </div>
            </Link>
          )}
          {heroSub1 && (
            <Link to={`/${heroSub1.category}/${heroSub1.slug}`} style={{ position: "relative", borderRadius: "15px", overflow: "hidden", display: "block", height: "100%" }}>
              <img src={heroSub1.img || 'https://placehold.co/400x250?text=No+Image'} alt={heroSub1.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white", padding: "20px", boxSizing: "border-box" }}>
                <h3 style={{ margin: 0, fontSize: "18px", textShadow: "1px 1px 3px black" }}>{heroSub1.title}</h3>
              </div>
            </Link>
          )}
          {heroSub2 && (
            <Link to={`/${heroSub2.category}/${heroSub2.slug}`} style={{ position: "relative", borderRadius: "15px", overflow: "hidden", display: "block", height: "100%" }}>
              <img src={heroSub2.img || 'https://placehold.co/400x250?text=No+Image'} alt={heroSub2.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", background: "linear-gradient(transparent, rgba(0,0,0,0.8))", color: "white", padding: "20px", boxSizing: "border-box" }}>
                <h3 style={{ margin: 0, fontSize: "18px", textShadow: "1px 1px 3px black" }}>{heroSub2.title}</h3>
              </div>
            </Link>
          )}
        </div>

        <div className="homelate2" style={{ marginTop: '50px' }}>
          <div className="thelate" style={{ fontSize: '2rem', fontWeight: 'bold' }}>The Latest</div>
          <hr className="hlhr" />
          <div className="flex2" style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
            {latestPosts.slice(0, 3).map((latest) => (
              <div className="hc1" key={latest._id} style={{ flex: 1, minWidth: 0, height: 'auto', display: 'flex', flexDirection: 'column', border: '1px solid #ddd', borderRadius: '15px', overflow: 'hidden', transition: 'transform 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Link
                  to={`/${latest.category}/${latest.slug}`}
                  className="hcc1"
                  style={{ textDecoration: 'none', color: 'black', display: 'flex', flexDirection: 'column', flex: 1, width: '100%' }}
                >
                  <div className="himg" style={{ width: '100%', flexShrink: 0 }}>
                    <img src={latest.img || 'https://placehold.co/400x300?text=No+Image'} alt={latest.title} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
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

          <div style={{ marginTop: '50px' }} className="flex3-container">
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '600px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Latest Articles</div>
                <hr className="hlhr" style={{ marginBottom: '30px' }} />
                {latestPosts.slice(3, 6).map((latest) => (
                  <React.Fragment key={latest._id}>
                    <div style={{ marginBottom: "20px" }}>
                      <Link to={`/${latest.category}/${latest.slug}`} style={{ display: "flex", gap: "20px", textDecoration: "none", color: "black", alignItems: "center" }}>
                        <div style={{ flexShrink: 0 }}>
                          <img src={latest.img || 'https://placehold.co/400x300?text=No+Image'} alt="" style={{ width: "300px", height: "200px", objectFit: "cover", borderRadius: "8px" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "24px", marginBottom: "10px", marginTop: "0" }}>{latest.title}</h3>
                          <h5 style={{ color: "gray", fontSize: "16px", margin: "5px 0" }}>{new Date(latest.createdAt).toLocaleDateString()}</h5>
                          <h4 style={{ color: "gray", fontSize: "16px", textTransform: 'capitalize', margin: "0" }}>Category: {latest.category}</h4>
                        </div>
                      </Link>
                    </div>
                    <hr className="f50per" style={{ margin: "20px 0", width: '100%' }} />
                  </React.Fragment>
                ))}
                
                {/* Embedded Footer / Load More section */}
                <div style={{ marginTop: '20px', width: '100%' }}>
                  <Footer />
                </div>
              </div>
              
              <div style={{ width: '350px' }}>
                <div className="advs" style={{ position: 'sticky', top: '20px' }}>
                  <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#666' }}>Advertisement</h4>
                    <img
                      src="https://placehold.co/330x600?text=Advertisement"
                      alt="Ad"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
