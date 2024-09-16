// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />


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
            .get('body')
            .screenshot({
              capture: 'runner',
            }) 
    })  

    //Teste 03 validar que, se um valor não-numérico for digitado, seu valor continuará vazio.
    it('Validar Campo de telefone numerico', function() {
        cy
           .get('#phone').type('testenumero')
           .should('have.value',"")      
   })  
  
   //Teste 04 exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
   it('exibe mensagem de erro quando o telefone se torna obrigatório', function() {
      cy
          .get('#firstName').type('Tales')
          .get('#lastName').type('Henrique')
          .get('#email').type('taleshenriquelima@gmail.con')
          .get('#phone-checkbox').check()
          .get('#open-text-area').type('teste 03')
          .get('botton,[type="submit"]').click()
          .get('.error').should('be.visible')      
     }) 

   //envia o formuário com sucesso usando um comando customizado
   it('envia o formuário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()
      .get('.success').should('be.visible')  
   }) 

   //Selecionando opções em campos de seleção suspensa
    it('seleciona um produto (blog) por seu texto', function() {
      cy
        .get('select').select('blog').should('have.value', 'blog')
        .get('select').select('cursos').should('have.value', 'cursos')       
    }) 

    //marca o tipo de atendimento "Feedback"
    it('Marca o tipo de atendimento "Feedback', function() {
      cy
       .get('[type="radio"][value="feedback"]').check()
       .should('have.value','feedback')
    })
    //Select File
    it('seleciona um arquivo da pasta fixtures', function() {
      cy
        .get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        //.should(function($input) {
          //expect($input[0].files[0].name).to.equal('example.json')
        .get('botton,[type="submit"]').click()
        .get('.error').should('be.visible')
        //})
  
    }) 

    // verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
      cy
        .get('#privacy')
        .get('#privacy a').should('have.attr', 'target', '_blank')
        .get('#privacy a').invoke('removeAttr', 'target')
        .click()
        .title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
        //.screenshot()
        //.get('#title')
      cy.contains('CAC TAT - Política de privacidade').should('be.visible')
        

    }) 
})