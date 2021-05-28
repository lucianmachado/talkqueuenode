import MailService from '../services/MailService'

export default {
    key: "SendMail",
    async handle({ data }) {
        await MailService.sendMail(data)
    }
}