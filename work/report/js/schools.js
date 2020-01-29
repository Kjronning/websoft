


const getFetchURI = function(municipalityCode){
    return fetchBaseURI+municipalityCode;
};

const fetchMunicipalitySchools = function(municipalityCode){
  fetch(getFetchURI(municipalityCode)).then((response)=> {
      return response.json();
  })
};

const fetchMunicipalities = function(){
    fetch(fetchBaseURI).then((response) => {
        return response.json();
    })
};

const loadSchoolsToList = function(){
    let municipalityCode = municipalityList.options[municipalityList.selectedIndex].value;
    let option;
    let data = fetchMunicipalitySchools(municipalityCode);
    resetSchoolList();
    for (let i=0; i<data.length;i++){
        option = document.createElement('option');
        option.text = data[i].Skolenhetsnamn;
        option.value = data[i].Skolenhetskod;
        schoolList.add(option);
    }
};

const fetchBaseURI = "https://api.scb.se/UF0109/v2/skolenhetsregister/sv/kommun/";


const municipalityList = document.getElementById("municipalityList");
municipalityList.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = "Choose Municipality";
municipalityList.add(defaultOption);
municipalityList.selectedIndex = 0;
let municipalityData = fetchMunicipalities();
let municipalityOption;
for (let i=0;i<municipalityData.length;i++){
    municipalityOption = document.createElement('option');
    municipalityOption.text = municipalityData.namn;
    municipalityOption.value = municipalityData.kommunkod;
    municipalityList.add(municipalityOption);
}
municipalityList.addEventListener("change", (e) => {
    if(e.selectedIndex !== 0){
        getSchoolsButton.enable();
        loadSchoolsToList();
    }else{
        getSchoolsButton.disable();
        resetSchoolList();
    }
});

const schoolList = document.getElementById("schoolList");
defaultOption.text = "Choose school";
const resetSchoolList = function(){
    schoolList.empty();
    schoolList.length = 0;
    schoolList.add(defaultOption);
    schoolList.selectedIndex = 0;
};
resetSchoolList();

const getSchoolsButton = document.getElementById("schoolButton");


getSchoolsButton.onclick(loadSchoolsToList);
