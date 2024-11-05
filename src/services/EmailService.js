const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
dotenv.config()

const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ACCOUNT, // generated ethereal user
            pass: process.env.MAIL_PASSWORD, // generated ethereal password
        },
    });

    let listItem = '';
    const attachImage = []
    orderItems.forEach((order) => {
        listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
        attachImage.push({ path: order.image })
    })

    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: "thphuc2100139@student.ctuet.edu.vn", // list of receivers
        subject: "Bạn đã đặt hàng tại shop TIKKER", // Subject line
        text: "Xin chào!", // plain text body
        html: `<div><b>Bạn đã đặt hàng thành công tại shop TIKKER</b></div>${orderItems}`,
        attachments: attachImage,
    });
}

module.exports = {
    sendEmailCreateOrder
}