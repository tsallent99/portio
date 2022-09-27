import IconButton from "./IconButton";
import "./ModifyBookings.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function ModifyBookings({ bookings, onDeleteBookingClick }) {
  const [bookingId, setBookingId] = useState(null);

  const handleDeleteBooking = (bookingId) => setBookingId(bookingId);

  const handleDeleteBookingConfirmClick = () => {
    onDeleteBookingClick(bookingId);

    setBookingId(null);
  };

  return (
    <div className="mainBookings">
      <h2 className="title">My bookings</h2>
      <ul className="manageBookingsList">
        {bookings &&
          bookings.map((booking) => (
            <li className="manageBookingsListItem" key={booking._id}>
              <div className="from">
                <p className="fromTo">From:</p>
                <p>{new Date(booking.dates.from).toDateString()}</p>
              </div>
              <div>
                <p className="fromTo">To:</p>
                <p>{new Date(booking.dates.to).toDateString()}</p>
              </div>

              <IconButton
                text={"delete"}
                onClick={() => handleDeleteBooking(booking._id)}
              />
            </li>
          ))}
      </ul>
      {bookingId && (
        <div className="fullView">
          <div className="modal">
            <div className="questionContainer">
              <p className="textQuestion">
                Are you sure you want to cancel this reservation?
              </p>
            </div>
            <div className="answerContainer">
              <button className="buttonForm" onClick={() => setBookingId(null)}>
                No
              </button>
              <button
                className="buttonForm"
                onClick={handleDeleteBookingConfirmClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModifyBookings;
