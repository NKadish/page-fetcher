const request = require('request');
const fs = require('fs');

const args = process.argv;
const slicedArgs = args.slice(2); // gets the args from the command line, first one will be url, second will be path to write to
const url = slicedArgs[0];
const localPath = slicedArgs[1];

const fetchNSave = (url, localPath) => {
  request(url, (error, response, body) => {
    if (error) { // gives an error if the url isn't quite right, like if the domain is not existent. 
      console.log('error: looks like the url you posted was not right!'); 
      return;
    }
    if (response.statusCode !== 200) {
      console.log(`statusCode: ${response} ${response.statusCode}, looks like there is something wrong with either the website or the url, please try again!`)
      return;
    }
    fs.writeFile(localPath, body, (err) => { // this takes the file path and makes a new file there 
      let stats = fs.statSync(localPath);
      let fileSize = stats.size;
      if (err) {
        return err;
      }
      console.log(`Downloaded and saved ${fileSize} bytes to ${localPath}`);
    });
  });
}

if (!url || !localPath) {
  console.log("Hey please actually put in some parameters my guy!");
} else {
  fetchNSave(url, localPath);
}

// need to make a variable that holds onto the body of the passed in url
// then we need to create/open a file that will take the variable as it's write command. 
// my problem is now that there is no such thing as a wrong path, because no matter what you put in it will make something. It's not looking for a path it's just looking for what to call the file. 