/// <reference = cypress>

describe('Cadastro de novo usuário', () => {
  it('tenta criar novo usuario', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=account/register')

    const randomEmail = `usuario_${Date.now()}@teste.com`

    cy.get('#input-firstname').type('Zé')
    cy.get('#input-lastname').type('Do Tijolo')
    cy.get('#input-email').type(randomEmail)
    cy.get('#input-telephone').type('37999999999')
    cy.get('#input-password').type('sai_daqui_seu_demonio!123')
    cy.get('#input-confirm').type('sai_daqui_seu_demonio!123')

    cy.get('label[for="input-agree"]').click()

    cy.get('input[type="submit"][value="Continue"]').click()

    cy.contains('Your Account Has Been Created!').should('be.visible')
  })
})

describe('Login do usuário', () => {
  it('tenta realizar login', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')

    cy.get('#input-email').type('boaNoiteBruno@teste.com.br')
    cy.get('#input-password').type('sai_daqui_seu_demonio!123')

    cy.get('input[type="submit"][value="Login"]').click()

    cy.contains('My Account').should('be.visible')

  })
})

describe('Login com senha incorreta', () => {
  it('testa login usando senha errada', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=account/login')

    cy.get('#input-email').type('boaNoiteBruno@teste.com.br')
    cy.get('#input-password').type('saiDaquiBill')

    cy.get('input[type="submit"][value="Login"]').click()

    cy.contains('Warning: No match for E-Mail Address and/or Password.').should('be.visible')
  })
})

describe('Página de câmeras', () => {
  it('tenta abrir pagina de cameras', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=33')

    cy.get('#entry_212392 h1')
      .scrollIntoView()
      .should('be.visible')
      .and('have.text', 'Cameras')
  })
})

describe('Adicionar produto ao carrinho', () => {
  it('tenta adicionar um produto ao carrinho', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=product/category&path=18')
    
    cy.get('button[onclick="cart.add(\'28\');"]', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({force: true})

    cy.contains('Success: You have added').should('be.visible')
  })
})

describe('Busca de produto', () => {
  it('tenta buscar um iphone', () => {
    cy.visit('https://ecommerce-playground.lambdatest.io/')

    cy.get('input[name="search"]:visible')
      .should('be.visible')
      .type('iPhone{enter}')

    cy.contains('iPhone').should('be.visible')
  })
})


