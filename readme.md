# 成语拼图游戏

## 项目简介
成语拼图游戏是一款有趣的益智游戏，玩家需要在规定时间内通过拖放字块拼出正确的成语。游戏不仅考验玩家的反应能力，还能帮助玩家学习成语。

## 游戏玩法
1. **开始游戏**：点击“开始游戏”按钮，游戏将开始并进入拼图阶段。
2. **游戏目标**：在60秒内拼出正确的成语。每拼出一个成语，玩家将获得额外的时间和分数。
3. **操作方式**：
   - 使用鼠标拖动字块到正确的位置。
   - 也可以通过触摸屏幕进行拖动（适用于移动设备）。
4. **得分系统**：
   - 每拼出一个正确的成语，玩家将获得10分。
   - 每拼出一个成语，剩余时间将增加5秒。
5. **跳过功能**：每局游戏玩家有3次跳过机会，可以选择跳过当前成语，进入下一个成语。
6. **游戏结束**：当时间到达0秒时，游戏结束，系统将弹出玩家的得分。

## 安装与运行
1. 克隆项目到本地：
   ```bash
   git clone https://github.com/summersun2023/cy2025.git
   ```
2. 进入项目目录：
   ```bash
   cd yourproject
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 启动游戏：
   ```bash
   npm start
   ```
## 其他安装方式

### 方式一：直接下载
1. 访问项目主页: https://github.com/summersun2023/cy2025
2. 点击 "Code" 按钮,选择 "Download ZIP"
3. 解压下载的文件到本地目录
4. 使用浏览器打开 index.html 文件即可开始游戏

### 方式二：使用 HTTP 服务器
1. 安装 Python (如果尚未安装)
2. 在项目目录下打开终端,运行:
   ```bash
   # Python 2
   python -m SimpleHTTPServer 8000
   # Python 3 
   python -m http.server 8000
   ```
3. 打开浏览器访问 http://localhost:8000

### 方式三：使用 VS Code Live Server
1. 在 VS Code 中安装 Live Server 扩展
2. 右键点击 index.html 文件
3. 选择 "Open with Live Server"
4. 浏览器将自动打开游戏页面

## 贡献
欢迎任何形式的贡献！如果您发现了bug或有新功能建议，请通过以下方式参与：

1. 提交 Issues
   - 描述问题或建议
   - 提供复现步骤(如果是bug)
   - 附上相关截图或代码片段

2. 提交 Pull Request
   - Fork 本仓库
   - 创建您的特性分支 (git checkout -b feature/AmazingFeature)
   - 提交您的更改 (git commit -m 'Add some AmazingFeature')
   - 推送到分支 (git push origin feature/AmazingFeature)
   - 打开一个 Pull Request

我们会认真审查每一个贡献请求。感谢您帮助改进这个项目！

## 许可证
本项目采用 MIT 许可证，详情请查看 LICENSE 文件。