import preferencesActions from "actions/preferences.action";
import authActions from "actions/auth.action";
import syncActions from "actions/sync.action";
import navActions from "actions/nav.action";

export const actions = {
  ...preferencesActions,
  ...authActions,
  ...syncActions,
  ...navActions,
};

export default actions;
