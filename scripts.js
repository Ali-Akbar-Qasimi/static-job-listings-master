let cardsContainer = document.querySelector('.cards')
let filterContainer = document.querySelector('.filter')
let clear = document.querySelector('.clear')

function getData(){
    fetch('data.json')
    .then(res=>res.json())
    .then(data=> {
        data.forEach(card => {
            makeCard(card)
        });
    })
}

getData()


let filterElements = []



clear.addEventListener('click',()=>{
    filterElements = []
    filterContainer.innerHTML = null
    cardsContainer.innerHTML = null
    document.querySelector('.filter-container').style.display = 'none'
    fetch('data.json')
    .then(res=>res.json())
    .then(data=> {
        data.forEach(card => {
            makeCard(card)
        });
    })
})

function deleteFilter(element){
    if(filterElements.length === 1){
        document.querySelector('.filter-container').style.display = 'none'
        filterHandler(filterElements)
        
    }
    let text = element.parentElement.children[0].textContent

    
    filterElements.forEach((x,index) =>{
        if(x===text){
            filterElements.splice(index,1)
        }
    })
    
    filterContainer.innerHTML = null
    filterElements = [...new Set(filterElements)]
    Object.values(filterElements).map((val) => {
        filterContainer.innerHTML += `
        <div>
            <div class="text">${val}</div>
            <span onclick="deleteFilter(this)" data-value=${val}>
                <img src="./images/icon-remove.svg" alt="remove icon">
            </span>
        </div>`
    })
    
    
    filterHandler(filterElements)
    
}

function filter(e){
    filterElements.push(e.target.dataset.role)
    filterContainer.innerHTML = null
    cardsContainer.innerHTML = null
    // checking if it is duplicated
    filterElements = [...new Set(filterElements)]
    
    Object.values(filterElements).map((val) => {
        filterContainer.innerHTML += `
        <div>
            <div class="text">${val}</div>
            <span onclick="deleteFilter(this)" data-value=${val}>
                <img src="./images/icon-remove.svg" alt="remove icon">
            </span>
        </div>`
    })

    filterHandler(filterElements)

    
    if(filterElements.length === 0){
        document.querySelector('.filter-container').style.display = 'none'
    }else{
        document.querySelector('.filter-container').style.display = 'flex'
    }
}

function filterHandler(filterElements){
    fetch('data.json')
    .then(res=>res.json())
    .then(data=>{

        if(filterElements.length === 0){
            getData()
        }
        
        let filteredElements = []
        cardsContainer.innerHTML = null
        data.filter((x) => {
            Object.values(x).map((value) => {
                for (let i = 0; i < filterElements.length; i++) {
                    if(Array.isArray(value)){
                        value.forEach(value=>{
                            if(value === filterElements[i]){
                                 (x)
                                filteredElements.push(x)
                            }
                        })
                    }else if(value === filterElements[i]){
                        filteredElements.push(x)
                    }
                }
            })
        });
        
        filteredElements = [...new Set(filteredElements)];
        
        
        filteredElements.forEach(filteredElement=>{
            makeCard(filteredElement)
        })
    })
}


function makeCard(card){
    
    
    
    let roles = [card.role,card.level]
    card.languages.forEach(language=>{
        roles.push(language)
    })
    
    let cardContainer = document.createElement('div')
    cardContainer.classList.add('card')
    
    let information = document.createElement('div')
    information.classList.add('information')

    let logo = document.createElement('img')
    logo.src = card.logo
    logo.classList.add('logo')

    let companyInformation = document.createElement('div')
    companyInformation.classList.add('company-information')

    let companyName = document.createElement('div')
    companyName.classList.add('company-name')
    companyName.textContent = card.company

    
    if(card.featured){
        let leftBorder = document.createElement('div')
        leftBorder.classList.add('left-border')
        cardContainer.appendChild(leftBorder)
    }

    information.appendChild(logo)
    information.appendChild(companyInformation)
    companyInformation.appendChild(companyName)
    
    if(card.new){
        let newDiv = document.createElement('div')
        newDiv.classList.add('new')
        newDiv.textContent = 'NEW!'
        companyInformation.appendChild(newDiv)
    }

    if(card.featured){
        let featured = document.createElement('div')
        featured.classList.add('featured')
        featured.textContent = 'FEATURED!'
        companyInformation.appendChild(featured)
    }

    let position = document.createElement('div')
    position.classList.add('position')
    position.textContent = card.position

    let moreInformation = document.createElement('div')
    moreInformation.classList.add('more-information')
    let when = document.createElement('div')
    when.textContent = card.postedAt
    
    let dot = document.createElement('span')
    dot.classList.add('dot')
    let dot1 = document.createElement('span')
    dot1.classList.add('dot')
    
    let contract = document.createElement('div')
    contract.textContent = card.contract
    
    let location = document.createElement('div')
    location.textContent = card.location


    let rolesElement = ''
    roles.forEach(role=>{
        rolesElement += `<div data-role=${role} onclick='filter(event)' class="role">${role}</div>` 
    })


    let rolesContainer = document.createElement('div')
    rolesContainer.classList.add('roles')
    rolesContainer.innerHTML = rolesElement

    moreInformation.appendChild(when)
    moreInformation.appendChild(dot)
    moreInformation.appendChild(contract)
    moreInformation.appendChild(dot1)
    moreInformation.appendChild(location)
    information.appendChild(position)
    information.appendChild(moreInformation)

    cardContainer.appendChild(information)

    cardContainer.appendChild(rolesContainer)

    cardsContainer.appendChild(cardContainer)

}