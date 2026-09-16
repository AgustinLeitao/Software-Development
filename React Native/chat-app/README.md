# Chat App

A mobile-first chat application built as a practice project for learning React Native and Expo. The app demonstrates authenticated navigation, reusable chat UI components, typed route-based navigation, local state management, and device image picking.

## Project Highlights

- Email and password sign-in using Clerk.
- Account creation with email verification.
- Protected navigation that shows the chat experience only after authentication.
- Chat list with unread counts, timestamps, avatars, and online status.
- Search across chat names and recent message text.
- Contact picker for starting a new conversation.
- Conversation view with text messages and photo attachments.
- Keyboard-aware message composer with image preview and removal.
- Local message updates, including chat preview reordering after a message is sent.
- Settings screen with Clerk sign-out.
- Responsive support for Android, iOS, and the web through Expo.

## Technology Stack

- React Native 0.86
- Expo SDK 57
- TypeScript with strict mode enabled
- Expo Router for file-based navigation
- Clerk Expo for authentication and session persistence
- React Navigation Drawer and Tabs
- Expo Image Picker for photo attachments
- Expo Secure Store for Clerk token caching
- React Native Web for browser support

## Application Flow

1. The root layout initializes `ClerkProvider` and restores the authentication session.
2. Unauthenticated users are routed to the sign-in and sign-up screens.
3. New users can register with email and password, then verify their email with a Clerk code.
4. Authenticated users enter a drawer-based workspace with three tabs:
   - **Chats:** browse existing conversations and open a chat.
   - **Search:** find chats by contact name or message text.
   - **Settings:** sign out of the current session.
5. From the chat list, users can select a contact to open an existing conversation or create a new local chat.
6. In a conversation, users can send text, select a photo from the device library, preview or remove it, and send it as a message.

## Data and Scope

This is a front-end practice application. Authentication is connected to Clerk, but chat data is intentionally represented by mock data in `src/data` rather than a production backend.

- Messages and chat changes are stored in memory while the app is running.
- Reloading the app restores the original mock data.
- Sent messages update the current conversation and chat-list preview locally.
- Image attachments use a local device URI and are not uploaded to a server.
- The sample avatars are remote Unsplash image URLs.

## Project Structure

```text
src/
  app/                 Expo Router screens and layouts
    (auth)/             Sign-in, sign-up, and email verification
    (drawer)/           Authenticated drawer workspace
      (home)/           Main tab and chat routes
  components/          Reusable chat, contact, and message components
  data/                Mock chats, contacts, and messages
  hooks/               Authentication and chat message state logic
  types/               TypeScript domain models
  utils/               Chat lookup and authentication helpers
assets/                App icons, splash screen, and favicon
android/               Android project files
```

## Prerequisites

- Node.js LTS
- npm
- An Android emulator, iOS Simulator, physical device, or web browser
- A Clerk application with email/password authentication enabled
- Android Studio for Android emulator development
- Xcode for iOS Simulator development on macOS

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Clerk

Create or select an application in the [Clerk Dashboard](https://dashboard.clerk.com/), enable email and password authentication, and copy the publishable key.

Create a local `.env` file in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### 3. Start the Expo development server

```bash
npm start
```

Then choose a target from the Expo CLI, or use one of the platform-specific commands below.

```bash
npm run android
npm run ios
npm run web
```

For a physical device, install Expo Go, make sure the device and development machine are on the same network, and scan the QR code shown by Expo. For Android or iOS, an emulator or simulator must already be available before running the platform command.