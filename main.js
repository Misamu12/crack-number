document.addEventListener('DOMContentLoaded', function() {
            const countryCodeSelect = document.getElementById('countryCode');
            const phoneInput = document.getElementById('phoneNumber');
            const locateBtn = document.getElementById('locateBtn');
            const loadingIndicator = document.getElementById('loadingIndicator');
            const resultSection = document.getElementById('resultSection');
            
            // Éléments de résultats
            const countryFlag = document.getElementById('countryFlag');
            const countryName = document.getElementById('countryName');
            const countryCodeText = document.getElementById('countryCodeText');
            const resultPhone = document.getElementById('resultPhone');
            const resultCity = document.getElementById('resultCity');
            const resultOperator = document.getElementById('resultOperator');
            const resultLineType = document.getElementById('resultLineType');
            const resultTimezone = document.getElementById('resultTimezone');
            const resultCoordinates = document.getElementById('resultCoordinates');
            
            // Base de données des pays avec leurs informations
            const countryData = {
                '+1': { 
                    name: 'États-Unis/Canada', 
                    flag: '🇺🇸',
                    cities: ['New York', 'Los Angeles', 'Chicago', 'Toronto', 'Montréal', 'Vancouver'],
                    operators: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Rogers', 'Bell'],
                    timezones: ['UTC-5 (EST)', 'UTC-6 (CST)', 'UTC-7 (MST)', 'UTC-8 (PST)'],
                    coordinates: ['40.7128° N, 74.0060° W', '34.0522° N, 118.2437° W', '43.6532° N, 79.3832° W']
                },
                '+33': { 
                    name: 'France', 
                    flag: '🇫🇷',
                    cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille'],
                    operators: ['Orange', 'SFR', 'Bouygues Telecom', 'Free Mobile'],
                    timezones: ['UTC+1 (CET)', 'UTC+2 (CEST)'],
                    coordinates: ['48.8566° N, 2.3522° E', '45.7640° N, 4.8357° E', '43.2965° N, 5.3698° E']
                },
                '+44': { 
                    name: 'Royaume-Uni', 
                    flag: '🇬🇧',
                    cities: ['Londres', 'Manchester', 'Birmingham', 'Glasgow', 'Liverpool', 'Edinburgh'],
                    operators: ['EE', 'O2', 'Vodafone', 'Three'],
                    timezones: ['UTC+0 (GMT)', 'UTC+1 (BST)'],
                    coordinates: ['51.5074° N, 0.1278° W', '53.4808° N, 2.2426° W', '52.4862° N, 1.8904° W']
                },
                '+49': { 
                    name: 'Allemagne', 
                    flag: '🇩🇪',
                    cities: ['Berlin', 'Hambourg', 'Munich', 'Cologne', 'Francfort', 'Stuttgart'],
                    operators: ['Telekom', 'Vodafone', 'O2', 'E-Plus'],
                    timezones: ['UTC+1 (CET)', 'UTC+2 (CEST)'],
                    coordinates: ['52.5200° N, 13.4050° E', '53.5511° N, 9.9937° E', '48.1351° N, 11.5820° E']
                },
                '+243': { 
                    name: 'République Démocratique du Congo', 
                    flag: '🇨🇩',
                    cities: ['Kinshasa', 'Lubumbashi', 'Mbuji-Mayi', 'Kananga', 'Kisangani'],
                    operators: ['Vodacom', 'Airtel', 'Orange', 'Africell'],
                    timezones: ['UTC+1 (WAT)', 'UTC+2 (CAT)'],
                    coordinates: ['-4.4419° S, 15.2663° E', '-11.6876° S, 27.5026° E', '-6.1360° S, 23.5898° E']
                },
                '+234': { 
                    name: 'Nigeria', 
                    flag: '🇳🇬',
                    cities: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'],
                    operators: ['MTN', 'Airtel', 'Glo', '9mobile'],
                    timezones: ['UTC+1 (WAT)'],
                    coordinates: ['6.5244° N, 3.3792° E', '9.0765° N, 7.3986° E', '12.0022° N, 8.5920° E']
                },
                '+225': { 
                    name: 'Côte d\'Ivoire', 
                    flag: '🇨🇮',
                    cities: ['Abidjan', 'Bouaké', 'Daloa', 'Korhogo', 'San-Pédro'],
                    operators: ['MTN', 'Orange', 'Moov'],
                    timezones: ['UTC+0 (GMT)'],
                    coordinates: ['5.3600° N, 4.0083° W', '7.6900° N, 5.0300° W', '6.8800° N, 6.4500° W']
                },
                '+212': { 
                    name: 'Maroc', 
                    flag: '🇲🇦',
                    cities: ['Casablanca', 'Rabat', 'Fès', 'Marrakech', 'Tanger'],
                    operators: ['Maroc Telecom', 'Orange', 'Inwi'],
                    timezones: ['UTC+0 (GMT)', 'UTC+1 (CET)'],
                    coordinates: ['33.5731° N, 7.5898° W', '34.0209° N, 6.8416° W', '31.6295° N, 7.9811° W']
                }
            };
            
            // Mettre à jour les informations du pays sélectionné
            countryCodeSelect.addEventListener('change', function() {
                const code = countryCodeSelect.value;
                if (countryData[code]) {
                    countryFlag.textContent = countryData[code].flag;
                    countryName.textContent = countryData[code].name;
                    countryCodeText.textContent = `Code pays: ${code}`;
                }
            });
            
            // Initialiser avec la première valeur
            countryCodeSelect.dispatchEvent(new Event('change'));
            
            // Formatage automatique du numéro de téléphone
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 3) {
                    value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 9);
                }
                e.target.value = value;
            });
            
            // Simulation de localisation
            locateBtn.addEventListener('click', function() {
                const countryCode = countryCodeSelect.value;
                const phoneNumber = phoneInput.value.trim();
                
                if (!phoneNumber) {
                    alert('Veuillez entrer un numéro de téléphone');
                    return;
                }
                
                // Validation basique du numéro
                const cleanedNumber = phoneNumber.replace(/\D/g, '');
                if (cleanedNumber.length < 7) {
                    alert('Veuillez entrer un numéro de téléphone valide (au moins 7 chiffres)');
                    return;
                }
                
                // Afficher l'indicateur de chargement
                loadingIndicator.style.display = 'block';
                resultSection.style.display = 'none';
                
                // Simuler un délai de traitement
                setTimeout(function() {
                    // Récupérer les données du pays sélectionné
                    const country = countryData[countryCode];
                    
                    if (!country) {
                        alert('Code pays non reconnu');
                        loadingIndicator.style.display = 'none';
                        return;
                    }
                    
                    // Générer des données simulées basées sur le pays
                    const city = country.cities[Math.floor(Math.random() * country.cities.length)];
                    const operator = country.operators[Math.floor(Math.random() * country.operators.length)];
                    const timezone = country.timezones[Math.floor(Math.random() * country.timezones.length)];
                    const coordinates = country.coordinates[Math.floor(Math.random() * country.coordinates.length)];
                    
                    const lineTypes = ['Mobile', 'Fixe'];
                    const lineType = lineTypes[Math.floor(Math.random() * lineTypes.length)];
                    
                    // Mettre à jour les résultats
                    resultPhone.textContent = countryCode + ' ' + phoneNumber;
                    resultCity.textContent = city;
                    resultOperator.textContent = operator;
                    resultLineType.textContent = lineType;
                    resultTimezone.textContent = timezone;
                    resultCoordinates.textContent = coordinates;
                    
                    // Mettre à jour les informations du pays
                    countryFlag.textContent = country.flag;
                    countryName.textContent = country.name;
                    countryCodeText.textContent = `Code pays: ${countryCode}`;
                    
                    // Cacher l'indicateur de chargement et afficher les résultats
                    loadingIndicator.style.display = 'none';
                    resultSection.style.display = 'block';
                }, 2000); // Délai de 2 secondes pour simuler le traitement
            });
        });