const Page = require("./page");

class SignUpPage extends Page {
  /*
  Getters/Selectors
  */
  get signUpForm() {
    return $("//form[@id='signUpForm']");
  }

  get inputUsername() {
    return $(
      "//*[@id='signUpForm']//label[contains(text(),'Email')]//following-sibling::*//input"
    );
  }

  get inputPassword() {
    return $(
      "//*[@id='signUpForm']//label[contains(text(),'Enter password')]//following-sibling::*//input"
    );
  }

  get inputPasswordConfirmation() {
    return $(
      "//*[@id='signUpForm']//label[contains(text(),'Confirm password')]//following-sibling::*//input"
    );
  }

  get btnSubmit() {
    return $("//*[@id='signUpForm']//button[@type='submit']");
  }

  /*
  Interactions with page
  */
  async signUp(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.inputPasswordConfirmation.setValue(password);
    await this.btnSubmit.click();
  }

  open() {
    return super.open("login");
  }
}

module.exports = new SignUpPage();
