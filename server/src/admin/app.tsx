import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['zh'],
  },
  
  bootstrap(app: StrapiApp) {
    console.log(app);
    
    // 使用 MutationObserver 監聽 DOM 變化
    const observer = new MutationObserver(() => {
      const isLoginPage = window.location.pathname.includes("/auth/login");

      if (!isLoginPage) return;

      const main = document.querySelector('#main-content');
      if (main) {
        const form = main.querySelector('form');

        if (form && !form.querySelector('.azure-ad-login-btn')) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'azure-ad-login-btn';
          btn.innerHTML = `
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" style="margin-right: 8px;">
              <rect width="10" height="10" fill="#f25022"/>
              <rect x="11" width="10" height="10" fill="#00a4ef"/>
              <rect y="11" width="10" height="10" fill="#7fba00"/>
              <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
            </svg>
            使用 Microsoft 帳戶登入
          `;
          btn.style.cssText = `
            margin-top: 15px;
            width: 100%;
            padding: 12px 0;
            background-color: #0078d4;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: background-color 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          `;
          btn.onmouseover = () => btn.style.backgroundColor = '#006cbd';
          btn.onmouseout = () => btn.style.backgroundColor = '#0078d4';
          btn.onclick = () => {
            window.location.assign('/strapi-plugin-sso/azuread');
          };

          // 在表單末尾加上分隔線和說明文字
          const separator = document.createElement('div');
          separator.style.cssText = `
            margin: 15px 0;
            border-top: 1px solid #dcdce4;
          `;
          
          const hint = document.createElement('p');
          hint.style.cssText = `
            font-size: 12px;
            color: #8e8ea9;
            text-align: center;
            margin-top: 8px;
            margin-bottom: 0;
          `;
          hint.innerText = '或使用上方的帳號密碼登入';

          form.appendChild(separator);
          form.appendChild(btn);
          form.appendChild(hint);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  },
};