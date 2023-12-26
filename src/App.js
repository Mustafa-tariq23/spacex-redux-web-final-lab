import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissionsApi } from './features/missionsSlice';
import { fetchRocketsApi } from './features/rocketSlice';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissionsApi());
    dispatch(fetchRocketsApi());
  }, [dispatch]);

  const missions = useSelector((state) => state.missionsReducer);
  const rockets = useSelector((state) => state.rocketReducer);

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul className="header-ul" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
            <li>
              <NavLink activeClassName="active" to="/rockets">
                Rockets
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/missions">
                Missions
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/my-profile">
                My Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/rockets"
            element={<Rockets rockets={rockets} />}
          />
          <Route
            path="/missions"
            element={<Missions missions={missions} />}
          />
          <Route
            path="/my-profile"
            element={<Profile />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
