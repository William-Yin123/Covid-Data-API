const request = require("async-request");
const csv = require("jquery-csv");
const stripBom = require("strip-bom");

const fetch = async () => {
    const url = "https://covid19.who.int/WHO-COVID-19-global-data.csv";
    const response = await request(url);
    const lines = stripBom(response.body).split("\n");
    lines[0] = lines[0].replace(/ /g, "");
    const csvString = lines.join("\n");
    const data = csv.toObjects(csvString);
    return data;
};

module.exports = {
    fetch
};