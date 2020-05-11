export const funFetch = async (endpoint, optionsString) => {

    let response = null

    try {
        console.log(endpoint + ' - ' + optionsString)
        const res = await fetch(
            '/recipe/api/v1.0/' + endpoint,
            JSON.parse(optionsString)
        )
        const json = await res.json()
        if (res.status !== 200) { throw new Error("error") }
        response = json
    } catch (error) {
        console.log('An error occured')
    }

    return response
}