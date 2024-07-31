const $c = document.querySelector("canvas");
const ctx = $c.getContext('2d');

// 초기 제품 항목
let product = [
  "항목1", '항목2', "항목3", "항목4", "항목5", "항목6"
];
const colors = [
    "#FF6F6F", // 파스텔 빨강
    "#FFAB6F", // 파스텔 주황
    "#FFEB6F", // 파스텔 노랑
    "#C6FF6F", // 파스텔 초록
    "#6FCEFF", // 파스텔 파랑
    "#6F6FFF", // 파스텔 남색
    "#CE6FFF", // 파스텔 보라
    "#B9FBC0", // 민트색
    "#E0E0E0", // 연한 회색
    "#D3A8E0"  // 라벤더
];

const newMake = () => {
    const [cw, ch] = [$c.width / 2, $c.height / 2];
    const arc = Math.PI / (product.length / 2);

    ctx.clearRect(0, 0, $c.width, $c.height); // 캔버스 지우기

    for (let i = 0; i < product.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(cw, ch);
        ctx.arc(cw, ch, cw, arc * i, arc * (i + 1));
        ctx.fill();
        ctx.closePath();
    }

    ctx.fillStyle = "#fff";
    ctx.font = "18px Pretendard";
    ctx.textAlign = "center";

    for (let i = 0; i < product.length; i++) {
        const angle = (arc * i) + (arc / 2);

        ctx.save();
        ctx.translate(
            cw + Math.cos(angle) * (cw - 50),
            ch + Math.sin(angle) * (ch - 50)
        );

        ctx.rotate(angle + Math.PI / 2);

        product[i].split(" ").forEach((text, j) => {
            ctx.fillText(text, 0, 30 * j);
        });

        ctx.restore();
    }
}

function addItem() {
    const inputs = document.querySelectorAll('.item-inputs input');
    if (inputs.length < 10) {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.value = `항목 ${inputs.length + 1}`; // 기본값을 `value`로 설정
        newInput.addEventListener('input', updateProductAndDraw); // 새 입력 필드에 이벤트 리스너 추가
        document.querySelector('.item-inputs').appendChild(newInput);
        updateProductAndDraw(); // 새 항목 추가 후 룰렛판 업데이트
    } else {
        alert('최대 10개 항목까지 추가할 수 있습니다.');
    }
}


function removeItem() {
    const inputs = document.querySelectorAll('.item-inputs input');
    if (inputs.length > 2) {
        inputs[inputs.length - 1].remove();
        updateProductAndDraw(); // 항목 제거 후 업데이트
    } else {
        alert('최소 2개 항목은 유지해야 합니다.');
    }
}

function updateProductAndDraw() {
    // 제품 항목 업데이트
    product = Array.from(document.querySelectorAll('.item-inputs input')).map(input => input.value).filter(value => value.trim() !== "");

    newMake(); // 룰렛판 업데이트
}

const rotate = () => {
    const rotateAudio = document.getElementById('RollingAudio');
    const successAudio = document.getElementById('successAudio');

    rotateAudio.currentTime = 0;

    $c.style.transform = `initial`;
    $c.style.transition = `initial`;

    updateProductAndDraw(); // 룰렛판 업데이트

    setTimeout(() => {
        rotateAudio.play();
        const ran = Math.floor(Math.random() * product.length);
        const arc = 360 / product.length;

        const rotate = (ran * arc) + 3500 - 140;

        $c.style.transform = `rotate(-${rotate}deg)`;
        $c.style.transition = `2s`;

        // 결과 알림
        setTimeout(() => {
			successAudio.play(); // 당첨자 발표 시 successAudio 재생
            alert(`당첨자는 ${product[ran]} 입니다.`);
           
        }, 2000);
    }, 1);
};

// 초기 룰렛판 생성
newMake();

// 모든 입력 필드에 이벤트 리스너 추가
document.querySelectorAll('.item-inputs input').forEach(input => {
    input.addEventListener('input', updateProductAndDraw);
});
