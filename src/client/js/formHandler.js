
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('name').value
    
    console.log("::: Form Submitted :::")
    //generateSummary('/summary', {article:url})
    fetch('/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.test
    });
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

export { handleSubmit }