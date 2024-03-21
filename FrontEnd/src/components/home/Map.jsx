import React from "react";
import "./map.scss";

//   frameborder:"0",
// scrolling:"no",
const Map = () => {
  return (
    <div className="map">
      <iframe
        width="720"
        height="600"
        frameborder="0"
        scrolling="no"
        margiHeight="0"
        marginWidth="0"
        src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;q=BANTU%20AFRICA%20RESORT,%20A2,%20Nyeri+(Bantu%20Africa%20Resort)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.gps.ie/">gps devices</a>
      </iframe>
    </div>
  );
};

export default Map;
