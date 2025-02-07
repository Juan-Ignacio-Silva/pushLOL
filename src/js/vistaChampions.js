document.addEventListener('DOMContentLoaded', () => {
    // Añadir estilos para los bordes
    const style = document.createElement('style');
    style.textContent = `
        .counter-card {
            border: 3px solid #2f3136;
        }
        .counter-card:hover {
            border: 3px solid #f54245;
        }
        .ability-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.25rem;
            background-color: #1a1a1a;
            position: relative;
            text-align: center;
            font-weight: bold;
            font-size: 9px;
        }
        .abilities-popup {
            backdrop-filter: blur(10px) brightness(0.8);
            background-color: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);

    const championName = sessionStorage.getItem('championSelected');
    if (!championName) {
        window.location.href = '/';
        return;
    }

    const setupAbilitiesPopup = (champion) => {
        const abilitiesButton = document.querySelector('.abilities-button');
        const abilitiesPopup = document.querySelector('.abilities-popup');
        const closePopupButton = document.querySelector('.close-popup');
        const abilityVideo = document.querySelector('#ability-video');
        const abilitySelectors = document.querySelectorAll('.ability-selector');

        const updateVideo = (ability) => {
            const championId = champion.id.toString().padStart(4, '0');
            const videoUrl = `https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${championId}/ability_${championId}_${ability}1.mp4`;
            
            const newVideo = document.createElement('video');
            newVideo.id = 'ability-video';
            newVideo.autoplay = true;
            newVideo.loop = true;
            newVideo.muted = true;
            newVideo.playsInline = true;
            newVideo.style.width = '100%';
            newVideo.style.height = '100%';
            newVideo.style.objectFit = 'cover';
            newVideo.style.opacity = '0'; // Empezar invisible
            newVideo.style.transition = 'opacity 0.3s ease';

            newVideo.onloadeddata = () => {
                newVideo.style.opacity = '1'; // Hacer visible cuando esté cargado
                // Actualizar botón activo
                document.querySelectorAll('.ability-selector').forEach(btn => {
                    btn.classList.remove('active');
                    if(btn.getAttribute('data-ability') === ability) {
                        btn.classList.add('active');
                    }
                });
            };

            newVideo.src = videoUrl;
            const oldVideo = document.querySelector('#ability-video');
            if(oldVideo) {
                oldVideo.style.opacity = '0';
                setTimeout(() => {
                    oldVideo.parentNode.replaceChild(newVideo, oldVideo);
                }, 300);
            }
        };

        abilitiesButton?.addEventListener('click', () => {
            abilitiesPopup.classList.add('active');
            // Intentar con diferentes habilidades si una falla
            updateVideo('P');
        });

        closePopupButton?.addEventListener('click', () => {
            abilitiesPopup.classList.remove('active');
            const video = document.querySelector('#ability-video');
            if (video) {
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        });

        abilitySelectors.forEach(selector => {
            selector.addEventListener('click', () => {
                const ability = selector.getAttribute('data-ability');
                updateVideo(ability);
            });
        });

        // Actualizar las imágenes de las habilidades en los botones del popup
        if (champion.habilidades) {
            document.querySelectorAll('.popup-ability-img').forEach(img => {
                const ability = img.parentElement.getAttribute('data-ability');
                img.src = champion.habilidades[ability];
            });
        }
    };

    fetch('../src/data/champions.json')
        .then(response => response.json())
        .then(champions => {
            const champion = champions.find(c => c.name.toLowerCase() === championName.toLowerCase());
            if (!champion) {
                console.error('Champion not found:', championName);
                return;
            }

            console.log('Champion encontrado:', champion);
            console.log('BuenosContra array:', champion.buenosContra);

            // Guardar el ID del campeón para usarlo en los videos
            sessionStorage.setItem('championId', champion.id);

            // Actualizar nombre y avatar
            document.querySelector('.champion-name').textContent = champion.name;
            const avatarElement = document.querySelector('.champion-avatar');
            avatarElement.style.backgroundImage = `url(${champion.image_url})`;
            avatarElement.style.backgroundSize = 'cover';
            avatarElement.style.backgroundPosition = 'center';

            // Mostrar ícono de posición
            if (champion.positions && champion.positions.length > 0) {
                const position = champion.positions[0]; // Tomamos la primera posición
                const roleIcon = document.querySelector(`.${position}-icon`);
                if (roleIcon) {
                    document.querySelectorAll('.role-svg').forEach(icon => icon.classList.remove('active'));
                    roleIcon.classList.add('active');
                }
            }

            // Actualizar tier y barra
            const championBar = document.querySelector('.champion-bar');
            championBar.setAttribute('data-tier', champion.tier);
            const tierLetter = document.querySelector('.tier-letter');
            tierLetter.textContent = champion.tier;

            // Actualizar iconos de habilidades
            if (champion.habilidades) {
                document.querySelector('.p-ability').src = champion.habilidades.P;
                document.querySelector('.q-ability').src = champion.habilidades.Q;
                document.querySelector('.w-ability').src = champion.habilidades.W;
                document.querySelector('.e-ability').src = champion.habilidades.E;
                document.querySelector('.r-ability').src = champion.habilidades.R;
            }

            // Mostrar buenos contra (primera sección)
            const goodAgainstCards = document.querySelectorAll('.counter-card.good');
            console.log('Cards encontradas para buenosContra:', goodAgainstCards.length);
            
            if (champion.buenosContra && champion.buenosContra.length > 0) {
                champion.buenosContra.forEach((goodAgainstName, index) => {
                    console.log('Buscando campeón:', goodAgainstName);
                    if (index < goodAgainstCards.length) {
                        const goodAgainstChampion = champions.find(c => c.name.toLowerCase() === goodAgainstName.toLowerCase());
                        console.log('Campeón encontrado:', goodAgainstChampion);
                        if (goodAgainstChampion) {
                            console.log('Aplicando imagen:', goodAgainstChampion.splash);
                            goodAgainstCards[index].style.backgroundImage = `url(${goodAgainstChampion.splash})`;
                            goodAgainstCards[index].style.cursor = 'pointer';
                            goodAgainstCards[index].onclick = () => {
                                sessionStorage.setItem('championSelected', goodAgainstChampion.name);
                                window.location.reload();
                            };
                        } else {
                            console.error('No se encontró el campeón:', goodAgainstName);
                        }
                    }
                });
            } else {
                console.log('No hay buenosContra definidos');
            }

            // Mostrar counters (malos contra)
            const counterCards = document.querySelectorAll('.counter-card.bad');
            if (champion.counters && champion.counters.length > 0) {
                champion.counters.forEach((counterName, index) => {
                    if (index < counterCards.length) {
                        const counterChampion = champions.find(c => c.name.toLowerCase() === counterName.toLowerCase());
                        if (counterChampion) {
                            counterCards[index].style.backgroundImage = `url(${counterChampion.splash})`;
                            counterCards[index].style.cursor = 'pointer';
                            counterCards[index].onclick = () => {
                                sessionStorage.setItem('championSelected', counterChampion.name);
                                window.location.reload();
                            };
                        }
                    }
                });
            }

            // Configurar el popup de habilidades
            setupAbilitiesPopup(champion);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});