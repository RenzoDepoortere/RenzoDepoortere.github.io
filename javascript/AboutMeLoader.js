async function init()
{
    // Get data
    const response = await fetch('data/AboutMeExperiences.json');
    const experiences = await response.json();

    // Fill corresponding HTML
    if (document.getElementById('AboutMe')) showExperienceThumbnails(experiences);
    else if (document.getElementById('AboutMeSingle')) fillAboutMeExperience(experiences);
}

function showExperienceThumbnails(experiences)
{
    const gridContainer = document.querySelector('.AboutMePictureContainer');
    gridContainer.innerHTML = ''; // Empty it just in case

    experiences.forEach(element => 
    {
        // Anchor
        const card = document.createElement('a');
        card.href = `aboutMeSingle.html?id=${element.id}`;
        card.className = 'AboutMeCard';

        // Build image and overlay
        const innerHTML = 
            `
            <img class="AboutMePicture" src="${element.image}" alt="${element.subject}"> 
            <div class="AboutMeOverlay"> 
                <p class="TextAboutMeSubject">${element.subject}</p> 
            </div>
        `;
        card.innerHTML = innerHTML;

        // Push in grid
        gridContainer.appendChild(card);
    });
}

function fillAboutMeExperience(experiences)
{
    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = urlParams.get('id');
    const currentExperience = experiences.find(item => item.id == requestedId);

    if (currentExperience)
    {
        document.getElementById('picture').src = currentExperience.image;
        document.getElementById('description').innerText = currentExperience.description;
    }
    else
    {
        window.location.href = 'aboutMe.html';
    }
}

init();