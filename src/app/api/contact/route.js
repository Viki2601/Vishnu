import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { name, email, type, message } = await req.json();

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: ['mcvicky2601@gmail.com'],
            replyTo: email,
            subject: `New enquiry from ${name}${type ? ` — ${type}` : ''}`,
            html: `
                <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
                    <div style="background: #e8673a; padding: 24px 32px; border-radius: 8px 8px 0 0;">
                        <h2 style="color: #fff; margin: 0; font-size: 20px;">New Portfolio Enquiry</h2>
                    </div>
                    <div style="background: #f9f9f9; padding: 32px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 140px; color: #555; font-size: 13px;">Name</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 13px;">Email</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">
                                    <a href="mailto:${email}" style="color: #e8673a;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #555; font-size: 13px;">Service</td>
                                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${type || '—'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; font-weight: 600; color: #555; font-size: 13px; vertical-align: top;">Message</td>
                                <td style="padding: 10px 0; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</td>
                            </tr>
                        </table>
                        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #eee;">
                            <a href="mailto:${email}?subject=Re: Your portfolio enquiry"
                               style="display: inline-block; padding: 12px 24px; background: #e8673a; color: #fff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                                Reply to ${name} →
                            </a>
                        </div>
                    </div>
                    <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">
                        Sent from vishnu-lake.vercel.app
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('[contact/route] Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });

    } catch (err) {
        console.error('[contact/route]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}