import nodemailer from 'nodemailer';
import mailconfig from '../../config/mail'

export default nodemailer.createTransport(mailconfig);