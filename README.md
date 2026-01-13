# Task Explorer

React Native Assessment App that fetches and manages tasks.

## Setup Instructions

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run on Android:**
    ```bash
    npm run android
    ```
    Or manually:
    ```bash
    npx react-native run-android
    ```

## Approach & Features

-   **Architecture:** The app follows a simple folder structure under `src/`:
    -   `screens/`: Contains `HomeScreen` and `DetailScreen`.
    -   `api/`: Handles API calls to JSONPlaceholder.
    -   `utils/`: Contains `storage.ts` for AsyncStorage logic.
    -   `navigation/`: configured StackNavigator.
    -   `components/`: (Inline components used for simplicity, but cleaner to separate).

-   **State Management:** built-in React Hooks (`useState`, `useEffect`) are used. 

-   **Persistence (Bonus):** `AsyncStorage` is used to persist tasks locally. Tasks are loaded from storage first (if available) to support offline access and allow local status updates to persist across reloads.

-   **Filtering:** A simple filter toggle allows viewing "All", "Completed", or "Incomplete" tasks.

-   **UI/UX:**
    -   Clean, card-based layout.
    -   Visual indicators for task status (Green/Red colors).
    -   Loading spinners and Error/Retry states.
    -   Animated-like touchable feedbacks.

## Dependencies

-   `react-native`
-   `@react-navigation/native` & `@react-navigation/stack`
-   `@react-native-async-storage/async-storage`
