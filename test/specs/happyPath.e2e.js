const SignInPage = require("../pageobjects/signIn.page");
const UserMainPage = require("../pageobjects/userMain.page");
const { forSignIn } = require("../credentials");

const autogenerate = () => {
  return `${(Math.random() + 1).toString(36).substring(7)}`;
};

const title = autogenerate();

describe("Sign In form", function () {
  before("Open page", async function () {
    await SignInPage.open();
  });

  it("should be displayed on /login page", async function () {
    await expect(SignInPage.signInForm).toBeDisplayed();
  });

  it("should include Email/Password inputs", async function () {
    await expect(SignInPage.inputUsername).toBeDisplayed();
    await expect(SignInPage.inputPassword).toBeDisplayed();
    await expect(SignInPage.btnSubmit).toBeDisplayed();
  });

  it("should submit form", async function () {
    const signInMock = await browser.mock("**/auth/login");
    await SignInPage.signIn(forSignIn.email, forSignIn.password);
    expect(signInMock.calls.length).toBe(1);
  });

  it("should redirect user to Main page", async function () {
    await expect(browser).toHaveUrlContaining("main");
  });
});

describe("Main page", function () {
  it("should include from to short URL", async function () {
    await expect(UserMainPage.shortURLFrom).toBeDisplayed();
  });

  it("should include table of URLs", async function () {
    await expect(UserMainPage.tableOfURLs).toBeDisplayed();
  });

  it("should submit form", async function () {
    const shortURLMock = await browser.mock("**/shortURL");
    await UserMainPage.shortURL("https://webdriver.io/", title);
    expect(shortURLMock.calls.length).toBe(1);
  });

  it("should contain a new short URL", async function () {
    await expect(UserMainPage.getURLItemRow(title)).toBeDisplayed();
  });

  it("should show confirmation for delete short URL", async function () {
    await UserMainPage.deleteURL(title);
    await expect(UserMainPage.confirmationModal).toBeDisplayed();
  });

  it("should delete short URL", async function () {
    const deleteURLMock = await browser.mock("**" + "/deleteURL?" + "**");
    await UserMainPage.confirmDelete();
    expect(deleteURLMock.calls.length).toBe(1);
  });

  it("should not contain deleted short URL", async function () {
    await expect(UserMainPage.getURLItemRow(title)).not.toBeDisplayed();
  });
});
