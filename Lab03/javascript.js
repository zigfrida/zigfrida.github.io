var artistId = 0;

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
    var column = document.getElementById("artist_series");

    var name = document.getElementById("artistName").value;
    var about = document.getElementById("artistAbout").value;
    var image = document.getElementById("artistImage").value;

    var artistContainer = document.createElement("div");
    artistContainer.className = "artist";
    artistContainer.id = artistId;

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
    deleteButton.id = artistId;
    artistId++;
    deleteButton.setAttribute("onclick", "deleteArtist(this.id)");

    artistTextContainer.appendChild(h3);
    artistTextContainer.appendChild(p);
    artistImageContainer.appendChild(artistImage);
    artistContainer.appendChild(artistImageContainer);
    artistContainer.appendChild(artistTextContainer);
    artistContainer.appendChild(deleteButton);
    column.appendChild(artistContainer);

    toggleAddArtist();
}

function deleteArtist(id){
    var artist = document.getElementById(id);
    artist.remove();
}