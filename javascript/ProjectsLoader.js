async function init()
{
    // Get data
    const response = await fetch('data/Projects.json');
    const projects = await response.json();

    // Fill corresponding HTML
    if (document.getElementById('Projects')) showProjects(projects);
    else if (document.getElementById('ProjectsSingle')) showSingleProject(projects);
}

function showProjects(projects)
{
    const gridContainer = document.querySelector('.ProjectsContainer');
    gridContainer.innerHTML = ''; // Empty it just in case

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
        return;
    }

    // Fill
    document.getElementById('Title').innerText = `${currentProject.name} | Renzo Depoortere`;
    document.getElementById('ProjectName').innerText = currentProject.name;

    const mediaContainer = document.getElementById('ProjectMediaContainer');
    if (currentProject.youtubeId) 
    {
        // 1. If we have a YouTube ID, build an iframe
        mediaContainer.innerHTML = `
            <iframe class="ProjectBanner" 
                    src="https://www.youtube.com/embed/${currentProject.youtubeId}" 
                    title="${currentProject.name} Trailer" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>`;
    } 
    else if (currentProject.videoSource) 
    {
        // 2. If we have a local video file, build a video tag
        mediaContainer.innerHTML = `
            <video class="ProjectBanner" autoplay loop muted playsinline controls>
                <source src="${currentProject.videoSource}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`;
    } 
    else 
    {
        // 3. Fallback to standard image if no video is available
        mediaContainer.innerHTML = `
            <img class="ProjectBanner" src="${currentProject.banner}" alt="${currentProject.name}">`;
    }

    document.getElementById('ProjectSummary').innerText = currentProject.summary;
    document.getElementById('Contributions').innerText = currentProject.contributions;

    // const highlightContainer = document.
    // currentProject.highlights.forEach(element =>
    // {

    // });
}

init();