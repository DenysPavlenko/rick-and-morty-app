import { createSelector } from 'reselect';

const profilesPageSelector = (state) => state.profiles;

const selectProfilesPage = createSelector(
  [profilesPageSelector],
  (profiles) => profiles
);

export default selectProfilesPage;
