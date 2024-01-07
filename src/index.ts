import express from "express"
import { PrismaClient } from '@prisma/client'

const app = express()
const port = process.env.PORT || 3000
const prisma = new PrismaClient()


app.get("/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const user = await prisma.user.create({
            data: { email }
        })
        res.send(JSON.stringify(user, null, 4))
    } catch (ex) {
        res.send("The user already exists")
    }
})

app.get('/users', async (req, res) => {
    try {
        const allUser = await prisma.user.findMany();
        res.send(JSON.stringify(allUser, null, 4))
    }
    catch (ex) {
        res.send("Error getting the result's")

    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})



app.listen(+port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`)
})