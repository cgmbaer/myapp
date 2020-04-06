const history = useHistory();

const rezept_erstellen = async () => {

    const response = await fetch('/recipe/api/v1.0/add_recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ example: textInput }),
    })

    console.log(await response.json())

    history.push("/RezeptErstellen");
    setIsOpen(!isOpen);
}


//        const response = await fetch('/recipe/api/v1.0/add_recipe', {
//            method: 'POST',
//            headers: { 'Content-Type': 'application/json' },
//            body: JSON.stringify({ example: textInput }),
//        });

// {titleEditable ? 
//     <div>
//         <input type='text' value={rezeptTitel}/>
//     </div> :
//     <div onClick={() => setTitleEditable(!titleEditable)}>
//        {rezeptTitel}
//     </div>
// }
