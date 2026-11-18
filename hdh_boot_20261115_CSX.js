    (function () {
      var boot = document.getElementById('hdh-boot');
      var stage = document.getElementById('hdh-boot-stage');
      var errBox = document.getElementById('hdh-boot-err');
      function showErr(text) {
        errBox.innerHTML = '';
        var d = document.createElement('div'); d.className = 'hdh-note hdh-note--err'; d.setAttribute('role', 'alert');
        var p = document.createElement('p'); p.textContent = text; d.appendChild(p); errBox.appendChild(d);
      }
      var supported = (typeof WebAssembly === 'object') && ('serviceWorker' in navigator) && window.isSecureContext;
      if (!supported) {
        stage.textContent = '無法開始';
        showErr('您的瀏覽器版本較舊，無法執行本工具。請改用最新版的 Chrome、Edge、Firefox 或 Safari。');
        window.__hdhBoot = { state: 'E20' };
        return;
      }
      var t0 = Date.now();
      window.__hdhBoot = { state: 'loading' };
      var timer = setInterval(function () {
        var fr = document.querySelector('#root iframe');
        if (fr) {
          stage.textContent = '正在載入 meta 套件';
          try {
            var doc = fr.contentDocument;
            var fv = doc && doc.getElementById('foot_versions');
            if (fv && /meta/.test(fv.textContent)) {
              stage.textContent = '準備完成';
              clearInterval(timer);
              window.__hdhBoot = { state: 'ready', ms: Date.now() - t0 };
              setTimeout(function () { boot.hidden = true; }, 400);
              return;
            }
          } catch (e) { /* 尚未可讀 */ }
        }
        if (Date.now() - t0 > 600 * 1000 && window.__hdhBoot.state !== 'E18') {
          window.__hdhBoot = { state: 'E18' };
          showErr('分析引擎沒有載入成功。請確認網路連線後重新整理頁面。若在醫院或學校網路內，可能是防火牆擋住了本工具的網址，請改用其他網路。');
        }
      }, 500);
    })();
