import Calendar from "react-calendar";
import { useState } from "react";
import "./PropertySelected.css";
import "../../node_modules/react-calendar/dist/Calendar.css";
import createBooking from "../logic/createBooking";
import { useNavigate } from "react-router-dom";
import Loggito from "../utils/Loggito";
import { eachDayOfInterval } from "date-fns";

function PropertySelected({
  propertySelected,
  onNavigationToBookingSuccesful,
  onChatClick,
  onModifyBookinksClick,
}) {
  const logger = new Loggito("PropertySelected");
  const [dates, setDates] = useState();
  const [totalDays, setTotalDays] = useState(0);

  const navigate = useNavigate();
  const [viewCalendar, setViewCalendar] = useState(null);

  const makeABook = () => {
    setViewCalendar("on");
  };

  const handleNextClick = () => {
    try {
      createBooking(
        sessionStorage.token,
        propertySelected.id,
        dates[0],
        dates[1],
        (error) => {
          if (error) {
            logger.warn(error.message);
            return;
          }
          const fromNewProv = Number(Date.parse(dates[0]));
          const toNewProv = Number(Date.parse(dates[1]));
          const difference = toNewProv - fromNewProv;
          const daysOfNewBooking = Math.round(difference / 86400000);

          setTotalDays(daysOfNewBooking);

          setViewCalendar("off");
        }
      );
    } catch (error) {
      logger.warn(error.message);
    }
  };

  return (
    <div>
      {viewCalendar === null && (
        <div>
          <button onClick={makeABook}>Book a Day</button>
          <button onClick={onModifyBookinksClick}>Modify a booking</button>
          <button onClick={onChatClick}>Owner's Chat</button>
        </div>
      )}

      {viewCalendar === "on" && dates?.length !== 0 && (
        <div className="calendar-container">
          <Calendar onChange={setDates} value={dates} selectRange={true} />
          <p className="text-center">
            <span className="bold">Start:</span>&nbsp;
            {dates?.[0].toDateString()}
            &nbsp;|&nbsp;
            <span className="bold">End:</span> {dates?.[1].toDateString()}
          </p>
          <button onClick={handleNextClick}>Next</button>
        </div>
      )}

      {viewCalendar === "on" && dates?.length === 0 && (
        <div className="calendar-container">
          <Calendar onChange={setDates} value={dates} selectRange={true} />
        </div>
      )}

      {viewCalendar === "off" && dates.length !== 0 && (
        <div>
          <h2>Total days booked: {totalDays}</h2>
          <button
            className="nextSteps"
            onClick={() => {
              onNavigationToBookingSuccesful(totalDays);
            }}
          >
            Next Steps
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertySelected;
