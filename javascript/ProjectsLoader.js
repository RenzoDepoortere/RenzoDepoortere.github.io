async function init()
{
    // Get data
    const response = await fetch('data/Projects.json');
    const projects = await response.json();

    // Fill corresponding HTML
    if (document.getElementById('Projects')) showProjects(projects);
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
            <img class="ProjectThumbnail" src="${element.image}" alt="${element.subject}"> 
            <div class="ProjectOverlay"> 
                <p class="TextProject">${element.subject}</p> 
            </div>
        `;
        card.innerHTML = innerHTML;

        // Push in grid
        gridContainer.appendChild(card);
    });
}

init();