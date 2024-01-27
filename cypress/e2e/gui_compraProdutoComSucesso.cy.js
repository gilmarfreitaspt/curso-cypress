///<reference types= "Cypress"/>
// começar sempre com o texto <reference types= "Cypress"/> e depois colocar discribe para começar a codar o teste
describe('Teste E2E - Realizando a compra com sucesso', () => {
    it('Fluxo de produtos', () => {
        // ultilize o visit do site para acessar a pagina.
        cy.visit("https://www.saucedemo.com/v1/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('#login-button').click()
        cy.get('.product_label').should('contain', 'Products')

        // Ordenação de produto do menor prara o maior valor
        // como é uma combo box vamos usar o comando select para selecionar
        cy.get('.product_sort_container').select('Price (low to high)')
        // Selecionando o produto do menor prara o maior valor e usamps o shoud para acessar  e contei para verificar o produto selecionado
        // Validando se o produto foi selecionado
        cy.get(':nth-child(1) > .inventory_item_label').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > .inventory_item_label').should('contain','Sauce Labs Bike Light') 
        cy.get(':nth-child(3) > .inventory_item_label').should('contain','Sauce Labs Bolt T-Shirt') 
        // comprando oum produto e verificando se está no carrinho e voltando para tela principal 
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click() 
        cy.get('.fa-layers-counter').click()
        cy.get('.cart_footer > .btn_secondary').click()
        // ordenando novamente do menor para o maio preço e acrescentando 2 produtos no carrinho 
        cy.get('.product_sort_container').select('Price (low to high)')
        cy.get(':nth-child(3) > .pricebar > .btn_primary').click()
        cy.get(':nth-child(4) > .pricebar > .btn_primary').click()
        // checar os produtos no carrinho 
        cy.get('.fa-layers-counter').click()
        cy.get('.fa-layers-counter').should('have.text', '3')
        // Removendo um item do carrinho
        cy.get(':nth-child(5) > .cart_item_label > .item_pricebar > .btn_secondary').click()
        // verificando se o produto foi removido do carrinho
        cy.get('.fa-layers-counter').should('have.text', '2')
        // Fazendo checkout  
        cy.get('.btn_action').click()
        // Inserindo os dados para finalizar a compra
        cy.get('[data-test="firstName"]').type('Gilmar')
        cy.get('[data-test="lastName"]').type('Freitas')
        cy.get('[data-test="postalCode"]').type('12345-6789')
        cy.get('.btn_primary').click()
        // verificando se o produto foi inserido no carrinho e total cobrado com sucesso
        cy.get(':nth-child(3) > .cart_item_label').should('contain','Sauce Labs Onesie') 
        cy.get(':nth-child(4) > .cart_item_label').should('contain','Sauce Labs Bolt T-Shirt') 
        cy.get('.summary_total_label').should('have.text', 'Total: $25.90') 
        // Finish checkout  
        cy.get('.btn_action').click()

        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')

    });
});