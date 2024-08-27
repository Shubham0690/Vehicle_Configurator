import { Image } from "./Image";
import React from "react";
import "../styles/Gallery.css"
import { useTranslation } from 'react-i18next';






export const Gallery = (props) => {
  const { t } = useTranslation();
//   const slicedData = props.data ? props.data.slice(0, 6) : [];
const slicedData = props.data || []; // Show all images


  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h4>{t('Configurations')}</h4>
          <p>
          
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {slicedData.length > 0 ? (
              slicedData.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  className="col-sm-4 col-md-4 col-lg-4"
                >
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
