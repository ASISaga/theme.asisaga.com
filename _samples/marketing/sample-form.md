---
layout: form
title: "Contact Us"
description: "We'd love to hear from you. Send us a message and we'll respond as soon as possible."
show_progress: false
help_text: "All fields marked with * are required"
privacy_link: "/privacy"
---

<form action="/submit" method="POST" class="needs-validation" novalidate>
  {% include layouts/form/form-field.html
    id="name"
    label="Full Name"
    type="text"
    placeholder="Enter your full name"
    required=true
  %}
  
  {% include layouts/form/form-field.html
    id="email"
    label="Email Address"
    type="email"
    placeholder="your.email@example.com"
    required=true
    help_text="We'll never share your email with anyone else"
  %}
  
  {% include layouts/form/form-field.html
    id="subject"
    label="Subject"
    type="select"
    required=true
    options=[
      {"value": "general", "label": "General Inquiry"},
      {"value": "support", "label": "Technical Support"},
      {"value": "sales", "label": "Sales Question"},
      {"value": "partnership", "label": "Partnership Opportunity"}
    ]
  %}
  
  {% include layouts/form/form-field.html
    id="message"
    label="Message"
    type="textarea"
    placeholder="Tell us more about your inquiry..."
    rows=6
    required=true
  %}
  
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="newsletter" name="newsletter">
    <label class="form-check-label" for="newsletter">
      Subscribe to our newsletter for updates
    </label>
  </div>
  
  <button type="submit" class="btn btn-primary btn-lg">Send Message</button>
</form>
