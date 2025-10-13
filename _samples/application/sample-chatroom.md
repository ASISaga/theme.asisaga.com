---
layout: chatroom
title: "Development Team Chat"
participants: 12
---

<!-- Sample messages for chatroom interface -->
<div class="message-list">
  <!-- Message from user 1 -->
  <div class="message mb-3">
    <div class="d-flex align-items-start">
      <div class="avatar bg-primary text-white rounded-circle me-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>JD</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1">
          <strong class="me-2">John Doe</strong>
          <small class="text-muted">10:23 AM</small>
        </div>
        <div class="message-body bg-light p-3 rounded">
          <p class="mb-0">Hey team, I just pushed the latest updates to the layout system. Can someone review the PR?</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Message from user 2 -->
  <div class="message mb-3">
    <div class="d-flex align-items-start">
      <div class="avatar bg-success text-white rounded-circle me-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>SJ</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1">
          <strong class="me-2">Sarah Johnson</strong>
          <small class="text-muted">10:25 AM</small>
        </div>
        <div class="message-body bg-light p-3 rounded">
          <p class="mb-0">Sure! I'll take a look this afternoon. The new layouts look great btw! 🎉</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Message from user 3 -->
  <div class="message mb-3">
    <div class="d-flex align-items-start">
      <div class="avatar bg-warning text-dark rounded-circle me-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>MP</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1">
          <strong class="me-2">Mike Park</strong>
          <small class="text-muted">10:27 AM</small>
        </div>
        <div class="message-body bg-light p-3 rounded">
          <p class="mb-0">Quick question - are we using the fixed-height layout for all application pages?</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Current user message (right-aligned) -->
  <div class="message mb-3">
    <div class="d-flex align-items-start flex-row-reverse">
      <div class="avatar bg-info text-white rounded-circle ms-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>You</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1 text-end">
          <small class="text-muted me-2">10:28 AM</small>
          <strong>You</strong>
        </div>
        <div class="message-body bg-primary text-white p-3 rounded">
          <p class="mb-0">Yes, the fixed-height layout is recommended for all app-style interfaces like dashboards, chats, and settings.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- System message -->
  <div class="message mb-3">
    <div class="text-center">
      <small class="text-muted">
        <em>Emma Chen joined the chat</em>
      </small>
    </div>
  </div>

  <!-- Message from user 4 -->
  <div class="message mb-3">
    <div class="d-flex align-items-start">
      <div class="avatar bg-danger text-white rounded-circle me-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>EC</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1">
          <strong class="me-2">Emma Chen</strong>
          <small class="text-muted">10:30 AM</small>
        </div>
        <div class="message-body bg-light p-3 rounded">
          <p class="mb-0">Hi everyone! Just saw the new documentation. Very comprehensive! 📚</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Typing indicator -->
  <div class="message mb-3">
    <div class="d-flex align-items-start">
      <div class="avatar bg-secondary text-white rounded-circle me-3 flex-shrink-0" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
        <strong>JD</strong>
      </div>
      <div class="message-content flex-grow-1">
        <div class="message-header mb-1">
          <small class="text-muted">
            <em>John Doe is typing...</em>
          </small>
        </div>
      </div>
    </div>
  </div>
</div>
