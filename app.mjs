// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites")==null) {
     localStorage.setItem("favourites",JSON.stringify([]));
   }else{
     var arr = JSON.parse(localStorage.getItem("favourites"));
   }
   

let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-result");

// Adding eventListener to search bar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function for API call
async function searchHeros(textSearched) {

     if (textSearched.length == 0) {
          searchResults.innerHTML = ``;
          return;
     }

     // API call to get the data 
     await fetch(`https://www.superheroapi.com/api.php/586069776286026/search/${textSearched}`)
          .then(res => res.json()) //Converting the data into JSON format
          .then(data =>{ 
               // console.log(data.results)
               showSearchedResults(data.results);
          }) //sending the searched results characters to show in HTML
}


//to show all details about the superhero 
function showDetails(idnumber) {
     // console.log(idnumber, 'showingDetail')
     localStorage.setItem("id", idnumber);
     window.location = "superHeroPage.html";
   }

// function for adding id value in local storage favourites key if not available this id 
function addFavourite(id) {
     if (!arr.includes(id) == true) {
       arr.push(id);
       localStorage.setItem("favourites", JSON.stringify(arr));
       alert("your hero added in favourites")
     }else{
       alert("your hero already added in favourites")
     }
   }
   

// Function for displaying the searched results in DOM
// An array is accepted as argument 
// SearchedHero is the array of objects which matches the string entered in the searched bar
function showSearchedResults(searchedHero) {
     console.log(searchedHero,"inside function")

     searchResults.innerHTML = ``;
     // count is used to count the result displayed in DOM
     let count = 1;

     // iterating the searchedHero array using for loop
     for (const key in searchedHero) {
          // if count <= 5 then only we display it in dom other results are discarded
          if (count <= 5) {
               // getting the single hero 
               // hero is the object that we get from API
               let hero = searchedHero[key];
               // console.log(hero);
               // Appending the element into DOM
               searchResults.innerHTML +=
                    `
               <li class="flex-row single-search-result">
                    <div onclick="showDetails(${hero.id})" class="flex-row img-info" >
                         <img class="hero-image" src="${hero.image.url}" alt="">
                         <div class="hero-info">
                              <a class="character-info" href="./more-info.html">
                                   <span class="hero-name">${hero.name}</span>
                              </a>
                              <div><h5 id="${hero.id}" class="plus" onclick="addFavourite(${hero.id})">Add</h5></div>
                         </div>
                    </div>
                    </li>
               //      `
               //      <div class="flex-col buttons">
               //           <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
               //           <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
               //      </div>
               //      <div style="display:none;">
               //           <span>${hero.name}</span>
               //           <span>${hero.description}</span>
               //           <span>${hero.comics.available}</span>
               //           <span>${hero.series.available}</span>
               //           <span>${hero.stories.available}</span>
               //           <span>${hero.thumbnail.path+'/portrait_uncanny.' + hero.thumbnail.extension}</span>
               //           <span>${hero.id}</span>
               //           <span>${hero.thumbnail.path+'/landscape_incredible.' + hero.thumbnail.extension}</span>
               //           <span>${hero.thumbnail.path+'/standard_fantastic.' + hero.thumbnail.extension}</span>
               //      </div>
               // </li>
               // `
          }
          count++;
     }
    
}


