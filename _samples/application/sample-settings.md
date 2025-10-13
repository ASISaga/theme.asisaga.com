---
layout: settings
title: "Account Settings"
tabs:
  - title: "Profile"
    id: "profile"
    icon: "fas fa-user"
  - title: "Security"
    id: "security"
    icon: "fas fa-lock"
  - title: "Notifications"
    id: "notifications"
    icon: "fas fa-bell"
  - title: "Privacy"
    id: "privacy"
    icon: "fas fa-shield-alt"
  - title: "Preferences"
    id: "preferences"
    icon: "fas fa-cog"
---

<!-- Profile Tab -->
<div class="tab-pane fade show active" id="profile" role="tabpanel">
  <h3 class="h4 mb-4">Profile Information</h3>
  
  <form>
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="firstName" class="form-label">First Name</label>
        <input type="text" class="form-control" id="firstName" value="John">
      </div>
      <div class="col-md-6">
        <label for="lastName" class="form-label">Last Name</label>
        <input type="text" class="form-control" id="lastName" value="Doe">
      </div>
    </div>
    
    <div class="mb-3">
      <label for="email" class="form-label">Email Address</label>
      <input type="email" class="form-control" id="email" value="john.doe@example.com">
    </div>
    
    <div class="mb-3">
      <label for="bio" class="form-label">Bio</label>
      <textarea class="form-control" id="bio" rows="4">Passionate developer and designer with 10+ years of experience building modern web applications.</textarea>
    </div>
    
    <div class="mb-3">
      <label for="website" class="form-label">Website</label>
      <input type="url" class="form-control" id="website" value="https://johndoe.com">
    </div>
    
    <div class="mb-3">
      <label for="location" class="form-label">Location</label>
      <input type="text" class="form-control" id="location" value="San Francisco, CA">
    </div>
  </form>
</div>

<!-- Security Tab -->
<div class="tab-pane fade" id="security" role="tabpanel">
  <h3 class="h4 mb-4">Security Settings</h3>
  
  <form>
    <div class="mb-4">
      <h5 class="h6 mb-3">Change Password</h5>
      <div class="mb-3">
        <label for="currentPassword" class="form-label">Current Password</label>
        <input type="password" class="form-control" id="currentPassword">
      </div>
      <div class="mb-3">
        <label for="newPassword" class="form-label">New Password</label>
        <input type="password" class="form-control" id="newPassword">
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input type="password" class="form-control" id="confirmPassword">
      </div>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Two-Factor Authentication</h5>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="enable2fa">
        <label class="form-check-label" for="enable2fa">
          Enable two-factor authentication
        </label>
      </div>
      <p class="text-muted small">Add an extra layer of security to your account.</p>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Active Sessions</h5>
      <div class="list-group">
        <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>Current Session</strong>
              <p class="text-muted small mb-0">Chrome on macOS • San Francisco, CA</p>
            </div>
            <span class="badge bg-success">Active</span>
          </div>
        </div>
        <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <strong>Mobile Device</strong>
              <p class="text-muted small mb-0">Safari on iOS • Last active 2 hours ago</p>
            </div>
            <button class="btn btn-sm btn-outline-danger">Revoke</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>

<!-- Notifications Tab -->
<div class="tab-pane fade" id="notifications" role="tabpanel">
  <h3 class="h4 mb-4">Notification Preferences</h3>
  
  <form>
    <div class="mb-4">
      <h5 class="h6 mb-3">Email Notifications</h5>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="emailComments" checked>
        <label class="form-check-label" for="emailComments">
          New comments on your posts
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="emailMentions" checked>
        <label class="form-check-label" for="emailMentions">
          When someone mentions you
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="emailFollowers">
        <label class="form-check-label" for="emailFollowers">
          New followers
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="emailNewsletter" checked>
        <label class="form-check-label" for="emailNewsletter">
          Weekly newsletter
        </label>
      </div>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Push Notifications</h5>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="pushMessages" checked>
        <label class="form-check-label" for="pushMessages">
          Direct messages
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="pushMentions" checked>
        <label class="form-check-label" for="pushMentions">
          Mentions and replies
        </label>
      </div>
    </div>
  </form>
</div>

<!-- Privacy Tab -->
<div class="tab-pane fade" id="privacy" role="tabpanel">
  <h3 class="h4 mb-4">Privacy Settings</h3>
  
  <form>
    <div class="mb-4">
      <h5 class="h6 mb-3">Profile Visibility</h5>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="profileVisibility" id="profilePublic" checked>
        <label class="form-check-label" for="profilePublic">
          Public - Anyone can see your profile
        </label>
      </div>
      <div class="form-check mb-2">
        <input class="form-check-input" type="radio" name="profileVisibility" id="profilePrivate">
        <label class="form-check-label" for="profilePrivate">
          Private - Only approved followers can see your profile
        </label>
      </div>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Data & Privacy</h5>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="showActivity" checked>
        <label class="form-check-label" for="showActivity">
          Show your activity status
        </label>
      </div>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="indexProfile">
        <label class="form-check-label" for="indexProfile">
          Allow search engines to index your profile
        </label>
      </div>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="dataCollection">
        <label class="form-check-label" for="dataCollection">
          Allow anonymous usage data collection
        </label>
      </div>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Data Management</h5>
      <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-primary">Download Your Data</button>
        <button type="button" class="btn btn-outline-danger">Delete Account</button>
      </div>
    </div>
  </form>
</div>

<!-- Preferences Tab -->
<div class="tab-pane fade" id="preferences" role="tabpanel">
  <h3 class="h4 mb-4">General Preferences</h3>
  
  <form>
    <div class="mb-4">
      <h5 class="h6 mb-3">Appearance</h5>
      <div class="mb-3">
        <label for="theme" class="form-label">Theme</label>
        <select class="form-select" id="theme">
          <option>Light</option>
          <option>Dark</option>
          <option selected>Auto (matches system)</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="language" class="form-label">Language</label>
        <select class="form-select" id="language">
          <option selected>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>
    </div>
    
    <div class="mb-4">
      <h5 class="h6 mb-3">Content Preferences</h5>
      <div class="mb-3">
        <label for="defaultView" class="form-label">Default View</label>
        <select class="form-select" id="defaultView">
          <option selected>Grid View</option>
          <option>List View</option>
          <option>Compact View</option>
        </select>
      </div>
      <div class="form-check form-switch mb-2">
        <input class="form-check-input" type="checkbox" id="autoplay" checked>
        <label class="form-check-label" for="autoplay">
          Autoplay videos
        </label>
      </div>
    </div>
  </form>
</div>
