let fetchBtn = document.getElementById("fetchBtn");

let userContainer = document.getElementById("userContainer");

let statusMessage = document.getElementById("statusMessage");

let userCount = document.getElementById("userCount");



let apiURL = "https://jsonplaceholder.typicode.com/users";


async function fetchUsers() {

    try {


        statusMessage.textContent = "Loading users...";

        statusMessage.classList.remove("error");

        fetchBtn.disabled = true;

        userContainer.innerHTML = "";


        let response = await fetch(apiURL);


        if (!response.ok) {
            throw new Error("Failed to fetch user data!");
        }



        let users = await response.json();



        console.log("Complete API Data:", users);



        let userData = users.map(user => {

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                city: user.address.city,
                company: user.company.name
            };

        });


        console.log("Extracted User Data:", userData);


       
        userData.forEach(user => {

            let card = document.createElement("div");

            card.classList.add("user-card");

            let heading = document.createElement("h3");
            heading.textContent = user.name;

            let id = document.createElement("p");
            id.textContent = `ID: ${user.id}`;

            let email = document.createElement("p");
            email.textContent = `Email: ${user.email}`;

            let city = document.createElement("p");
            city.textContent = `City: ${user.city}`;

            let company = document.createElement("p");
            company.textContent = `Company: ${user.company}`;

            card.append(heading, id, email, city, company);

            userContainer.appendChild(card);

        });



        userCount.textContent = userData.length;


               statusMessage.textContent = "Users fetched successfully!";


    } catch (error) {

       

        console.error("API Error:", error);

        statusMessage.textContent = error.message;

        statusMessage.classList.add("error");

        userCount.textContent = "0";

    } finally {

       
        fetchBtn.disabled = false;

    }

}


// 12. Button Click Event

fetchBtn.addEventListener("click", fetchUsers);