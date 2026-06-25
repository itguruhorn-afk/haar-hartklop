# Suggested Data Model

Use this as a starting point for Prisma, Supabase tables, CMS schemas, or another backend.

## User

Fields:

- id
- name
- email
- role
- createdAt
- updatedAt

Roles:

- ADMIN
- EDITOR
- SHOP_MANAGER
- FOLLOW_UP

## SiteSettings

Fields:

- id
- brandName
- tagline
- logoUrl
- primaryColor
- accentColor
- headingFont
- bodyFont
- facebookUrl
- instagramUrl
- youtubeUrl
- donationUrl
- contactEmail
- updatedAt

## HeroSlide

Fields:

- id
- title
- subtitle
- imageUrl
- primaryButtonLabel
- primaryButtonUrl
- secondaryButtonLabel
- secondaryButtonUrl
- sortOrder
- isActive
- createdAt
- updatedAt

## FounderLetter

Fields:

- id
- title
- body
- imageUrl
- backgroundColor
- sortOrder
- isActive
- createdAt
- updatedAt

## Testimonial

Fields:

- id
- quote
- authorName
- authorContext
- imageUrl
- sourceType
- sortOrder
- isActive
- createdAt
- updatedAt

## BibleStudy

Fields:

- id
- title
- slug
- description
- coverImageUrl
- price
- capacity
- registrationStatus
- format
- zoomUrlPrivate
- digitalDownloadPrivateUrl
- hardcopyAvailable
- courierNotes
- startsAt
- isActive
- createdAt
- updatedAt

Registration status values:

- DRAFT
- OPEN
- CLOSED
- FULL

## BibleStudyRegistration

Fields:

- id
- bibleStudyId
- firstName
- lastName
- email
- phone
- city
- province
- preferredFormat
- paymentStatus
- notes
- consent
- createdAt
- updatedAt

Payment status values:

- PENDING
- PAID
- FAILED
- REFUNDED
- MANUAL_CONFIRMED

## Event

Fields:

- id
- title
- slug
- type
- description
- startsAt
- endsAt
- location
- heroImageUrl
- videoEmbedUrl
- registrationUrl
- capacity
- status
- createdAt
- updatedAt

Event status values:

- DRAFT
- PUBLISHED
- SOLD_OUT
- PAST

## EventImage

Fields:

- id
- eventId
- imageUrl
- altText
- sortOrder

## Product

Fields:

- id
- title
- slug
- category
- description
- price
- salePrice
- mainImageUrl
- status
- inventoryCount
- externalCheckoutUrl
- createdAt
- updatedAt

Product status values:

- DRAFT
- ACTIVE
- SOLD_OUT
- COMING_SOON

Product categories:

- BIBLE_STUDY
- RR_COLLECTION
- CONFERENCE_MERCH
- OTHER

## ProductImage

Fields:

- id
- productId
- imageUrl
- altText
- sortOrder

## FormSubmission

Fields:

- id
- type
- firstName
- lastName
- name
- email
- phone
- city
- province
- subject
- message
- interest
- preferredContactMethod
- status
- payloadJson
- consent
- newsletterOptIn
- createdAt
- updatedAt

Submission types:

- NEWSLETTER
- CONTACT
- SALVATION
- BIBLE_STUDY
- PARTNER

Submission statuses:

- NEW
- IN_PROGRESS
- CONTACTED
- CLOSED

## MediaAsset

Fields:

- id
- url
- fileName
- altText
- mimeType
- width
- height
- uploadedBy
- createdAt

