import React, { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // IMPORTING 'PLACES' LIBRARY FROM GOOGLE MAPS

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    // TO GET API KEY VISIT: https://developers.google.com/maps/documentation/javascript/get-api-key
    googleMapsApiKey: "AIzaSyDNgB51iadk0cdN6cf00bXeko-HZt5ycSE", // PUT YOUR API KEY OF PROJECT CREATED IN GOOGLE CLOUD CONSOLE
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

  return (
    <div>
      {/* MAPPING REVIEWS TO DISPLAY EACH REVIEW IN A DIV ELEMENT */}
      {reviews?.map((review) => (
        <div key={review.id || review.time}>
          <p>
            <strong>NAME : </strong>
            {review.author_name}
          </p>
          <p>
            <strong>RATING : </strong>
            {review.rating}
          </p>
          <p>
            <strong>TEXT : </strong>
            {review.text}
          </p>
          {/* USER PROFILE PHOTO */}
          {review.profile_photo_url && (
            <img
              src={review.profile_photo_url}
              alt={`${review.author_name}'s profile`}
            />
          )}
          {/* PHOTOS ASSOCIATED WITH REVIEW */}
          {review.photos &&
            review.photos.map((photo, index) => (
              <img
                key={index}
                src={photo.getUrl()}
                alt={`Photo ${index + 1} for review by ${review.author_name}`}
              />
            ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Reviews;
