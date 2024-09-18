/**
 * Represents a simple website structure with three pages.
 */
class Website {
    /**
     * Constructor for the Website class.
     *
     * @param {string} title - The title of the website.
     */
    constructor(title) {
        /** @private */
        this.title = title;

        /** @private */
        this.pages = [];
    }

    /**
     * Adds a new page to the website.
     *
     * @param {string} pageName - The name of the page to be added.
     * @param {string} content - The content of the page.
     */
    addPage(pageName, content) {
        const page = new Page(pageName, content);
        this.pages.push(page);
    }

    /**
     * Displays the content of a specific page.
     *
     * @param {string} pageName - The name of the page to display.
     * @returns {string} The content of the specified page or a message if not found.
     */
    displayPage(pageName) {
        const page = this.pages.find(p => p.name === pageName);
        if (page) {
            return page.getContent();
        } else {
            return `Page "${pageName}" not found.`;
        }
    }

    /**
     * Displays the titles of all pages in the website.
     *
     * @returns {string[]} An array of page titles.
     */
    listPages() {
        return this.pages.map(page => page.name);
    }
}

/**
 * Represents a single page in the website.
 */
class Page {
    /**
     * Constructor for the Page class.
     *
     * @param {string} name - The name of the page.
     * @param {string} content - The content of the page.
     */
    constructor(name, content) {
        /** @private */
        this.name = name;

        /** @private */
        this.content = content;
    }

    /**
     * Retrieves the content of the page.
     *
     * @returns {string} The content of the page.
     */
    getContent() {
        return this.content;
    }
}

// Example usage of the Website class

// Create a new website instance
const myWebsite = new Website("My GitHub Pages");

// Add three pages to the website
myWebsite.addPage("Home", "Welcome to the Home Page!");
myWebsite.addPage("About", "This page contains information about the website.");
myWebsite.addPage("Contact", "You can contact us at contact@example.com.");

// Display the content of each page
console.log(myWebsite.displayPage("Home")); // Output: Welcome to the Home Page!
console.log(myWebsite.displayPage("About")); // Output: This page contains information about the website.
console.log(myWebsite.displayPage("Contact")); // Output: You can contact us at contact@example.com.

// List all pages in the website
console.log("Pages in the website:", myWebsite.listPages()); // Output: Pages in the website: [ 'Home', 'About', 'Contact' ]

// Attempt to display a non-existing page
console.log(myWebsite.displayPage("NonExistingPage")); // Output: Page "NonExistingPage" not found.
