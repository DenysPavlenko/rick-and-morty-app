import React from 'react';
import PropTypes from 'prop-types';
// Components
import Paper from 'components/paper';
import Typography from 'components/typography';
// Assets
import { ReactComponent as PinIcon } from 'assets/images/icons/pin.svg';
import { ReactComponent as HomeIcon } from 'assets/images/icons/home.svg';
import { ReactComponent as HeartbeatIcon } from 'assets/images/icons/heartbeat.svg';
import { ReactComponent as DeadIcon } from 'assets/images/icons/dead.svg';
import { ReactComponent as UnknownIcon } from 'assets/images/icons/unknown.svg';
// Styles
import styles from './index.module.sass';

const Profile = ({
  image,
  name,
  gender,
  status,
  species,
  origin,
  location,
  episodesNum,
}) => {
  const StatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'alive':
        return <HeartbeatIcon />;
      case 'dead':
        return <DeadIcon />;
      default:
        return <UnknownIcon />;
    }
  };

  return (
    <Paper className={styles.profile}>
      <div
        className={styles['profile-image']}
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <img src={image} alt="avatar" /> */}
      </div>
      <div className={styles['profile-info']}>
        <Typography component="h4" className={styles['profile-name']}>
          {name}
        </Typography>
        <div className={styles['profile-with-icon']}>
          <StatusIcon />
          <Typography component="h6">
            {status} - {species} - {gender}
          </Typography>
        </div>
        <div className={styles['profile-center']}>
          <div className={styles['profile-with-icon']}>
            <HomeIcon />
            <Typography component="h6">{origin.name}</Typography>
          </div>
          <div className={styles['profile-with-icon']}>
            <PinIcon />
            <Typography component="h6">{location.name}</Typography>
          </div>
        </div>
        <Typography component="h6" className={styles['profile-episode']}>
          Was seen in {episodesNum} {`episode${episodesNum === 1 ? '' : 's'}`}
        </Typography>
      </div>
    </Paper>
  );
};

Profile.propTypes = {
  image: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  origin: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  episodesNum: PropTypes.number.isRequired,
};

export default Profile;
