const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
require("dotenv").config();
const { User, Property } = require("../../../models");
const { NotFoundError } = require("errors");
const retrievePropertiesOfUser = require(".");
const { expect } = require("chai");

describe("retrievePropertiesOfUser", () => {
  before(() => connect("mongodb://localhost:27017/portio-test"));

  beforeEach(() => Promise.all([User.deleteMany(), Property.deleteMany()]));

  it("succeeds on existing user and properties", () => {
    // happy path
    const name1 = "Pepito";
    const surname1 = "Grillo";
    const email1 = "pepito@grillo.com";
    const password1 = "123123123";

    const name2 = "Pato";
    const surname2 = "Donald";
    const email2 = "pato@donald.com";
    const password2 = "123123123";

    const adress = "Carrer Major 47";
    const adress2 = "Carrer de Granollers 47";
    const picture1 = "url-1";
    const picture2 = "url-2";

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

    const property1 = new Property({
      adress,
      pictures: [picture1, picture2],
      portions: [
        { owner: user1.id, shares: 1 },
        { owner: user2.id, shares: 1 },
      ],
      totalPortions: 4,
    });

    const property2 = new Property({
      adress: adress2,
      pictures: [picture1, picture2],
      portions: [
        { owner: user1.id, shares: 1 },
        { owner: user2.id, shares: 1 },
      ],
      totalPortions: 4,
    });

    return Promise.all([
      user1.save(),
      user2.save(),
      property1.save(),
      property2.save(),
    ]).then(() =>
      retrievePropertiesOfUser(user1.id).then((properties) => {
        expect(properties).to.have.lengthOf(2);

        const _property1 = properties.find(
          (property) => property.id === property1.id
        );

        //expect(_property1).to.be.defined;
        expect(_property1.adress).to.equal(adress);
        expect(_property1.portions).to.have.lengthOf(2);
        expect(_property1.portions[0].shares).to.equal(1);

        const _property2 = properties.find(
          (property) => property.id === property2.id
        );

        //expect(_property2).to.be.defined;
        expect(_property2.adress).to.equal(adress2);
        expect(_property2.portions).to.have.lengthOf(2);
        expect(_property2.portions[0].shares).to.equal(1);
      })
    );
  });

  //   it("fails on non-existing user", () => {
  //     // unhappy path
  //     const userId = new ObjectId().toString();

  //     return retrievePropertiesOfUser(userId).catch((error) => {
  //       expect(error).to.be.instanceOf(NotFoundError);
  //       expect(error.message).toEqual(`user with id ${userId} not found`);
  //     });
  //   });

  after(() => disconnect());
});
