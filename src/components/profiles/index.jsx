/* eslint-disable no-shadow */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
// Hooks
import useHttp from 'hooks/use-http';
// Services
import RnmService from 'services/rnm-service';
// Components
import Profile from 'components/profile';
import ProfilePlaceholder from 'components/profile/placeholder';
import Pagination from 'components/pagination';
import ErrorIndicator from 'components/error-indicator';
// Styles
import styles from './index.module.sass';

const { getProfilesPage } = new RnmService();

export const Profiles = () => {
  const history = useHistory();
  const params = useParams();
  const page = Number(params.id) || 1;
  const profilesEl = React.useRef(null);
  const { fetchData, loading, data, error } = useHttp(getProfilesPage);

  // Fetch profiles data on page change
  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  const scrollToTop = () => {
    const rect = profilesEl.current.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY,
      behavior: 'smooth',
    });
  };

  /* istanbul igore else */
  if (error) {
    // Handle error
    return (
      <ErrorIndicator
        title="Oops..."
        message="It seems that this page doesn't exist..."
        btnText="Go back"
        retry={() => {
          history.push('/1');
        }}
      />
    );
  }

  return (
    <div className={styles.profiles} ref={profilesEl} data-test="profiles">
      <div className={styles['profiles-row']}>
        {loading && (
          <>
            {[...Array(20)].map((_, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx} className={styles['profiles-col']}>
                <ProfilePlaceholder />
              </div>
            ))}
          </>
        )}
        {data && (
          <>
            {data.profiles.map((profile) => (
              <div key={profile.id} className={styles['profiles-col']}>
                <Profile
                  image={profile.image}
                  name={profile.name}
                  status={profile.status}
                  species={profile.species}
                  gender={profile.gender}
                  origin={profile.origin.name}
                  location={profile.location.name}
                  episodesNum={profile.episode.length}
                />
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles['profiles-pagination']}>
        <Pagination
          page={page}
          pages={data?.pages || 0}
          setPage={(p) => {
            history.push(`/${p}`);
            scrollToTop();
          }}
        />
      </div>
    </div>
  );
};

export default Profiles;
