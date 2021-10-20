describe("Network stabbing", () => {

    it("Promena network responsa", () => {
      cy.intercept("/api/boards", { fixture: "board.json" }).as("fa");
      cy.visit("/");
    });

    it("Dynamically change parts of ", () => {
      cy.intercept(
        {
          method: "GET",
          url: "/api/boards",
        },
        (req) => {
          req.reply((res) => {
            res.body[0].starred = true;
            res.body[1].name = "Novi drugi board";
            return res;
          });
        }
      );
      cy.visit("/");
    });

    it("Asertacije sa fronta", () => {});
    // it("Asertacije", () => {
    //   console.log(":nth-child(2) > .board_item > .board_title");
    //   cy.get(cy.get(".board_title")).eq(1).should("contains", 'Prvi board"');
    // });

    it.only("Asertovanje", () => {
      cy.intercept("/api/boards", { fixture: "board.json" }).as("fa");
      cy.visit("/");
      cy.get("@fa")
        .its("response")
        .then((res) => {
          expect(res.body[0].name).to.eq("jen");
          expect(res.statusCode).to.eq(200);
        });
    });

    it("Create board dynamically", () => {
      cy.intercept("/api/boards", [
        {
          name: "uhdughsudifhsudfhushdfiushdsnfckjdfhiurhdieudrguidrgiudguoghdihgudhgdhgudhguidhgudughdurgudh",
        },
      ]);
      cy.visit("");
    });
  });