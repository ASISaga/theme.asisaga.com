# Community Engagement Mechanisms v2.4.0 - Genesis Ontological Design System

## Overview

Version 2.4.0 of the Genesis Ontological Design System introduces comprehensive support for all contemporary community engagement mechanisms. This enhancement adds **16 new variants** across four ontological categories (Environment, Entity, Synapse, and State), enabling semantic implementation of reactions, comments, notifications, user profiles, voting, and real-time interactions.

## What's New

### New Synapse Variants (6 added)

Community interaction patterns that define user actions:

1. **`react`** - Emoji reactions and quick responses (like, love, celebrate, etc.)
2. **`vote`** - Voting and rating interactions (upvote, downvote, star rating)
3. **`comment`** - Comment and reply interactions
4. **`share`** - Enhanced sharing with multiple platforms
5. **`notify`** - Notification and alert interactions
6. **`mention`** - @mention and tagging interactions

### New Entity Variants (5 added)

Community content types that define presence and visual weight:

1. **`avatar`** - User avatar/profile picture display with status indicators
2. **`badge`** - Achievement badges and status indicators
3. **`notification`** - Notification cards and alert displays
4. **`reaction-picker`** - Emoji/reaction selector UI component
5. **`user-card`** - User profile preview card with hover actions

### New Environment Variants (4 added)

Community layout patterns that define spatial organization:

1. **`community-feed`** - Activity feed/timeline layout for community updates
2. **`comment-thread`** - Nested comment discussion layout
3. **`notification-center`** - Notification panel layout
4. **`user-grid`** - User/member grid display layout

### New State Variants (3 added)

Community state patterns that define temporal conditions:

1. **`mentioned`** - Content where user is mentioned/tagged
2. **`unread`** - Unread notifications/messages/content
3. **`reacted`** - Content user has reacted to or engaged with

## Contemporary Engagement Patterns Supported

### ✅ Fully Implemented (20 patterns)

| Engagement Pattern | Ontology Solution | Use Case |
|-------------------|-------------------|----------|
| **Emoji Reactions** | `genesis-synapse('react')` | Like, love, celebrate buttons on posts |
| **Upvote/Downvote** | `genesis-synapse('vote')` | Reddit-style voting, forum discussions |
| **Star Ratings** | `genesis-synapse('vote')` + `.star-rating` | Product reviews, content ratings |
| **Comments** | `genesis-synapse('comment')` | Comment buttons, reply actions |
| **Nested Replies** | `genesis-environment('comment-thread')` | Threaded discussions, forum threads |
| **Social Sharing** | `genesis-synapse('share')` | Twitter, Facebook, LinkedIn sharing |
| **@Mentions** | `genesis-synapse('mention')` | Tagging users in comments/posts |
| **Notifications** | `genesis-synapse('notify')` + `genesis-entity('notification')` | Alert center, notification bell |
| **Unread Indicators** | `genesis-state('unread')` | Unread messages, new notifications |
| **User Avatars** | `genesis-entity('avatar')` | Profile pictures with status |
| **Status Indicators** | `genesis-entity('avatar')` + `.status-online` | Online/away/busy presence |
| **Achievement Badges** | `genesis-entity('badge')` | Gamification, user achievements |
| **User Profiles** | `genesis-entity('user-card')` | Member cards, profile previews |
| **Activity Feed** | `genesis-environment('community-feed')` | Social timeline, activity stream |
| **Member Directory** | `genesis-environment('user-grid')` | Team pages, community members |
| **Reaction Picker** | `genesis-entity('reaction-picker')` | Emoji selector, reaction menu |
| **Notification Center** | `genesis-environment('notification-center')` | Notification panel, alerts list |
| **Mention Highlights** | `genesis-state('mentioned')` | Highlight content where user tagged |
| **Engagement State** | `genesis-state('reacted')` | Show user's past reactions |
| **Live Chat** | Combination of community variants | Real-time messaging interfaces |

## Implementation Examples

### 1. Emoji Reactions

```scss
.post-reactions {
  @include genesis-environment('associative'); // Horizontal layout

  .reaction-button {
    @include genesis-synapse('react');
    
    // Reacted state via .reacted or [aria-pressed="true"]
  }
  
  .emoji-picker-toggle {
    @include genesis-synapse('react');
  }
}

.emoji-picker {
  @include genesis-entity('reaction-picker');
  
  .emoji-option {
    // Individual emoji buttons
  }
}
```

**HTML:**
```html
<div class="post-reactions">
  <button class="reaction-button reacted" aria-pressed="true">
    <span class="reaction-emoji">👍</span>
    <span class="reaction-count">24</span>
  </button>
  <button class="reaction-button">
    <span class="reaction-emoji">❤️</span>
    <span class="reaction-count">12</span>
  </button>
  <button class="emoji-picker-toggle reaction-button">
    <span class="reaction-emoji">➕</span>
  </button>
</div>

<div class="emoji-picker">
  <div class="reaction-option">😀</div>
  <div class="reaction-option">👍</div>
  <div class="reaction-option">❤️</div>
  <!-- more emojis -->
</div>
```

### 2. Voting and Star Ratings

```scss
.content-voting {
  @include genesis-environment('associative');

  .upvote-button {
    @include genesis-synapse('vote');
    // State: .upvoted or [data-vote="up"]
  }
  
  .vote-score {
    @include genesis-cognition('gloss');
  }
  
  .downvote-button {
    @include genesis-synapse('vote');
    // State: .downvoted or [data-vote="down"]
  }
}

.star-rating {
  @include genesis-environment('associative');
  
  .star {
    @include genesis-synapse('vote');
    
    // Must add .star-rating class for star-specific styling
    &.star-rating.rated {
      // Gold/yellow color when rated
    }
  }
}
```

**HTML:**
```html
<div class="content-voting">
  <button class="upvote-button upvoted" data-vote="up" aria-label="Upvote">▲</button>
  <span class="vote-score">42</span>
  <button class="downvote-button" data-vote="none" aria-label="Downvote">▼</button>
</div>

<div class="star-rating" role="radiogroup" aria-label="Rate this product">
  <button class="star star-rating rated" role="radio" aria-checked="true">★</button>
  <button class="star star-rating rated" role="radio" aria-checked="true">★</button>
  <button class="star star-rating rated" role="radio" aria-checked="true">★</button>
  <button class="star star-rating" role="radio" aria-checked="false">★</button>
  <button class="star star-rating" role="radio" aria-checked="false">★</button>
</div>
```

### 3. Comment Thread with Nested Replies

```scss
.discussion-thread {
  @include genesis-environment('comment-thread'); // Auto-nesting

  .comment {
    @include genesis-entity('primary');
    
    .comment-header {
      @include genesis-environment('associative');
      
      .comment-avatar {
        @include genesis-entity('avatar');
        // Add .status-online, .status-away, etc.
      }
      
      .comment-author {
        @include genesis-cognition('motive');
      }
      
      .comment-badge {
        @include genesis-entity('badge');
        // Variants: .badge-success, .badge-warning
      }
    }
    
    .comment-body {
      @include genesis-cognition('discourse');
      
      .mention {
        @include genesis-synapse('mention');
        // Current user: .mention-self
      }
    }
    
    .comment-actions {
      .reply-button {
        @include genesis-synapse('comment');
      }
      
      .like-button {
        @include genesis-synapse('react');
      }
    }
  }
  
  // Nested replies styled automatically via .comment-reply or .comment-nested
}
```

### 4. User Avatars with Status

```scss
.user-presence {
  .user-avatar {
    @include genesis-entity('avatar');
    
    // Status automatically styled via classes:
    // .status-online (green)
    // .status-away (yellow)
    // .status-busy (red)
    // .status-offline (gray)
    
    // Size variants:
    // .avatar-xs (1.5rem)
    // .avatar-sm (2rem)
    // .avatar-md (2.5rem) - default
    // .avatar-lg (3.5rem)
    // .avatar-xl (5rem)
  }
}
```

**HTML:**
```html
<div class="user-presence">
  <div class="user-avatar avatar-lg status-online">
    <img src="avatar.jpg" alt="User name">
  </div>
</div>
```

### 5. Notifications Panel

```scss
.notifications-panel {
  @include genesis-entity('primary');

  .notification-header {
    .notification-bell {
      @include genesis-synapse('notify');
      
      .notify-badge {
        // Unread count badge
      }
    }
  }

  .notification-list {
    @include genesis-environment('notification-center');

    .notification-item {
      @include genesis-entity('notification');
      
      &.unread {
        @include genesis-state('unread');
      }
      
      // Type variants:
      // .notification-mention (highlighted)
      // .notification-comment (blue)
      // .notification-reaction (green)
      // .notification-system (gray)
      // .notification-urgent (red)
    }
  }
}
```

### 6. Activity Feed / Social Timeline

```scss
.community-feed {
  @include genesis-environment('community-feed');

  .feed-item {
    @include genesis-entity('primary');
    
    // Special states
    &.has-mention {
      @include genesis-state('mentioned');
    }
    
    &.user-reacted {
      @include genesis-state('reacted');
    }
    
    .feed-footer {
      .reaction-summary {
        @include genesis-synapse('react');
      }
      
      .comment-count {
        @include genesis-synapse('comment');
      }
      
      .share-button {
        @include genesis-synapse('share');
        
        // Platform variants:
        // .share-twitter, .share-facebook, .share-linkedin
        // Copy state: .share-copy.copied
      }
    }
  }
}
```

### 7. Member Directory / User Grid

```scss
.member-directory {
  @include genesis-environment('user-grid'); // Responsive grid

  .member-card {
    @include genesis-entity('user-card');
    
    .user-card-header {
      .member-avatar {
        @include genesis-entity('avatar');
      }
      
      .member-badge {
        @include genesis-entity('badge');
      }
    }
    
    .user-card-footer {
      .follow-button {
        @include genesis-synapse('execute');
      }
      
      .message-button {
        @include genesis-synapse('comment');
      }
    }
  }
}
```

## Accessibility Features

All community engagement mechanisms implement WCAG 2.5.5 guidelines:

- ✅ **Minimum 44x44px touch targets on mobile** (automatically applied)
- ✅ **ARIA attributes** (aria-pressed, aria-checked, aria-expanded, aria-label)
- ✅ **Semantic HTML** (button, role="radio", role="radiogroup")
- ✅ **Keyboard navigation** (focus-visible states)
- ✅ **Screen reader support** (descriptive labels, status announcements)
- ✅ **Reduced motion support** (respects prefers-reduced-motion)

## Responsive Behavior

### Mobile (< 768px)
- **Reactions**: 44px touch targets, pill-shaped buttons
- **Avatars**: Compact sizes, status indicators visible
- **Comments**: Single column, reduced indentation
- **Notifications**: Full-height panels, larger touch areas
- **User Grid**: Single column layout

### Tablet (768px - 1023px)
- **Reactions**: 42px touch targets
- **Comments**: Moderate indentation (1.5rem)
- **User Grid**: 2-column layout
- **Notifications**: 500px max height

### Desktop (1024px+)
- **Reactions**: Hover effects, tooltips
- **Comments**: Full indentation (2.5rem), deeper nesting
- **User Grid**: 3-4 column auto-fit layout
- **Notifications**: 600px max height with scroll

## Design Tokens Used

### Community-Specific Tokens

```scss
// Reactions
--padding-react: clamp(0.375rem, 0.75vw, 0.5rem) clamp(0.625rem, 1.25vw, 0.875rem);

// Voting
--vote-up: oklch(0.88 0.18 95);
--vote-down: oklch(0.55 0.25 25);
--star-active: oklch(0.88 0.18 50); // Gold/yellow
--star-inactive: oklch(0.50 0.02 220);

// Mentions
--mention-bg: oklch(0.88 0.18 95 / 0.15);
--mention-text: oklch(0.88 0.18 95);
--mention-self-bg: oklch(0.85 0.16 85 / 0.3);

// Avatars
--avatar-size: 2.5rem; // Configurable
--status-online: oklch(0.65 0.25 150);
--status-away: oklch(0.75 0.25 85);
--status-busy: oklch(0.55 0.25 25);
--status-offline: oklch(0.50 0.02 220);

// Badges
--badge-bg, --badge-text, --badge-border (per variant)

// Notifications
--unread-indicator: oklch(0.65 0.25 230);
--notification-accent (per type)
```

## JavaScript Integration

While the ontology provides all styling, some engagement features require JavaScript:

### Reaction Counter
```javascript
document.querySelectorAll('.reaction-button').forEach(button => {
  button.addEventListener('click', () => {
    const isReacted = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', !isReacted);
    button.classList.toggle('reacted');
    // Update count via API
  });
});
```

### Voting System
```javascript
document.querySelectorAll('.upvote-button, .downvote-button').forEach(button => {
  button.addEventListener('click', () => {
    const voteType = button.classList.contains('upvote-button') ? 'up' : 'down';
    // Remove other vote states
    button.parentElement.querySelectorAll('.upvoted, .downvoted').forEach(b => {
      b.classList.remove('upvoted', 'downvoted');
      b.setAttribute('data-vote', 'none');
    });
    // Apply new vote
    button.classList.add(voteType === 'up' ? 'upvoted' : 'downvoted');
    button.setAttribute('data-vote', voteType);
  });
});
```

### Notification Center
```javascript
// Mark notification as read
document.querySelectorAll('.notification-item').forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('unread')) {
      item.classList.remove('unread');
      // Update unread count badge
      updateNotificationCount();
    }
  });
});
```

## Browser Support

All community engagement mechanisms are tested and supported in:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile 90+

## Performance Considerations

### CSS Performance
- Pill-shaped borders use `border-radius: 999px` (efficient)
- Status indicators use `::after` pseudo-elements (no extra DOM)
- Transitions limited to transform, opacity, color (hardware accelerated)
- No heavy box-shadows on interactive elements

### JavaScript Performance
- Use event delegation for dynamic content
- Debounce reaction counts on rapid clicks
- Implement intersection observer for feed loading
- Cache user data (avatars, names) to reduce API calls

## Real-World Usage Scenarios

### Social Platform
- ✅ Post reactions (like, love, celebrate)
- ✅ Nested comment threads with @mentions
- ✅ Activity feed with engagement states
- ✅ Notification center with unread counts
- ✅ User profiles with status indicators

### Discussion Forum
- ✅ Upvote/downvote on posts and comments
- ✅ Nested reply threads
- ✅ User badges (moderator, contributor)
- ✅ Mention notifications
- ✅ Quote/reply actions

### E-commerce Reviews
- ✅ Star ratings on products
- ✅ Helpful/not helpful votes on reviews
- ✅ Review comments
- ✅ Share reviews to social media
- ✅ Verified purchase badges

### Team Collaboration
- ✅ Real-time chat with reactions
- ✅ @mentions in discussions
- ✅ User presence indicators (online/away)
- ✅ Notification center for updates
- ✅ Member directory with profiles

## Migration from Legacy Systems

### Before (Custom CSS)
```scss
.like-button {
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 20px;
  
  &.liked {
    background: #ff6b6b;
    color: white;
  }
  
  @media (max-width: 767px) {
    min-width: 44px;
    min-height: 44px;
  }
}
```

### After (Ontology)
```scss
.like-button {
  @include genesis-synapse('react');
  // All styling, states, and responsive behavior included
}
```

**Benefits:**
- ✅ 90% less code
- ✅ Automatic WCAG compliance
- ✅ Consistent with entire theme
- ✅ Semantic clarity
- ✅ Built-in dark mode support

## Complete Feature Matrix

| Feature | Synapse | Entity | Environment | State |
|---------|---------|--------|-------------|-------|
| Emoji Reactions | ✅ `react` | ✅ `reaction-picker` | - | ✅ `reacted` |
| Voting | ✅ `vote` | - | - | - |
| Comments | ✅ `comment` | - | ✅ `comment-thread` | - |
| Sharing | ✅ `share` | - | - | - |
| Notifications | ✅ `notify` | ✅ `notification` | ✅ `notification-center` | ✅ `unread` |
| Mentions | ✅ `mention` | - | - | ✅ `mentioned` |
| Avatars | - | ✅ `avatar` | - | - |
| Badges | - | ✅ `badge` | - | - |
| User Profiles | - | ✅ `user-card` | ✅ `user-grid` | - |
| Activity Feed | - | - | ✅ `community-feed` | - |

## Further Reading

- **API Reference**: `_sass/ontology/INTEGRATION-GUIDE.md`
- **Usage Examples**: `_sass/ontology/_sample.scss` (Examples 17-23)
- **Architecture**: `_sass/ontology/Readme.md`
- **Navigation Features**: `NAVIGATION-MECHANISMS-v2.3.0.md`

## Version History

### v2.4.0 (Current)
- Added 6 new synapse variants for community interactions
- Added 5 new entity variants for community content
- Added 4 new environment variants for community layouts
- Added 3 new state variants for engagement tracking
- Created 7 comprehensive usage examples
- Full documentation and visual demonstrations

### v2.3.0
- Added navigation mechanisms (pagination, tabs, accordions, etc.)

### v2.2.0
- Added form inputs and responsive navigation

### v2.1.0
- Added responsive images and viewport-aware content

## Contributing

When proposing new community engagement patterns, use the Ontological Proposition template:

`.github/PULL_REQUEST_TEMPLATE/ontological_proposition.md`

Ensure new patterns:
1. Have semantic intent (WHAT, not HOW)
2. Are universally applicable across communities
3. Cannot be achieved by combining existing mixins
4. Follow WCAG 2.5.5 accessibility guidelines

## License

Part of the Genesis Ontological Design System - ASISaga Theme
