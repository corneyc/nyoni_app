export default {
  expo: {
    name: "nyoni_app",
    slug: "nyoni_app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    platforms: ["ios", "android", "web"],
    web: {
      favicon: "./assets/favicon.png"
    },
    jsEngine: "hermes",
    extra: {
      firebaseApiKey: "YOUR_FIREBASE_API_KEY",
      firebaseAuthDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
      firebaseProjectId: "YOUR_FIREBASE_PROJECT_ID",
      firebaseStorageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
      firebaseMessagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
      firebaseAppId: "YOUR_FIREBASE_APP_ID"
    }
  }
};