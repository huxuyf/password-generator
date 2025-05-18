addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>密码生成器</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    :root {
      --primary-color: #0070f3;
      --secondary-color: #00c8ff;
      --accent-color: #7928ca;
      --background-dark: #0f1624;
      --background-light: #171f30;
      --text-color: #e6f1ff;
      --border-color: rgba(255, 255, 255, 0.1);
      --success-color: #00c853;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, var(--background-dark) 0%, var(--background-light) 100%);
      color: var(--text-color);
      line-height: 1.6;
      padding: 20px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow-x: hidden;
    }
    
    body::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, rgba(121, 40, 202, 0.1), transparent 30%),
                 radial-gradient(circle at 85% 30%, rgba(0, 200, 255, 0.1), transparent 30%);
      z-index: -1;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 30px;
      color: var(--text-color);
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
      position: relative;
    }
    
    h1::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      border-radius: 3px;
    }
    
    .container {
      background: rgba(23, 31, 48, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3),
                 0 0 0 1px var(--border-color);
      width: 100%;
      max-width: 600px;
      position: relative;
      overflow: hidden;
    }
    
    .container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    }
    
    .section {
      margin-bottom: 30px;
      padding-bottom: 25px;
      border-bottom: 1px solid var(--border-color);
      position: relative;
    }
    
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    h2 {
      font-size: 1.3rem;
      margin-bottom: 20px;
      color: var(--text-color);
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    
    h2 i {
      margin-right: 10px;
      color: var(--secondary-color);
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--text-color);
      font-size: 0.95rem;
    }
    
    .slider-container {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 12px 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }
    
    input[type="range"] {
      flex: 1;
      height: 5px;
      -webkit-appearance: none;
      background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
      outline: none;
      border-radius: 5px;
    }
    
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 22px;
      height: 22px;
      background: var(--text-color);
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
      border: 2px solid var(--secondary-color);
      transition: all 0.2s ease;
    }
    
    input[type="range"]::-webkit-slider-thumb:hover {
      transform: scale(1.1);
    }
    
    .length-value {
      min-width: 40px;
      text-align: center;
      margin-left: 15px;
      font-weight: bold;
      font-size: 1.1rem;
      color: var(--secondary-color);
      background: rgba(0, 200, 255, 0.1);
      padding: 5px 10px;
      border-radius: 5px;
    }
    
    .checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
    }
    
    .checkbox-item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    
    /* 添加label与checkbox之间的间距 */
    .checkbox-item label {
      margin-left: 8px;
    }
    
    .custom-chars {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
    
    .custom-chars label {
      margin-right: 5px;
    }
    
    .custom-chars input {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: #fff;
      padding: 5px 8px;
      font-size: 14px;
    }
    padding: 8px 12px;
      background: rgba(0, 112, 243, 0.1);
      border-radius: 8px;
      transition: all 0.2s ease;
      min-width: 80px; /* 确保所有复选框项宽度一致 */
      justify-content: flex-start; /* 确保内容左对齐 */
    }
    
    .checkbox-item label {
      margin-bottom: 0; /* 移除底部边距 */
      font-size: 0.9rem; /* 统一字体大小 */
      width: 40px; /* 统一标签宽度 */
      text-align: left; /* 文本左对齐 */
    }
    
    /* 修改特殊字符输入框样式，使其显示在右侧 */
    .char-settings-container {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 15px;
    }
    
    .checkbox-container {
      flex: 1;
      min-width: 250px;
    }
    
    .custom-chars {
      flex: 1;
      min-width: 200px;
      margin-top: 0;
      background: rgba(255, 255, 255, 0.05);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid var(--border-color);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    input[type="text"] {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-color);
      transition: all 0.2s ease;
    }
    
    input[type="text"]:focus {
      outline: none;
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.2);
    }
    
    .password-display {
      position: relative;
      margin-bottom: 20px;
    }
    
    #password {
      width: 100%;
      padding: 15px;
      font-size: 20px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.05);
      text-align: center;
      font-family: 'Courier New', monospace;
      letter-spacing: 2px;
      user-select: all;
      color: var(--text-color);
      box-shadow: 0 0 15px rgba(0, 200, 255, 0.1) inset;
      transition: all 0.3s ease;
    }
    
    #password:focus {
      outline: none;
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 2px rgba(0, 200, 255, 0.2), 0 0 15px rgba(0, 200, 255, 0.1) inset;
    }
    
    .btn-group {
      display: flex;
      gap: 15px;
    }
    
    .btn {
      flex: 1;
      padding: 14px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .btn::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      z-index: -1;
      transition: all 0.3s ease;
    }
    
    .btn:hover::before {
      filter: brightness(1.1);
    }
    
    .btn:active {
      transform: translateY(2px);
    }
    
    .btn i {
      margin-right: 8px;
      font-size: 18px;
    }
    
    #copyBtn::before {
      background: linear-gradient(135deg, #0070f3, #00c8ff);
    }
    
    #generateBtn::before {
      background: linear-gradient(135deg, #7928ca, #ff0080);
    }
    
    .btn {
      color: white;
    }
    
    .toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 200, 83, 0.9);
      color: white;
      padding: 12px 25px;
      border-radius: 50px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: all 0.3s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
      backdrop-filter: blur(10px);
    }
    
    .toast.show {
      opacity: 1;
      transform: translate(-50%, -10px);
    }
    
    .toast i {
      margin-right: 8px;
    }
    
    /* 添加动画效果 */
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(0, 200, 255, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(0, 200, 255, 0); }
      100% { box-shadow: 0 0 0 0 rgba(0, 200, 255, 0); }
    }
    
    .strength-meter {
      height: 5px;
      border-radius: 3px;
      margin-top: 10px;
      background: rgba(255, 255, 255, 0.1);
      overflow: hidden;
      position: relative;
    }
    
    .strength-meter-fill {
      height: 100%;
      width: 0;
      border-radius: 3px;
      transition: all 0.5s ease;
    }
    
    .strength-text {
      font-size: 0.85rem;
      margin-top: 5px;
      text-align: right;
      font-weight: 500;
    }
    
    /* 响应式设计 */
    @media (max-width: 480px) {
      body {
        padding: 15px;
      }
      
      .container {
        padding: 20px;
      }
      
      h1 {
        font-size: 1.8rem;
      }
      
      #password {
        font-size: 16px;
        padding: 12px;
      }
      
      .checkbox-group {
        gap: 10px;
      }
      
      .checkbox-item {
        padding: 6px 10px;
      }
      
      .btn {
        padding: 12px 15px;
      }
    }
  </style>
</head>
<body>
  <h1>密码生成器</h1>
  
  <div class="container">
    <div class="section">
      <h2><i class="fas fa-cog"></i> 设置</h2>
      
      <div class="form-group">
        <label for="length">密码长度:</label>
        <div class="slider-container">
          <input type="range" id="length" min="6" max="32" value="8">
          <span class="length-value" id="lengthValue">8</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>所含字符:</label>
        <div class="char-settings-container">
          <div class="checkbox-container">
            <div class="checkbox-group">
              <div class="checkbox-item">
                <input type="checkbox" id="lowercase" checked>
                <label for="lowercase">a-z</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="uppercase" checked>
                <label for="uppercase">A-Z</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="numbers" checked>
                <label for="numbers">0-9</label>
              </div>
              
              <div class="checkbox-item">
                <input type="checkbox" id="symbols">
                <label for="symbols">!@#$</label>
              </div>
              <div class="checkbox-item">
                <input type="text" id="customSymbols" value="!@#$%^&" style="display: none;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2><i class="fas fa-key"></i> 生成的密码</h2>
      
      <div class="password-display">
        <input type="text" id="password" readonly>
        <div class="strength-meter">
          <div class="strength-meter-fill" id="strengthMeter"></div>
        </div>
        <div class="strength-text" id="strengthText"></div>
      </div>
      
      <div class="btn-group">
        <button class="btn" id="copyBtn">
          <i class="fas fa-copy"></i> 复制
        </button>
        
        <button class="btn" id="generateBtn">
          <i class="fas fa-sync-alt"></i> 更新
        </button>
      </div>
    </div>
  </div>
  
  <div class="toast" id="toast"><i class="fas fa-check-circle"></i> 已复制到剪贴板</div>
  
  <script>
    // DOM 元素
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const customSymbolsInput = document.getElementById('customSymbols');
    const passwordDisplay = document.getElementById('password');
    const copyBtn = document.getElementById('copyBtn');
    const generateBtn = document.getElementById('generateBtn');
    const toast = document.getElementById('toast');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    // 更新密码长度显示
    lengthSlider.addEventListener('input', () => {
      lengthValue.textContent = lengthSlider.value;
      generatePassword(); // 当滑块值变化时自动更新密码
    });
    
    // 显示/隐藏自定义特殊字符输入框
    symbolsCheckbox.addEventListener('change', function() {
      customSymbols.style.display = this.checked ? 'block' : 'none';
      if (this.checked) {
        generatePassword();
      }
    });
    
    // 为其他复选框添加事件监听器
    lowercaseCheckbox.addEventListener('change', generatePassword);
    uppercaseCheckbox.addEventListener('change', generatePassword);
    numbersCheckbox.addEventListener('change', generatePassword);
    
    // 为自定义特殊字符输入框添加事件监听器
    customSymbolsInput.addEventListener('input', () => {
      if (symbolsCheckbox.checked) {
        generatePassword();
      }
    });
    
    // 评估密码强度
    function evaluatePasswordStrength(password) {
      let strength = 0;
      const length = password.length;
      
      // 长度评分
      if (length >= 8) strength += 1;
      if (length >= 12) strength += 1;
      if (length >= 16) strength += 1;
      
      // 复杂性评分
      if (/[a-z]/.test(password)) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
      
      // 计算百分比和文本
      const percentage = Math.min(100, (strength / 7) * 100);
      let text = '';
      let color = '';
      
      if (percentage < 30) {
        text = '弱';
        color = '#ff4d4d';
      } else if (percentage < 60) {
        text = '中等';
        color = '#ffa500';
      } else if (percentage < 80) {
        text = '强';
        color = '#2196f3';
      } else {
        text = '非常强';
        color = '#00c853';
      }
      
      return { percentage, text, color };
    }
    
    // 更新密码强度显示
    function updateStrengthMeter(password) {
      const { percentage, text, color } = evaluatePasswordStrength(password);
      
      strengthMeter.style.width = percentage + '%';
      strengthMeter.style.background = color;
      strengthText.textContent = '强度：' + text;
      strengthText.style.color = color;
    }
    
    // 生成密码
    function generatePassword() {
      const length = +lengthSlider.value;
      const hasLower = lowercaseCheckbox.checked;
      const hasUpper = uppercaseCheckbox.checked;
      const hasNumber = numbersCheckbox.checked;
      const hasSymbol = symbolsCheckbox.checked;
      const customSymbols = customSymbolsInput.value;
      
      // 检查至少选择了一种字符类型
      if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
        alert('请至少选择一种字符类型');
        lowercaseCheckbox.checked = true;
        return;
      }
      
      // 字符集
      let charset = '';
      if (hasLower) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (hasUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (hasNumber) charset += '0123456789';
      if (hasSymbol && customSymbols.trim() !== '') charset += customSymbols;
      
      // 生成密码
      let password = '';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      passwordDisplay.value = password;
      updateStrengthMeter(password);
      
      // 添加脉冲动画效果
      passwordDisplay.style.animation = 'none';
      setTimeout(() => {
        passwordDisplay.style.animation = 'pulse 1.5s';
      }, 10);
    }
    
    // 添加点击密码自动复制功能
    passwordDisplay.addEventListener('click', copyToClipboard);
    
    // 复制密码到剪贴板
    function copyToClipboard() {
      if (!passwordDisplay.value) {
        alert('请先生成密码');
        return;
      }
      
      passwordDisplay.select();
      document.execCommand('copy');
      
      // 显示提示
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
    
    // 事件监听
    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyToClipboard);
    
    // 页面加载时生成一个初始密码
    window.addEventListener('load', generatePassword);
  </script>
</body>
</html>`;