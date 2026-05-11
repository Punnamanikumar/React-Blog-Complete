import * as React from "react";
import Bottom from "../bottom/Bottom";

const AboutUs = () => {

  return (
    <div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <h1 className="tollyh" style={{ marginLeft: 0 }}>About Us</h1>
        <hr className="thhr" style={{ marginLeft: 0, marginBottom: '40px' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div className="name" style={{ marginLeft: 0, flex: 1, minWidth: '350px' }}>
            <h1 className="nam" style={{ 
                marginTop: '0', 
                fontFamily: '"Poppins", "Outfit", sans-serif', 
                fontSize: '4.5rem', 
                letterSpacing: '-2px',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradientFlow 5s ease infinite',
                lineHeight: '1.2'
              }}>
              Punna <br/><span className="na" style={{ fontWeight: '900' }}>ManiKumar</span>
            </h1>
            <style>
              {`
                @keyframes gradientFlow {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&family=Poppins:wght@700;900&display=swap');
              `}
            </style>
            <div className="social" style={{ display: 'flex', gap: '25px', fontSize: '45px', padding: '20px 0' }}>
              <a href="https://www.linkedin.com/in/punnamanikumar" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-linkedin"></i></a>
              <a href="https://www.github.com/punnamanikumar" target="_blank" rel="noopener noreferrer" style={{ color: '#333', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}><i className="fab fa-github-square"></i></a>
            </div>
          </div>

          <div style={{ flex: '0 1 700px' }}>
            <a href="https://manikumarportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ border: 'none', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
                <img src="/portfolio.png" alt="Manikumar Portfolio" style={{ width: '100%', height: 'auto', display: 'block', minHeight: '350px', objectFit: 'cover', backgroundColor: '#1a1a1a' }} onError={(e) => { e.target.src = 'https://placehold.co/800x500?text=Portfolio+Preview'; }} />
                <div style={{ padding: '20px', background: 'linear-gradient(90deg, #111, #222)', color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: '1.4rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Checkout My Full Portfolio 🚀
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="abobottom" style={{ marginLeft: 0, marginTop: '60px' }}>
          <Bottom />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
 
