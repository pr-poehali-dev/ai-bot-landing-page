import { useEffect } from 'react';

export default function SuvvyChat() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,o,f,js,fjs){
        w['SuvvyWidget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
        js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
        js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
      }(window, document, 'script', 'suvvy', 'https://app.suvvy.ai/widget.js'));
      suvvy('init', { token: 'cc-709dd41583548ddfa01550252bdfd452e4ca0b4182b60c3d341411e59ac58ea3' });
    `;
    document.body.appendChild(script);

    return () => {
      const suvvyScript = document.getElementById('suvvy');
      if (suvvyScript) {
        suvvyScript.remove();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}