import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { to: email, subject, message } = await request.json();

    const token = crypto.randomBytes(16).toString('hex');
    // Create nodemailer transporter

    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      auth: {
        user: 'securityell.password.reset@gigadevden.com',
        pass: '@Securityce11'
      }
    });

    // Construct email HTML message
    const htmlMessage = `
      <div style="position: relative; text-align: center;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: rgba(0, 0, 0, 0.8); color: #fff; text-align: center; border-radius: 10px;">
          <h2 style="color: #ffffff;">Account Password Reset</h2>
          <p style="font-size: 0.875rem; line-height: 1.5; color: #ffffff;">
            <strong style="font-weight: 600;">© gigadevden.com</strong>
            <svg viewBox="0 0 2 2" style="margin-right: 0.5rem; display: inline-block; width: 0.3125rem; height: 0.3125rem; fill: currentColor;" aria-hidden="true"><circle cx="1" cy="1" r="1"></circle></svg>
            One Time Password (OTP) for Account Password Reset.
          </p>
          <p style="color: white; font-size: 60px; font-weight: 800;">
  ${message.split("").map(char => `<span style="border: 2px solid black; border-radius: 5%; padding: 10px; margin: 4px;">${char}</span>`).join("")}
</p>


        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: 'securityell.password.reset@gigadevden.com',
      to: email,
      subject: subject,
      html: htmlMessage
    });

    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 });
  }
}
