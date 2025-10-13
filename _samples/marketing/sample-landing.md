---
layout: landing
title: "Transform Your Web Development"
hero:
  title: "Build Beautiful Websites with Our Layouts"
  subtitle: "A comprehensive collection of Jekyll layouts for every use case"
  cta:
    text: "Get Started Free"
    url: "#signup"
  image: "https://via.placeholder.com/600x400"
final_cta:
  title: "Ready to Transform Your Website?"
  description: "Join thousands of developers using our layouts"
  text: "Start Building Today"
  url: "#signup"
---

<!-- Features Section -->
{% include layouts/landing/landing-features.html 
  title="Why Choose Our Layouts?"
  features=[
    {
      "icon": "fas fa-rocket",
      "title": "Fast & Efficient",
      "description": "Optimized for performance and speed"
    },
    {
      "icon": "fas fa-mobile-alt",
      "title": "Fully Responsive",
      "description": "Works perfectly on all devices"
    },
    {
      "icon": "fas fa-paint-brush",
      "title": "Highly Customizable",
      "description": "Easy to customize to match your brand"
    },
    {
      "icon": "fas fa-code",
      "title": "Clean Code",
      "description": "Well-structured and maintainable"
    },
    {
      "icon": "fas fa-universal-access",
      "title": "Accessible",
      "description": "WCAG 2.1 compliant for all users"
    },
    {
      "icon": "fas fa-book",
      "title": "Well Documented",
      "description": "Comprehensive guides and examples"
    }
  ]
%}

<!-- Benefits Section -->
<section class="py-5 bg-light">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <h2 class="display-5 fw-bold mb-3">Everything You Need</h2>
        <p class="lead mb-4">Our layouts provide all the components and patterns you need to build professional websites quickly.</p>
        <ul class="list-unstyled">
          <li class="mb-2">✓ 15+ Layout Templates</li>
          <li class="mb-2">✓ 50+ Reusable Components</li>
          <li class="mb-2">✓ Bootstrap 5.3+ Integration</li>
          <li class="mb-2">✓ Dark Mode Support</li>
          <li class="mb-2">✓ Regular Updates</li>
        </ul>
      </div>
      <div class="col-lg-6">
        <img src="https://via.placeholder.com/600x400" alt="Features" class="img-fluid rounded shadow">
      </div>
    </div>
  </div>
</section>

<!-- Testimonials Section -->
<section class="py-5">
  <div class="container">
    <h2 class="text-center display-5 fw-bold mb-5">What Developers Say</h2>
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <p class="card-text">"These layouts saved me weeks of development time. Highly recommended!"</p>
            <footer class="blockquote-footer mt-3">Alex Chen, <cite>Front-end Developer</cite></footer>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <p class="card-text">"The quality and attention to detail is outstanding. Perfect for our projects."</p>
            <footer class="blockquote-footer mt-3">Maria Garcia, <cite>UI/UX Designer</cite></footer>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <p class="card-text">"Clean code, great documentation, and responsive support. What more could you ask for?"</p>
            <footer class="blockquote-footer mt-3">David Park, <cite>Full-stack Developer</cite></footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
