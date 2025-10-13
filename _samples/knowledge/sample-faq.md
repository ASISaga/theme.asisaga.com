---
layout: faq
title: "Frequently Asked Questions"
description: "Find answers to common questions about our layouts and components"
search: true
categories: ["General", "Technical", "Billing", "Support"]
contact_cta:
  description: "Can't find what you're looking for? Our support team is here to help."
  text: "Contact Support"
  url: "/contact"
---

<div class="accordion" id="faqAccordion">
  
  {% include layouts/faq/faq-item.html
    id="1"
    question="What is included in the layout collection?"
    answer="Our collection includes 15+ professional layouts covering all major use cases: blog posts, articles, landing pages, galleries, forms, documentation, dashboards, and more. Each layout is fully responsive and customizable."
    expanded=true
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="2"
    question="Do I need coding experience to use these layouts?"
    answer="Basic knowledge of HTML and Markdown is helpful, but not required. Our layouts are designed to be easy to use with Jekyll's front matter. Comprehensive documentation and examples are provided."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="3"
    question="Are the layouts responsive?"
    answer="Yes! All layouts are built with Bootstrap 5.3+ and are fully responsive. They work seamlessly across desktop, tablet, and mobile devices."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="4"
    question="Can I customize the layouts?"
    answer="Absolutely! The layouts are highly customizable. You can modify colors, fonts, spacing, and structure using SCSS variables and custom CSS. Each layout also supports multiple configuration options through front matter."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="5"
    question="What version of Bootstrap is required?"
    answer="The layouts are built with Bootstrap 5.3 or higher. Make sure your Jekyll site includes Bootstrap 5.3+ for full compatibility."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="6"
    question="Do the layouts support dark mode?"
    answer="Yes, dark mode support is available. You can enable it through your site configuration, and all layouts will automatically adapt to the user's preference."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="7"
    question="How do I get updates?"
    answer="Updates are released regularly with new features and improvements. Watch the GitHub repository to be notified of new releases, or check the changelog periodically."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="8"
    question="Is there a support forum or community?"
    answer="Yes! Join our community on GitHub Discussions where you can ask questions, share your projects, and connect with other users. Our team actively monitors and responds to questions."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="9"
    question="Can I use these layouts for commercial projects?"
    answer="Yes, the layouts are available under an open-source license that allows both personal and commercial use. Please review the LICENSE file for specific terms."
    parent="faqAccordion"
  %}
  
  {% include layouts/faq/faq-item.html
    id="10"
    question="How do I report a bug or request a feature?"
    answer="Please open an issue on our GitHub repository with detailed information about the bug or feature request. We review all submissions and prioritize based on community feedback."
    parent="faqAccordion"
  %}

</div>
