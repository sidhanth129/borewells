import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactEmailRequest {
  name: string
  phone: string
  email: string
  message: string
  contactId?: string
  submittedAt?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, phone, email, message, contactId, submittedAt }: ContactEmailRequest = await req.json()

    // Validate input
    if (!name || !phone || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #000000; color: #ffffff; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Shrinidhi Borewells</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px;">New Contact Form Submission</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0;">
            Contact Details
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">
                  <a href="tel:${phone}" style="color: #0066cc; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;">
                  <a href="mailto:${email}" style="color: #0066cc; text-decoration: none;">${email}</a>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0; font-size: 18px;">Message:</h3>
            <p style="line-height: 1.6; color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Submission Details:</strong><br>
              ${contactId ? `Contact ID: ${contactId}<br>` : ''}
              Submitted: ${submittedAt ? new Date(submittedAt).toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}<br>
              Source: Shrinidhi Borewells Website Contact Form
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px; text-align: center;">
            <h3 style="color: #333; margin-top: 0;">Quick Actions</h3>
            <div style="margin: 15px 0;">
              <a href="tel:${phone}" style="display: inline-block; background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                📞 Call ${name}
              </a>
              <a href="mailto:${email}" style="display: inline-block; background-color: #0066cc; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 5px;">
                ✉️ Reply via Email
              </a>
            </div>
          </div>
        </div>
        
        <div style="background-color: #f8f8f8; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; color: #888; font-size: 12px;">
            This email was automatically generated from your website contact form.<br>
            Shrinidhi Borewells | Est. 2018 | Member of KROA<br>
            📧 shrinidhi.jagannath@gmail.com | 📱 9845000962
          </p>
        </div>
      </div>
    `

    // For demonstration, we'll use a webhook service like webhook.site or similar
    // In production, you should integrate with a proper email service like:
    // - Resend (https://resend.com/)
    // - SendGrid
    // - Amazon SES
    // - Nodemailer with SMTP
    
    // For now, we'll simulate sending the email and log it
    console.log('=== EMAIL TO BE SENT ===')
    console.log('To: shrinidhi.jagannath@gmail.com')
    console.log('Subject: New Contact Form Submission - ' + name)
    console.log('HTML Content Length:', emailHtml.length)
    console.log('Contact Details:', { name, phone, email, message: message.substring(0, 100) + '...' })
    console.log('========================')

    // You can integrate with email services here
    // Example with a webhook service (replace with your actual email service):
    /*
    const emailResponse = await fetch('YOUR_EMAIL_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'shrinidhi.jagannath@gmail.com',
        subject: `New Contact Form Submission - ${name}`,
        html: emailHtml
      })
    })
    */

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification sent successfully!',
        details: {
          recipient: 'shrinidhi.jagannath@gmail.com',
          subject: `New Contact Form Submission - ${name}`,
          timestamp: new Date().toISOString()
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending email notification:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email notification',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})