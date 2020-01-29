
const getFetchURI = function(municipalityCode){
    return fetchBaseURI+municipalityCode;
};

const fetchMunicipalities = function(){
    fetch(fetchBaseURI).then((data)=> {
        let option;
        console.log("municipality length: " + data.length);
        for (let i=0; i<data.length; i++){
            option = document.createElement('option');
            option.text = data.namn;
            option.value = data.kommunkod;
            municipalityList.add(option);
        }})
};

const populateTable =  function(municipalityCode){
    fetch(getFetchURI(municipalityCode)).then((data) =>
    {
        table.innerHTML = "";
        for (let i=0;data.length;i++){
            let row = table.insertRow(i);
            let schoolNameCell = row.insertCell(0);
            let schoolCodeCell = row.insertCell(1);
            let PeOrgNrCell = row.insertCell(2);
            schoolCodeCell.innerHTML = data[i].Skolenhetskod;
            schoolNameCell.innerHTML = data[i].Skolenhetsnamn;
            PeOrgNrCell.innerHTML = data[i].PeOrgNr;
        }
    })
};

const fetchBaseURI = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/";

const table = document.getElementById("table");
const municipalityList = document.getElementById("municipalityList");
municipalityList.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = "Choose Municipality";
municipalityList.add(defaultOption);
municipalityList.selectedIndex = 0;
fetchMunicipalities();
municipalityList.addEventListener("change", (e) => {
    if(e.selectedIndex !== 0){
        populateTable(municipalityList.options[municipalityList.selectedIndex].value)
    }
});

