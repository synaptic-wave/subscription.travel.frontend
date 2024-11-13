import { createSlice } from "@reduxjs/toolkit";

export const { actions: wishlistActions, reducer: wishlistReducer } =
  createSlice({
    name: "wishlist",
    initialState: {
      items: [],
      showFavourite: false
    },
    reducers: {
      addToWishlist: (state, { payload }) => {
        const items = state.items;
        const index = items.findIndex((item) => item === payload);
        if (index === -1) {
          state.items = [...items, payload];
          state.showFavourite = true;
        } else {
          state.items = items.filter((item) => item !== payload);
        }
      },
      clearWishlist: (state) => {
        state.items = [];
      },
      onCloseFavouritePopup: (state) => {
        state.showFavourite = false;
      },
      onOpenFavouritePopup: (state) => {
        state.showFavourite = true;
      }
    }
  });
