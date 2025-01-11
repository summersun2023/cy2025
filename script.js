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
    '风花雪月', '惊天动地', '无与伦比', '无懈可击', '无可奈何', '无中生有', '无所不在', '无所不能', '无所不知', '无所不晓',
    '万紫千红', '千变万化', '千方百计', '千奇百怪', '千姿百态', '千钧万发', '千军万马', '千言万语', '千真万确',
    '天长地久', '天经地义', '天罗地网', '天衣无缝', '天翻地覆', '天荒地老', '天诛地灭', '天崩地裂', '天下太平',
    '风驰电掣', '风起云涌', '风卷残云', '风和日丽', '风调雨顺', '风雨同舟', '风雨无阻', '风云变幻', '风云人物',
    '水深火热', '水落石出', '水到渠成', '水乳交融', '水涨船高', '水平如镜', '水天相接', '水木清华', '水火不容',
    '龙飞凤舞', '龙腾虎跃', '龙争虎斗', '龙马精神', '龙凤呈祥', '龙吟虎啸', '龙骧虎步', '龙潭虎穴', '龙跃凤鸣',
    '虎背熊腰', '虎视眈眈', '虎口余生', '虎头蛇尾', '虎啸风生', '虎踞龙盘', '虎虎生风', '虎落平阳', '虎山行',
    '鸟语花香', '鸟飞兽散', '鸟尽弓藏', '鸟惊鱼跃', '鸟瞰图', '鸟入林', '鸟栖虫响', '鸟兽散', '鸟语莺声',
    '花好月圆', '花团锦簇', '花枝招展', '花容月貌', '花红柳绿', '花香鸟语', '花样年华', '花开富贵', '花前月下',
    '云开见日', '云蒸霞蔚', '云淡风轻', '云集响应', '云消雾散', '云起龙骧', '云中白鹤', '云雨巫山', '云程发轫',
    '雨过天晴', '雨打风吹', '雨后春笋', '雨顺风调', '雨霖铃', '雨丝风片', '雨打梨花', '雨魄云魂', '雨中漫步',
    '山明水秀', '山清水秀', '山高水长', '山河壮丽', '山光水色', '山水相连', '山河日月', '山川秀美', '山河锦绣',
    '海阔天空', '海枯石烂', '海市蜃楼', '海纳百川', '海誓山盟', '海角天涯', '海晏河清', '海不扬波', '海底捞月',
    '春暖花开', '春光明媚', '春意盎然', '春风化雨', '春华秋实', '春色满园', '春回大地', '春深似海', '春意阑珊',
    '夏日炎炎', '夏雨雨人', '夏虫语冰', '夏荷盛开', '夏日可畏', '夏云峰', '夏日芳草', '夏雨初晴', '夏夜星空',
    '秋高气爽', '秋水伊人', '秋月春风', '秋色宜人', '秋毫无犯', '秋风落叶', '秋收冬藏', '秋水长天', '秋意浓',
    '冬去春来', '冬暖夏凉', '冬日暖阳', '冬雪初晴', '冬藏春发', '冬寒抱冰', '冬日可爱', '冬夜读书', '冬梅傲雪',
    '金玉满堂', '金枝玉叶', '金石为开', '金戈铁马', '金风玉露', '金榜题名', '金蝉脱壳', '金屋藏娇', '金玉良言',
    '玉树临风', '玉兰飘香', '玉洁冰清', '玉液琼浆', '玉润珠圆', '玉石俱焚', '玉堂金马', '玉女散花', '玉壶买春',
    '琴棋书画', '琴瑟和鸣', '琴心剑胆', '琴韵悠扬', '琴声悠扬', '琴歌酒赋', '琴声缭绕', '琴弦断', '琴音绕梁',
    '诗情画意', '诗礼传家', '诗书继世', '诗酒年华', '诗意盎然', '诗画江南', '诗魂佛心', '诗词歌赋', '诗韵悠扬',
    '文质彬彬', '文武双全', '文采飞扬', '文明开化', '文化传承', '文思泉涌', '文韬武略', '文心雕龙', '文化底蕴',
    '才高八斗', '才华横溢', '才子佳人', '才气纵横', '才思敏捷', '才貌双全', '才德兼备', '才学兼优', '才情横溢',
    '智勇双全', '智者见智', '智珠在握', '智谋过人', '智慧如海', '智深谋远', '智圆行方', '智者不惑', '智多星'
].filter(idiom => !idiom.includes('一') && !idiom.includes('二'));
// 当前成语初始化为空
let currentWord = '';
// 用户拼出的成语初始化为空
let userWord = '';

// 开始游戏函数
function startGame() {
    // 隐藏开始游戏按钮
    document.getElementById('start-button').style.display = 'none';
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
        if (score === 0) {
            alert('继续努力，再玩一次吧！');
        } else {
            alert('恭喜您！您的得分是：' + score);
        }
        location.reload(); // 自动刷新页面
    }
}

// 初始化拼图函数
function initPuzzle() {
    currentWord = idioms[Math.floor(Math.random() * idioms.length)];
    const shuffled = shuffleArray(currentWord.split(''));
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
    if (userWord === currentWord) {
        clearInterval(timer);
        score += 10;
        timeLeft += 5;
        document.getElementById('points').textContent = score;
        document.getElementById('time').textContent = timeLeft;

        setTimeout(() => {
            alert('答对了！当前分数：' + score);
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
        // 当跳过次数用完时禁用按钮
        if (skipsLeft === 0) {
            const skipButton = document.getElementById('skip-button');
            skipButton.disabled = true;
            skipButton.style.backgroundColor = '#ccc';
            skipButton.style.cursor = 'not-allowed';
        }
        nextLevel(); // 直接进入下一关
    }
}

// 在开始游戏时显示跳过按钮
document.getElementById('skip-button').style.display = 'none';
function startGame() {
    // 显示跳过按钮
    document.getElementById('skip-button').style.display = 'block';
    // 隐藏开始游戏按钮
    document.getElementById('start-button').style.display = 'none';
    resetGame();
    timer = setInterval(updateTimer, 1000);
    initPuzzle();
}

// 这里可以添加更多的拖放逻辑和拼图完成检测 