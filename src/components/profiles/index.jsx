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
import Pagination from 'components/pagination';
// Styles
import styles from './index.module.sass';

const Profiles = ({ fetchProfilesRequest, profiles }) => {
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchProfilesRequest(page);
  }, [page]);

  if (profiles.error) {
    return <div className={styles.profiles}>profiles.error</div>;
  }

  return (
    <div className={styles.profiles}>
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
      <div className={styles['profiles-pagination']}>
        <Pagination page={page} pages={10} setPage={setPage} />
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
