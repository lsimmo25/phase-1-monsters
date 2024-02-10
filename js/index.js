document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.querySelector("#monster-container")
    const createMonsterDiv = document.querySelector("#create-monster")

    //handleSubmit
    function handleSubmit(e) {
        e.preventDefault()
        //createMonsterFunctionHere
        const name = document.querySelector("#name").value
        const age = document.querySelector("#age").value
        const description = document.querySelector("#description").value
        let monsterObj = {
            name: name,
            age: age,
            description: description,
          };
        postMonster(monsterObj);

    }
    document.querySelector("#create-monster-form").addEventListener("submit", handleSubmit)

    //Fetch Monsters From Database
    function fetchMonsters() {
        fetch("http://localhost:3000/monsters")
        .then(response => response.json())
        .then(data => {
            let pageItems = 0
            data.forEach(monster => {
                if(pageItems <= 50) {
                displayMonsters(monster)
                pageItems++
                }
            })
            
        })
    }
    fetchMonsters()

    //Function that populates monsters
    function displayMonsters(monster) {
        const monsterList = document.createElement("section")
        monsterContainer.appendChild(monsterList)

        monsterList.innerHTML = `
        <h2>
            Name: ${monster.name}
        </h2>
        <p>
            Age: ${monster.age}
        </p>
        <p>
            Description: ${monster.description}
        </p>
        `
    }

    function postMonster(monster) {
        fetch(`http://localhost:3000/monsters/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(monster)
        })
        .then(response => response.json)
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }

})