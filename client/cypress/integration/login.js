describe("App vita wallet", () => {
  //
  it("Login", () => {
    cy.visit("/user/login");
    cy.contains("Entrar").should("be.visible");
    cy.contains("Registrarse").should("be.visible");
  });
  [];
  //
});
/* 

  it("Entry user", function () {
    // destructuring assignment of the this.currentUser object
    let username = "1";
    let password = "123456";

    cy.visit("/user/login");

    cy.get("TextInput[name=user]").type(username);

    // {enter} causes the form to submit
    cy.get("TextInput[name=password]").type(`${password}{enter}`);

    // we should be redirected to /dashboard
    cy.url().should("include", "/dashboard");

    // our auth cookie should be present
    cy.getCookie("your-session-cookie").should("exist");

    // UI should reflect this user being logged in
    cy.get("h1").should("contain", "jane.lane");
  }); */
