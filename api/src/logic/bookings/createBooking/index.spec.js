// TEST
// 1- happy path without previous reservations -> requires user and property created

// 2- happy path with previous reservation --> requires 2 users, 1 property and 1 booking

// 3- unhappy path when there is a conflict between reservations (same date) --> requires 2 users, 1 property and 1 booking

// 4- unhappy path when property does not belong to the user --> require user and property

// 5- unhappy path user does not exist

// 6- unhappy path property does not exist

require("dotenv").config();

const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");

const { User, Property, Booking } = require("../../../models");
const createBooking = require(".");
const { expect } = require("chai");
const { SystemError } = require("errors");

const { MONGODB_URI_TEST } = process.env;

describe("testing createBooking", () => {
  beforeAll(() => connect(MONGODB_URI_TEST));

  beforeEach(() =>
    Promise.all([
      User.deleteMany(),
      Property.deleteMany(),
      Booking.deleteMany(),
    ])
  );

  test("succeeds when there's a previous booking", () => {
    // happy path
    const name1 = "Pepito";
    const surname1 = "Grillo";
    const email1 = "pepito@grillo.com";
    const password1 = "123123123";

    const name2 = "Pato";
    const surname2 = "Donald";
    const email2 = "pato@donald.com";
    const password2 = "123123123";

    const user1 = new User({
      name: name1,
      surname: surname1,
      email: email1,
      password: password1,
    });

    const user2 = new User({
      name: name2,
      surname: surname2,
      email: email2,
      password: password2,
    });

    const adress = "Carrer Major 47";
    const picture1 = "url-1";
    const picture2 = "url-2";

    const property = new Property({
      adress,
      pictures: [picture1, picture2],
      portions: [
        { owner: user1.id, shares: 1 },
        { owner: user2.id, shares: 1 },
      ],
      totalPortions: 4,
    });

    const fromDate = new Date("2022-10-23");
    const toDate = new Date("2022-10-29");

    const newFromDate = new Date("2022-11-23");
    const newToDate = new Date("2022-11-29");

    const booking = new Booking({
      user: user1.id,
      property: property.id,
      dates: {
        from: fromDate,
        to: toDate,
      },
    });

    return Promise.all([
      user1.save(),
      user2.save(),
      property.save(),
      booking.save(),
    ])
      .then(() => createBooking(user1.id, property.id, newFromDate, newToDate))
      .then(() => {
        Booking.find().then((bookings) => {
          expect(bookings).to.have.lengthOf(2);
        });
      });
  });

  test("it fails when there is a conflict dates", () => {
    // happy path
    const name1 = "Pepito";
    const surname1 = "Grillo";
    const email1 = "pepito@grillo.com";
    const password1 = "123123123";

    const name2 = "Pato";
    const surname2 = "Donald";
    const email2 = "pato@donald.com";
    const password2 = "123123123";

    const user1 = new User({
      name: name1,
      surname: surname1,
      email: email1,
      password: password1,
    });

    const user2 = new User({
      name: name2,
      surname: surname2,
      email: email2,
      password: password2,
    });

    const adress = "Carrer Major 47";
    const picture1 = "url-1";
    const picture2 = "url-2";

    const property = new Property({
      adress,
      pictures: [picture1, picture2],
      portions: [
        { owner: user1.id, shares: 1 },
        { owner: user2.id, shares: 1 },
      ],
      totalPortions: 4,
    });

    const fromDate = new Date("2022-10-23");
    const toDate = new Date("2022-10-29");

    const newFromDate = new Date("2022-10-27");
    const newToDate = new Date("2022-11-29");

    const booking = new Booking({
      user: user1.id,
      property: property.id,
      dates: {
        from: fromDate,
        to: toDate,
      },
    });

    return Promise.all([
      user1.save(),
      user2.save(),
      property.save(),
      booking.save(),
    ])
      .then(() =>
        expect(
          createBooking(user1.id, property.id, newFromDate, newToDate)
        ).to.eventually.be.rejectedWith(
          "there is a previous reservation in range of dates required"
        )
      )
      .then(() => Booking.find())
      .then((bookings) => {
        expect(bookings).to.have.lengthOf(1);
      });
  });
  afterAll(() => disconnect());
});
