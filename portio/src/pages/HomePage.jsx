import { useState, useEffect } from "react";
import Loggito from "../utils/Loggito";
import retrievePropertiesOfUser from "../logic/retrievePropertiesOfUser";
import deleteBooking from "../logic/deleteBooking";
import retrieveUser from "../logic/retrieveUser";
import Header from "../components/Header";
import Profile from "../components/Profile";
import HomeList from "../components/HomeList";
import withContext from "../utils/withContext";
import ManageProperties from "../components/ManageProperties";
import PropertySelected from "../components/PropertySelected";
import BookingSuccesful from "../components/bookingSuccesful";
import Chat from "../components/Chat";
import ModifyBookings from "../components/ModifyBookings";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import retrieveUserBookingsOfAProperty from "../logic/retrieveUserBookingsOfAProperty";

function HomePage({ onLogoutClick, context: { handleFeedback } }) {
  const logger = new Loggito("HomePage");

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [view, setView] = useState("account_circle");
  const [properties, setProperties] = useState(null);
  const [singleProperty, setSingleProperty] = useState(null);
  const [propertyId, setPropertyId] = useState(null);
  const [totalDaysBooked, setTotalDaysBooked] = useState(null);
  const [bookings, setBookings] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    logger.info('"componentDidMount"');

    try {
      retrieveUser(sessionStorage.token, (error, user) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          onLogoutClick();

          return;
        }

        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setPhoto(user.photo);
        logger.debug("setName", user.name);

        loadProperties();
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
    setView("close");
  };
  const handleProfileCloseClick = () => {
    navigate("/");
    setView("account_circle");
  };

  const loadProperties = () => {
    try {
      retrievePropertiesOfUser(sessionStorage.token, (error, properties) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }

        setProperties(properties);

        logger.debug("setProperties", properties);
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  const handleManagePropertiesClick = () => {
    loadProperties();
    navigate("/manage");
  };

  const HandlePropertyClick = (property) => {
    setSingleProperty(property);
    setPropertyId(property.id);

    navigate("/myProperty");
  };

  const handleNavigationToBookingSuccesful = (totalDays) => {
    setTotalDaysBooked(totalDays);
    navigate("/bookingSuccesful");
  };
  const handleNavigationToChat = () => {
    navigate("/chat");
  };
  const handleModifyBookingsClick = () => {
    retrieveUserBookingsOfAProperty(
      sessionStorage.token,
      propertyId,
      (error, bookings) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }
        setBookings(bookings);
        navigate("/modifyBookings");
      }
    );
  };

  const handleDeleteBookingClick = (bookingId) => {
    deleteBooking(sessionStorage.token, bookingId, (error) => {
      if (error) {
        handleFeedback({ message: error.message, level: "error" });

        logger.warn(error.message);

        return;
      }
      retrieveUserBookingsOfAProperty(
        sessionStorage.token,
        propertyId,
        (error, bookings) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }
          setBookings(bookings);
        }
      );
    });
  };

  return name ? (
    <div className="homePage container">
      <Header
        className="header"
        name={"Portio"}
        properties={properties}
        onProfileClick={handleProfileClick}
        onProfileCloseClick={handleProfileCloseClick}
        view={view}
      />

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={<HomeList onManageClick={handleManagePropertiesClick} />}
          />
          <Route
            path="profile"
            element={
              <Profile
                onCloseClick={handleProfileCloseClick}
                onLogoutClick={onLogoutClick}
                email={email}
                name={name}
                surname={surname}
                picture={
                  "https://scontent-mad1-1.xx.fbcdn.net/v/t1.6435-9/71567234_1214299772088959_2144227268220682240_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=84a396&_nc_ohc=rXVzTmfKJUYAX9QPv_B&_nc_ht=scontent-mad1-1.xx&oh=00_AT9pq87AGrY3QwOOHJUQKJloXd-DggK4K6egzWI1RSsKrA&oe=6349E67F"
                }
              />
            }
          />
          <Route
            path="manage"
            element={
              <ManageProperties
                properties={properties}
                onPropertyClick={HandlePropertyClick}
              />
            }
          />
          <Route
            path="myProperty"
            element={
              <PropertySelected
                propertySelected={singleProperty}
                onNavigationToBookingSuccesful={
                  handleNavigationToBookingSuccesful
                }
                onChatClick={handleNavigationToChat}
                onModifyBookinksClick={handleModifyBookingsClick}
              />
            }
          />
          <Route
            path="bookingSuccesful"
            element={<BookingSuccesful totalDays={totalDaysBooked} />}
          />
          <Route path="chat" element={<Chat propertyId={propertyId} />} />
          <Route
            path="modifyBookings"
            element={
              <ModifyBookings
                bookings={bookings}
                onDeleteBookingClick={handleDeleteBookingClick}
              />
            }
          />
        </Routes>
      </main>
    </div>
  ) : null;
}

export default withContext(HomePage);
