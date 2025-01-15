import fullScreenImageReducer from '../../src/components/image/usecase/Reducer';

/**
 * rootReducers is responsible for combining different reducers to create the root reducer for the Redux store.
 * It manages different slices of the application state.
 *
 * @param {AppState} state - The current state of the application.
 * @param {Action} action - The dispatched action that triggers state updates.
 * @returns {AppState} The new state after handling the action.
 */
export const rootReducer = {
  fullScreenImageState: fullScreenImageReducer,
};
