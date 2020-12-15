const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const majorsUrl = "http://www.registrar.ucla.edu/Faculty-Staff/Courses-and-Programs/Major-and-Minor-Codes/Undergraduate-Majors-and-Premajors"
const fileDest = __dirname + '/src/majors.json';

function writeToFile(majors) {
    fs.writeFile(fileDest, JSON.stringify(majors), function(err) {
        if (err) {
            console.error("Error writing to majors.json file");
            process.exit(1);
        } else {
            console.log("Successfully wrote majors to file!");
        }
    });
}

function extractMajors(arr) {
    majors = [];
    arr.forEach(function(string) {
        const singleMajor = string.split('\n');
        if (singleMajor[3].trim() == '' || singleMajor[3].trim() == 'I A STD') {
            majors.push(singleMajor[4].trim());
        } else {
            majors.push(singleMajor[3].trim());
        }
    });
    writeToFile(majors);
}


function parseHtml(body) {
    strings = [];
    const $ = cheerio.load(body);

    $("#myTable").find('tbody').find('tr').each(function(idx, thing) {
        strings.push($(this).text());
    });

    extractMajors(strings);
}

// get the html from the registrar website
function getHtml() {
    request(majorsUrl, function(error, res, body) {
        if (error) {
            console.error("error getting HTML: ", error);
            process.exit(1);
        } else {
            parseHtml(body); 
        }
    })
}

getHtml();
