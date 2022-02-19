import React from "react";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
</style>;

const style = {
  fontFamily: "Cinzel Decorative, cursive",
  fontSize: "20px",
  textAlign: "center",
  marginTop: "5%",
  color: "red",
};

const PageNotFound = () => {
  return (
    <div style={style}>
      <h1>
        OOPS Page Not Found ! <i class="far fa-frown"></i>
      </h1>
    </div>
  );
};

export default PageNotFound;
