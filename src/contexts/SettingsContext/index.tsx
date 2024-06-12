"use client";
import {
  Reducer,
  ReducerStateWithoutAction,
  createContext,
  useContext,
  useReducer,
} from "react";

interface SettingsStateType {
  layout: string;
  debug: boolean;
  sidebarOpen: boolean;

  changeLayout: (layout: string) => void;
  changeDebug: (debug: boolean) => void;
  changeSidebar: (open: boolean) => void;
}

// An interface for our actions
interface SettingsAction {
  type: string;
  payload: any;
}

const ACTIONS: Record<string, Reducer<SettingsStateType, SettingsAction>> = {
  ['CHANGE_LAYOUT']: (state, action) => {
    return { ...state, layout: action.payload } as SettingsStateType;
  },
  ['CHANGE_DEBUG']: (state, action) => {
    return { ...state, debug: action.payload } as SettingsStateType;
  },
  ['CHANGE_SIDEBAR']: (state, action) => {
    return { ...state, sidebarOpen: action.payload } as SettingsStateType;
  },
};

function reducers(state: SettingsStateType, action: SettingsAction) {
  return ACTIONS[action.type](state, action);
}

const InitSettings = {
    layout: 'v',
    debug: false,
    sidebarOpen: true,
} as SettingsStateType;

export const SettingsContext = createContext<SettingsStateType>(InitSettings);

export const SettingsActionContext =
  createContext<SettingsStateType>(InitSettings);

export const SettingsProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducers, InitSettings);
  const actions = {
    changeLayout: (layout: string) => {
      dispatch({ type: "CHANGE_LAYOUT", payload: layout });
    },
    changeDebug: (debug: boolean) => {
      dispatch({ type: "CHANGE_DEBUG", payload: debug });
    },
    changeSidebar: (open: boolean) => {
      dispatch({ type: "CHANGE_SIDEBAR", payload: open });
    },
  };
  return (
    <SettingsContext.Provider value={state}>
      <SettingsActionContext.Provider value={actions as SettingsStateType}>
        {children}
      </SettingsActionContext.Provider>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { layout, debug, sidebarOpen } = useContext(SettingsContext);
  const { changeLayout, changeDebug, changeSidebar } = useContext(SettingsActionContext);
  return { layout, debug, sidebarOpen, changeLayout, changeDebug, changeSidebar };
};
