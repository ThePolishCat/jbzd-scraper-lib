
const axios = require("axios");
const cheerio = require("cheerio");

// Function to fetch JBZD data
const fetchJBZDData = async (tag, page) => {
  try {
    let response;
    if (!page) {
      response = await axios.get(
        `https://jbzd.com.pl/${tag}?type%5B%5D=image&type%5B%5D=article`
      );
    } else {
      response = await axios.get(
        `https://jbzd.com.pl/str/${page}?type%5B%5D=image&type%5B%5D=article`
      );
      if (tag) {
        response = await axios.get(
          `https://jbzd.com.pl/${tag}/${page}?type%5B%5D=image&type%5B%5D=article`
        );
      }
    }

    const $ = cheerio.load(response.data);
    const pageInfo = [];

    $(".article").each(function () {
      const article = $(this);
      const articleTitle = article.find(".article-title").text().trim();
      const articleUrl = article.find(".article-title a").attr("href");
      const elements = [];

      $(".article-container", article)
        .find("*")
        .each(function () {
          const element = $(this);
          if (element.hasClass("article-description")) {
            elements.push({ type: "description", text: element.text().trim() });
          } else if (element.hasClass("article-image")) {
            const imageUrl = element.find("img").attr("src");
            if (imageUrl) {
              elements.push({ type: "image", src: imageUrl });
            }
          }
        });

      pageInfo.push({
        name: articleTitle,
        url: articleUrl,
        elements: elements,
      });
    });

    return pageInfo;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred while fetching data");
  }
};

function extractCategoriesWithLinks(html) {
  const $ = cheerio.load(html);
  const categories = [];

  // Find all category links and extract their names and URLs
  $(".nav-categories a").each(function (index, element) {
    const category = $(element).text().trim();
    const link = $(element).attr("href");
    categories.push({ name: category, link: link });
  });

  return categories;
}

module.exports = { fetchJBZDData, extractCategoriesWithLinks };

