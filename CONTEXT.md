# Domain glossary

The words this codebase uses for the things on Josh Mu's dance site. Use these names in code, tests, tickets and reviews.

## Section

A scroll-addressable part of the single page: `home`, `about`, `news`, `critics` or `contact`. Navigation scrolls to a Section by its id, and the page tracks which Section is in view.

## Contact message

What a visitor sends to the owner from the contact form: their name, their email address and a message.

## Mailer

The seam a Contact message is sent through. In production it delivers over SMTP; in tests it is an in-memory stand-in, so no test sends real mail.

## Banner

A full-width image band with a heading and a rotating list of items. The Companies and Critics parts of the page are Banners.

## Critic review

A short published quote about Josh's dancing, attributed to the critic or publication that wrote it. Critic reviews rotate in the Critics Banner.

## Company

A dance company Josh has worked with, shown by name with a link to its website. Companies rotate in the Companies Banner.
