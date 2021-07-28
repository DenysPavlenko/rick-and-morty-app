/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
// Redux
import { fetchProfilesRequest } from 'redux/profiles/actions';
import selectProfiles from 'redux/profiles/selectors';
// Components
import Profile from 'components/profile';
import ProfilePlaceholder from 'components/profile/placeholder';
import Pagination from 'components/pagination';
import ErrorIndicator from 'components/error-indicator';
// Styles
import styles from './index.module.sass';

const Profiles = ({ fetchProfilesRequest, profiles }) => {
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(0);
  const profilesEl = React.useRef(null);

  const history = useHistory();
  const match = useRouteMatch();

  // Set page number from the match
  React.useEffect(() => {
    const id = +match.params.id;
    if (id && typeof id === 'number') {
      setPage(id);
    } else {
      history.push('/404');
    }
  }, []);

  React.useEffect(() => {
    fetchProfilesRequest(page);
    // Scroll to top on page change
    if (!profiles.loading) {
      window.scrollTo({
        top: profilesEl.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [page]);

  React.useEffect(() => {
    if (profiles.data) {
      setPages(profiles.data.pages);
    }
  }, [profiles]);

  // Handle errors
  if (profiles.error) {
    if (profiles.error === '404') {
      return <Redirect to="/404" />;
    }
    return <ErrorIndicator retry={() => fetchProfilesRequest(page)} />;
  }

  return (
    <div className={styles.profiles} ref={profilesEl}>
      <div className={styles['profiles-row']}>
        {profiles.loading && (
          <>
            {[...Array(20)].map((_, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={idx} className={styles['profiles-col']}>
                <ProfilePlaceholder />
              </div>
            ))}
          </>
        )}
        {profiles.data && (
          <>
            {profiles.data.profiles.map((profile) => (
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
      <div className={styles['profiles-pagination']}>
        <Pagination
          page={page}
          pages={pages}
          setPage={(p) => {
            history.push(`/profiles/${p}`);
            setPage(p);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  profiles: selectProfiles,
});

const mapDispatchToProps = {
  fetchProfilesRequest,
};

Profiles.propTypes = {
  fetchProfilesRequest: PropTypes.func.isRequired,
  profiles: PropTypes.shape({
    data: PropTypes.shape({
      pages: PropTypes.number,
      profiles: PropTypes.array,
    }),
    loading: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
