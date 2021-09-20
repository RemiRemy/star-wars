$("#people").click(() =>
$.get("https://swapi.dev/api/people", data=> {
    console.log(data);
    // console.log(data.name);
    // $("#main").html('<div>'+data.results[1]+'</div>')
    // for (let i in data.results) {
    //     for(let j in data.results[i]) {
    //         $("#main").html('<div>'+j.name+'</div>')
    //        console.log("hello");
        // }
    // }
let nb = 1
    for (let nom of data.results) {
        console.log(nom.name);
        $("#main").html($("#main").html()+ '<div class="ligne">' + '<div class= "classement">'+ nb++ + " - " +'</div>' + '<div class="name">' +  nom.name +'</div>' + '</div>')
    }

    // for (let nom of data.results) { version avec deux 0 slice (-2) permet de prendre le deux derniers ex 0027 donnera 27 et 001 => 01
    //     console.log(nom.name);
    //     $("#main").html($("#main").html()+ '<div class="ligne">' + '<div class= "classement">'+ ("00"+nb++).slice(-2) + " - " +'</div>' + '<div class="name">' +  nom.name +'</div>' + '</div>')
    // }

    //  console.log(data.results[1].name);
    
} ))

