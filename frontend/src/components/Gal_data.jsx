import React, { useState, useEffect } from "react";
import JsonData from '../data/data.json'
import { Gallery } from "./Gallery";





export const Gal_data = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);
    const [isLogged, setIsLogged] = useState(false);
    const [segmentSelectedTop, setSegmentSelectedTop] = useState(1);
return(
    <div id="gallery">
    <Gallery data={landingPageData.Gallery} />
    </div>
);
};