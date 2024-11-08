/* eslint-disable @typescript-eslint/no-require-imports */
// run and pass in argument for tableName
// node prisma/seed.js blogs
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const items = require('./blogs.json');
const tableName = process.argv[2];

if (tableName === 'products') {
    items = require('./products.json');
}

async function main() {
    switch (tableName) {
        case 'products':
            await prisma.product.createMany({
                data: items,
            });
            break;
        case 'blogs':
            await prisma.blog.createMany({
                data: items,
            });
            break;
        default:
            console.error('invalid table name provided');
            break;
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });