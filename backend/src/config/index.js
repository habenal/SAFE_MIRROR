const path = require('path');

module.exports = {
  STORAGE_DIR: path.join(__dirname, '..', '..', 'storage'),
  UPLOADS_DIR: path.join(__dirname, '..', '..', 'uploads'),
  MASTER_KEY: process.env.MASTER_KEY || 'change_this_master_key_to_env_secret_very_secret',
  RETENTION_HOURS: Number(process.env.RETENTION_HOURS || 24)
};
