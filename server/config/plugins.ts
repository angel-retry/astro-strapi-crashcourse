module.exports = ({ env }) => ({
  'strapi-plugin-sso': {
    enabled: true,
    config: {
      // 這裡使用 'MISSING' 作為預設值。
      // 如果啟動後看到 "MISSING" 錯誤，代表變數確實沒讀到。
      AZUREAD_OAUTH_CLIENT_ID: env('AZUREAD_OAUTH_CLIENT_ID', 'MISSING_CLIENT_ID'),
      AZUREAD_OAUTH_CLIENT_SECRET: env('AZUREAD_OAUTH_CLIENT_SECRET', 'MISSING_SECRET'),
      AZUREAD_TENANT_ID: env('AZUREAD_TENANT_ID', 'MISSING_TENANT'),
      AZUREAD_OAUTH_REDIRECT_URI: env('AZUREAD_OAUTH_REDIRECT_URI'),
    },
  },
});