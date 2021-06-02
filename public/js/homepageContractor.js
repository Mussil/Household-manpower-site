// eslint-disable-next-line no-unused-vars
async function a(){
    try {
        const res = await fetch('/homepageContractor', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {'Content-Type': 'application/json'}
        })
        const data = await res.json()
        console.log(data)

    } catch (err) {
        console.log(err)
    }}
