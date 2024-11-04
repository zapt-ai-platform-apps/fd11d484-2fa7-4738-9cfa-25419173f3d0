# تحويل

تحويل is a web application that allows users to convert values between different units of measurement. The app provides a simple and intuitive interface for converting units such as length, weight, temperature, and more.

## Features

1. **Unit Conversion**

   - Users can select a category (e.g., Length, Weight, Temperature).
   - Input the value they wish to convert.
   - Choose the units to convert from and to.
   - Click the "Convert" button to see the result.

## User Journey

1. **Converting Units**

   - **Step 1**: Open the app to access the conversion tool.
   - **Step 2**: Select a conversion category from the dropdown (e.g., Length).
   - **Step 3**: Enter the value you wish to convert.
   - **Step 4**: Choose the units to convert from and to within the selected category.
   - **Step 5**: Click the "Convert" button.
   - **Step 6**: View the converted value displayed below the button.

## Environment Variables

The following environment variables need to be set:

- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error logging.
- `VITE_PUBLIC_APP_ENV`: The current app environment (e.g., 'development', 'production').
- `VITE_PUBLIC_APP_ID`: Your application ID used for PWA setup.

## External Services Used

- **Sentry**: Used for error logging on the frontend.
- **Progressier**: Used for adding Progressive Web App (PWA) support to enable app-like features.
