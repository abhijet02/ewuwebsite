import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus } from "@/lib/services/fetch.type";
import {
  MenuSliceState,
  GetMenusAction,
  GetMenusFailureAction,
  GetMenusSuccessAction,
  GetMenusWithPageIdZeroSuccessAction,
  GetMenusWithPageIdZeroFailureAction,
} from "./menu.type";

const initState: MenuSliceState = {
  getMenusStatus: FetchStatus.IDLE,
  getMenusError: undefined,
  getMenusResponse: undefined,
  getMenusWithPageIdZeroStatus: FetchStatus.IDLE,
  getMenusWithPageIdZeroError: undefined,
  getMenusWithPageIdZeroResponse: undefined,
  
};

const menuSlice = createSlice({
  name: "menu",
  initialState: initState,
  reducers: {
    resetAllState: () => ({ ...initState }),

    getMenus: (state, _action: GetMenusAction) => {
      state.getMenusStatus = FetchStatus.FETCHING;
      state.getMenusError = "";
    },
    getMenusSuccess: (state, action: GetMenusSuccessAction) => {
      state.getMenusStatus = FetchStatus.SUCCESS;
      state.getMenusResponse = action.payload.response;
    },
    getMenusFailure: (state, action: GetMenusFailureAction) => {
      state.getMenusStatus = FetchStatus.FAILURE;
      state.getMenusError = action.payload.error;
    },

    getMenusWithPageIdZero: (state, _action: GetMenusAction) => {
      state.getMenusWithPageIdZeroStatus = FetchStatus.FETCHING;
      state.getMenusWithPageIdZeroError = "";
    },
    getMenusWithPageIdZeroSuccess: (state, action: GetMenusWithPageIdZeroSuccessAction) => {
      state.getMenusWithPageIdZeroStatus = FetchStatus.SUCCESS;
      state.getMenusWithPageIdZeroResponse = action.payload.response;
    },
    getMenusWithPageIdZeroFailure: (state, action: GetMenusWithPageIdZeroFailureAction) => {
      state.getMenusWithPageIdZeroStatus = FetchStatus.FAILURE;
      state.getMenusWithPageIdZeroError = action.payload.error;
    },

    resetMenu: () => {
      return initState;
    },
  },
});

export const menuActions = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
