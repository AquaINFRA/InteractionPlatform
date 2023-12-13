import csvToJson from "convert-csv-to-json";
import {
    writeFileSync
} from "fs";

const fileName = "subject-tree/Fachsystematik_2020-2024.csv";
const outputFile = "src/public/subject-config.json";

let json = csvToJson
    .formatValueByType()
    .fieldDelimiter(",")
    .supportQuotedField(true)
    .getJsonFromCsv(fileName);

for (let i = 0; i < json.length; i++) {
    delete json[i].Fach;
    delete json[i].Fachnummer;
    delete json[i].Fachkollegium;
    delete json[i].Fachgebiet;
    delete json[i].Wissenschaftsbereich;
    delete json[i].SubjectNumber;
    json[i].level1 = json[i].ScientificDiscipline.slice(2, json[i].ScientificDiscipline.length);
    json[i].level2 = json[i].SubjectArea.slice(3, json[i].SubjectArea.length);
    json[i].level3 = json[i].ReviewBoard.slice(4, json[i].ReviewBoard.length);
    json[i].level4 = json[i].Subject;
}

const addToTree = function (tree, entries) {
    if (entries.length > 0) {
        const entry = entries.pop();
        if (entries[0]) {
            console.log(`${entry} - ${entries[0]}`);
        }
        if (entries.length && entry === entries[entries.length - 1]) {
            addToTree(tree, entries);
        }
        let found = tree.find(e => e.label === entry);
        if (!found) {
            found = {
                label: entry,
                children: []
            };
            tree.push(found);
        }
        addToTree(found.children, entries);
    }
};

const tree = [];

for (let i = 0; i < json.length; i++) {
    addToTree(tree, [json[i].level4, json[i].level3, json[i].level2, json[i].level1]);
}

writeFileSync(outputFile, JSON.stringify(tree, null, 4));
