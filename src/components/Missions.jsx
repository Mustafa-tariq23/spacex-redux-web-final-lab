import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { confirmLeaveMission, confirmMission } from '../features/missionsSlice';

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: 'white',
  },
  thwidth: {
    width: '25%',
  },
  thTwo: {
    width: '25%',
  },
  thThree: {
    width: '25%',
  },
  thFour: {
    width: '25%',
  },
  tr: {
    backgroundColor: 'bax',
  },
  flexSpectwo: {
    display: 'flex',
  },
  pad: {
    padding: '0 1rem',
  },
  spec: {
    width: '25%',
    textAlign: 'center',
  },
  butInactive: {
    backgroundColor: 'but-inactive',
    color: 'white',
  },
  butActive: {
    backgroundColor: 'but-active',
    color: 'white',
  },
  butJoin: {
    backgroundColor: 'but-join',
    color: 'white',
  },
  butLeave: {
    backgroundColor: 'but-leave',
    color: 'white',
  },
};

const MissionItem = (props) => {
  const {
    mission: {
      id,
      mission_name,
      description,
      reserved,
    },
  } = props;

  const dispatch = useDispatch();
  const reserveMissionFromStore = () => {
    if (reserved === true) {
      dispatch(confirmLeaveMission({ id }));
    } else {
      dispatch(confirmMission({ id }));
    }
  };

  return (
    <tr style={styles.tr}>
      <td style={{ ...styles.tableBox, ...styles.thwidth, ...styles.flexSpectwo }}><h3>{mission_name}</h3></td>
      <td style={{ ...styles.tableBox, ...styles.pad }}>{description}</td>
      <td style={{ ...styles.tableBox, ...styles.spec }}>
        {reserved === true ? (
          <button type="button" style={styles.butInactive}>Active Member</button>
        ) : (
          <button type="button" style={styles.butInactive}>NOT A MEMBER</button>
        )}
      </td>
      <td style={{ ...styles.tableBox, ...styles.spec }}>
        {reserved === true ? (
          <button type="button" style={{ ...styles.butJoin, ...styles.butLeave }} onClick={reserveMissionFromStore}>
            Leave Mission
          </button>
        ) : (
          <button type="button" style={styles.butJoin} onClick={reserveMissionFromStore}>
            Join Mission
          </button>
        )}
      </td>
    </tr>
  );
};

MissionItem.propTypes = {
  mission: PropTypes.shape({
    id: PropTypes.string,
    mission_name: PropTypes.string,
    description: PropTypes.string,
    reserved: PropTypes.bool,
  }).isRequired,
};

const Missions = ({ missions }) => {
  return (
    <table style={styles.table} className="table-box">
      <thead>
        <tr style={{ ...styles.tableBox, ...styles.th }}>
          <th style={{ ...styles.tableBox, ...styles.thwidth }}>Mission</th>
          <th style={{ ...styles.tableBox, ...styles.thTwo }}>Description</th>
          <th style={{ ...styles.tableBox, ...styles.thThree }}>Status</th>
          <th style={{ ...styles.tableBox, ...styles.thFour }} aria-label="Mute volume" />
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <MissionItem mission={mission} key={mission.id} />
        ))}
      </tbody>
    </table>
  );
};

Missions.propTypes = {
  missions: PropTypes.array.isRequired,
};

export default Missions;
