import React, { useState, useEffect } from "react";
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

  var [linksArr, setLinksArr] = useState([]);

  useEffect(() => {
    console.log("ins");
    const req = (url) => {
      request(url, (err, res, html) => {
        if (!err && res.statusCode === 200) {
          const $ = cheerio.load(html);
          // console.log(html);
          // console.log($("loc"));0.04LTS, is there any way fo
          let urlArray = [];
          let urlArray2 = [];
          var GlobalLinksArr = [];

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
              //let finalLinks = [];

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
                          // setLinksArr(link);
                          // {
                          //   // <Display links={links} />;
                          //   Display(links);
                          // }
                        });
                        GlobalLinksArr.push(links);
                        // console.log(links);

                        // const arr1 = new linkItems({
                        //   details: { count: [1, 2, 3] },
                        // });
                      }
                    });
                  }
                });
              });
              //console.log(GlobalLinksArr);
              setLinksArr(GlobalLinksArr);

              // 39 times loop was run and the condition was checked wheather article date&time is older than date&time 24 hors ago or not
              //only 39 articles have been updated in pass 24 hours
              console.log(count);
            }
          });
        }
      });
    };

    req(url);
  }, [linksArr]);

  return (
    <div className="app">
      <h2>Hello</h2>
      {/* <Display /> */}
      {linksArr.map((x) => {
        x.map((y) => {
          //console.log(y);
          //console.log(y)
          return <p>{y}</p>;
        });
      })}
    </div>
  );
};

// const Display = (links) => {
//   return (
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td>{count}</td>
//             <td>{links}</td>
//           </tr>
//           <tr>
//             <td>{count}</td>
//             <td>{links}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };
export default App;
