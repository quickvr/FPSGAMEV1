const updates = [
    {
        title: "Version 1.0 Released",
        date: "September 1, 2024",
        description: "We are excited to announce the release of Version 1.0! Check out the new features and improvements."
    },
    {
        title: "Beta Testing Phase 2",
        date: "August 15, 2024",
        description: "Thank you to everyone who participated in our beta testing! We’ve fixed several bugs and added new content."
    }
];

const updateList = document.getElementById('update-list');

updates.forEach(update => {
    const updateDiv = document.createElement('div');
    updateDiv.classList.add('update');
    
    const title = document.createElement('h3');
    title.textContent = update.title;
    
    const date = document.createElement('p');
    date.classList.add('update-date');
    date.textContent = update.date;
    
    const description = document.createElement('p');
    description.textContent = update.description;
    
    updateDiv.appendChild(title);
    updateDiv.appendChild(date);
    updateDiv.appendChild(description);
    
    updateList.appendChild(updateDiv);
});
