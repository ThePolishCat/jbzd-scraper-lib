const axios = require("axios");
const cheerio = require("cheerio");

// Function to fetch JBZD data
const jbzdContent = (tag = "", page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        `https://jbzd.com.pl/${tag ? `${tag}/` : ""}${page ? tag ? `${page}` : `str/${page}` : ""}?type%5B%5D=image&type%5B%5D=article`
      );

      const $ = cheerio.load(response.data);
      const pageData = [];

      $(".article").each(function () {
        const article = $(this);
        const articleTitle = article.find(".article-title").text().trim();
        const articleUrl = article.find(".article-title a").attr("href");
        const articleElements = [];

        $(".article-container", article)
          .find("*")
          .each(function () {
            const element = $(this);
            if (element.hasClass("article-description")) {
              articleElements.push({ type: "description", text: element.text().trim() });
            } else if (element.hasClass("article-image")) {
              const imageUrl = element.find("img").attr("src");
              if (imageUrl) {
                articleElements.push({ type: "image", src: imageUrl });
              }
            }
          });

        pageData.push({
          title: articleTitle,
          url: articleUrl,
          elements: articleElements,
        });
      });

      resolve(pageData);
    } catch (error) {
      console.log(error);
      reject(new Error("An error occurred while fetching data"));
    }
  });
};

// Function to extract categories with links from HTML
const jbzdCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("https://jbzd.com.pl/");
      const $ = cheerio.load(response.data);
      const categories = [];

      // Find all category links and extract their names and URLs
      $(".nav-categories a").each(function (index, element) {
        const categoryName = $(element).text().trim();
        const categoryLink = $(element).attr("href");
        const categoryTag = categoryLink.replace("https://jbzd.com.pl/", "");
        categories.push({ name: categoryName, link: categoryLink, tag: categoryTag });
      });

      resolve(categories);
    } catch (error) {
      console.log(error);
      reject(new Error("An error occurred while fetching data"));
    }
  });
};

module.exports = { jbzdContent, jbzdCategories };
