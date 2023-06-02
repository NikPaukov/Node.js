import fs from 'node:fs/promises';
import undici from 'undici';
import path from 'path'


export async function readFile() {
    //  data/list.json
    const file = process.argv[2]
    if(!file)
        throw new Error("file is missing");
    const filePath = path.parse(file);

    const newDir = path.join(filePath.dir, `${filePath.name}_pages`);

    await fs.mkdir(newDir, {recursive: true});

    const fileBuffer = await fs.readFile(file);
    const json = JSON.parse(fileBuffer.toString());
    let i = 0;
    for (const link of json) {
        const html = await (await undici.fetch(link)).text();
        await fs.writeFile(path.join(newDir, i++ + '.html'), html);
    }
}