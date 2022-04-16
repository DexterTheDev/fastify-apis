const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-rate-limit'), {
    global: true,
    max: 5,
    timeWindow: 30000,
    cache: 5000,
    allowList: ['127.0.0.1', 'localhost'],
});

const randomString = (length) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    let str = '';
    for (let i = 0; i < length; i++) str += chars.charAt(Math.floor(Math.random() * chars.length));

    return str;
}


fastify
    .post("/test", async (req, res) => req.headers.authorization == "HelloWorld" ? res.send({ message: randomString(10) }) : res.send({ message: "Unauthorized" }))
    .get("/test", async (req, res) => res.send({ message: "HelloWorld" }));

fastify.decorate('notFound', (req, res) => res.json({ error: true, message: "Unknow Page" })).setNotFoundHandler(fastify.notFound)
fastify.listen(5000, '0.0.0.0', () => console.log(`Apis is connected`));