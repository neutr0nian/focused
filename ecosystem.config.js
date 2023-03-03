const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST
  ? process.env.TARGET_SERVER_HOST.trim()
  : "";
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER
  ? process.env.TARGET_SERVER_USER.trim()
  : "";
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/focused`;
const REPO = "git@gitlab.com:chavanpratik.pc/focused.git";

module.exports = {
  apps: [
    {
      name: "focused",
      script: "npm run start:stage",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
  deploy: {
    stage: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: "main",
      repo: REPO,
      ssh_options: "StrictHostKeyChecking=no",
      path: TARGET_SERVER_APP_PATH,
      "post-deploy":
        "git pull && cd client && npm run build && cd ../server && pm2 startOrGracefulReload ecosystem.config.js --env production && pm2 save",
    },
  },
};
