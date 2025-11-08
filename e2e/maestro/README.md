# Maestro E2E tests (scaffold)

This folder contains Maestro E2E tests for this Expo app.

What I added

- `e2e/maestro/tests/smoke_test.yaml` — a template Maestro test.
- `e2e/maestro/tests/auth_test.yaml` — a focused auth-screen test that asserts UI elements and optionally taps the Google Sign-in button.

Stable accessibility identifiers added

- `auth-title` — the auth screen title (CardTitle)
- `auth-description` — the auth screen description (CardDescription)
- `auth-google-signin` — the Google Sign-in button (GoogleSigninButton)

How to run

1. Install Maestro CLI: https://github.com/wix/maestro
2. Build or run a compatible app on a device/emulator.
3. Example runs (PowerShell):

   maestro test --serial <DEVICE_SERIAL> e2e/maestro/tests/auth_test.yaml

Notes

- The `auth_google_signin` button triggers Google Sign-in which may open external UIs. The `auth_test.yaml` keeps the tap action commented by default to avoid triggering external flows during quick smoke tests.
- Add more `accessibilityLabel` or `testID` props to other UI elements for more robust tests.
