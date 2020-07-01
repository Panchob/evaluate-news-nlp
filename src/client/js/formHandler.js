function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('name').value
    const html_results =  document.getElementById('results')


    if(validURL(url))
    {
        let post_title = title('http://localhost:8000/extract', {article:url});
        let post_summary = summarize('http://localhost:8000/summary', {article:url});
        let post_sentiment = sentiment('http://localhost:8000/sentiment', {article:url})

        Promise.all([post_title, 
                     post_summary, 
                     post_sentiment
            ]).then(function(responses) {
                return Promise.all(responses.map(function(response){
                    return response;
                    }));
            }).then(function(data){

                let html_result = `
                                   <div id="summary">
                                     <h3 id="articleTitle">${data[0].title}</h3>
                                     <p>${data[1].summary}</p>
                                  </div>
                                  <div id="sentiment">
                                     <p id="polarity"><strong>Polarity: </strong>${data[2].polarity}</p>
                                     <p id="subjectivity"><strong>Subjectivity: </strong>${data[2].subjectivity}</p>
                                   </div>`;

                html_results.innerHTML = '';
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

const summarize = async(url='', data = {})=>{
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

function validURL(myURL) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(myURL);
 }

export { handleSubmit }