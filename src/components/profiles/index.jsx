import React from 'react';
// Components
import Profile from 'components/profile';
// Styles
import styles from './index.module.sass';

const Profiles = () => {
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character/?page=1')
      .then((res) => res.json())
      .then((res) => setProfiles(res.results));
  }, []);

  return (
    <div className={styles.profiles}>
      <div className={styles['profiles-row']}>
        {profiles.length === 0 ? (
          <p>loading</p>
        ) : (
          <>
            {profiles.map((profile) => (
              <div key={profile.id} className={styles['profiles-col']}>
                <Profile
                  image={profile.image}
                  name={profile.name}
                  status={profile.status}
                  species={profile.species}
                  gender={profile.gender}
                  origin={profile.origin}
                  location={profile.location}
                  episodesNum={profile.episode.length}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Profiles;
