const btn = document.querySelector(".btn");
const content = document.querySelector(".content");
const loader = document.getElementById("loader");

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function showContent() {
    content.style.display = "block";
}

async function getRandomDogs() {
    try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random/20");
        if (!res.ok) {
            throw new Error("Ошибка загрузки");
        }
        const data = await res.json();
        if (data) {
            const allUrl = data.message;
            displayDogsImage(allUrl);
        }
    } catch (err) {
        console.log(err.message);
    }
}

function displayDogsImage(allUrl) {
    for (const i in allUrl) {
        const url = allUrl[i];
        const divDogContentImage = document.querySelector(".dog-content__image");
        const imgDog = document.createElement('img');
        imgDog.src = url;
        imgDog.className = "image-dog";
        imgDog.width = "300";
        imgDog.height = "300";

        divDogContentImage.appendChild(imgDog);
    }
    showContent();
}

btn.addEventListener("click", async () => {
    try {
        showLoader();
        await getRandomDogs();
    } catch (err) {
        console.log(err.message);
    } finally {
        hideLoader();
    }
});

