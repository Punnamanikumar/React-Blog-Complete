import * as React from "react";
import Bottom from "../bottom/Bottom";

const AboutUs = () => {

  return (
    <div>
      <h1 className="tollyh">About Us</h1><hr className="thhr"/>
      <div className="name">
        <h1 className="nam">Punna <span className="na">ManiKumar</span></h1>
        <div className="social">
        <a href="https://www.facebook.com/mani.rebel.714"><i className="fab fa-facebook-square"></i></a>
        <a href="https://www.instagram.com/punnamanikumar/"><i className="fab fa-instagram-square"></i></a>
        <a href="https://twitter.com/punnamanikumar"><i className="fab fa-twitter-square"></i></a>
        <a href="https://www.linkedin.com/in/punnamanikumar"><i className="fab fa-linkedin"></i></a>
        <a href="https://www.github.com/punnamanikumar"><i className="fab fa-github-square"></i></a>
        </div>
        <div className="abobottom"><Bottom /></div>
      </div>
    </div>
  );
};

export default AboutUs;
 
