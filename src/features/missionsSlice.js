const initialState = [];

export const fetchMissions = (payload) => ({
  type: 'FETCH_MISSIONS',
  payload,
});

export const joinMission = (payload) => ({
  type: 'JOIN_MISSION',
  payload,
});

export const confirmMission = (id) => (dispatch) => {
  dispatch(joinMission(id));
};

export const leaveMission = (payload) => ({
  type: 'LEAVE_MISSION',
  payload,
});

export const fetchMissionsApi = () => async (dispatch) => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/missions');
    if (!response.ok) {
      throw new Error(`Failed to fetch missions: ${response.statusText}`);
    }

    const missions = await response.json();
    const mapMissions = missions.map(({ mission_name, description, mission_id }) => ({
      id: mission_id,
      mission_name,
      description,
    }));

    dispatch(fetchMissions(mapMissions));
  } catch (error) {
    console.error('Error fetching missions:', error.message);
  }
};

export const confirmLeaveMission = (id) => (dispatch) => {
  dispatch(leaveMission(id));
};

const missionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MISSIONS':
      return action.payload;
    case 'JOIN_MISSION':
      return state.map((mission) => {
        if (mission.id !== action.payload.id) return mission;
        return { ...mission, reserved: true };
      });
    case 'LEAVE_MISSION':
      return state.map((mission) => {
        if (mission.id !== action.payload.id) return mission;
        return { ...mission, reserved: false };
      });
    default:
      return state;
  }
};

export default missionsReducer;
