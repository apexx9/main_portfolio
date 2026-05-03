// lib/brevo.ts

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  budget?: string
}

interface EmailResponse {
  success: boolean
  message: string
}

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY || ''
const BREVO_TO_EMAIL = process.env.NEXT_PUBLIC_BREVO_TO_EMAIL || ''
const BREVO_FROM_EMAIL = process.env.NEXT_PUBLIC_BREVO_FROM_EMAIL || ''
const BREVO_FROM_NAME = process.env.NEXT_PUBLIC_BREVO_FROM_NAME || ''

export async function submitContactForm(data: ContactFormData): Promise<EmailResponse> {
  try {
    // 1. Send notification to you
    const notificationResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: data.name,
          email: BREVO_FROM_EMAIL,
        },
        to: [
          {
            email: BREVO_TO_EMAIL,
            name: 'Aaron',
          },
        ],
        replyTo: {
          email: data.email,
          name: data.name,
        },
        subject: `New Inquiry from ${data.name} — ronny.tech`,
        htmlContent: notificationTemplate(data),
      }),
    })

    if (!notificationResponse.ok) {
      const error = await notificationResponse.json()
      console.error('Brevo notification error:', error)
      throw new Error(error.message || 'Failed to send notification')
    }

    // 2. Send auto-reply to visitor
    const autoReplyResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_FROM_NAME,
          email: BREVO_FROM_EMAIL,
        },
        to: [
          {
            email: data.email,
            name: data.name,
          },
        ],
        subject: `Thanks for reaching out, ${data.name}! — ronny.tech`,
        htmlContent: autoReplyTemplate(data.name),
      }),
    })

    if (!autoReplyResponse.ok) {
      const error = await autoReplyResponse.json()
      console.error('Brevo auto-reply error:', error)
      throw new Error(error.message || 'Failed to send auto-reply')
    }

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you within 24 hours.",
    }
  } catch (error) {
    console.error('Contact form error:', error)
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    }
  }
}

// ─── Newsletter Subscription ─────────────────────────

export async function subscribeToNewsletter(email: string): Promise<EmailResponse> {
  try {
    // 1. Send notification to you
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'ronny.tech Newsletter',
          email: BREVO_FROM_EMAIL,
        },
        to: [
          {
            email: BREVO_TO_EMAIL,
            name: 'Aaron',
          },
        ],
        subject: `New Newsletter Subscriber — ronny.tech`,
        htmlContent: newsletterNotificationTemplate(email),
      }),
    })

    // 2. Send welcome email to subscriber
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: BREVO_FROM_NAME,
          email: BREVO_FROM_EMAIL,
        },
        to: [
          {
            email: email,
          },
        ],
        subject: `Welcome to the ronny.tech newsletter!`,
        htmlContent: newsletterWelcomeTemplate(email),
      }),
    })

    return {
      success: true,
      message: 'Successfully subscribed! Check your inbox for a welcome email.',
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return {
      success: false,
      message: 'Failed to subscribe. Please try again.',
    }
  }
}

// ─── Templates ───────────────────────────────────────

function notificationTemplate(data: ContactFormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr>
<td style="padding:0 0 32px 0;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="line-height:0;">
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
<rect width="32" height="32" rx="6" fill="#0a0a0a"/>
<rect x="2" y="2" width="28" height="28" rx="4" stroke="#f5c842" stroke-width="2.5" fill="none"/>
<path d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="26" cy="26" r="2" fill="#f5c842"/>
</svg>
</td>
<td style="padding-left:10px;">
<span style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:0.08em;">ronny<span style="font-weight:300;color:rgba(255,255,255,0.4);">.tech</span></span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background:#111111;border-radius:12px;padding:32px 24px;border:1px solid rgba(255,255,255,0.06);">
<div style="display:inline-block;background:rgba(245,200,66,0.1);border:1px solid rgba(245,200,66,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;">
<span style="font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;color:#f5c842;letter-spacing:0.08em;text-transform:uppercase;">New Inquiry</span>
</div>
<h2 style="font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 28px 0;letter-spacing:-0.02em;line-height:1.15;">Someone wants to<br>work with you<span style="color:#f5c842;">.</span></h2>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Name</span><span style="font-family:'DM Sans',sans-serif;font-size:15px;color:#ffffff;">${data.name}</span></td></tr>
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Email</span><a href="mailto:${data.email}" style="font-family:'DM Sans',sans-serif;font-size:15px;color:rgba(255,255,255,0.6);text-decoration:none;">${data.email}</a></td></tr>
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Company</span><span style="font-family:'DM Sans',sans-serif;font-size:15px;color:#ffffff;">${data.company || 'Not provided'}</span></td></tr>
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:3px;">Budget Range</span><span style="font-family:'DM Sans',sans-serif;font-size:15px;color:#ffffff;">${data.budget || 'Not specified'}</span></td></tr>
<tr><td style="padding:14px 0;"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:6px;">Message</span><span style="font-family:'DM Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.6;">${data.message}</span></td></tr>
</table>
<table cellpadding="0" cellspacing="0" width="100%" style="margin-top:28px;">
<tr><td><a href="mailto:${data.email}?subject=Re:%20Project%20Inquiry" style="display:block;background:#f5c842;color:#1a1200;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;text-align:center;text-decoration:none;padding:14px 24px;border-radius:999px;">Reply to ${data.name}</a></td></tr>
</table>
</td>
</tr>
<tr><td style="padding:20px 0 0 0;text-align:center;"><p style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.1);margin:0;letter-spacing:0.06em;">Sent from ronny.tech contact form</p></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function autoReplyTemplate(name: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr>
<td style="padding:0 0 32px 0;text-align:center;">
<table cellpadding="0" cellspacing="0" style="margin:0 auto;">
<tr>
<td style="line-height:0;">
<svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
<rect width="32" height="32" rx="6" fill="#0a0a0a"/>
<rect x="2" y="2" width="28" height="28" rx="4" stroke="#f5c842" stroke-width="2.5" fill="none"/>
<path d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="26" cy="26" r="2" fill="#f5c842"/>
</svg>
</td>
<td style="padding-left:12px;">
<span style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.08em;">ronny<span style="font-weight:300;color:rgba(255,255,255,0.4);">.tech</span></span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background:#111111;border-radius:12px;padding:40px 24px;border:1px solid rgba(255,255,255,0.06);">
<div style="width:52px;height:52px;border-radius:50%;background:rgba(245,200,66,0.1);margin:0 auto 28px;display:flex;align-items:center;justify-content:center;">
<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f5c842" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
</div>
<h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:700;color:#ffffff;text-align:center;margin:0 0 12px 0;letter-spacing:-0.02em;">Thanks for<br>reaching out<span style="color:#f5c842;">.</span></h1>
<p style="font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45);text-align:center;margin:0 0 28px 0;">Hey <span style="color:#ffffff;">${name}</span>,<br><br>I've received your message and I'll get back to you within <span style="color:rgba(255,255,255,0.7);">24 hours</span>.</p>
<div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 24px 0;"></div>
<table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="text-align:center;padding-bottom:4px;">
<a href="https://ronny.tech/#work" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">Work</a>
<span style="color:rgba(255,255,255,0.08);">•</span>
<a href="https://ronny.tech/#about" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">About</a>
<span style="color:rgba(255,255,255,0.08);">•</span>
<a href="mailto:aaronnartey001@gmail.com" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">Reply</a>
</td></tr>
</table>
</td>
</tr>
<tr><td style="padding:20px 0 0 0;text-align:center;"><p style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.1);margin:0;letter-spacing:0.06em;">ronny.tech — Creative Developer</p></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

// ─── Newsletter Templates ────────────────────────────

function newsletterNotificationTemplate(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr>
<td style="padding:0 0 32px 0;">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="line-height:0;">
<svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
<rect width="32" height="32" rx="6" fill="#0a0a0a"/>
<rect x="2" y="2" width="28" height="28" rx="4" stroke="#f5c842" stroke-width="2.5" fill="none"/>
<path d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="26" cy="26" r="2" fill="#f5c842"/>
</svg>
</td>
<td style="padding-left:10px;">
<span style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:0.08em;">ronny<span style="font-weight:300;color:rgba(255,255,255,0.4);">.tech</span></span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background:#111111;border-radius:12px;padding:32px 24px;border:1px solid rgba(255,255,255,0.06);">
<div style="display:inline-block;background:rgba(245,200,66,0.1);border:1px solid rgba(245,200,66,0.2);border-radius:999px;padding:5px 14px;margin-bottom:20px;">
<span style="font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;color:#f5c842;letter-spacing:0.08em;text-transform:uppercase;">New Subscriber</span>
</div>
<h2 style="font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:#ffffff;margin:0 0 20px 0;letter-spacing:-0.02em;line-height:1.15;">Someone subscribed to<br>your newsletter<span style="color:#f5c842;">.</span></h2>
<table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
<tr><td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;">Email</span><br><a href="mailto:${email}" style="font-family:'DM Sans',sans-serif;font-size:15px;color:#cccccc;text-decoration:none;">${email}</a></td></tr>
<tr><td style="padding:14px 0;"><span style="font-family:'DM Sans',sans-serif;font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.1em;">Date</span><br><span style="font-family:'DM Sans',sans-serif;font-size:15px;color:#ffffff;">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></td></tr>
</table>
</td>
</tr>
<tr><td style="padding:20px 0 0 0;text-align:center;"><p style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.1);margin:0;letter-spacing:0.06em;">Sent from ronny.tech newsletter form</p></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

function newsletterWelcomeTemplate(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#0a0a0a;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
<tr><td align="center">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr>
<td style="padding:0 0 32px 0;text-align:center;">
<table cellpadding="0" cellspacing="0" style="margin:0 auto;">
<tr>
<td style="line-height:0;">
<svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;">
<rect width="32" height="32" rx="6" fill="#0a0a0a"/>
<rect x="2" y="2" width="28" height="28" rx="4" stroke="#f5c842" stroke-width="2.5" fill="none"/>
<path d="M10 24V8h8c2.5 0 4.5 2 4.5 4.5s-2 4-4.5 4h-5m0 7.5l5-7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<circle cx="26" cy="26" r="2" fill="#f5c842"/>
</svg>
</td>
<td style="padding-left:12px;">
<span style="font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.08em;">ronny<span style="font-weight:300;color:rgba(255,255,255,0.4);">.tech</span></span>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td style="background:#111111;border-radius:12px;padding:40px 24px;border:1px solid rgba(255,255,255,0.06);">
<div style="width:52px;height:52px;border-radius:50%;background:rgba(245,200,66,0.1);margin:0 auto 28px;display:flex;align-items:center;justify-content:center;">
<span style="font-size:26px;">📬</span>
</div>
<h1 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:700;color:#ffffff;text-align:center;margin:0 0 12px 0;letter-spacing:-0.02em;">You're in!<span style="color:#f5c842;">.</span></h1>
<p style="font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45);text-align:center;margin:0 0 8px 0;">Thanks for subscribing to my newsletter.</p>
<p style="font-family:'DM Sans',sans-serif;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45);text-align:center;margin:0 0 28px 0;">I'll share thoughts on <span style="color:rgba(255,255,255,0.7);">design, development & technology</span> — no spam, just quality content.</p>
<div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 24px 0;"></div>
<table cellpadding="0" cellspacing="0" width="100%">
<tr><td style="text-align:center;padding-bottom:4px;">
<a href="https://ronny.tech/#work" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">Work</a>
<span style="color:rgba(255,255,255,0.08);">•</span>
<a href="https://ronny.tech/blog" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">Blog</a>
<span style="color:rgba(255,255,255,0.08);">•</span>
<a href="https://ronny.tech/#about" style="display:inline-block;font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(255,255,255,0.35);text-decoration:none;padding:4px 12px;">About</a>
</td></tr>
</table>
</td>
</tr>
<tr><td style="padding:20px 0 0 0;text-align:center;"><p style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.1);margin:0;letter-spacing:0.06em;">ronny.tech — Creative Developer</p></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}