/**
 * Cấu hình legacy cho Sanity Studio
 * File này giữ lại cấu hình gốc không có hỗ trợ upload file lớn
 */

import { defineConfig } from 'sanity';
import { defaultConfig } from './sanity.config';

// Tạo một bản sao của cấu hình mặc định
const legacyConfig = {
  ...defaultConfig,
  
  // Ghi đè cấu hình form để sử dụng cấu hình mặc định
  form: {
    // Sử dụng cấu hình mặc định cho image và file
  },
};

export default defineConfig(legacyConfig);
