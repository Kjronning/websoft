
const getFetchUrl = function(municipalityCode){
    //return municipalityCode === "kommun" ? fetchBaseUrl : fetchBaseUrl+municipalityCode; //Uncomment this line when deploying to fetch from the API
    return 'data/'+municipalityCode+'.json'; //comment this line when deploying to fetch from the API
};

const fetchMunicipalities = function(){
    fetch(getFetchUrl("kommun")).then((response) => {
        return response.json();
    }).then((responseJson)=> {
        let option;
        let data = responseJson.Kommuner;
        data.forEach((municipality)=> {
            option = document.createElement('option');
            option.text = municipality.Namn;
            option.value = municipality.Kommunkod;
            municipalityList.add(option)
        });
    });
};

const populateEmptyTable = function() {
    tableBody.innerHTML = "";
    let row = tableBody.insertRow(0);
    for (let i = 0; i < 3; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = "-";
    }
};

const populateTable =  function(municipalityCode){
        let url = getFetchUrl(municipalityCode);
        console.log(url);
        fetch(url).then((response) => {
            if(!response.ok){
                populateEmptyTable();
                throw Error(response.statusText)
            }else{
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            tableBody.innerHTML = "";
            let counter = 0;
            data.Skolenheter.forEach((school) => {
                let row = tableBody.insertRow(counter++);
                let schoolNameCell = row.insertCell(0);
                let schoolCodeCell = row.insertCell(1);
                let PeOrgNrCell = row.insertCell(2);
                schoolCodeCell.innerHTML = school.Skolenhetskod;
                schoolNameCell.innerHTML = school.Skolenhetsnamn;
                PeOrgNrCell.innerHTML = school.PeOrgNr;
            });
        });
};

const fetchBaseUrl = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/";
const table = document.getElementById("table");
const tableBody = document.getElementById("tablebody");
const municipalityList = document.getElementById("municipalityList");
municipalityList.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = "Choose Municipality";
municipalityList.add(defaultOption);
municipalityList.selectedIndex = 0;
fetchMunicipalities();
populateEmptyTable();
municipalityList.addEventListener("change", (e) => {
    if(e.selectedIndex !== 0){
        populateTable(municipalityList.options[municipalityList.selectedIndex].value)
    }
});

