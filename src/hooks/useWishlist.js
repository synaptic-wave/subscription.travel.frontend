import {
  useAddWishlist,
  useUpdateWishlist,
  useWishList
} from "@/services/wishlist.service";
import { wishlistActions } from "@/store/wishlist/wishlist.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useWishlistItem = () => {
  const dispatch = useDispatch();

  const addItemToWishlist = useAddWishlist();
  const updateItemToWishList = useUpdateWishlist();

  const { isAuth } = useSelector((state) => state.auth);
  const { items: wishlist } = useSelector((state) => state.wishlist);

  const { data: userWishlist, refetch } = useWishList({
    queryParams: {
      enabled: isAuth
    }
  });

  const handleToggleWishlist = (hotelCode) => {
    if (!isAuth) {
      dispatch(wishlistActions.addToWishlist(hotelCode));
    } else {
      const isExist = userWishlist?.includes(hotelCode);
      const _newList = isExist
        ? userWishlist?.filter((jpCode) => jpCode !== hotelCode)
        : [...(userWishlist || []), hotelCode];

      if (!isExist)
        addItemToWishlist.mutate(
          {
            hotelCode: hotelCode
          },
          {
            onSuccess: () => {
              refetch();
              // dispatch(wishlistActions.onOpenFavouritePopup());
            },
            onError: (err) => {
              toast.error(err?.data?.data || "Error on adding to wishlist");
            }
          }
        );
      else
        updateItemToWishList.mutate(
          {
            hotelCodes: _newList
          },
          {
            onSuccess: (res) => {
              // if (res?.hotelCodes?.includes(hotelCode))
              //   dispatch(wishlistActions.onOpenFavouritePopup());
              refetch();
            },
            onError: (err) => {
              toast.error(err?.data?.data || "Error on adding to wishlist");
            }
          }
        );
    }
  };
  return [isAuth ? userWishlist : wishlist, handleToggleWishlist];
};
