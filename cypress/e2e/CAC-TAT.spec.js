// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />


  //Teste 00 Iniciar a Aplicação
describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
    })

  //Teste 01 Validação do Titulo da aplicação
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

  //Teste 02 Preenchimento com suceso fluxo simples
    it('Preenche os campos obrigatórios', function() {
       const longtext = 'testes automatizados testes automatizados testes automatizados testes automatizados testes automatizados'
        cy
            .get('#firstName').type('Tales')
            .get('#lastName').type('Henrique')
            .get('#email').type('taleshenriquelima@gmail.com')
            .get('#phone').type('19982754555')
            .get('#open-text-area').type(longtext,{delay:0})
            .get('botton,[type="submit"]').click()
            .get('.success').should('be.visible')      
    })

  //Teste NEGATIVO exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
    it('Preenche os campos obrigatórios TESTE NEGATIVO', function() {
       cy
            .get('#firstName').type('Tales')
            .get('#lastName').type('Henrique')
            .get('#email').type('taleshenriquelima_gmail.con')
            .get('#phone').type('19982754555')
            .get('#open-text-area').type('teste 03')
            .get('botton,[type="submit"]').click()
            .get('.error').should('be.visible')      
    })  

    //Teste 03 validar que, se um valor não-numérico for digitado, seu valor continuará vazio.
    it('Validar Campo de telefone numerico', function() {
        cy
           .get('#phone').type('testenumero')
           .should('have.value',"")      
   })  
  
   //Teste 03 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
   it('exibe mensagem de erro quando o telefone se torna obrigatório', function() {
      cy
          .get('#firstName').type('Tales')
          .get('#lastName').type('Henrique')
          .get('#email').type('taleshenriquelima@gmail.con')
          .get('#phone-checkbox').click()
          .get('#open-text-area').type('teste 03')
          .get('botton,[type="submit"]').click()
          .get('.error').should('be.visible')      
     }) 

   //envia o formuário com sucesso usando um comando customizado
   it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
    .get('.success').should('be.visible')  
   }) 


})
