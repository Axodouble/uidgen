const fs = require("fs");
//create a map of ids
let idMap = new Map();

// EXAMPLE.dat
// GUID 1c0e28a0f82240918c5454a4351edafd
// Type Shirt
// Rarity Legendary
// Useable Clothing
// ID 19136

//get all folders within the genid folder and check all files that end with .dat and don't contain "English"

//read all folders within the folder\
let brands = fs.readdirSync(`./genid`);
for (let brand of brands) {
  let subfolders = fs.readdirSync(`./genid/${brand}`);
  for (let subfolder of subfolders) {
    let files = fs.readdirSync(`./genid/${brand}/${subfolder}`);
    for (let file of files) {
      if (file.endsWith(".dat") && !file.includes("English")) {
        let filePath = `./genid/${brand}/${subfolder}/${file}`;
        let data = fs.readFileSync(filePath, "utf8");

        let lines = data.split("\n");
        let id = null;
        let fileName = file.replace(".dat", "");

        for (let line of lines) {
          if (line.startsWith("GUID")) {
            // Add GUID
            guid = line.split(" ")[1];
            continue;
          }
          if (line.startsWith("Type")) {
            // Extract the Type from lines starting with "Type"
            type = line.split(" ")[1];
            continue;
          }
          if (line.startsWith("ID")) {
            // Extract the ID from lines starting with "ID"
            id = line.split(" ")[1];
            break;
          }
        }

        // Grab the English.dat file within the same directory
        let englishFilePath = `./genid/${brand}/${subfolder}/English.dat`;
        let english = fs.readFileSync(englishFilePath, "utf8");

        if (id) {
          // Add ID, file name, and English name to the map
          idMap.set(id.replace(/(\r\n|\n|\r)/gm, ""), {
            brand: `${brand.replace(/(\r\n|\n|\r)/gm, "")}`,
            type: `${type.replace(/(\r\n|\n|\r)/gm, "")}`,
            name: `${english
              .replace("Name ", "")
              .split("Description")[0]
              .replace(/(\r\n|\n|\r)/gm, "")}`,
            filename: `${fileName.replace(/(\r\n|\n|\r)/gm, "")}`,
            _id: `${id.replace(/(\r\n|\n|\r)/gm, "")}`,
            guid: `${guid.replace(/(\r\n|\n|\r)/gm, "")}`,
          });
        }
      }
    }
  }
}

//generate each number between 19000 and 19450
for (let i = 19001; i < 19450; i++) {
  //if the idMap doesn't contain the number, add it to the table
  if (!idMap.has(i.toString())) {
    idMap.set(i, {
      brand: `None`,
      type: `None`,
      name: `None`,
      filename: `None`,
      _id: `${i}`,
      guid: `None`,
    });
  }
}

//sort the idMap by id
idMap = new Map([...idMap.entries()].sort((a, b) => a[0] - b[0]));

//start the sheet
let table = "";
//generate the correct link for the image
idMap.forEach((item) => {
  table += `${item.type}	${item._id}	${item.name}	${item.guid}\n`;
});

//write the table to a file
fs.writeFileSync("./sheet.txt", table);
