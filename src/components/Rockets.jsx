import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { confirmReservation, confirmCancelReservation } from '../features/rocketSlice';

const Item = ({ rocket }) => {
  const { id, rocket_name, description, flickr_images, reserved } = rocket;
  const dispatch = useDispatch();

  const reserveRocketFromStore = () => {
    if (reserved) {
      dispatch(confirmCancelReservation({ id }));
    } else {
      dispatch(confirmReservation({ id }));
    }
  };

  return (
    <div className="block-rocket">
      <div className="img-rocket">
        <img alt="rocket" src={flickr_images[0]} className="pic" />
      </div>
      <div className="text-rocket">
        <h2 className="title">{rocket_name}</h2>
        <div className="reserv">
          {reserved && <button type="button" className="res" key={id}>Reserved</button>}
          <p className="pi-text">{description}</p>
        </div>
        <button
          type="button"
          className={`reserve ${reserved ? 'cancel' : ''}`}
          onClick={reserveRocketFromStore}
        >
          {reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
        </button>
      </div>
    </div>
  );
};

Item.propTypes = {
  rocket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rocket_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reserved: PropTypes.bool.isRequired,
    flickr_images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const Rockets = ({ rockets }) => (
  <main className="rockets-container">
    {rockets.map((rocket) => (
      <Item key={rocket.id} rocket={rocket} />
    ))}
  </main>
);

Rockets.propTypes = {
  rockets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Rockets;
