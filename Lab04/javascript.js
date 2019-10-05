function toggleAddArtist() {
    var form = document.getElementById("addArtistForm");

    if (form.style.display == "none" || form.style.display == '') {
        form.style.display = "block";
    } else {
        form.style.display = "none";
    }

    document.getElementById("artistName").value = "";
    document.getElementById("artistAbout").value = "";
    document.getElementById("artistImage").value = "";

}

function addArtist() {
    //Setting unique id for each artist added
    var id = currentMax();

    var column = document.getElementById("artist_series");

    var name = document.getElementById("artistName").value;
    var about = document.getElementById("artistAbout").value;
    var image = document.getElementById("artistImage").value;

    var artistContainer = document.createElement("div");
    artistContainer.className = "artist";
    artistContainer.id = id;

    var artistTextContainer = document.createElement("div");
    artistTextContainer.className = "artist_text";

    var h3 = document.createElement("h3");
    h3.innerText = name;

    var p = document.createElement("p");
    p.innerText = about;

    var artistImageContainer = document.createElement("div");
    artistImageContainer.className = "artist_image";
    var artistImage = document.createElement("img");
    artistImage.src = image;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete";
    deleteButton.id = id;
    deleteButton.setAttribute("onclick", "deleteArtist(this.parentElement, this.id)");

    artistTextContainer.appendChild(h3);
    artistTextContainer.appendChild(p);
    artistImageContainer.appendChild(artistImage);
    artistContainer.appendChild(artistImageContainer);
    artistContainer.appendChild(artistTextContainer);
    artistContainer.appendChild(deleteButton);
    column.appendChild(artistContainer);

    saveArtist(id, name, about, image);

    toggleAddArtist();

}

function deleteArtist(element, id) {
    //Remove from screen
    var artist = element;
    artist.remove();
    //Remove from local storage
    localStorage.removeItem(id);
}


function saveArtist(id, name, about, image) {
    var artist = {"name": name, "about": about, "image": image};
    localStorage.setItem(id, JSON.stringify(artist));
}

function loadStoredArtists() {
    for (var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        val = localStorage.getItem(key);
        var artistInfo = JSON.parse(val);
        addArtistFromStorage(key, artistInfo.name, artistInfo.about, artistInfo.image);
    }
    
}

function addArtistFromStorage(key, name, about, image){
    var column = document.getElementById("artist_series");

    var artistContainer = document.createElement("div");
    artistContainer.className = "artist";
    artistContainer.id = key;

    var artistTextContainer = document.createElement("div");
    artistTextContainer.className = "artist_text";

    var h3 = document.createElement("h3");
    h3.innerText = name;

    var p = document.createElement("p");
    p.innerText = about;

    var artistImageContainer = document.createElement("div");
    artistImageContainer.className = "artist_image";
    var artistImage = document.createElement("img");
    artistImage.src = image;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete";
    deleteButton.id = key;
    deleteButton.setAttribute("onclick", "deleteArtist(this.parentElement, this.id)");

    artistTextContainer.appendChild(h3);
    artistTextContainer.appendChild(p);
    artistImageContainer.appendChild(artistImage);
    artistContainer.appendChild(artistImageContainer);
    artistContainer.appendChild(artistTextContainer);
    artistContainer.appendChild(deleteButton);
    column.appendChild(artistContainer);
}

function currentMax(){
    var max = 0
    for (var i = 0; i < localStorage.length; i++){
        var current = parseInt(localStorage.key(i)) + 1;
        if (current > max)
            max = current;
    }
    return max;
}

function onSearch(){
    var pattern = document.getElementById("searchField").value;

    for (var i = 0; i < localStorage.length; i++){
        key = localStorage.key(i);
        var artistInfo = JSON.parse(localStorage.getItem(key));
        artistName = artistInfo.name;

        var contains = artistName.search(pattern);
        if (contains < 0 ){         //If does not contain, hide artist
            var artist = document.getElementById(key);
            artist.style.display = "none";
        }
    }
}
