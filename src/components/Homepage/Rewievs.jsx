import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Row } from "react-bootstrap";
import { CiStar } from "react-icons/ci";

const libraries = ["places"]; // IMPORTING 'PLACES' LIBRARY FROM GOOGLE MAPS

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const googleMapsApiKey = process.env.REACT_APP_MY_APIKEY;
  const { isLoaded, loadError } = useLoadScript({
    // TO GET API KEY VISIT: https://developers.google.com/maps/documentation/javascript/get-api-key
    googleMapsApiKey: googleMapsApiKey, // PUT YOUR API KEY OF PROJECT CREATED IN GOOGLE CLOUD CONSOLE
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !loadError) {
      const mapDiv = document.createElement("div"); // CREATING A DIV ELEMENT TO HOST SERVICE
      mapDiv.style.display = "none";
      document.body.appendChild(mapDiv);

      const service = new window.google.maps.places.PlacesService(mapDiv); // INITIALIZING PLACES SERVICE
      service.getDetails(
        {
          // TO GET PLACE ID VISIT: https://developers.google.com/maps/documentation/places/web-service/place-id
          placeId: "ChIJJ8R0ntzj0hIR8EYKbom_lk8", // THIS IS PLACE ID OF 'TOUR EIFFEL' IN PARIS, FRANCE, PUT YOUR PLACE ID OF THE PLACE TO FETCH REVIEWS
          fields: ["reviews"],
          language: "it",
        },

        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setReviews(place.reviews);
            console.log("Recensioni caricate con successo:", place.reviews);
          } else {
            console.error("Errore nel caricamento delle recensioni:", status);
          }
          console.log(reviews);
        }
      );
      return () => {
        document.body.removeChild(mapDiv); // CLEANUP BY REMOVING DIV ELEMENT
      };
    }
  }, [isLoaded, loadError]);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    cssEase: "linear",
  };

  return (
    <div className="slider-container py-4">
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review.id || review.time}>
            <Row>
              <Col className="col-2 justify-center align-middle">
                {/* USER PROFILE PHOTO */}
                {review.profile_photo_url && (
                  <img
                    src={review.profile_photo_url}
                    alt={`${review.author_name}'s profile`}
                  />
                )}
              </Col>
              <Col className="col-10">
                <p>{review.author_name}</p>
                <p>
                  <div className="d-flex flex-row">
                    {Array.from({ length: Math.floor(review.rating) }).map(
                      (_, index) => (
                        <CiStar key={index} />
                      )
                    )}{" "}
                  </div>
                </p>
                <p>{review.text}</p>

                {/* PHOTOS ASSOCIATED WITH REVIEW */}
                {review.photos &&
                  review.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo.getUrl()}
                      alt={`Uploaded photos ${index + 1} for review by ${
                        review.author_name
                      }`}
                    />
                  ))}
              </Col>
            </Row>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Reviews;
