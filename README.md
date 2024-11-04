# New App

New App is a web application that allows users to create, view, and save jokes. It includes accessibility features to support blind users.

## User Journeys

1. **Sign In with ZAPT**
   - The user opens the app and is prompted to sign in.
   - The user clicks on "Sign in with ZAPT" and is redirected to the authentication page.
   - The user signs in using email, Google, Facebook, or Apple.
   - Upon successful authentication, the user is redirected to the home page.

2. **Add New Joke**
   - On the home page, the user can add a new joke.
   - The user fills in the "Setup" and "Punchline" fields.
   - The user saves the joke by clicking the "Save Joke" button.
   - The joke is saved and added to the user's joke list.

3. **Generate Joke**
   - The user can generate a new joke by clicking the "Generate Joke" button.
   - The app requests a new joke from the backend.
   - The generated joke is displayed in the "Setup" and "Punchline" fields.
   - The user can save the generated joke.

4. **View Jokes**
   - The user can view a list of their saved jokes.
   - Each joke displays the setup and punchline.

5. **Accessibility Features for Blind Users**
   - The app is fully accessible to blind users.
   - All interactive elements have ARIA labels and roles.
   - Keyboard navigation is supported throughout the app.
   - Screen reader users can navigate and interact with the app effectively.
   - Images include descriptive alt text.
   - The app uses semantic HTML elements for better accessibility.

6. **Generate Image**
   - The user can generate an image related to jokes by clicking the "Generate Image" button.
   - The generated image is displayed with appropriate alt text.

7. **Text to Speech**
   - The user can listen to a joke by clicking the "Text to Speech" button.
   - The app converts the joke text into speech and provides audio playback.

8. **Generate Markdown Story**
   - The user can generate a markdown-formatted funny story by clicking the "Generate Markdown" button.
   - The generated story is displayed in a markdown viewer.

9. **Sign Out**
   - The user can sign out by clicking the "Sign Out" button.
   - The user is redirected to the login page.

## External APIs Used

- **ZAPT AI**: Used for authentication and event handling such as generating jokes, images, text-to-speech, and markdown stories.
- **Sentry**: Used for error logging on both frontend and backend.