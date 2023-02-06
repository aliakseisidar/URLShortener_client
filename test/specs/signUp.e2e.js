const SignUpPage = require("../pageobjects/signUp.page");
const { forSignUp, admin } = require("../credentials");

import ServicesForUser from "../../src/API/ServicesForUser";
import ServicesForAdmin from "../../src/API/ServicesForAdmin";

describe("Sign Up form", function () {
  before("Open page", async function () {
    await SignUpPage.open();
  });

  it("should be displayed on /login page", async function () {
    await expect(SignUpPage.signUpForm).toBeDisplayed();
  });

  it("should include Email/Password/ConfirmPassword inputs", async function () {
    await expect(SignUpPage.inputUsername).toBeDisplayed();
    await expect(SignUpPage.inputPassword).toBeDisplayed();
    await expect(SignUpPage.inputPasswordConfirmation).toBeDisplayed();
    await expect(SignUpPage.btnSubmit).toBeDisplayed();
  });

  it("should submit form", async function () {
    const signUpMock = await browser.mock("**/auth/registration");
    await SignUpPage.signUp(forSignUp.email, forSignUp.password);
    expect(signUpMock.calls.length).toBe(1);
  });

  it("should redirect user to Main page", async function () {
    await expect(browser).toHaveUrlContaining("main");
  });

  after("delete user", async function () {
    //get admin-token
    const res1 = await ServicesForUser.logIn(admin.email, admin.password);
    //get user related data
    const res2 = await ServicesForAdmin.getUsers(
      0,
      res1.data.token,
      forSignUp.email
    );
    //delete user
    await ServicesForAdmin.deleteUser(res2.data.users[0]._id, res1.data.token);
  });
});
