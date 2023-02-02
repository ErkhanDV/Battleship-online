import radar from "../../assets/video/radar1080.webm";

import "./Background.scss";

function Background() {
  return (
    <video autoPlay muted loop className="background_video">
      <source src={radar} type="video/webm" />
    </video>
  );
}

export default Background;
