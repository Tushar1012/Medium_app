import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
// import env from './env';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>()

app.post('/api/vi/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();
  
  const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
    }
  })
  const token = await sign({ id: user.id }, "c.env.JWT_SECRET");
		return c.json({ jwt: token });

})
app.post('/api/vi/signup', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/vi/signin', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/vi/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/vi/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/vi/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
