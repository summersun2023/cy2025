// 为开始游戏按钮添加点击事件监听器
document.getElementById('start-button').addEventListener('click', startGame);
// 为跳过按钮添加点击事件监听器
document.getElementById('skip-button').addEventListener('click', skipWord);

// 定义计时器变量
let timer;
// 剩余时间初始化为60秒
let timeLeft = 60;
// 分数初始化为0
let score = 0;
// 剩余跳过次数初始化为3
let skipsLeft = 3;
// 定义成语数组
const idioms = [
    '画龙点睛', '百发百中', '四面楚歌', '五光十色', '六神无主', '七上八下', '八面玲珑', '九牛一毛', '十全十美',
    '三心二意', '四通八达', '五湖四海', '六亲不认', '七嘴八舌', '八仙过海', '九死一生', '十万火急',
    '三生三世', '四海为家', '五光十色', '六神无主', '七上八下', '八面玲珑', '九牛一毛', '十全十美',
    '风花雪月', '惊天动地', '无与伦比', '无懈可击', '无可奈何', '无中生有', '无所不在', '无所不能', '无所不知', '无所不晓'
].filter(idiom => !idiom.includes('一') && !idiom.includes('二'));
// 当前成语初始化为空
let currentWord = '';
// 用户拼出的成语初始化为空
let userWord = '';

// 开始游戏函数
function startGame() {
    resetGame();
    timer = setInterval(updateTimer, 1000);
    initPuzzle();
}

// 重置游戏状态函数
function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    userWord = '';
    document.getElementById('time').textContent = timeLeft;
    document.getElementById('points').textContent = score;
    document.getElementById('skip-count').textContent = skipsLeft;
    document.getElementById('puzzle-container').innerHTML = '';
}

// 更新计时器函数
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
    } else {
        clearInterval(timer);
        alert('恭喜您！您的得分是：' + score);
    }
}

// 初始化拼图函数
function initPuzzle() {
    currentWord = idioms[Math.floor(Math.random() * idioms.length)];
    const shuffled = shuffleArray(currentWord.split(''));
    const puzzleContainer = document.getElementById('puzzle-container');
    
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
    if (userWord === currentWord) {
        clearInterval(timer);
        score += 10;
        timeLeft += 5;
        document.getElementById('points').textContent = score;
        document.getElementById('time').textContent = timeLeft;

        setTimeout(() => {
            alert('恭喜！您拼出了正确的成语！');
            nextLevel();
        }, 500);
    }
}

// 进入下一个关卡的函数
function nextLevel() {
    startGame();
}

// 跳过当前成语的函数
function skipWord() {
    if (skipsLeft > 0) {
        skipsLeft--;
        document.getElementById('skip-count').textContent = skipsLeft;
        nextLevel();
    } else {
        alert('跳过次数已用完！');
    }
}

// 这里可以添加更多的拖放逻辑和拼图完成检测 