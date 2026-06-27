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
    document.getElementById('FamilyFriends').src = experiences.find(item => item.id == 'FamilyFriends').image;
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