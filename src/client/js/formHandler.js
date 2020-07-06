import { validURL } from './validateURL'
import regeneratorRuntime from "regenerator-runtime";

function handleSubmit(event) {
    event.preventDefault()

    // Retrieve the input
    let url = document.getElementById('url').value
    // Get the section where text will appear
    const html_results =  document.getElementById('results')


    if(validURL(url))
    {
        // Fetch all needed data
        const post_title = title('/extract', {article:url});
        const post_summary = summary('/summary', {article:url});
        const post_polarity = polarity('/sentiment', {article:url});
        const post_concept = mainConcepts('/concepts', {article:url});
        
        // Make sure that everything is loaded
        Promise.all([post_title, post_summary, post_polarity, post_concept])
        .then(function(responses) {
            // Store all data into an array
            return Promise.all(responses.map(function(response) {
                return response;
            }));
        })
        .then(function(data) {
            // data[{title}, {summary[]}, {polarity}, {concepts[]}]
            const conceptDiv = document.createElement('div')
            const conceptUL = document.createElement('ul')
            for (const c of data[3].concepts) {
                const listItem = document.createElement('li')
                listItem.innerHTML = c;
                conceptUL.appendChild(listItem);
            }
            const conceptTitle = `<p><strong>Concepts:<strong></p>`
            conceptDiv.insertAdjacentHTML("afterbegin" , conceptTitle);
            conceptDiv.appendChild(conceptUL);

            const html_result = `
                                <div id="summary">
                                    <h3 id="articleTitle">${data[0].title}</h3>
                                    <p>${data[1].summary}</p>
                                </div>
                                <div id="sentiment">
                                    <p id="polarity" class="${data[2].polarity}"><strong>Polarity: </strong>${data[2].polarity}</p>
                                </div>`;
            
            // Remove previous data, if any
            html_results.innerHTML = '';
            // Add the new section
            html_results.insertAdjacentHTML("afterbegin", html_result);
            html_results.appendChild(conceptDiv)

        }).catch(function(error){
            console.log(error)
        });
    }
    else
    {
        alert("Invalid URL")
    }

}

// It's also possible to use combined call (https://docs.aylien.com/textapi/endpoints/#parameters-12),
// I wanted to do it separately as practice.
const summary = async(url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const summary = await res.json();
        return summary;
    }catch(error){
        console.log("error", error);
        alert("error");
    }
};

const title = async(url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const title = await res.json();
        return title;
    }catch(error) {
        console.log("error", error);
    }
};

const polarity = async(url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const sentiment = await res.json();
        return sentiment;
    }catch(error){
        console.log("error", error);
    }
};

const mainConcepts = async(url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const concept = await res.json();
        return concept;
    }catch(error){
        console.log("error", error);
    }
};


export { handleSubmit, title, mainConcepts, polarity, summary }