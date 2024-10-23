import path from 'path';
import fs from 'fs';

const eventHandler = (directory: any, foldersOnly = false ) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, {withFileTypes: true});

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly && file.isDirectory()) {
            fileNames.push(filePath);
        } else if (file.isFile()) {
            fileNames.push(filePath);
        }

    }

    return fileNames;
}

export default eventHandler;
