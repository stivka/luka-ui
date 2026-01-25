# Luka UI

// ... existing code ...
## Technical Features

### Server-Sent Events (SSE) Implementation
The project uses SSE for real-time updates (Visitor Count and Transmissions).

#### How it works:
1. **The Connection**: The browser's `EventSource` API opens a persistent HTTP connection to the backend (`/api/stream`). Unlike standard requests, this stays open using the `text/event-stream` content type.
2. **State Propagation**: 
   - When a user lands on the site, the backend immediately pushes the *current* count from the database.
   - When the `incrementVisitorCount()` logic is triggered (via an API call), the `SseHub` broadcasts the new value to all active connections.
3. **Important Note on DB Changes**: Since the update is "pushed" by the application logic, **manual changes made directly in the database will not appear in the UI automatically**. The backend must execute its broadcast logic to "tell" the browsers that a change occurred. A page refresh or an API trigger is required to sync manual DB edits.
4. **Resilience**: If the connection drops, the browser automatically attempts to reconnect.

## API Documentation
Documentation is provided via Swagger UI.

- **URL**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
// ... existing code ...
