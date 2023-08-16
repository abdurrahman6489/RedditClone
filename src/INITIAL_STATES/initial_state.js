import { filterObject, chipProps } from "../Utils/utils";
import INITIAL_CURRENT_USER from "./initial_current_user";
import INITIAL_POPUP_STATUS from "./initial_popup_status";
const INITIAL_STATE = {
  posts: [],
  filteredPosts: [],
  selectedPost: {},
  comments: {},
  users: [],
  currentUser: INITIAL_CURRENT_USER,
  popUp: INITIAL_POPUP_STATUS,
  currentFilter: Object.keys(filterObject)[1],
  filtersArray: chipProps,
  isLoggedIn: false,
  logInModalOpen: false,
  signupModalOpen: false,
};
export default INITIAL_STATE;
