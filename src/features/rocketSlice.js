const initialState = [];

export const fetchRockets = (payload) => ({
  type: 'FETCH_ROCKETS',
  payload,
});

export const reserveRocket = (payload) => ({
  type: 'RESERVE_ROCKET',
  payload,
});

export const CancelReservation = (payload) => ({
  type: 'CANCEL_RESERVATION',
  payload,
});

export const fetchRocketsApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/rockets');
    if (!response.ok) {
      throw new Error(`Failed to fetch rockets: ${response.statusText}`);
    }

    const rockets = await response.json();
    const mapRockets = rockets.map(({ rocket_name, description, flickr_images, rocket_id }) => ({
      id: rocket_id,
      rocket_name,
      description,
      flickr_images,
    }));

    dispatch(fetchRockets(mapRockets));
  } catch (error) {
    console.error('Error fetching rockets:', error.message);
  }
};

export const confirmReservation = (id) => (dispatch) => {
  dispatch(reserveRocket(id));
};

export const confirmCancelReservation = (id) => (dispatch) => {
  dispatch(CancelReservation(id));
};

const rocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ROCKETS':
      return action.payload;
    case 'RESERVE_ROCKET':
      return state.map((rocket) => {
        if (rocket.id !== action.payload.id) return rocket;
        return { ...rocket, reserved: true };
      });
    case 'CANCEL_RESERVATION':
      return state.map((rocket) => {
        if (rocket.id !== action.payload.id) return rocket;
        return { ...rocket, reserved: false };
      });
    default:
      return state;
  }
};

export default rocketReducer;
