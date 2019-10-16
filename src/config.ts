const exitWithError = (msg: string) => {
  console.error(`${msg} environment variable not set. Exiting.`);
  process.exit(1);
};

export const PORT = process.env.PORT || 3000;

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipebook";

if (!process.env.ADMIN_PASSWORD) {
  exitWithError("ADMIN_PASSWORD");
}
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
