const buttons = document.querySelectorAll('.player-button');
const gameBox = document.querySelector('.game-box.bomb');
const bombImage = document.getElementById('bombImage');
const explosionImage = document.getElementById('explosionImage');
const timerElement = document.getElementById('timer');

// 오디오 요소 참조
const gameAudio = document.getElementById('gameAudio');
const cannonAudio = document.getElementById('cannonAudio'); 

let timerInterval; // 타이머 인터벌 저장
let currentPlayer = 1; // 현재 플레이어
let totalPlayers = 0; // 총 플레이어 수
let playerClicks = []; // 각 플레이어의 클릭 시간 저장

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        totalPlayers = parseInt(event.target.getAttribute('data-players'));
        alert(`${totalPlayers} 명의 플레이어가 선택되었습니다.`); 

     
        gameBox.querySelector('p').style.display = 'none';
        gameBox.querySelector('p1').style.display = 'none';
        gameBox.querySelector('.player-selection').style.display = 'none';

       
        bombImage.style.display = 'block';
        timerElement.style.display = 'block';

        
        alert(`플레이어 ${currentPlayer}의 차례입니다!`);

        // 오디오 재생
        playSoundEffect();

        // 타이머 시작
        startTimer();
    });
});

// 효과음 재생 함수
function playSoundEffect() {
    gameAudio.currentTime = 0; // 오디오 시작점 설정
    gameAudio.play(); // 오디오 재생
}

// 타이머 시작 함수
function startTimer() {
    let countdown = 10.000;
    timerElement.textContent = countdown.toFixed(3);
    explosionImage.style.display = 'none';
    bombImage.style.display = 'block';
    playSoundEffect(); // 게임 시작 시 효과음 재생

    bombImage.classList.add('shake');

    timerInterval = setInterval(() => {
        countdown -= 0.015; 
        timerElement.textContent = countdown.toFixed(3);

        if (countdown <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = '시간 종료!';
            bombImage.style.display = 'none'; // 폭탄 이미지 숨기기
            explosionImage.style.display = 'block'; // 폭발 이미지 표시
            bombImage.classList.remove('shake'); 

            // 게임 오디오 중지
            gameAudio.pause();

            // 시간 초과 시 오디오 재생
            playCannonSound();

            setTimeout(() => {
                alert('시간 초과! 탈락입니다.');

               
                if (currentPlayer < totalPlayers) {
                    currentPlayer++;
                    alert(`다음 플레이어 ${currentPlayer}의 차례입니다!`);
                    explosionImage.style.display = 'none';
                    startTimer(); // 타이머 재시작
                } else {
                    determineWinner(); 
                }
            }, 1000); 
        }
    }, 10); 
}

// 시간 초과 시 효과음 재생 함수
function playCannonSound() {
    cannonAudio.currentTime = 0; // 캐논 사운드 시작점 설정
    cannonAudio.play(); 
}


function handleBombClick() {
    clearInterval(timerInterval); // 타이머 중지
    const timeClicked = parseFloat(timerElement.textContent); 
    playerClicks.push({ player: currentPlayer, time: timeClicked });

    alert(`플레이어 ${currentPlayer}가 폭탄을 ${timeClicked.toFixed(3)}초에 클릭했습니다!`);


    bombImage.classList.remove('shake');

 
    explosionImage.style.display = 'none';

    // 오디오 일시 정지
    gameAudio.pause();

    // 다음 플레이어로 이동
    currentPlayer++;

    if (currentPlayer <= totalPlayers) {
        alert(`다음 플레이어 ${currentPlayer}의 차례입니다!`);
        playSoundEffect(); // 다음 플레이어에게 오디오 재생
        startTimer(); // 타이머 재시작
    } else {
        determineWinner();
    }
}


bombImage.addEventListener('click', handleBombClick);


function determineWinner() {
    if (playerClicks.length === 0) {
        alert('게임에 참여한 플레이어가 없습니다!');
        resetGame();
        return;
    }

   
    const closest = playerClicks.reduce((prev, curr) => Math.abs(curr.time) < Math.abs(prev.time) ? curr : prev);

    alert(`가장 0초에 가까운 시간에 클릭한 승자는 플레이어 ${closest.player}입니다! (${closest.time.toFixed(3)}초)`);

    
    resetGame();
}

function resetGame() {
    playerClicks = [];
    currentPlayer = 1;
    totalPlayers = 0;
    gameBox.querySelector('p').style.display = 'block';
    gameBox.querySelector('p1').style.display = 'block';
    gameBox.querySelector('.player-selection').style.display = 'flex';
    bombImage.style.display = 'none';
    timerElement.style.display = 'none';
    explosionImage.style.display = 'none'; // 폭발 이미지 숨기기
    bombImage.style.pointerEvents = 'auto';
    bombImage.classList.remove('shake'); // 흔들림 효과 제거
}
