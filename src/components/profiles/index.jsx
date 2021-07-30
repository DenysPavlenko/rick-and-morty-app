/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';
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
    }
  }, [match]);

  React.useEffect(() => {
    // Fetch profiles data
    fetchProfilesRequest(page);
    // Scroll to top on page change
    if (!profiles.loading && profilesEl.current) {
      const rect = profilesEl.current.getBoundingClientRect();
      window.scrollTo({
        top: rect.top + window.scrollY,
        behavior: 'smooth',
      });
    }
  }, [page]);

  React.useEffect(() => {
    // Set total number of pages
    if (profiles.data) {
      setPages(profiles.data.pages);
    }
  }, [profiles]);

  // Handle errors
  if (profiles.error) {
    return (
      <ErrorIndicator
        title="Oops..."
        message={`It seems that page ${page} doesn't exist...`}
        btnText="Go back"
        retry={() => {
          history.push('/1');
          fetchProfilesRequest(1);
        }}
      />
    );
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
            history.push(`/${p}`);
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
