import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  console.log('Заполняем базу данных...')

  const user1 = await prisma.users.create({
    data: {
    user_id: 4,
      name: 'Alice',
      email: 'alice@example.com',
      todos: {
        create: [
          { title: 'купить продукты', status: "completed" },
          { title: 'сделать зарядку', status: 'active' },
          { title: 'прочитать книгу', status: "completed" }
        ]
      }
    }
  })

  const user2 = await prisma.users.create({
    data: {
      user_id: 5,
      name: 'Bob',
      email: 'bob@example.com',
      todos: {
        create: [
          { title: 'написать код', status: "active" },
          { title: 'позвонить маме', status: "completed" },
          { title: 'убрать комнату', status: "active" }
        ]
      }
    }
  })

  console.log('создано 2 пользователя и 6 задач')
}


main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())