import prismaClient from '../prisma';

class GetLastNMessagesService {
  async execute(qtd: number) {
    const messages = await prismaClient.message.findMany({
      take: qtd,
      orderBy: {
        create_at: 'desc',
      },
      include: {
        user: true,
      },
    });
    return messages;
  }
}

export default GetLastNMessagesService;
