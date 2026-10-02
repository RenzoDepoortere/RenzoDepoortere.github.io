async function init()
{
    // Get data
    const response = await fetch('data/Projects.json');
    const projects = await response.json();

    // Fill corresponding HTML
    if (document.getElementById('Index')) showHighlights(projects);
    else if (document.getElementById('Projects')) setFilters(projects);
    else if (document.getElementById('ProjectsSingle')) showSingleProject(projects);
}

function showHighlights(projects)
{
    const projectContainer = document.getElementById('ProjectsContainer');
    projectContainer.innerHTML = '';

    // Sort by highlightNr
    const sortedProjects = projects
        .filter(element => parseInt(element.highlightNr) != -1)
        .sort((a, b) => parseInt(a.highlightNr) - parseInt(b.highlightNr));

    sortedProjects.forEach(element =>
    {
        // Anchor
        const card = document.createElement('a');
        card.href = `projectsSingle.html?id=${element.id}`;
        card.className = 'ProjectCard';

        // Build image and overlay
        const innerHTML = 
            `
            <img class="ProjectThumbnail" src="${element.thumbnail}" alt="${element.name}"> 
            <div class="ProjectOverlay"> 
                <p class="TextProject">${element.name}</p> 
            </div>
        `;
        card.innerHTML = innerHTML;

        // Push in grid
        projectContainer.appendChild(card);
    });
}

function setFilters(projects)
{
    // Set default category
    const defaultCategory = "professional";
    const initialProjects = projects.filter(p => p.category === defaultCategory);
    showProjects(initialProjects);

    // Setup buttons
    const buttons = document.querySelectorAll('.SectionBackground');
    buttons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            // Set active
            if (button.classList.contains('active')) return;
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter array and update
            const categoryToFilter = button.getAttribute('data-category');
            const filteredProjects = projects.filter(p => p.category === categoryToFilter);
            showProjects(filteredProjects);
        });
    });
}
function showProjects(projects)
{
    const gridContainer = document.querySelector('.ProjectsContainer');
    gridContainer.innerHTML = ''; // Empty it just in case

    // Show projects
    // -------------
    projects.forEach(element => 
    {
        // Anchor
        const card = document.createElement('a');
        card.href = `projectsSingle.html?id=${element.id}`;
        card.className = 'ProjectCard';

        // Build image and overlay
        const innerHTML = 
            `
            <img class="ProjectThumbnail" src="${element.thumbnail}" alt="${element.name}"> 
            <div class="ProjectOverlay"> 
                <p class="TextProject">${element.name}</p> 
            </div>
        `;
        card.innerHTML = innerHTML;

        // Push in grid
        gridContainer.appendChild(card);
    });

    // Set filters
    // -----------
   
}

function showSingleProject(projects)
{
    // Get project
    const urlParams = new URLSearchParams(window.location.search);
    const requestedId = urlParams.get('id');
    const currentProject = projects.find(item => item.id == requestedId);

    if (currentProject == null)    
    {
        window.location.href = 'projects.html';
    }
    else
    {
        // Fill

        // ================
        // Project sumnmary
        // ================
        
        document.getElementById('Title').innerText = `${currentProject.name} | Renzo Depoortere`;
        document.getElementById('ProjectName').innerText = currentProject.name;

        const mediaContainer = document.getElementById('ProjectMediaContainer');
        if (currentProject.youtubeId) 
        {
            // 1. If we have a YouTube ID, build an iframe
            mediaContainer.innerHTML = `
                <iframe class="ProjectBannerImage" 
                        src="https://www.youtube.com/embed/${currentProject.youtubeId}" 
                        title="${currentProject.name} Trailer" 
                        frameborder="0" 
                        allowfullscreen>
                </iframe>`;
        } 
        else if (currentProject.videoSource) 
        {
            // 2. If we have a local video file, build a video tag
            mediaContainer.innerHTML = `
                <video class="ProjectBannerImage" autoplay loop muted playsinline controls>
                    <source src="${currentProject.videoSource}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>`;
        } 
        else 
        {
            // 3. Fallback to standard image if no video is available
            mediaContainer.innerHTML = `
                <img class="ProjectBannerImage" src="${currentProject.banner}" alt="${currentProject.name}">`;
        }

        const informationBits = document.getElementById('informationBits')
        informationBits.innerHTML = "";

        currentProject.informationBits.forEach(element =>
        {
            const listItem = document.createElement('li');
            listItem.className = "TextDescription_Left";

            if (element.link)
            {
                // Create link
                const linkElement = document.createElement('a');
                linkElement.className = "";
                linkElement.href = element.link;
                linkElement.target = "_blank";
                linkElement.innerText =element.text;

                // Push
                listItem.appendChild(linkElement);
            }
            else
            {
                listItem.innerText = element.text;
            }

            informationBits.appendChild(listItem);
        });

        document.getElementById('ProjectSummary').innerText = currentProject.summary;
        document.getElementById('Contributions').innerText = currentProject.contributions;

        // ==========
        // Highlights
        // ==========

        const highlightContainer = document.getElementById('HighlightsContainer');
        highlightContainer.innerHTML = '';
        
        currentProject.highlights.forEach(element =>
        {
            // Create wrapper
            const highlightDiv = document.createElement('div');
            highlightDiv.className ='Highlight';

            // Build inner HTML
            let mediaHTML = '';
            if (element.video)
            {
                mediaHTML = 
                `
                    <div class="HighlightVideoWrapper ModalTrigger" data-video="${element.video}">
                        <img class="HighlightImage" src="${element.image}" alt="${element.title}">
                        <svg class="PlayIcon" viewBox="0 0 64 64">
                            <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.6)"/>
                            <polygon points="24,18 46,32 24,46" fill="white"/>
                        </svg>
                    </div>
                `;
            }
            else if (element.image)
            {
                mediaHTML = `<img class="HighlightImage ModalTrigger" src="${element.image}" alt="${element.title}">`;
            }

            highlightDiv.innerHTML = 
            `
                    <p class="TextSubtitle_Left">${element.title}</p>
                    <div class="HighlightDescription">
                        <p class="TextDescription_Left">${element.description}</p>
                        ${mediaHTML}
                    </div>
            `;

            // Push
            highlightContainer.appendChild(highlightDiv);
        });

        // =====
        // Modal
        // =====

        const modal = document.getElementById('ImageModal');
        const modalImg = document.getElementById('ModalImage');
        const modalVid = document.getElementById('ModalVideo');
        const closeModal = document.getElementById('ModalClose');

        // Select all highlight media you want to be clickable (Highlights and Varia)
        const clickableMedia = document.querySelectorAll('.ModalTrigger');
        clickableMedia.forEach(media => 
        {
            media.addEventListener('click', function() 
            {
                modal.style.display = "flex";
                
                // If this clicked element has a video attribute...
                const videoSrc = this.getAttribute('data-video');
                
                if (videoSrc) 
                {
                    modalImg.style.display = "none";
                    modalVid.style.display = "block";
                    modalVid.src = videoSrc;
                    modalVid.play();
                } 
                else 
                {
                    modalVid.style.display = "none";
                    modalVid.pause();
                    modalImg.style.display = "block";
                    modalImg.src = this.src; 
                }
            });
        });

        function closeMedia() 
        {
            modal.style.display = "none";
            modalVid.pause();
            modalVid.src = ""; 
        }

        // Close modal when clicking the X button
        closeModal.addEventListener('click', closeMedia);

        // Close modal if the user clicks the dark background outside the image
        modal.addEventListener('click', function(e) 
        {
            if (e.target === modal)
                closeMedia();
        });
    }
}

init();