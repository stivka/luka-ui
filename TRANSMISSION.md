# Transmission Feature Documentation

## Overview

The Transmission feature provides a terminal-style notification system that displays incoming messages via Server-Sent Events (SSE). Messages appear with a realistic typing animation and persist on screen after completion.

Also good for leaving news like "Live coming on 18th August at Paavli". Has a certain broadcasting, urgent feel to it, because it pops up and takes space on your view.

## Features

- **Terminal-style UI**: Green text on black background with monospace font
- **Typing Animation**: Messages appear character-by-character with realistic timing
- **Persistent Messages**: Messages remain visible after typing completes
- **Manual Dismiss**: Each transmission has an “X” button to dismiss it
- **Console Toggle**: Enable/disable transmissions via browser console
- **Automatic Connection**: Transmissions are enabled by default

## Frontend Components

### `Transmission.js`
Main component that manages the transmission display area. Located at `src/components/Transmission.js`.

**Features:**
- Fixed position at bottom-right of screen
- Displays up to 5 most recent transmissions by default (configurable)
- Manages typing animation state
- Terminal-style styling

### `TransmissionItem.js`
Individual transmission message component. Located at `src/components/TransmissionItem.js`.

**Features:**
- Terminal-style formatting with receiver tags (RX-001, RX-042, etc.)
- Timestamp display in format: `[HH:MM:SS.mmm]`
- Typing animation with blinking cursor
- Green text (#00ff00) on black background

### Hooks

#### `useTransmission.js`
Manages the SSE connection to the backend.

**Usage:**
```javascript
const { items } = useTransmission(enabled);
```

**Parameters:**
- `enabled` (boolean): Whether to maintain the SSE connection

**Returns:**
- `items`: Array of received transmission messages

#### `useTransmissionEnabled.js`
Manages transmission enabled state via console commands.

**Console Commands:**
- `toggleTransmission()` - Toggle transmissions on/off
- `getTransmissionStatus()` - Check current status

#### `useTypingAnimation.js`
Provides typing animation effect for text.

**Parameters:**
- `text` (string): Text to animate
- `speed` (number): Milliseconds per character (default: 60)
- `enabled` (boolean): Whether animation is active

**Returns:**
- `string`: Currently displayed text (full text once complete)

## Backend Endpoints

### GET `/api/stream`
Establishes a unified SSE connection to receive both transmissions and visitor count updates.

**Response:** Server-Sent Events stream

**Event Types:**
- `notification` - Transmission messages
- `visitorCount` - Visitor count updates
- `guestbookEntry` - Newly created guestbook entry (real-time update)

**Why Guestbook still does a REST fetch but Visitor Count doesn’t:**
- **Guestbook** is a *paged/history* view (page N, size/limit, sorting). SSE is one-way and great for “a new entry happened”, but it doesn’t replace querying historical pages, so the UI still calls the Guestbook API for the current page and uses SSE to update in real-time.
- **Visitor count** is a single scalar value with no pagination/history needs, and the backend sends the initial value immediately on stream connect, so SSE can fully cover it without a separate fetch.

### POST `/api/transmissions/test`
Sends a test transmission immediately.

**Parameters:**
- `message` (string, required): The message to broadcast

**Example:**
```bash
curl -X POST "http://localhost:8080/api/transmissions/test?message=Test%20message"
```

**Browser Console:**
```javascript
fetch('http://localhost:8080/api/transmissions/test?message=Test message', { method: 'POST' })
```

### POST `/api/transmissions/interval`
Adjusts the transmission interval for testing.

**Parameters:**
- `minMs` (long): Minimum interval in milliseconds
- `maxMs` (long): Maximum interval in milliseconds

**Example (set to 5-10 seconds for testing):**
```javascript
fetch('http://localhost:8080/api/transmissions/interval?minMs=5000&maxMs=10000', { method: 'POST' })
```

## Testing

### Quick Test via Browser Console

1. **Send a test transmission:**
   ```javascript
   fetch('http://localhost:8080/api/transmissions/test?message=Your test message', { method: 'POST' })
   ```

2. **Create a helper function:**
   ```javascript
   window.testTransmission = (message = "Test transmission") => {
     fetch(`http://localhost:8080/api/transmissions/test?message=${encodeURIComponent(message)}`, { method: 'POST' })
       .then(() => console.log('✅ Transmission sent!'))
       .catch(err => console.error('❌ Error:', err));
   };
   ```
   Then call: `testTransmission("Your message")`

3. **Make transmissions appear faster (for testing):**
   ```javascript
   fetch('http://localhost:8080/api/transmissions/interval?minMs=5000&maxMs=10000', { method: 'POST' })
   ```
   This changes the interval from 5-25 minutes to 5-10 seconds.

### Using curl

```bash
# Send test transmission
curl -X POST "http://localhost:8080/api/transmissions/test?message=Test%20message"

# Adjust interval
curl -X POST "http://localhost:8080/api/transmissions/interval?minMs=5000&maxMs=10000"
```

## Configuration

### Frontend
- **API URL**: Configured in `src/config.js`
  - Defaults to `http://localhost:8080` if `REACT_APP_API_URL` is not set
  - Set `REACT_APP_API_URL` environment variable for production
- **Transmission cap**: Set `REACT_APP_TRANSMISSION_MAX_ITEMS` (positive integer)\n  - Defaults to `5` when not set or invalid\n  - Example: `REACT_APP_TRANSMISSION_MAX_ITEMS=10`

### Backend
- **Default Interval**: 5-25 minutes (configurable via `/api/transmissions/interval`)
- **Transmission Messages**: Defined in `RandomTransmissionService.java`

## Console Commands

Once the app is running, you can use these commands in the browser console:

- `toggleTransmission()` - Enable/disable transmissions
- `getTransmissionStatus()` - Check if transmissions are enabled
- `testTransmission("message")` - Send a test transmission (if helper function is set up)

