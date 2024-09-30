const inputEl = document.getElementById("input")
const infotext = document.getElementById("info-text")
const meaningContEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchApi(word){
    try {
        infotext.style.display = "block";
        meaningContEl.style.display = "none";
        infotext.innerText = `Searching for the meaning: ${word}`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>res.json());

        if(result.title){
            infotext.style.display = "none";
            meaningContEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = `${result.message} You can try the search again at later.`;
            audioEl.style.display = "none" 
        }else{
          infotext.style.display = "none";
          meaningContEl.style.display = "block";
          audioEl.style.display = "inline-flex";
          titleEl.innerText = result[0].word;
          meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
          audioEl.src = result[0].phonetics[0].audio;
        }
        
    } catch (error) {
        infotext.innerText = "Some error happend!You can try the search again at later."
    }
}

inputEl.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key == "Enter"){
        fetchApi(e.target.value)
    }
});