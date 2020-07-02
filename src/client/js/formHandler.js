import { validURL } from './validateURL'

function handleSubmit(event) {
    event.preventDefault()

    // Retrieve the input
    let url = document.getElementById('url').value
    // Get the section where text will appear
    const html_results =  document.getElementById('results')


    if(validURL(url))
    {
        // Fetch all needed data
        let post_title = title('/extract', {article:url});
        let post_summary = summary('/summary', {article:url});
        let post_sentiment = sentiment('/sentiment', {article:url})
        
        // Make sure that everything is loaded
        Promise.all([post_title, post_summary, post_sentiment])
        .then(function(responses) {
            // Store all data into an array
            return Promise.all(responses.map(function(response) {
                return response;
            }));
        })
        .then(function(data) {
            // data[{title}, {summary}, {polarity, subjectivity}]
            let html_result = `
                                <div id="summary">
                                    <h3 id="articleTitle">${data[0].title}</h3>
                                    <p>${data[1].summary}</p>
                                </div>
                                <div id="sentiment">
                                    <p id="polarity"><strong>Polarity: </strong>${data[2].polarity}</p>
                                    <p id="subjectivity"><strong>Subjectivity: </strong>${data[2].subjectivity}</p>
                                </div>`;
            
            // Remove previous data, if any
            html_results.innerHTML = '';
            // Add the new section
            html_results.insertAdjacentHTML("afterbegin", html_result);

        }).catch(function(error){
            console.log(error)
        });
    }
    else
    {
        alert("Invalid URL")
    }

}

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
    }catch(error){
        console.log("error", error);
    }
};

const sentiment = async(url='', data = {})=>{
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

export { handleSubmit }