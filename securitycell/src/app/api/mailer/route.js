import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { to: email, subject } = await request.json();

    // Generate a unique token
    const token = crypto.randomBytes(16).toString('hex');

    // Encode the email address
    const encodedEmail = encodeURIComponent(email);

    // Construct the verification link with email and token as query parameters
    const verificationLink = `https://securitycell.themavennest.shop/securitycell/verify.php?email=${encodedEmail}&token=${token}`;

    // Call token.php to insert data
    const tokenEndpoint = `https://securitycell.themavennest.shop/securitycell/token.php?email=${encodedEmail}&token=${token}`;
    await fetch(tokenEndpoint);

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: 'securitycell.verify@themavennest.shop',
        pass: '@Securityce11'
      }
    });

    // Construct email HTML message
    const htmlMessage = `
      <div style="position: relative; text-align: center;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background-color: rgba(0, 0, 0, 0.8); color: #fff; text-align: center; border-radius: 10px;">
          <h2 style="color: #ffffff;">Account Verification</h2>
          <p style="font-size: 0.875rem; line-height: 1.5; color: #ffffff;">
            <strong style="font-weight: 600;">© securitycell.themavennest.shop</strong>
            <svg viewBox="0 0 2 2" style="margin-right: 0.5rem; display: inline-block; width: 0.3125rem; height: 0.3125rem; fill: currentColor;" aria-hidden="true"><circle cx="1" cy="1" r="1"></circle></svg>
            To Post and Engage with the Community Verify your Email
          </p>
          <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Identity</a>
        </div>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: 'securitycell.verify@themavennest.shop',
      to: email,
      subject: subject,
      html: htmlMessage
    });

    return NextResponse.json({ message: "Email Sent Successfully" + email }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to Send Email " + error }, { status: 500 });
  }
}
