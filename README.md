## 界面
!["界面截图"](./Screenshot.jpg)

## 功能说明
这个密码生成器应用具有以下功能：

### 设置区
1. 密码长度 ：通过滑杆调整，默认为8位，最短6位，最长32位
2. 所含字符 ：
   - **默认**选中小写字母、大写字母、数字
   - 特殊字符**可选**，默认特殊字符为：`!@#$%^&`
   - 可自定义特殊字符
 
### 密码区
1. 显示生成的密码
2. 复制按钮 ：点击复制密码到剪贴板
3. 更新按钮 ：点击生成新密码

### 配置文件
文件名：`wrangler.toml`
```toml
name = "password-generator"
main= "worker.js"
account_id = "<Cloudflare 账号ID>"
workers_dev = true
compatibility_date = "2025-05-07"
```