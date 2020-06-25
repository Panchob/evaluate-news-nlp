
function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('name').value
    console.log(url)
    
    console.log("::: Form Submitted :::")
    generateSumary('/summary', {article:url})
    .then(function(res) {
        document.getElementById('results').innerHTML = res
    });
}

const generateSumary = async(url='', data = {})=>{
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