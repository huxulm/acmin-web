import React, { createContext, useReducer, useEffect, useContext } from "react";
import AuthService from "@/services/AuthService";
import { usePathname } from "next/navigation";
type MenuItemState = {
  code: string;
  open: boolean;
}

type MenuStateType = {
  loading?: boolean,
  menus?: any,
  itemStates: Record<string, MenuItemState>,
  error?: any,
};

type MenuActionType = {
  toggleCollapse: (code: string) => void
}


type Action = {
  type: string;
  payload?: any;
  error?: any;
};

const INITIAL_STATE = {
  loading: false,
  menus: {},
  itemStates: {},
  error: null,
  toggleCollapse: (code: string) => {}
};

const ACTION_TYPES = {
  LOADING: "loading",
  LOADING_SUCCESS: "loading_success",
  LOADING_FAILED: "loading_failed",
  CHANGE_COLLAPSE: "change_collapse",
};

const ACTIONS: Record<string, (state: MenuStateType, action: Action) => any> = {
  [ACTION_TYPES.LOADING]: (state, action) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [ACTION_TYPES.LOADING_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    menus: action.payload,
    error: null,
  }),
  [ACTION_TYPES.LOADING_FAILED]: (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }),
  [ACTION_TYPES.CHANGE_COLLAPSE]: (state, action) => { 
    let code = action.payload;
    let prev = state.itemStates[code];
    if (!prev) { return {...state, itemStates: {...state.itemStates, [code]: {open: true, code}}} }
    return {...state, itemStates: {...state.itemStates, [code]: {...prev, open: !prev.open}}}
  }
};

function MenuReducer(state: MenuStateType, action: Action) {
  return ACTIONS[action.type](state, action) || state;
}

export const MenusContext = createContext<MenuStateType>(INITIAL_STATE);

export const MenusActionsContext = createContext<MenuActionType>(INITIAL_STATE)

export const MenusProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(MenuReducer, INITIAL_STATE);
  const _toggleCollapse = (code: string) => {
    dispatch({type: ACTION_TYPES.CHANGE_COLLAPSE, payload: code})
  }
  const actions = {
    toggleCollapse: _toggleCollapse
  }

  useEffect(() => {
    AuthService.retriveMenus()
      .then((menus) => {
        dispatch({
          type: ACTION_TYPES.LOADING_SUCCESS,
          payload: menus,
        });
      })
      .catch((error) => {
        dispatch({
          type: ACTION_TYPES.LOADING_FAILED,
          error,
        });
      });
  }, []);
  return (
    <MenusContext.Provider value={state}>
      <MenusActionsContext.Provider value={actions}>
        {children}
      </MenusActionsContext.Provider>
    </MenusContext.Provider>
  );
};

export function useMenus() {
  const { menus, itemStates } = useContext(MenusContext);
  const { toggleCollapse } = useContext(MenusActionsContext);
  return { menus, menuStates: itemStates, toggleCollapse }
}
