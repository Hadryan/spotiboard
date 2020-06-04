import {
  createStore,
  applyMiddleware,
  compose,
  Action,
} from 'redux';
import ReduxThunk, { ThunkAction } from 'redux-thunk';
import { rootReducer, RootState } from './rootReducer';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
);

export const store = createStore(rootReducer, enhancer);
