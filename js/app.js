
const elul = document.querySelector('#list')
const elSelect = document.querySelector('#countries')
const elForm = document.querySelector('#form')
const elbtn = document.querySelector('.btn')
const elmodalClose = document.querySelector('.modalCloseBtn')
const elmodal = document.querySelector('.modal')
const elmodalOPen = document.querySelector('.openModal')
const elmodalIteam = document.querySelector('.modalIteam')
const elmodalList = document.querySelector('#modalList')

const delete1  =document.getElementById('delete1')








function ganrType(arr) {
    let genres = []
    arr.forEach(el =>{
        el.type.forEach(ganr => {
            if (!genres.includes(ganr)) {
                genres.push(ganr)
            }
        })
    })
    console.log(genres);
    let newOpt = ''
    genres.forEach(el =>{
        // countries
        newOpt +=  `<option value="${el}">${el}</option>`
    })
    elSelect.innerHTML += newOpt
}



elForm.addEventListener('submit', evn =>{
    evn.preventDefault()
   let {countries, dsearch, selectAa } = evn.target.elements

   
   // type
   let genreFilteredPok = []
   if(countries.value === "all"){
       genreFilteredPok = pokemons
    }else{
        genreFilteredPok = pokemons.filter(el => el.type.includes(countries.value))
    }
    // search inp
    let searchFilter = []
    if (dsearch.value === '') {
        searchFilter = genreFilteredPok
    }else{
        let regex = new RegExp(dsearch.value.trim(), "gi");
        searchFilter = genreFilteredPok.filter((el) => el.name.match(regex));
        console.log(searchFilter);
    }
    
    // Aa-Zz
    if (selectAa.value === 'all') {
        render(searchFilter)          
    }else if(selectAa.value === 'a-z'){
        let data =  searchFilter.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1)
        render(data)
      console.log(data);
    }else if(selectAa.value === 'z-a'){
        let data =  searchFilter.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? -1 : 1)
      render(data)
      console.log(data);
    }
    heardClick() 
})

function render(arr) {
    let newLi = ''
    arr.forEach(element => {
        
        newLi += `
            <li class="iteam"  data-id="${element.id}">
                <img class="iteam-img" src="${element.img}" alt="" />
                <div class="iteam-body">
                <div class="iteam-header">
                 <h5 class="iteam-title">${element.name}</h5>
                 <svg class="heart" data-id="${element.id}" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                   <path class="p" strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                 </svg>
                </div>
                <p class="iteam-text">${element.type}</p>
                <div class="iteam-footer">
                <p>${element.height}</p>
                <p>${element.weight}</p>
                </div>
                </div>
            </li>
        `;
            
        elul.innerHTML= newLi
    });
}
render(pokemons)
ganrType(pokemons)


let  modalData = [] 

async function heardClick() {
    
    let eliteamHeader = document.querySelectorAll('.iteam-header')
    // const elheartIcon = document.querySelector('.p')
    
    eliteamHeader.forEach(iteam => {
        
        iteam.addEventListener("click",  (evn)=>{
            
            if ( evn.target.classList == 'p') {
                let svg =  iteam.lastElementChild     
                svg.setAttribute('fill', 'red');
                // push id svg
                modalData.push(svg.dataset.id)  

                //local storage-id
                modalData.forEach(iteam =>{
                    localStorage.setItem('son', JSON.stringify(modalData) )
                    
                })
            }      
            

            

        })
         

    })

    console.log(modalData);
    
}

heardClick() 

elmodalClose.addEventListener('click',()=>{
    elmodal.classList.add('close')

})
elmodalOPen.addEventListener('click',()=>{
    elmodal.classList.remove('close');
    


    let modalDataOpen = JSON.parse(localStorage.getItem('son')) 
    let newModalData = []

    console.log(modalDataOpen);

    pokemons.forEach(elPo =>{

        modalDataOpen.forEach(el =>{
            if (elPo.id == el) {
                newModalData.push(elPo) 
                console.log(newModalData);
            }
        })

    })
    console.log(elmodalList);

    function renderModal(arr) {
        let newLiModal = ''
         
        arr.forEach(el => {
          console.log(el);
            newLiModal += `
                <li class="iteam modalIteam"  data-id="${el.id}">
                    <img class="iteam-img" src="${el.img}" alt="" />
                    <div class="iteam-body">
                    <div class="iteam-header">
                     <h5 class="iteam-title">${el.name}</h5>
                     <svg xmlns="http://www.w3.org/2000/svg" class="modalK" width="24" height="24" fill="currentColor"  viewBox="0 0 16 16">
                        <path class="modalP" d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                     </svg>
                    </div>
                    <p class="iteam-text">${el.type}</p>
                    <div class="iteam-footer">
                    <p>${el.height}</p>
                    <p>${el.weight}</p>
                    </div>
                    </div>
                </li>
             `;      

          
            elmodalList.innerHTML= newLiModal
        })
    }
    renderModal(newModalData)

    

    let elmodalIteam = document.querySelectorAll('.modalIteam')
    console.log(elmodalIteam);
    elmodalIteam.forEach(el =>{
        
        el.addEventListener("click", evn =>{
            // console.log(evn.target.classList);
            if (evn.target.classList == 'modalP' || evn.target.classList == 'modalK') {
                localStorage.removeItem(el)
            }
        })
    })
}) 



delete1.addEventListener('click', ()=>{
    console.log('ishlayapti');
})



