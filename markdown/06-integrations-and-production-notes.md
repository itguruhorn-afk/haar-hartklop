# Integrations and Production Notes

## Payments

The workbook asks whether paid Bible study access and shop purchases can be controlled.

Recommended South African-friendly payment options:

- PayFast
- Yoco
- Peach Payments
- Ozow
- Shopify
- WooCommerce
- Big Cartel for external shop checkout

Implementation options:

1. External checkout link per product.
2. Full internal checkout with payment gateway.
3. Manual payment confirmation for early launch.

For Bible study access, do not expose Zoom links publicly. Only show/send private links after payment is confirmed.

## Newsletter and Email

Possible integrations:

- Mailchimp
- Brevo
- ConvertKit
- Google Workspace groups
- Airtable
- Google Sheets

Minimum requirement:

- Save newsletter signups in the database.
- Allow CSV export.
- Add consent checkbox.

## Forms and Follow-Up

The workbook asks whether information can be automatically received and organized.

Recommended:

- Store all submissions in database.
- Show submissions in admin dashboard.
- Add statuses such as New, Contacted and Closed.
- Allow CSV export.
- Send notification email to Haar Hartklop team.

Optional:

- Sync submissions to Google Sheets.
- Add tags for newsletter/Bible study/salvation/contact.

## Bible Study Protected Access

Requirements:

- paid registration
- protected Zoom link
- limited participant count
- possible digital downloads
- possible hardcopy courier option

Suggested approach:

- Users register for a Bible study.
- Payment gateway confirms payment.
- Registration status changes to paid.
- Paid user receives private Zoom link by email.
- Admin can manually override payment status.
- If using member accounts, paid users can log in and view private content.

## CMS / Backend Options

Good options:

- Supabase: auth, database, storage and simple admin custom UI
- Payload CMS: strong admin interface and self-hosted CMS
- Sanity: excellent content editing experience
- WordPress + WooCommerce: familiar admin, shop support
- Shopify/Big Cartel: simple shop, website can link externally

Recommended if building custom in VS Code:

- Next.js
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Prisma or Supabase client

## Security Notes

Do not store:

- passwords in frontend code
- payment secrets in frontend code
- private Zoom links in public JSON
- private download links in public JSON

Use environment variables for:

- database URL
- payment gateway keys
- email provider API key
- storage credentials

## Deployment

Frontend hosting:

- Vercel
- Netlify
- Cloudflare Pages

Backend/database:

- Supabase
- Neon Postgres
- Railway
- Render

Media storage:

- Supabase Storage
- Cloudinary
- S3-compatible storage

## Initial Build Milestones

Milestone 1:

- public pages
- responsive design
- seed content
- no payments yet

Milestone 2:

- admin login
- database/CMS
- content editing
- form submissions

Milestone 3:

- shop management
- external checkout links or payment integration
- Bible study registration workflow

Milestone 4:

- protected Bible study access
- email automation
- CSV exports
- production deployment

