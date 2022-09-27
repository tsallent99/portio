const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
const { User, Property } = require("../../../models");
const { NotFoundError } = require("errors");
const createProperty = require(".");
const { expect } = require("chai");
const retrievePropertiesOfUser = require("../retrievePropertiesOfUser");
const createBooking = require("../../bookings/createBooking");

describe("createProperty", () => {
  before(() => connect("mongodb://localhost:27017/portio-test"));

  beforeEach(() => Promise.all([User.deleteMany(), Property.deleteMany()]));

  it("succeeds on correct data", () => {
    // happy path
    const name1 = "Pepito";
    const surname1 = "Grillo";
    const email1 = "pepito@grillo.com";
    const password1 = "123123123";

    const name2 = "Pepito";
    const surname2 = "Grillo";
    const email2 = "pepito@grillo.com";
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
    const title = "Menorca House";
    const adress = "Carrer Major 47";
    const picture1 = "url-1";
    const picture2 = "url-2";
    const portions = [
      { owner: user1._id, shares: 1 },
      { owner: user2._id, shares: 1 },
    ];
    const totalPortions = 2;

    const property = new Property({
      adress,
      pictures: [picture1, picture2],
      title,
      portions,
      totalPortions,
    });
    return Promise.all([user1.save(), user2.save(), property.save()])
      .then(() => {
        createProperty(user1.id, adress, [picture1, picture2]);
      })
      .then(() => {
        retrievePropertiesOfUser(user1.id);
      })
      .then((properties) => {
        expect(properties).to.have.length(1);
      });
  });

  it("fails on non-existing user", () => {
    const userId = new ObjectId().toString();

    return createProperty(userId)
      .then(() => {
        throw new Error("should not reach this point");
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toEqual(`user with id ${userId} not found`);
        expect(createProperty(userId)).rejects.toThrowError(
          NotFoundError,
          `user with id ${userId} not found`
        );
      });
  });

  after(() => disconnect());
});
