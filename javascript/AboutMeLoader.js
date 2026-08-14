async function init()
{
    // Get data
    const response = await fetch('data/AboutMeExperiences.json');
    const experiences = await response.json();

    // Fill HTML
    if (document.getElementById('AboutMe')) 
    {
        showExperienceThumbnails(experiences);
        setupModal();
    }
}

function showExperienceThumbnails(experiences)
{
    const gridContainer = document.querySelector('.AboutMePictureContainer');
    gridContainer.innerHTML = ''; // Empty it just in case

    experiences.forEach(element => 
    {
        // Anchor
        const card = document.createElement('div');
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

        // On click, open the overlay
        card.addEventListener('click', () => 
        {
            openModal(element.image, element.description);
        });

        // Push in grid
        gridContainer.appendChild(card);
    });
}

function openModal(imageSrc, descriptionText) 
{
    const modal = document.getElementById('AboutMeModal');
    
    // Inject the data
    document.getElementById('ModalImage').src = imageSrc;
    document.getElementById('ModalDescription').innerText = descriptionText;
    
    // Show the modal by adding the 'show' class
    modal.classList.add('show');
}

function setupModal() 
{
    const modal = document.getElementById('AboutMeModal');
    const closeBtn = document.getElementById('CloseModal');

    // Close when clicking the 'X' icon
    closeBtn.addEventListener('click', () => 
    {
        modal.classList.remove('show');
    });

    // Close when clicking in the dark background area (outside the image/text)
    modal.addEventListener('click', (event) => 
    {
        if (event.target === modal) 
            modal.classList.remove('show');
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