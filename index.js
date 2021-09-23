// $("#main").css("border", "none").css("box-shadow", "none")
// $("#detailId").css("border", "none").css("box-shadow", "none")
$(".suivant").html("")
let suivant ='<i class="fas fa-arrow-left"></i><i class="fas fa-arrow-right"></i>'

 $("#people").click(() =>{
    getListe("https://swapi.dev/api/people")
 })
 $("#planet").click(() =>{
    getListe("https://swapi.dev/api/planets")
 })
 $("#films").click(() =>{
    getListe("https://swapi.dev/api/films")
 })
 $("#species").click(() =>{
    getListe("https://swapi.dev/api/species")
 })
 $("#vehicles").click(() =>{
    getListe("https://swapi.dev/api/vehicles")
 })
 $("#starships").click(() =>{
    getListe("https://swapi.dev/api/starships")
 })


 function getListe(url){
    // data=> renvoie la réponse du serveur en gros les données contenu dans la page de l'url le plus souvent il s'agit de Json
    $.get(url, data=> {  
       console.log(data);
        /*
         console.log(data.name);
         $("#main").html('<div>'+data.results[1]+'</div>')
         for (let i in data.results) {
             for(let j in data.results[i]) {
                 $("#main").html('<div>'+j.name+'</div>')
                console.log("hello");
             }
         }
         */
        $("#main").html("")
        let numPage = new URL(url).searchParams.get('page')||1
    //    console.log(numPage);
    let nb = (numPage-1)*10+1
    
        for (let nom of data.results) {
        //    console.log(nom.name);
            $("#main").html($("#main").html()+ '<div class="ligne" id="idligne'+  nb  + '" data-urlperso="'+nom.url+'">' + '<div class= "classement">'+ nb++ + " - " +'</div><div class="name">' +  (nom.name || nom.title)+'</div></div>')
        }

        
        

        $("#main").css("border", "gold 1.5px solid").css("box-shadow", "gold 1px 5px 5px 2px")
        $(".suivant").html(suivant)
        $(".fa-arrow-right").click(()=>{
        // console.log(data.next)
         if (data.next !== null) {
            getListe(data.next)
         }
        })
        $(".fa-arrow-left").click(()=>{
       //  console.log(data.previous)
         if (data.previous !== null) {
            getListe(data.previous)
         }
        })

      

        $(".ligne").click((e)=>{
           // je déclare laurl pour récupérer l'evenement au click sur la ligne ou le nom et le numero du perso 
            let laurl = e.target.dataset.urlperso||e.target.parentElement.dataset.urlperso
            //je créé une nouvelle variable avec la valeur de laurl dans monUrl pour pouvoir la modifier sans changer ma variable de base laurl
            let monUrl = new URL(laurl)
            // pathname me permet de récupérer une partie de l'url /api/people/1/
            let lePathName = monUrl.pathname
            // split me permet de séparer mon url à chaque "/"
            // console.log(lePathName);
            let type = lePathName.split("/") // = ["", "api", "people", "1", ""]
            // ici type[2] permet de récuperer le 3e mot du tableau celui qui m'interesse
         //   console.log(type[2]);
        

         

            if(type[2] === "people") {
               getDetailPerso(laurl)
               
            }
            if(type[2] === "planets") {
               getDetailPlanet(laurl)
            }
            if(type[2] === "films") {
               getDetailFilms(laurl)
            }
            if(type[2] === "species") {
               getDetailSpecies(laurl)
            }
            if(type[2] === "vehicles") {
               getDetailVehicles(laurl)
            }
            if(type[2] === "starships") {
               getDetailStarships(laurl)
            }
            // permet d'envoyer directement sur la div des détails(plus précisement descend en bas de page) le setTimeout permet de laisser le temps au navigateur de charger les details à afficher avant de déplacer le scroll 
            setTimeout(()=>{
               window.scrollTo(0,document.body.clientHeight)
            },100)
           })
        //    $.get('https://swapi.dev/api',(data)=>{
        //        console.log(data)
        //    })
    
        // for (let nom of data.results) {
             //version avec deux 0 slice (-2) permet de prendre le deux derniers ex 0027 donnera 27 et 001 => 01
        //     console.log(nom.name);
        //     $("#main").html($("#main").html()+ '<div class="ligne">' + '<div class= "classement">'+ ("00"+nb++).slice(-2) + " - " +'</div>' + '<div class="name">' +  nom.name +'</div>' + '</div>')
        // }
    
        //  console.log(data.results[1].name);
        
    })
 }

function getDetailPerso(url){
   $.get(url,(data)=>{
      console.log(data)

      $("#detailId").css("border", "gold 1.5px solid").css("box-shadow", "gold 5px 5px 5px 5px")

      let tmpText ='<div class="detailPerso" ><div class= "nom">Nom: </div><div class="name">' +  data.name +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Anniversaire: </div><div class="name">' +  data.birth_year +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">taille: </div><div class="name">' +  data.mass +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Poids: </div><div class="name">' +  data.mass +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Couleur de cheveux: </div><div class="name">' +  data.hair_color +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Couleur de peau: </div><div class="name">' +  data.skin_color +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Sexe: </div><div class="name">' +  data.gender +'</div></div>'

      for(let i in data.species) {
      tmpText +='<div class="detailPerso" ><div class= "nom">Race: </div><div class="name">' +  data.species[i] +'</div></div>'
   }   
     
      for(let i in data.films)
      {
         tmpText +='<div class="detailPerso" ><div class= "nom">Film: </div><div class="name">' +  data.films[i] +'</div></div>'
      }
         // pour injecter dans ma div 
      $('#detailId').html(tmpText)
      
         // console.log(data.name);
         // console.log(data.mass);
         // console.log(data.films);
         // console.log(data.birth_year);
     
  })
}

function getDetailPlanet(url){
   $.get(url,(data)=>{
      console.log(url)
      $("#detailId").css("border", "gold 1.5px solid").css("box-shadow", "gold 5px 5px 5px 5px")

      let tmpText ='<div class="detailPerso" ><div class= "nom">Nom: </div><div class="name">' +  data.name +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Climat: </div><div class="name">' +  data.climate +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Terrain: </div><div class="name">' +  data.terrain +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Gravité: </div><div class="name">' +  data.gravity +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Population: </div><div class="name">' +  data.population +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Diamètre: </div><div class="name">' +  data.diameter +'</div></div>'

      tmpText +='<div class="detailPerso" ><div class= "nom">Eau: </div><div class="name">' +  data.surface_water +'</div></div>'

      for(let i in data.residents) {
      tmpText +='<div class="detailPerso" ><div class= "nom">Habitants: </div><div class="name">' +  data.residents[i] +'</div></div>'
   }   
     
     
      $('#detailId').html(tmpText)
     
  })
}

  


function getDetailFilms(url){
   $.get(url,(data)=>{
      console.log(data)
  })
}

function getDetailSpecies(url){
   $.get(url,(data)=>{
      console.log(data)
  })
}

function getDetailVehicles(url){
   $.get(url,(data)=>{
      console.log(data)
  })
}

function getDetailStarships(url){
   $.get(url,(data)=>{
      console.log(data)
  })
}


  
 