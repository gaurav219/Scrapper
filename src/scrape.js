const cheerio = require("cheerio");

const request = require("request");

// const fs = require("fs");

// const writestream = fs.createWriteStream("post.csv");

// writestream.write(`Title,Link,Date \n`);

request("https://yourstory.com/sitemap_2020_week16.xml", (err, res, html) => {
  //console.log(html);
  if (!err && res.statusCode == 200) {
    //console.log("inside");
    const $ = cheerio.load(html);
    // console.log(html);
    const abc = $("loc");
    abc.each((i, el) => {
      //console.log(i, el.children);
      el.children.forEach((el) => {
        console.log(el.data);
      });
    });
  }
});

// request("https://yourstory.com/2020/04/", (err, res, html) => {
//   if (!err && res.statusCode === 200) {
//     //console.log(html);
//     const $ = cheerio.load(html);

//     $(".sc-gqPbQI").each((i, el) => {
//       // console.log(el);
//       // const title = $(el).text();
//       // console.log("title");
//       const title = $(el).find("a").text().trim();
//       const link = $(el).find("a").attr("href");
//       const date = $(el).find(".sc-eTuwsz").text().trim();

//       //console.log(title, link, date);
//       writestream.write(`${title},${link},${date} \n`);
//     });
//     console.log("scrapping done");
//   }
// });

////////////////

// request(
//   "https://yourstory.com/2020/04/paytm-payments-bank-partners-mastercard",
//   (err, res, html) => {
//     //console.log(html);
//     const $ = cheerio.load(html);

//     const siteheading = $(".sc-bZQynM");

//     console.log(siteheading.text());
//   }
// );
