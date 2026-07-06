async function init()
{
    // Get data
    const response = await fetch('data/AboutMeExperiences.json');
    const experiences = await response.json();

    // Fill corresponding HTML
    if (document.getElementById('AboutMe')) showExperienceThumbnails(experiences);
    else if (document.getElementById('AboutMeSingle')) fillAboutMeExperience(experiences);
}

function showExperienceThumbnails(experiences) // This can be done more dynamically
{
    document.getElementById('FamilyFriends').src = experiences.find(item => item.id == 'FamilyFriends').image;
    document.getElementById('Nerdy').src = experiences.find(item => item.id == 'Nerdy').image;
    document.getElementById('Competitive').src = experiences.find(item => item.id == 'Competitive').image;
    document.getElementById('Culture').src = experiences.find(item => item.id == 'Culture').image;
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