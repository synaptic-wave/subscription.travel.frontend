import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import {
  Home,
  HotelSingle,
  SearchResult,
  Book,
  Login,
  Register,
  ChangePassword,
  FindPassword,
  Profile,
  CheckReservationInfo,
  EmailVerification,
  VerifyNotVerifiedEmail,
  EmailVerificationWithToken,
  ReservationList,
  Cart,
  BookedHotel,
  PreBook,
  WishList,
  RecommendedTravel,
  RecommendedTravelDetails,
  CompareHotels,
  Test,
  Payment
} from "../modules";
import { CheckBookingDetail } from "@/modules/CheckBookingDetail";
import Banner from "@/modules/Banner";
import CouponEvent from "@/modules/CouponEvent";
import GLNBanner from "@/modules/GLNBanner";
import EasyMembershipRegister from "@/modules/EasyMembership/Register";
import ThirdPartiesPersonalInformation from "@/modules/Terms/ThirdPartiesPersonalInformation";
import ThirdPartiesPersonalInformationOption from "@/modules/Terms/ThirdPartiesPersonalInformationOptional";
import StaticMembership from "@/modules/static/Membership";

const Router = () => {
  return (
    <Routes>
      <Route path="payment" element={<Payment />}></Route>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="search" element={<SearchResult />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="banner/:id" element={<Banner />}></Route>
        <Route path="banner/coupon-event" element={<CouponEvent />}></Route>
        <Route path="banner/gln" element={<GLNBanner />}></Route>

        <Route
          path="email-verification"
          element={<EmailVerification />}
        ></Route>

        <Route path="profile" element={<Profile />}></Route>
        <Route path="test" element={<Test />}></Route>

        <Route path="register" element={<Register />}></Route>
        <Route path="find-password" element={<FindPassword />}></Route>
        <Route path="change-password" element={<ChangePassword />}></Route>
        <Route
          path="check-reservation-info"
          element={<CheckReservationInfo />}
        ></Route>

        <Route path="reservation-list" element={<ReservationList />}></Route>

        <Route
          path="recommended-travel/:name"
          element={<RecommendedTravel />}
        ></Route>

        <Route
          path="recommended-travel-details"
          element={<RecommendedTravelDetails />}
        ></Route>

        <Route path="hotel-details" element={<HotelSingle />}></Route>
        <Route path="verify-email" element={<VerifyNotVerifiedEmail />}></Route>
        <Route path="booked-hotel" element={<BookedHotel />}></Route>
        <Route path="pre-book" element={<PreBook />}></Route>
        <Route path="wishlist" element={<WishList />}></Route>

        <Route path="easy-membership">
          <Route path="register" element={<EasyMembershipRegister />} />
        </Route>

        <Route
          path="verify-email-with-token"
          element={<EmailVerificationWithToken />}
        ></Route>

        <Route path="book" element={<Book />}></Route>
        <Route path="compare" element={<CompareHotels />}></Route>
        <Route
          path="booking-detail/:id"
          element={<CheckBookingDetail />}
        ></Route>

        <Route path="static">
          <Route path="membership" element={<StaticMembership />} />
        </Route>

        <Route path="terms">
          <Route
            path="third-parties-personal-information"
            element={<ThirdPartiesPersonalInformation />}
          />

          <Route
            path="third-parties-personal-information-optional"
            element={<ThirdPartiesPersonalInformationOption />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
