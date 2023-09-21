# JBZD Scraper Library

## Overview

The JBZD Scraper Library is a Node.js library for scraping content from the [JBZD](https://jbzd.com.pl/) website. It provides functions to fetch JBZD data and extract categories with links from the website.

## Installation

To use this library, you can install it via npm using the following command:

```bash
npm install https://github.com/ThePolishCat/jbzd-scraper-lib
```

## Usage

### Importing the Library

To use the library, you need to import it into your Node.js project:

```javascript
const jbzdScraper = require("jbzd-scraper-lib");
```

### Fetch JBZD Data

The `fetchJBZDData` function allows you to retrieve data from JBZD based on a specified tag and page number. Here's how to use it:

```javascript
const tag = "funny"; // Specify the tag (optional)
const page = 1;      // Specify the page number (optional)

jbzdScraper.fetchJBZDData(tag, page)
  .then((data) => {
    // Handle the retrieved JBZD data
    console.log(data);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

### Extract Categories with Links

The `extractCategoriesWithLinks` function retrieves a list of JBZD categories along with their links. Here's how to use it:

```javascript
jbzdScraper.extractCategoriesWithLinks()
  .then((categories) => {
    // Handle the retrieved categories
    console.log(categories);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

## License

This library is provided under the GPLv3 License. See the [LICENSE](LICENSE) file for more details.

## Issues and Contributions

If you encounter any issues or have suggestions for improvements, please [create an issue](https://github.com/ThePolishCat/jbzd-scraper-lib/issues) on the GitHub repository. Contributions are welcome!

## Author

This library was created by [ThePolishCat](https://github.com/ThePolishCat).

---

Enjoy scraping JBZD content with ease using the JBZD Scraper Library!
