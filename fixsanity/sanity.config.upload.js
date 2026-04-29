/**
 * Cấu hình upload cho Sanity Studio
 * File này mở rộng cấu hình mặc định để cho phép upload file lớn hơn
 */

import { defineConfig } from 'sanity';
import { defaultConfig } from './sanity.config';

export default defineConfig({
  ...defaultConfig,
  
  // Cấu hình upload
  form: {
    file: {
      // Tăng kích thước tối đa lên 100MB (giá trị tính bằng byte)
      assetSources: (previousAssetSources) => {
        return previousAssetSources.map(assetSource => {
          if (assetSource.name === 'sanity-default') {
            return {
              ...assetSource,
              options: {
                ...assetSource.options,
                // 100MB = 100 * 1024 * 1024 bytes
                maxFileSize: 100 * 1024 * 1024,
              },
            };
          }
          return assetSource;
        });
      },
    },
    // Giữ lại các cấu hình form khác
    ...defaultConfig.form,
  },
});
