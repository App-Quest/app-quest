import * as types from '../constants/actionTypes';

const initialState = {
  applicationPosts: [],
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
      return {
        ...state,
        applicationPosts,
      };
    }
    case types.CLEAR_APP_STATE: {
      const applicationPosts = state.applicationPosts;
      return {
        ...initialState,
        applicationPosts,
      };
    }
    default:
      return state;
  }
};

export default appsReducer;
