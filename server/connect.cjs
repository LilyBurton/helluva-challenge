const { MongoClient } = require('mongodb')
require('dotenv').config({path: "../src/.env"})

async function main() {
    const Db = process.env.ATLUS_URL
    const client = new MongoClient(Db)

    try {
        await client.connect()
        const collections = await client.db("Helluva").collections()
        collections.forEach((collection) => console.log(collection.s.namespace.collection))
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main()