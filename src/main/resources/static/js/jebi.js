// 초기 이미지 버튼 리스트
        const imageSources = [
            "/img/red.png",
            "/img/carrot.png",
            "/img/yellow.png",
            "/img/green.png",
            "/img/blue.png",
            "/img/navy.png",
            "/img/purple.png",
            "/img/gray.png",
            "/img/black.png"
        ];

        const maxButtons = imageSources.length;
        const minButtons = 1; // 최소 버튼 개수
        const defaultButtons = 6; // 기본 제비 개수
        const gameBoxButton = document.querySelector('.game-box .image-button');
        const raffleCountElem = document.getElementById('raffleCount');
        const failCountInput = document.getElementById('failCountInput');
        const shuffleButton = document.getElementById('shuffleButton');
        const addButton = document.getElementById('addButton');
        const removeButton = document.getElementById('removeButton');

        let currentCount = 0;
        let failCount = 1; // 기본 꽝 개수
        let isShuffled = false; // 제비가 섞였는지 여부

        function updateCounts() {
            raffleCountElem.textContent = currentCount;
            failCountInput.value = failCount;
        }

        function adjustButtons(change) {
            const currentButtons = gameBoxButton.querySelectorAll('img');
            currentCount = currentButtons.length;

            if ((currentCount + change) >= minButtons && (currentCount + change) <= maxButtons) {
                if (change > 0) {
                    // 버튼 추가
                    const newIndex = currentCount % maxButtons;
                    const newImg = document.createElement('img');
                    newImg.src = imageSources[newIndex];
                    newImg.alt = `Image ${newIndex + 1}`;
                    gameBoxButton.appendChild(newImg);
                } else {
                    // 버튼 제거
                    gameBoxButton.removeChild(gameBoxButton.lastElementChild);
                }
                currentCount = gameBoxButton.querySelectorAll('img').length;
                updateCounts(); // 제비와 꽝 개수 업데이트
            }
        }

        function shuffleAndDraw() {
            // 꽝 개수 업데이트
            failCount = parseInt(failCountInput.value, 10);
            if (failCount >= currentCount) {
                alert('꽝 개수가 제비 개수보다 많을 수 없습니다!');
                return;
            } else if (failCount < 1) {
                alert('꽝 개수는 최소 1개여야 합니다!');
                return;
            }

            // 버튼 숨기기
            addButton.style.display = 'none';
            removeButton.style.display = 'none';
			
			
			
			const audio = document.getElementById('gameAudio');
			
			   audio.currentTime = 0; // 처음으로 되감기 (이미 재생 중일 경우)
			   audio.play();

            // 애니메이션 시작
            const images = Array.from(gameBoxButton.querySelectorAll('img'));
            images.forEach(img => {
                img.classList.add('shake');
            });

            // 애니메이션이 끝난 후에 제비 섞기
            setTimeout(() => {
                // 이미지 버튼들을 랜덤하게 섞습니다
                for (let i = images.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    gameBoxButton.appendChild(images[j]);
                }

                // 랜덤으로 꽝과 통과를 설정합니다
                const allImages = gameBoxButton.querySelectorAll('img');
                allImages.forEach((img) => img.classList.remove('fail', 'pass', 'shake')); // 기존 클래스 제거

                const indices = Array.from(allImages.keys());
                const failIndices = shuffle(indices).slice(0, failCount);

                allImages.forEach((img, index) => {
                    if (failIndices.includes(index)) {
                        img.classList.add('fail');
                    } else {
                        img.classList.add('pass');
                    }
                });

                
                isShuffled = true;
               
                alert('제비를 뽑아주세요!');

               
            }, 1000); 
        }

        function handleImageClick(event) {
			
			const successAudio = document.getElementById('successAudio');
						const failAudio = document.getElementById('failAudio');
            if (!isShuffled) {
                alert('제비를 섞어야 게임을 시작할 수 있습니다!');
                return;
            }

            const clickedImage = event.target;
            if (clickedImage.tagName === 'IMG') {
                // 클릭된 이미지를 사라지게 함
                clickedImage.style.display = 'none';
                currentCount--;

                // 클릭된 이미지가 꽝인지 통과인지 구분하여 알림 표시
                if (clickedImage.classList.contains('fail')) {
					failAudio.currentTime = 0; // 처음으로 되감기 (이미 재생 중일 경우)
							   failAudio.play();
                    alert('                                          꽝입니다ㅠㅠ ☠️');
                } else {
					successAudio.currentTime = 0; // 처음으로 되감기 (이미 재생 중일 경우)
							   successAudio.play();
                    alert('                                          통과입니다!!🎉🎉');
                }

                // 모든 이미지가 사라졌는지 확인
                if (currentCount === 0) {
                    // 초기 이미지 버튼을 다시 추가
                    resetGame();
                } else {
                    updateCounts(); // 제비 개수 업데이트
                }
            }
        }

        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }

        function resetGame() {
            // 모든 버튼 제거
            gameBoxButton.innerHTML = '';
            // 버튼 다시 보이기
            addButton.style.display = 'block';
            removeButton.style.display = 'block';

            // 초기 6개 이미지 버튼 추가
            for (let i = 0; i < defaultButtons; i++) {
                const newIndex = i % maxButtons;
                const img = document.createElement('img');
                img.src = imageSources[newIndex];
                img.alt = `Image ${newIndex + 1}`;
                gameBoxButton.appendChild(img);
            }

            currentCount = defaultButtons;
            updateCounts();
            isShuffled = false; // 게임이 리셋되었으므로 섞기 상태도 리셋
        }

        // 초기 이미지 버튼 추가 및 카운트 업데이트
        resetGame();

        // 버튼 클릭 시 이벤트 리스너 추가
        gameBoxButton.addEventListener('click', handleImageClick);