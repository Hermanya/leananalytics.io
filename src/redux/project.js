export const ADD_TRACKED_ACTION = "ADD_TRACKED_ACTION";
export const ADD_EXPERIMENT = "ADD_EXPERIMENT";

export const addTrackedAction = action => ({
  type: ADD_TRACKED_ACTION,
  payload: action
});

export const addExperiment = (actionName, experiment) => ({
  type: ADD_EXPERIMENT,
  actionName,
  payload: experiment
});
export const projectReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRACKED_ACTION:
      return {
        ...state,
        trackedActions: state.trackedActions.concat(action.payload)
      };
    case ADD_EXPERIMENT:
      return {
        ...state,
        trackedActions: state.trackedActions.map(trackedAction =>
          trackedAction.name === action.actionName
            ? {
                ...trackedAction,
                experiments: trackedAction.experiments.concat(action.payload)
              }
            : trackedAction
        )
      };
    default:
      return state;
  }
};
