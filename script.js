// 在文件开头添加 DOMContentLoaded 事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 已有的按钮事件监听
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('skip-button').addEventListener('click', skipWord);
    document.getElementById('hint-button').addEventListener('click', showHint);
});

// 初始状态隐藏跳过和提示按钮
document.getElementById('skip-button').style.display = 'none';
document.getElementById('hint-button').style.display = 'none';

// 为开始游戏按钮添加点击事件监听器
document.getElementById('start-button').addEventListener('click', startGame);
// 为跳过按钮添加点击事件监听器
document.getElementById('skip-button').addEventListener('click', skipWord);
// 为提示按钮添加点击事件监听器
document.getElementById('hint-button').addEventListener('click', showHint);

// 定义计时器变量
let timer;
// 剩余时间初始化为60秒
let timeLeft = 60;
// 分数初始化为0
let score = 0;
// 剩余跳过次数初始化为3
let skipsLeft = 3;
// 定义提示次数变量
let hintsLeft = 5;
// 定义成语数组
const idioms = [
    '画龙点睛', '百发百中', '四面楚歌', '五光十色', '六神无主', '七上八下', '八面玲珑', '九牛一毛', '十全十美',
    '三心二意', '四通八达', '五湖四海', '六亲不认', '七嘴八舌', '八仙过海', '九死一生', '十万火急',
    '三生三世', '四海为家', '五光十色', '六神无主', '七上八下', '八面玲珑', '九牛一毛', '十全十美',
    '风花雪月', '惊天动地', '无与伦比', '无懈可击', '无可奈何', '无中生有', '无所不在', '无所不能', '无所不知', '无所不晓',
    '万紫千红', '千变万化', '千方百计', '千奇百怪', '千姿百态', '千钧万发', '千军万马', '千言万语', '千真万确',
    '天长地久', '天经地义', '天罗地网', '天衣无缝', '天翻地覆', '天荒地老', '天诛地灭', '天崩地裂', '天下太平',
    '百花齐放', '百家争鸣', '百折不挠', '百战百胜', '百依百顺', '百思不解', '百闻不如一见', '百里挑一', '百发百中', '百年好合',
    '千山万水', '千辛万苦', '千言万语', '千真万确', '千钧一发', '千军万马', '千变万化', '千方百计', '千奇百怪', '千姿百态',
    '万紫千红', '万事如意', '万无一失', '万众一心', '万里无云', '万里长城', '万古长青', '万水千山', '万象更新', '万家灯火',
    '天高地厚', '天涯海角', '天翻地覆', '天长地久', '天经地义', '天罗地网', '天衣无缝', '天荒地老', '天崩地裂', '天下无双',
    '地久天长', '地动山摇', '地广人稀', '地大物博', '地灵人杰', '地覆天翻', '地老天荒', '地动山摇', '地动天摇', '地动山摇',
    
    // 新增50组有难度的成语
    '锲而不舍', '披荆斩棘', '举一反三', '融会贯通', '推陈出新', '循序渐进', '精益求精', '集思广益', '博采众长', '深谋远虑',
    '运筹帷幄', '胸有成竹', '游刃有余', '驾轻就熟', '得心应手', '举重若轻', '迎刃而解', '势如破竹', '一气呵成', '水到渠成',
    '望尘莫及', '望其项背', '相形见绌', '望洋兴叹', '叹为观止', '赞叹不已', '拍案叫绝', '击节赞叹', '钦佩不已', '敬佩不已',
    '独具匠心', '别出心裁', '别具一格', '独树一帜', '标新立异', '推陈出新', '独辟蹊径', '匠心独运', '巧夺天工', '精雕细琢',
    '学富五车', '博古通今', '才高八斗', '博大精深', '学贯中西', '见多识广', '知识渊博', '学识渊博', '才华横溢', '出类拔萃',
    '气贯长虹', '气势磅礴', '气势恢宏', '气吞山河', '气壮山河', '气冲霄汉', '气势如虹', '气势如山', '气势凌人', '气势汹汹'
].filter(idiom => !idiom.includes('一') && !idiom.includes('二'));

// 已使用的成语集合
let usedIdioms = new Set();

// 当前成语初始化为空
let currentWord = '';
// 用户拼出的成语初始化为空
let userWord = '';

// 开始游戏函数
function startGame() {
    // 显示游戏控制元素
    document.getElementById('game-container').classList.add('game-started');
    
    // 隐藏开始按钮
    document.getElementById('start-button').style.display = 'none';
    
    // 重置并显示跳过和提示按钮
    const skipButton = document.getElementById('skip-button');
    const hintButton = document.getElementById('hint-button');
    
    if (skipButton) {
        skipButton.disabled = false;
        skipButton.style.removeProperty('background-color');
        skipButton.style.cursor = 'pointer';
        skipButton.style.display = 'flex';
        skipButton.classList.remove('disabled');
    }
    
    if (hintButton) {
        hintButton.disabled = false;
        hintButton.style.removeProperty('background-color');
        hintButton.style.cursor = 'pointer';
        hintButton.style.display = 'flex';
        hintButton.classList.remove('disabled');
    }
    
    // 只在游戏首次开始时初始化时间
    if (!timer) {
        timeLeft = 60;
        document.getElementById('time').textContent = timeLeft;
    }
    
    // 初始化进度条
    const progressBar = document.getElementById('time-progress');
    progressBar.style.width = '100%';
    progressBar.parentElement.classList.remove('time-warning');
    
    // 启动计时器
    timer = setInterval(updateTimer, 1000);
    initPuzzle();
}

// 重置游戏状态函数
function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    score = 0;
    skipsLeft = 3;
    hintsLeft = 5;
    userWord = '';
    usedIdioms.clear(); // 清空已使用的成语
    
    // 重置显示
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('points').textContent = score;
    document.getElementById('skip-count').textContent = skipsLeft;
    document.getElementById('hint-count').textContent = hintsLeft;
    document.getElementById('puzzle-container').innerHTML = '';
    
    // 重置进度条
    const progressBar = document.getElementById('time-progress');
    if (progressBar) {
        progressBar.style.width = '100%';
        progressBar.parentElement.classList.remove('time-warning');
    }
    
    // 完整重置跳过按钮状态
    const skipButton = document.getElementById('skip-button');
    if (skipButton) {
        // 移除所有可能的内联样式
        skipButton.removeAttribute('style');
        // 重置所有CSS属性
        skipButton.style.cssText = '';
        // 设置基本显示属性
        skipButton.style.display = 'none';
        // 移除禁用状态
        skipButton.disabled = false;
        // 移除所有可能的类
        skipButton.className = '';
        // 重置背景色和光标样式
        skipButton.style.backgroundColor = '';
        skipButton.style.cursor = 'pointer';
    }
    
    // 完整重置提示按钮状态
    const hintButton = document.getElementById('hint-button');
    if (hintButton) {
        // 移除所有可能的内联样式
        hintButton.removeAttribute('style');
        // 重置所有CSS属性
        hintButton.style.cssText = '';
        // 设置基本显示属性
        hintButton.style.display = 'none';
        // 移除禁用状态
        hintButton.disabled = false;
        // 移除所有可能的类
        hintButton.className = '';
        // 重置背景色和光标样式
        hintButton.style.backgroundColor = '';
        hintButton.style.cursor = 'pointer';
    }
    
    // 隐藏游戏控制元素
    document.getElementById('game-container').classList.remove('game-started');
    
    // 显示开始按钮
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.removeAttribute('style');
        startButton.style.display = 'block';
    }
}

// 更新计时器函数
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        
        // 更新进度条
        const progressBar = document.getElementById('time-progress');
        const progressPercentage = (timeLeft / 60) * 100;
        progressBar.style.width = progressPercentage + '%';
        
        // 当时间少于10秒时添加警告样式
        if (timeLeft <= 10) {
            progressBar.parentElement.classList.add('time-warning');
        } else {
            progressBar.parentElement.classList.remove('time-warning');
        }
    } else {
        // 停止计时器
        if (timer) {
            clearInterval(timer);
            timer = null;
        }

        // 保存当前分数
        const finalScore = score;
        
        // 先显示提示框，等待用户确认
        if (finalScore === 0) {
            alert('继续努力，再玩一次吧！');
            // 重置游戏状态
            resetGame();
            // 0分时自动开始新游戏
            const startButton = document.getElementById('start-button');
            if (startButton) {
                startButton.click();
            }
        } else {
            alert('恭喜您！您的得分是' + finalScore);
            // 重置游戏状态
            resetGame();
            // 有分数时显示开始按钮
            const startButton = document.getElementById('start-button');
            if (startButton) {
                startButton.style.display = 'block';
            }
        }
    }
}

// 获取未使用的随机成语
function getRandomUnusedIdiom() {
    const availableIdioms = idioms.filter(idiom => !usedIdioms.has(idiom));
    if (availableIdioms.length === 0) {
        usedIdioms.clear(); // 如果所有成语都用过了，清空已使用集合
        return idioms[Math.floor(Math.random() * idioms.length)];
    }
    const randomIdiom = availableIdioms[Math.floor(Math.random() * availableIdioms.length)];
    usedIdioms.add(randomIdiom);
    return randomIdiom;
}

// 初始化拼图函数
function initPuzzle() {
    currentWord = getRandomUnusedIdiom();
    let shuffled;
    do {
        shuffled = shuffleArray(currentWord.split(''));
    } while (shuffled.join('') === currentWord);

    // 删除拼音显示相关代码
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';

    shuffled.forEach(letter => {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.className = 'letter';
        letterElement.draggable = true;
        letterElement.addEventListener('dragstart', dragStart);
        letterElement.addEventListener('dragover', dragOver);
        letterElement.addEventListener('drop', drop);
        letterElement.addEventListener('touchstart', touchStart);
        letterElement.addEventListener('touchmove', touchMove);
        letterElement.addEventListener('touchend', touchEnd);
        puzzleContainer.appendChild(letterElement);
    });
}

// 打乱数组顺序的函数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let draggedElement = null;
let touchStartX = 0;
let touchStartY = 0;

// 拖动开始事件处理函数
function dragStart(event) {
    draggedElement = event.target;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', null); // 解决某些浏览器的拖动问题
}

// 拖动经过事件处理函数
function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

// 放下事件处理函数
function drop(event) {
    event.preventDefault();
    if (draggedElement && draggedElement !== event.target) {
        swapElements(draggedElement, event.target);
    }
    checkWord();
}

// 触摸开始事件处理函数
function touchStart(event) {
    draggedElement = event.target;
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
}

// 触摸移动事件处理函数
function touchMove(event) {
    event.preventDefault();
    const touch = event.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (target && target !== draggedElement && target.classList.contains('letter')) {
        swapElements(draggedElement, target);
        draggedElement = target;
    }
}

// 触摸结束事件处理函数
function touchEnd(event) {
    checkWord();
}

// 交换两个元素内容的函数
function swapElements(el1, el2) {
    const temp = el1.textContent;
    el1.textContent = el2.textContent;
    el2.textContent = temp;
}

// 检查拼出的成语是否正确的函数
function checkWord() {
    userWord = Array.from(document.querySelectorAll('.letter')).map(el => el.textContent).join('');
    const letterElements = document.querySelectorAll('.letter');

    // 先重置所有字母的颜色
    letterElements.forEach(el => {
        el.style.backgroundColor = '#e0e0e0'; // 恢复原来的颜色
    });

    if (userWord === currentWord) {
        // 暂停计时器
        clearInterval(timer);
        // 增加分数
        score += 10;
        // 增加时间，但不超过60秒
        timeLeft = Math.min(timeLeft + 5, 60);
        // 更新显示
        document.getElementById('points').textContent = score;
        document.getElementById('time').textContent = timeLeft;

        // 设置所有字母为绿色
        letterElements.forEach(el => {
            el.style.backgroundColor = 'green';
        });

        // 两秒后进入下一个关卡
        setTimeout(() => {
            nextLevel(); // 直接进入下一个关卡
        }, 2000);
    }
}

// 进入下一个关卡的函数
function nextLevel() {
    // 重新启动计时器
    timer = setInterval(updateTimer, 1000);
    // 只初始化新的拼图，不重置时间
    initPuzzle();
}

// 跳过当前成语的函数
function skipWord() {
    if (skipsLeft > 0) {
        skipsLeft--;
        document.getElementById('skip-count').textContent = skipsLeft;
        // 当跳过次数用完时禁用按钮
        if (skipsLeft === 0) {
            const skipButton = document.getElementById('skip-button');
            skipButton.disabled = true;
            // 移除所有样式并设置禁用状态样式
            skipButton.removeAttribute('style');
            skipButton.style.cssText = `
                background-color: #ccc !important;
                cursor: not-allowed !important;
                opacity: 0.5;
                pointer-events: none;
            `;
        }
        initPuzzle(); // 直接初始化新的拼图，不增加时间
    }
}

// 添加提示功能
function showHint() {
    if (hintsLeft > 0) {
        hintsLeft--;
        document.getElementById('hint-count').textContent = hintsLeft;
        
        const letterElements = document.querySelectorAll('.letter');
        const currentLetters = currentWord.split('');
        const userLetters = Array.from(letterElements).map(el => el.textContent);

        // 显示错误和正确位置
        userLetters.forEach((letter, index) => {
            if (letter !== currentLetters[index]) {
                letterElements[index].style.backgroundColor = 'red';
            } else {
                letterElements[index].style.backgroundColor = 'green';
            }
        });

        // 当提示次数用完时禁用按钮
        if (hintsLeft === 0) {
            const hintButton = document.getElementById('hint-button');
            hintButton.disabled = true;
            // 移除所有样式并设置禁用状态样式
            hintButton.removeAttribute('style');
            hintButton.style.cssText = `
                background-color: #ccc !important;
                cursor: not-allowed !important;
                opacity: 0.5;
                pointer-events: none;
            `;
        }

        // 2秒后恢复原色
        setTimeout(() => {
            letterElements.forEach(el => {
                el.style.backgroundColor = '#e0e0e0';
            });
        }, 2000);
    }
}

// 这里可以添加更多的拖放逻辑和拼图完成检测 