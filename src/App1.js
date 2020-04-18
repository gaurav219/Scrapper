import React, { useEffect } from "react";
import "./App.css";
import request from "request";
import fetch from "node-fetch";
import cheerio from "cheerio";
//import fs from "fs";

//Write headers

//console.log("ss");

const App1 = () => {
  const url = "https://yourstory.com/sitemap_index.xml";

  useEffect(() => {
    const req = (url) => {
      request(url, (err, res, html) => {
        if (!err && res.statusCode === 200) {
          const $ = cheerio.load(html);
          // console.log(html);
          // console.log($("loc"));
          let urlArray = [];
          let urlArray2 = [];

          $("loc").each((i, el) => {
            // console.log(i, el);
            el.children.forEach((el) => {
              urlArray.push(el.data);
              // console.log(el.data);
              // const url = el.data;
              // let options = {
              //   url,
              //   timeout: 5000,
              // };
              // request(options, (err, res, html) => {
              //   if (!err && res.statusCode === 200) {
              //     const $ = cheerio.load(html);
              //     // console.log($("td"));

              //     // $("loc").each((i, el) => {
              //     //   console.log($(el));
              //     //   //   el.children.forEach((el) => {
              //     //   //     const url = el.data;
              //     //   //   });
              //     //   // });
              //     // });
              //   }
              // });
            });
          });
          // console.log(urlArray[0])
          request(urlArray[0], (err, res, html) => {
            if (!err && res.statusCode === 200) {
              const $ = cheerio.load(html);
              // console.log($("td"));

              $("loc").each((i, el) => {
                // console.log($(el));
                el.children.forEach((el) => {
                  // console.log(el.data);
                  // const url = el.data;
                  urlArray2.push(el.data);
                });
                // });
              });

              urlArray2.forEach((url) => {
                request(url, (err, res, html) => {
                  if (!err && res.statusCode === 200) {
                    const $ = cheerio.load(html);
                    //console.log($("a"));

                    var links = [];
                    $("a").each(function () {
                      var link = $(this).attr("href");
                      links.push(link);
                    });

                    console.log(links);
                  }
                });
              });

              // request(urlArray2[0], (err, res, html) => {
              //   if (!err && res.statusCode === 200) {
              //     const $ = cheerio.load(html);
              //     console.log($("a"));

              //       var links = [];
              //       $('a').each(function() {
              //         var link = $(this).attr('href');
              //         links.push(link);
              //         });

              //       console.log(links);

              //   }
              // });
            }
          });
        }
      });
    };
    req(url);
  }, []);

  //const writestream = fs.createWriteStream("post.csv");

  //writestream.write(`Title,Link,Date \n`);

  //console.log(loc);

  // $("loc").each((i, el) => {
  //   console.log(
  // });

  // $("loc").each((i, el) => {
  //   console.log(el;
  // });

  // request(url+"/2020", (err, res, html) => {
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

  //       console.log("https://yourstory.com" + link);
  //       //console.log(url + link);
  //       //writestream.write(`${title},${link},${date} \n`);
  //     });
  //     console.log("scrapping done");
  //   }

  // request(
  //   "https://yourstory.com/2020/04/paytm-payments-bank-partners-mastercard",
  //   (err, res, html) => {
  //     if (!err && res.statusCode === 200) {
  //       //console.log(html);
  //       const $ = cheerio.load(html);

  //       const siteheading = $(".sc-bZQynM");

  //       // console.log(siteheading.text());

  //       const output = siteheading.children("h1").next().text();
  //       console.log(output);

  //       $(".sc-eqGige a").each((i, el) => {
  //         const item = $(el).text();
  //         const link = $(el).attr("href");

  //         console.log(link);
  //       });
  //     }
  //   }
  // );

  return (
    <div className="app">
      <h2>Hello</h2>
    </div>
  );
};

//export default App1;
