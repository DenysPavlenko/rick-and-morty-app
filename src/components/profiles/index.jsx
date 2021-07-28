/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
// Redux
import { fetchProfilesRequest } from 'redux/profiles/actions';
import selectProfiles from 'redux/profiles/selectors';
// Components
import Profile from 'components/profile';
import ProfilePlaceholder from 'components/profile/placeholder';
// Styles
import styles from './index.module.sass';

const Profiles = ({ fetchProfilesRequest, profiles }) => {
  React.useEffect(() => {
    fetchProfilesRequest();
  }, []);

  if (profiles.error) {
    return <div className={styles.profiles}>profiles.error</div>;
  }

  return (
    <div className={styles.profiles}>
      <div className={styles['profiles-row']}>
        {profiles.loading && (
          <>
            {[...Array(20)].map((_) => (
              <div key={_} className={styles['profiles-col']}>
                <ProfilePlaceholder />
              </div>
            ))}
          </>
        )}
        {profiles.data && (
          <>
            {profiles.data.map((profile) => (
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

const mapStateToProps = createStructuredSelector({
  profiles: selectProfiles,
});

const mapDispatchToProps = {
  fetchProfilesRequest,
};

Profiles.propTypes = {
  fetchProfilesRequest: PropTypes.func.isRequired,
  profiles: PropTypes.shape({
    data: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
