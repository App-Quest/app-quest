import * as types from '../constants/actionTypes';

const initialState = {
  applicationPosts: [],
  applicationPostsLength: 0,
  application: {
    company: '',
    location: '',
    resume: '',
    dateAdded: '',
    dateLastEdited: '',
    position: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    status: '',
    priority: '',
    resume: '',
    coverLetter: '',
    nextSteps: '',
    notes: '',
    preparation: '',
    researchEmployeeCount: '',
    researchRevenue: '',
    researchPission: '',
    researchValueProp: '',
    researchCompetitors: '',
    researchTechStack: '',
    reflectionGood: '',
    reflectionBad: '',
    reflectionImprovementPlan: '',
  },
};

const appsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_APP: {
      const application = action.payload;
      return {
        ...state,
        application,
      };
    }
    case types.SET_APPLICATION_POSTS: {
      const applicationPosts = action.payload;
      const applicationPostsLength = applicationPosts.length;
      return {
        ...state,
        applicationPosts,
        applicationPostsLength,
      };
    }
    case types.CLEAR_APP_STATE: {
      const applicationPosts = state.applicationPosts;
      const applicationPostsLength = applicationPosts.length;
      return {
        ...initialState,
        applicationPosts,
        applicationPostsLength,
      };
    }
    default:
      return state;
  }
};

export default appsReducer;
