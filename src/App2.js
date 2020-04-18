import React, { useEffect } from "react";
import "./App.css";
import request from "request";
import fetch from "node-fetch";
import cheerio from "cheerio";
//import linkItems from "./model";
//import fs from "fs";

//Write headers

//console.log("ss");

const App = () => {
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
            });
          });
          // console.log(urlArray[0])
          request(urlArray[0], (err, res, html) => {
            if (!err && res.statusCode === 200) {
              const $ = cheerio.load(html);

              var date = new Date();
              date.setHours(date.getHours() - 24);

              // now you can get the string
              var isodate = date.toISOString(); //time 24 hours ago

              $("loc").each((i, el) => {
                // console.log($(el));
                el.children.forEach((el) => {
                  // console.log(el.data);
                  // const url = el.data;
                  urlArray2.push(el.data);
                });
                // });
              });

              var count = 0;
              let finalLinks = [];

              $("lastmod").each((i, val) => {
                val.children.forEach((time) => {
                  // console.log(time.data, today, oneday);
                  if (time.data > isodate) {
                    //time.data is time when each article was written or updated
                    // console.log(true);
                    count += 1;
                    request(urlArray2[i], (err, res, html) => {
                      if (!err && res.statusCode === 200) {
                        const $ = cheerio.load(html);
                        //console.log($("a"));

                        var links = [];
                        $("a").each(function () {
                          var link = $(this).attr("href");
                          links.push(link);
                          {
                          }
                        });

                        // const arr1 = new linkItems({
                        //   details: { count: [1, 2, 3] },
                        // });
                      }
                    });
                  }
                });
              });

              // 39 times loop was run and the condition was checked wheather article date&time is older than date&time 24 hors ago or not
              //only 39 articles have been updated in pass 24 hours
              console.log(count);
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
      <Display />
    </div>
  );
};
const Display = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>{count}</td>
            <td>links</td>
          </tr>
          <tr>
            <td>{count}</td>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default App;
