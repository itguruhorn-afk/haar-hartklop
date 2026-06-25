# Admin Requirements

Build an admin login and dashboard so Haar Hartklop can manage the website without editing code.

## Authentication

Use real authentication in production.

Acceptable options:

- Supabase Auth
- Firebase Auth
- NextAuth/Auth.js
- Clerk
- Payload CMS auth
- Sanity Studio auth
- WordPress admin if using WordPress as CMS

Do not use a hardcoded client-side password for production.

## Admin Roles

Minimum role:

- Admin: full site management

Optional future roles:

- Editor: can edit content, products and events but not users/settings
- Shop manager: can edit products and orders
- Follow-up team: can view salvation/contact submissions only

## Dashboard Sections

Admin dashboard must include:

- Site settings
- Home page
- Virtual Bible Study
- Events
- Salvation submissions
- Partner/donation content
- Shop products
- Contact submissions
- Newsletter subscribers
- Media library

## Site Settings

Editable fields:

- brand name
- tagline
- logo
- primary color
- accent color
- heading font
- body font
- Facebook URL
- Instagram URL
- YouTube URL
- donation URL
- contact email

## Home Page Management

Editable:

- hero slides
- founder letters
- mission/vision text
- testimonials
- weekly encouragement link
- social links
- shop preview selection

Hero slide fields:

- image
- heading
- subheading
- primary button label
- primary button link
- secondary button label
- secondary button link
- display order
- active/inactive

## Bible Study Management

Editable:

- Bible study title
- description
- cover image
- price
- capacity
- registration open/closed
- meeting date/time
- Zoom/private access link
- digital download link
- hardcopy/courier option
- active/inactive status

Important:

- Zoom/private access links must only be visible to authorized/paid users or admins.
- If payment is not integrated yet, provide an admin-controlled payment status field.

## Events Management

Editable:

- title
- event type
- date/time
- location
- description
- hero image
- gallery images
- video embed URL
- registration link
- capacity
- status: draft, published, sold out, past

## Shop Management

Editable:

- product title
- slug
- category
- description
- price
- sale price
- images
- stock status
- inventory count if applicable
- external checkout link
- active/draft/sold out/coming soon status

## Form Submissions

Admin must be able to:

- view newsletter signups
- view Bible study registrations
- view salvation follow-up submissions
- view contact messages
- filter by type/status/date
- mark submissions as contacted/done
- export CSV

Submission status values:

- New
- In progress
- Contacted
- Closed

## Media Library

Admin should be able to upload:

- photos
- logos
- Bible study covers
- product images
- event images

Support alt text for accessibility.

