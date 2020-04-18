import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import request from "request";
import fetch from "node-fetch";
import cheerio from "cheerio";
//import fs from "fs";

//Write headers

//console.log("ss");

const App = () => {
  useEffect(() => {
    let url = "https://yourstory.com/sitemap_index.xml";

    req(url);
  }, []);
  const req = (url) => {
    request(url, (err, res, html) => {
      if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        $("loc").each((i, el) => {
          //console.log(i, el);
          el.children.forEach((el) => {
            console.log(el);
            const url1 = el.data;
            //console.log(url1);
            let options = {
              url1,
              timeout: 5000,
            };
            let urlData = [];
            request(url1, (err, res, html1) => {
              // console.log(url1);
              if (!err && res.statusCode == 200) {
                //console.log("inside");
                const $ = cheerio.load(html1);
                //console.log(html);
                //const siteheading = $(".odd");
                // console.log($(".odd"));

                $("loc").each((i, el) => {
                  //console.log("in");
                  el.children.forEach((el) => {
                    //const arr = $(el).find("a").attr("href").trim();
                    const arr = el.data;
                    urlData.push(arr);
                  });
                });

                //console.log(arr);

                urlData.forEach((url) => {
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

                //console.log(siteheading);

                // $("loc").each((i, el) => {
                //   console.log($(el));
                //   //   el.children.forEach((el) => {
                //   //     const url = el.data;
                //   //   });
                //   // });
                // });
              }
            });
          });
        });
      }
    });
  };

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

export default App;
