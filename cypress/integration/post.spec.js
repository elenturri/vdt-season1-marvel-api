

describe('POST /character', function(){

    before(function(){
        cy.setToken()
        cy.back2ThePast()

    })


    it('deve cadastrar um personagem', function(){
        const character = {
            name: 'wanda Maximoff',
            alias: 'Feiticeira Escarlate' , 
            team: ['Vingadores'],
            active: true
        }
        cy.postCharacter(character)
            .then(function (response){
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })
})


    context('quando o personagem já existe', function(){

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores da costa oeste', 'irmandade de mutantes'],
            active: true
        }
     
        before(function(){
            cy.postCharacter(character)
             .then(function (response){
                expect(response.status).to.eql(201)  
            })
    
        })

        it('não deve cadastrar duplicado', function(){
            cy.postCharacter(character).then(function (response){
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context(' quando os campos são obrigatórios', function(){

        const cenarios = [
            {
                'personagem': {
                    name: 'Ororo Munroe',
                    team: ['x-man', 'vingadores'],
                    active: true
                },
                'expected_message': '"alias" is required'
            },
            { 
                 'personagem':{
                    alias: 'Tempestade',
                    team: ['x-man', 'vingadores'],
                    active: true
                },
                'expected_message': '"name" is required'
    
            },
            {
                'personagem':{
                    name: 'Ororo Munroe',
                    alias: 'Tempesdade',
                    active: true
                },
                'expected_message': '"team" is required'
            },
               
            {
                'personagem': {
                    name: 'Ororo Munroe',
                    alias: 'Tempestade',
                    team: ['x-man', 'vingadores'],
                },
                'expected_message': '"active" is required'
            },
            {
                'pernonagem':{
    
                },
                 'expected_message': '"name" is required'
            
            },
    
            ]

            it('validar campos obrigatórios', function(){
                cenarios.forEach(function(cenarios){
                cy.postCharacter(cenarios.personagem)
                 .then(function(response){
                        expect(response.status).to.eql(400)
                        expect(response.body.error).to.eql('Bad Request')
                        expect(response.body.validation.body.message).to.eql(cenarios.expected_message)
                        
                    })
    
                })

    })
        
                
            }) 

        