import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const missions = useSelector((state) => state.missionsReducer);
  const rockets = useSelector((state) => state.rocketReducer);

  const renderMissionRows = () => {
    const reservedMissions = missions.filter((mission) => mission.reserved);
    return reservedMissions.map((mission) => (
      <tr key={mission.id}>
        <td className="roc-mis">{mission.mission_name}</td>
      </tr>
    ));
  };

  const renderRocketRows = () => {
    const reservedRockets = rockets.filter((rocket) => rocket.reserved);
    return reservedRockets.map((rocket) => (
      <tr key={rocket.id}>
        <td className="roc-mis">{rocket.rocket_name}</td>
      </tr>
    ));
  };

  return (
    <div className="block-prof">
      <div className="rock-table margin">
        <h2>My Missions</h2>
        <table className="tablex table-box tbody">
          <tbody>
            {renderMissionRows()}
          </tbody>
        </table>
      </div>
      <div className="rock-table">
        <h2>My Rockets</h2>
        <table className="tablex table-box tbody">
          <tbody>
            {renderRocketRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
