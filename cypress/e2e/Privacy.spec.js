  //Teste 00 Iniciar a Aplicação
describe('Central de Atendimento ao Cliente TAT', function() {
      beforeEach(function() {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/privacy.html')
    })

    // verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy
         .get('#white-background')
         .contains('Talking About Testing').should('be.visible')

            .title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de privacidade')
          //.screenshot()
          //.get('#title')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })
})       