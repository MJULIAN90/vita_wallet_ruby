describe("App vita wallet", () => {
  //
  it("Login", () => {
    cy.visit("/user/login");
    cy.contains("Entrar").should("be.visible");
    cy.contains("Registrarse").should("be.visible");
  });

  //
});
