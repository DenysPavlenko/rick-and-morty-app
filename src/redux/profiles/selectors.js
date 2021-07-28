import { createSelector } from 'reselect';

const profilesSelector = (state) => state.profiles;

const selectProfiles = createSelector(
  [profilesSelector],
  (profiles) => profiles
);

export default selectProfiles;
