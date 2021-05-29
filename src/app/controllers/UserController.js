import QueueService from "../services/QueueService";

export default {
  async createUser(req, res) {
    const { name, password, email } = req.body;

    const user = {
      name,
      password,
      email,
    };
    await QueueService.add("SendMail", {
      from: "Lucian <mail@gmail.com>",
      to: `${user.name} <${user.email}>`,
      subject: "Assunto",
      html: `Olá ${user.name}`,
    });

    await QueueService.add("CheckFinanceScore", { user });

    await QueueService.add("UserIntegration", { user });

    return res.json(user);
  },
};
