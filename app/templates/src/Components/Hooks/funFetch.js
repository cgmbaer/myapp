export const funFetch = async (
    endpoint,
    body = null,
    method = 'POST',
    headers = { 'Content-Type': 'application/json' }
) => {

    let optionsString = {
        method: method,
        headers: headers,
    }

    if(body) optionsString['body'] = JSON.stringify(body)

    let response = null

    try {
        console.log(endpoint)
        const res = await fetch(
            '/recipe/api/v1.0/' + endpoint,
            optionsString
        )
        const json = await res.json()
        if (res.status !== 200) { throw new Error("error") }
        response = json
    } catch (error) {
        console.log('An error occured')
    }

    return response
}