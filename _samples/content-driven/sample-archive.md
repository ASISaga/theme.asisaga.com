---
layout: archive
title: "Blog Archive"
description: "Browse all blog posts and articles"
show_filters: true
show_sort: true
show_view_toggle: true
show_pagination: true
---

<!-- Archive items would be dynamically generated here -->
<!-- This is a sample demonstrating the structure -->

{% include layouts/archive/archive-item.html 
  title="Getting Started with Jekyll Layouts"
  url="/samples/content-driven/sample-post.html"
  date="2024-01-15"
  excerpt="Learn how to use the various Jekyll layouts in this comprehensive guide."
  tags=["Jekyll", "Tutorial"]
  image="https://via.placeholder.com/400x300"
%}

{% include layouts/archive/archive-item.html 
  title="The Complete Guide to Modern Web Layouts"
  url="/samples/content-driven/sample-article.html"
  date="2024-01-20"
  excerpt="A comprehensive exploration of layout patterns in modern web development."
  tags=["Web Development", "Layouts"]
  image="https://via.placeholder.com/400x300"
%}

{% include layouts/archive/archive-item.html 
  title="Building Responsive Galleries"
  url="#"
  date="2024-01-10"
  excerpt="Create beautiful, responsive image galleries with the gallery layout."
  tags=["Gallery", "Responsive"]
%}
