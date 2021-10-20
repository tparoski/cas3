import boards from "../fixtures/board.json"
import navigation from "../fixtures/navigation.json"
import inQA from "../fixtures/inQA.json"
const url="/api/boards/"+boards[2].id;

describe("Network stabbing", () => {

    it("assert boards", () => {
      cy.intercept("/api/boards", { fixture: "board.json" }).as("getBoard");
      

      cy.visit("/");
      cy.get("@getBoard")
        .its("response")
        .then((res) => {
          expect(res.body[0].name).to.eq(boards[0].name);
          expect(res.body[0].user).to.eq(boards[0].user);
          expect(res.body[0].starred).to.eq(boards[0].starred);
          expect(res.body[1].name).to.eq(boards[1].name);
          expect(res.body[1].user).to.eq(boards[1].user);
          expect(res.body[1].starred).to.eq(boards[1].starred);
          expect(res.body[2].name).to.eq(boards[2].name);
          expect(res.body[2].user).to.eq(boards[2].user);
          expect(res.body[2].starred).to.eq(boards[2].starred);
          expect(res.body[3].name).to.eq(boards[3].name);
          expect(res.body[3].user).to.eq(boards[3].user);
          expect(res.body[3].starred).to.eq(boards[3].starred);
          expect(res.statusCode).to.eq(200);
        });
        
        
    });

    it('assert lists', () => {
        cy.intercept('/api/boards/'+boards[2].id, { fixture: "inQA.json" }).as("inQA");
        cy.get(navigation.goToBoard).contains(boards[2].name).click()
        cy.wait("@inQA")
        .its("response")
        .then((res) => {
          expect(res.body.name).to.eq(inQA.name);
          expect(res.body.user).to.eql(inQA.user);
          expect(res.body.id).to.eql(inQA.id);
          expect(res.body.starred).to.eql(inQA.starred);
          expect(res.body.tasks.length).to.eql(0)

          expect(res.body.lists[0].boardId).to.eql(inQA.lists[0].boardId);
          expect(res.body.lists[0].title).to.eql(inQA.lists[0].title);
          expect(res.body.lists[0].id).to.eql(inQA.lists[0].id);

          expect(res.body.lists[1].boardId).to.eql(inQA.lists[1].boardId);
          expect(res.body.lists[1].title).to.eql(inQA.lists[1].title);
          expect(res.body.lists[1].id).to.eql(inQA.lists[1].id);

          expect(res.body.lists[2].boardId).to.eql(inQA.lists[2].boardId);
          expect(res.body.lists[2].title).to.eql(inQA.lists[2].title);
          expect(res.body.lists[2].id).to.eql(inQA.lists[2].id);

          expect(res.statusCode).to.eq(200);
        });
        
    })

});