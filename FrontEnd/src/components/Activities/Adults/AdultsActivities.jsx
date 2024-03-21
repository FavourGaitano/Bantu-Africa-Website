import React from "react";
import "./AdultsActivities.scss";
import Act1 from '../../../assets/Activities/Act1.png'
import Act2 from '../../../assets/Activities/Act2.png'
import Act3 from '../../../assets/Activities/Act3.png'

const AdultsActivities = () => {
  return (
    <div className="activities">
      <div className="activity-title">
        <h1>ADULTS ACTIVTIES</h1>
      </div>
      <div className="activity-section">
        <div className="activity-image">
          <img src={Act1} alt="No image found" />
        </div>
        <div class="activity-description">
          <div class="description-name">
            <h3>MERRY GO ROUND</h3>
          </div>
          <div class="description-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi <br />repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio,
              khakjfhkjhakjhf
            </p>
            
          </div>
          <div class="desc-btn">
            <button>FIND MORE</button>
          </div>
        </div>
      </div>

      <div className="activity-section2">  
        <div class="activity-description">
          <div class="description-name">
            <h3>ZIP LINNING</h3>
          </div>
          <div class="description-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi <br />repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio,
              khakjfhkjhakjhf
            </p>
            
          </div>
          <div class="desc-btn">
            <button>FIND MORE</button>
          </div>
        </div>
        <div className="activity-image">
          <img src={Act2} alt="No image found" />
        </div>
      </div>

      <div className="activity-section">
        <div className="activity-image">
          <img src={Act3} alt="No image found" />
        </div>
        <div class="activity-description">
          <div class="description-name">
            <h3>SWIMMING</h3>
          </div>
          <div class="description-text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi <br />repudiandae consequuntur
              voluptatum laborum numquam blanditiis harum quisquam eius sed odit
              fugiat iusto fuga praesentium optio,
              khakjfhkjhakjhf
            </p>
            
          </div>
          <div class="desc-btn">
            <button>FIND MORE</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdultsActivities;

