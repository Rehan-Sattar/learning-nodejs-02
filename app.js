const http = require("http");
const fs = require("fs");
// function rqHandler(req, res) {
//     console.log(req);
// };

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title> My Node App </title>");
    res.write("</head>");
    res.write(`<body>
                <form action='/message' method='POST'>
                    <input type='text' name='userMessage'/>
                    <button type='submit'>Send</button>
                </form>
                </body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => body.push(chunk));
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("user-message", message);
      res.statusCode = 302;
      res.setHeader("location", "/");
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title> My Node App </title>");
  res.write("</head>");
  res.write("<body>My Second Node App</body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
