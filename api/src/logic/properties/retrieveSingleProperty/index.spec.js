require("dotenv").config();

const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");

const { User, Property } = require("../../../models");
const retrieveSingleProperty = require(".");
const { expect } = require("chai");
const { SystemError } = require("errors");

const { MONGODB_URI_TEST } = process.env;

describe("testing retrieveSingleProperty", () => {
  beforeAll(() => connect(MONGODB_URI_TEST));

  beforeEach(() => Promise.all([User.deleteMany(), Property.deleteMany()]));

  test("succeeds when user owes a property", () => {
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
    Promise.all([user1.save(), user2.save(), property.save()])
      .then(() => {
        retrieveSingleProperty(user1._id, property._id);
      })
      .then((property) => {
        expect(property).to.have.lengthOf(1);
        expect(property.to.be.defined);
        expect(property.adress).to.equal(adress);
        expect(property.portions).to.have.lengthOf(2);
        expect(property.portions[0].shares).to.equal(1);
      });
  });
  after(() => disconnect());
});
