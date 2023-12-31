// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fixtures from '../components/Fixtures';
import TeamList from '../components/TeamList';
import Favorite from '../components/Favorite';
import TeamSearchBar from '../components/TeamSearchBar/TeamSearchBar';
import Auth from '../utils/auth';
import { fetchRound, fetchStandings, fetchFixtures } from '../utils/API';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fixtures, setFixtures] = useState([]);
  // Check if the user has more than one favorite team
  const hasMultipleFavoriteTeams = true
  //Auth.loggedIn() && data.favoriteTeams.length > 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamStandings = await fetchStandings();
        setData(teamStandings);

        const teamFixtures = await fetchFixtures();
        setFixtures(teamFixtures);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <main className="container-fluid main-container">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-8">
          <div className="card bg-light-green mb-4 rounded">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div className="entity-header-wrapper">
                <div className="entity-logo-fav">
                  <picture>
                    <source
                      srcSet="https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishPremierLeague.vresize.350.350.medium.0.png"
                      media="(min-width: 1024px)"
                    />
                    <source
                      srcSet="https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishPremierLeague.vresize.220.220.medium.0.png"
                      media="(max-width: 1023px)"
                    />
                    <source
                      srcSet="https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishPremierLeague.vresize.160.160.medium.0.png"
                      media="(max-width: 767px)"
                    />
                    <img
                      src="https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishPremierLeague.vresize.350.350.medium.0.png"
                      alt="ENGLISH PREMIER LEAGUE"
                      width="175"
                      height="175"
                      className="entity-card-logo image-logo"
                    />
                  </picture>
                </div>
              </div>
              <div className="app-container center">
                <h3>Upcoming Matches:</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <React.Fragment>
                    {!fixtures ? <h4>Round: {fixtures[0].league.round}</h4> : null}
                    {fixtures.length > 0 ? (
                      fixtures.map((fixture) => (
                        <Fixtures key={fixture.fixture.id} fixture={fixture} />
                      ))
                    ) : (
                      <h3>No Fixtures Yet</h3>
                    )}
                  </React.Fragment>
                )}
              </div>
              <div>
                {Auth.loggedIn() ? (
                  <>
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout
                    </button>
                  </>
                ) : (
                  <p>
                    To see fixtures, please{' '}
                    <Link to="/login">login</Link> or{' '}
                    <Link to="/signup">signup</Link>.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        {/* Main Content */}
         {/* Right side content */}
        <div className="col-md-4">
          {Auth.loggedIn() && (
            <>
              <div className="card bg-light-green">
                <div className="card-body">
                  <div className="flex-row justify-left w-100%">
                    <TeamSearchBar allTeams={data} title="SearchBar" isLoggedIn={Auth.loggedIn()} />
                  </div>
                </div>
              </div>
              <br />
              {hasMultipleFavoriteTeams && (
                <div className="card bg-light-green">
                  <div className="card-body">
                    <div className="flex-row justify-left w-100%">
                      {/* {data.favoriteTeams.map((favoriteTeam) => (
                        <div className="flex-row justify-left w-100%" key={favoriteTeam.team.id}>
                          <Favorite teamId={favoriteTeam.team.id} />
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <br />
          <div className="card bg-light-green">
            <div className="card-body">
              <div className="flex-row justify-left w-100%">
                <div className="col-12 col-md-8 mb-3 w-100%">
                  {/* <TeamList standings={data} title="Standings" isLoggedIn={Auth.loggedIn()} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;