const Page = require("./page");

class SignInPage extends Page {
  /*
  Getters/Selectors
  */
  get signInForm() {
    return $("//form[@id='logInForm']");
  }

  get inputUsername() {
    return $(
      "//*[@id='logInForm']//label[contains(text(),'Email')]//following-sibling::*//input"
    );
  }

  get inputPassword() {
    return $(
      "//*[@id='logInForm']//label[contains(text(),'Enter password')]//following-sibling::*//input"
    );
  }

  get btnSubmit() {
    return $("//*[@id='logInForm']//button[@type='submit']");
  }

  /*
  Interactions with page
  */
  async signIn(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  open() {
    return super.open("login");
  }
}

module.exports = new SignInPage();
