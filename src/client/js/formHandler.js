
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('name').value
    
    console.log("::: Form Submitted :::")
    if(validURL(url))
    {
        generateSummary('http://localhost:8000/summary', {article:url})
        .then(function(newData) {
            const text = document.createTextNode(newData.summary);
            document.getElementById('results').innerHTML = ''
            document.getElementById('results').appendChild(text);
        });
    }
    else
    {
        alert("Invalid URL")
    }

}

const generateSummary = async(url='', data = {})=>{
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try{
        const newData = await res.json();
        return newData
    }catch(error){
        console.log("error", error)
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