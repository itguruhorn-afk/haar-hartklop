# VS Code Coding Agent Prompt: Haar Hartklop Website

You are building the Haar Hartklop website from the workbook brief `Website - Haar Hartklop.xlsx`.

Create a polished, maintainable website for a Christian women's ministry/community brand called **Haar Hartklop**. The website must include public pages, shop/events/Bible study content areas, forms, and an admin area that can manage site content.

## Primary Goal

Build a production-ready website foundation that allows Haar Hartklop to manage:

- homepage copy, images, testimonials and weekly encouragement links
- virtual Bible study content and registrations
- events, camps, meet-and-greets and conferences
- salvation follow-up form submissions
- partner/donation information
- shop products, prices, descriptions, images and external/internal links
- contact form submissions
- social links, brand colors, fonts and rotating homepage images

## Recommended Stack

Use one of these approaches:

1. **Preferred full-stack option:** Next.js with TypeScript, Tailwind CSS, Prisma, PostgreSQL or Supabase, and an admin dashboard.
2. **Simpler CMS option:** Astro or Next.js frontend with Sanity, Payload CMS, Strapi, WordPress headless, or Supabase for content/admin.
3. **Prototype option:** static HTML/CSS/JS with local JSON content only if the client has not approved backend hosting yet.

If using a full-stack app, implement real authentication for admin users. Do not rely on client-side-only passwords for production.

## Required Pages

- Home
- Virtual Bible Study
- Events
- Salvation
- Partner
- Shop
- Contact Us
- Admin Login
- Admin Dashboard

## Source Brief Files

Use the supporting markdown files in this folder:

- `01-site-structure.md`
- `02-content-requirements.md`
- `03-admin-requirements.md`
- `04-design-system.md`
- `05-data-model.md`
- `06-integrations-and-production-notes.md`

## Important Workbook Notes

The workbook specifically asks for:

- rotating photos at the top of the homepage
- editable text, images, fonts, colors and links
- a Canva-like desire to change content easily
- newsletter signup
- Bible study signup with paid access control
- salvation follow-up form
- shop management for products, prices, photos and descriptions
- event management
- social links for YouTube, Instagram and Facebook
- donation/partner link management
- testimonials with a slide/arrow experience
- gallery and video sections for future events

## Build Instructions

1. Create the project structure.
2. Implement the public website first.
3. Implement the data model and persistence.
4. Implement admin authentication.
5. Implement admin CRUD screens for all editable site areas.
6. Wire public pages to live content from the database or CMS.
7. Add form submission storage and admin viewing/export.
8. Add responsive styling and accessibility.
9. Add seed content from `02-content-requirements.md`.
10. Document local setup, environment variables and deployment.

## Acceptance Criteria

- The public website works on mobile and desktop.
- Admin users can log in securely.
- Admin users can create, edit and delete shop products.
- Admin users can create, edit and delete events.
- Admin users can edit homepage hero slides, founder letters, mission text and testimonials.
- Admin users can manage social links and donation links.
- Forms save submissions somewhere persistent.
- Bible study registration can distinguish between newsletter/free interest and paid study access.
- The shop has a clear path for payment integration.
- The codebase has a useful README for setup and deployment.

## Tone and Language

The brand voice should feel warm, feminine, faith-centered, sincere and community-focused. Use English for site structure unless the client requests Afrikaans copy, but allow content fields to contain either English or Afrikaans.

