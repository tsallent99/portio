import retrieveMessages from "../logic/retrieveMessages";
import { useEffect, useState } from "react";
import Loggito from "../utils/Loggito";
import "./Chat.css";
import createMessage from "../logic/createMessage";
import { ConflictError, NotFoundError, ServerError } from "errors";
function Chat({ propertyId }) {
  const [messages, setMessages] = useState(null);
  const logger = new Loggito("HomePage");

  useEffect(() => {
    logger.info('"componentDidMount"');

    try {
      retrieveMessages(sessionStorage.token, propertyId, (error, messages) => {
        if (error) {
          logger.warn(error.message);

          return;
        }

        setMessages(messages);

        logger.debug("setMessages", messages);
      });
    } catch (error) {
      logger.warn(error.message);
    }
  }, []);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const text = form.text;
    const message = text.value;

    try {
      createMessage(sessionStorage.token, propertyId, message, (error) => {
        if (error) {
          if (error instanceof ServerError) {
            logger.error(error.message);
          } else if (
            error instanceof NotFoundError ||
            error instanceof ConflictError
          ) {
            logger.warn(error.message);
          }

          return;
        }
        try {
          retrieveMessages(
            sessionStorage.token,
            propertyId,
            (error, messages) => {
              if (error) {
                logger.warn(error.message);

                return;
              }

              setMessages(messages);

              logger.debug("setMessages", messages);
            }
          );
        } catch (error) {
          logger.warn(error.message);
        }
      });
    } catch (error) {
      logger.warn(error.message);
    }
  };

  const onRefreshChat = () => {
    retrieveMessages(sessionStorage.token, propertyId, (error, messages) => {
      if (error) {
        logger.warn(error.message);

        return;
      }

      setMessages(messages);

      logger.debug("setMessages", messages);
    });
  };

  return (
    <div className="chatContainer">
      <button className="refresh" onClick={onRefreshChat}>
        Refresh Chat!
      </button>
      <ul className="chat">
        {messages &&
          messages.map((message) => (
            <li className="message" key={message.id}>
              <img className="photo" src={message.user.photo}></img>
              <p>{message.text}</p>
              <p className="date">{new Date(message.sendAt).toDateString()}</p>
            </li>
          ))}
      </ul>
      <div className="footer">
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            className="text_input"
            placeholder="Message..."
            name="text"
            id="text"
          />
          <button className="sendButton" type="submit">
            send
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
