const Page = require("./page");

class UserMainPage extends Page {
  /*
  Getters/Selectors
  */
  get shortURLFrom() {
    return browser.react$("Form1");
  }

  get tableOfURLs() {
    return $("table");
  }

  get URLItems() {
    return $$("table tbody tr");
  }

  getURLItemRow(text) {
    return $(`//*[contains(text(), '${text}')]/..`);
  }

  getDeleteBtn(text) {
    return $(`//*[contains(text(), '${text}')]/..//button[1]`);
  }

  get inputURL() {
    return browser
      .react$("MyInput", { props: { label: "Enter URL" } })
      .$("input");
  }

  get inputTitle() {
    return browser
      .react$("MyInput", { props: { label: "Enter title" } })
      .$("input");
  }

  get btnSubmit() {
    return browser.react$("Form1").$("//button[@type='submit']");
  }

  get confirmationModal() {
    return $("//*[contains(text(), 'Are you sure')]/..");
  }

  get btnAgree() {
    return $("//*[contains(text(), 'Are you sure')]/..").$(
      "//button[text()='Agree']"
    );
  }

  /*
  Interactions with page
  */
  async shortURL(url, title) {
    await this.inputURL.setValue(url);
    await this.inputTitle.setValue(title);
    await this.btnSubmit.click();
  }

  async deleteURL(title) {
    await this.getDeleteBtn(title).click();
  }

  async confirmDelete() {
    await (await this.btnAgree).click();
  }

  open() {
    return super.open("main");
  }
}

module.exports = new UserMainPage();
