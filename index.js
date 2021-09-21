$("#main").css("border", "none").css("box-shadow", "none")
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
        console.log(numPage);
    let nb = (numPage-1)*10+1
    
        for (let nom of data.results) {
            console.log(nom.name);
            $("#main").html($("#main").html()+ '<div class="ligne" id="idligne '+  nb  + '">' + '<div class= "classement">'+ nb++ + " - " +'</div>' + '<div class="name">' +  nom.name +'</div>' + '</div>')
        }
        $("#main").css("border", "gold 1.5px solid").css("box-shadow", "gold 1px 5px 5px 2px")
        $(".suivant").html(suivant)
        $(".fa-arrow-right").click(()=>{
         console.log(data.next)
         if (data.next !== null) {
            getListe(data.next)
         }
        })
        $(".fa-arrow-left").click(()=>{
         console.log(data.previous)
         if (data.previous !== null) {
            getListe(data.previous)
         }
        }
    )
    
        // for (let nom of data.results) {
             //version avec deux 0 slice (-2) permet de prendre le deux derniers ex 0027 donnera 27 et 001 => 01
        //     console.log(nom.name);
        //     $("#main").html($("#main").html()+ '<div class="ligne">' + '<div class= "classement">'+ ("00"+nb++).slice(-2) + " - " +'</div>' + '<div class="name">' +  nom.name +'</div>' + '</div>')
        // }
    
        //  console.log(data.results[1].name);
        
    })
 }


