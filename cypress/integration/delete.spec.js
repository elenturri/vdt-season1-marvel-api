

describe('DELETE /characters/id', function(){
   
    



    before(function(){
    
        cy.back2ThePast()
        cy.setToken()
     })
    const tochaHumana = {
    name: 'Jhonny Storn',
    alias: 'Tocha Humana', 
    team: ['Quarteto Fantástico'],
    active: true
    
    }
    

    context('quando tenho um personagem cadastrado', function(){


        before(function(){
    
         cy.postCharacter(tochaHumana).then(function(response){
            Cypress.env('characterId', response.body.character_id)
         })
         })

         it('deve remover o personagem pelo id', function(){
         const id = Cypress.env('characterId')
         cy.deleteCharacterById(id).then(function(response){
            expect(response.status).to.eql(204)
            
         })
         
    })

it('deve retornar 404 ao remover por id não casatrado', function(){
        const id = '62d17a004feef6156c043025'
        cy.deleteCharacterById(id).then(function(response){
            expect(response.status).to.eql(404)

    })
    
    })

 })
 after(function(){
    const id = Cypress.env('characterId')
     cy.getCharacterById(id).then(function(response){
     expect(response.status).to.eql(404)
    })
}) 
})
