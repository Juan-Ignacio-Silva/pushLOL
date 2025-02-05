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
    `;
    document.head.appendChild(style);

    const championName = sessionStorage.getItem('championSelected');
    if (!championName) {
        window.location.href = '/';
        return;
    }

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
        })
        .catch(error => {
            console.error('Error:', error);
        });
});