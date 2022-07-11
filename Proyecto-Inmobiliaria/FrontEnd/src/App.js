import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  ProductLayer,
  NotFound,
  MyFavourites,
  Reservation,
  Search,
  MyReservations,
  CreateProduct,
  ReservationDetails,
  AdminReservations,
} from "./pages";
import StoreProvider from "./store/StoreProvider";
import DefaultLayout from "./layout/defaultLayout";
import ProtectedRoute from "./layout/ProtectedRoute";
import ProtectedRouteAdmin from "./layout/ProtectedRouteAdmin";
import ContextFilterLayout from "./layout/ContextFilterLayout";

function App() {
  const [bookTriedWithoutLogin, setBookTriedWithoutLogin] = useState(false);
  const [reservationDetailsId, setReservationDetailsId] = useState();
  const [reservationDeleted, setReservationDeleted] = useState(false);

  return (
    <>
      <StoreProvider>
        <DefaultLayout>
          <Routes>
            <Route element={<ContextFilterLayout />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/search/city/:city/startDate/:startDate/endDate/:endDate"
                element={<Search />}
              />
            </Route>
            <Route
              path="/login"
              element={
                <Login
                  bookTriedWithoutLogin={bookTriedWithoutLogin}
                  setBookTriedWithoutLogin={setBookTriedWithoutLogin}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product/:productId"
              element={
                <ProductLayer
                  setBookTriedWithoutLogin={setBookTriedWithoutLogin}
                />
              }
            />
            <Route
              path="/myfavourites"
              element={
                <ProtectedRoute>
                  <MyFavourites />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/product/:productId/reservation"
              element={
                <ProtectedRoute>
                  <Reservation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myreservations"
              element={
                <ProtectedRoute>
                  <MyReservations
                    setReservationDetailsId={setReservationDetailsId}
                    reservationDeleted={reservationDeleted}
                    setReservationDeleted={setReservationDeleted}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myreservations/reservationdetails/:reservationId"
              element={
                <ProtectedRoute>
                  <ReservationDetails setReservationDeleted={setReservationDeleted} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createproduct"
              element={
                <ProtectedRouteAdmin>
                  <CreateProduct />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/myreservations/reservationdetails"
              element={
                <ReservationDetails
                  reservationDetailsId={reservationDetailsId}
                  setReservationDeleted={setReservationDeleted}
                />
              }
            />
            <Route
              path="/adminreservations"
              element={
                <AdminReservations
                  setReservationDetailsId={setReservationDetailsId}
                />
              }
            />
          </Routes>
        </DefaultLayout>
      </StoreProvider>
    </>
  );
}

export default App;
