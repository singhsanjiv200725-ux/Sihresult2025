// Obfuscated team data - encoded and shuffled with FINAL OFFICIAL teams
const _0x4a5b = [
    'SW1wYWN0IElubm92YXRvcnM=', 'VGVhbSAyMDI1', 'U3ludGF4IHNsYXllcg==', 'QWxnb1JoeXRobQ==', 'RXJyb3I0MDQ=',
    'SEVYNDA0', 'VmlzaW9uNEVkdQ==', 'REFSS05FVCBDT0RFUg==', 'VGVjaCBUaGV1cmd5', 'Tm8gbmFtZQ==',
    'Q3RybCBBbHQgRGVmZWF0', 'VmlrYXNoYQ==', 'SGFja2Fob2xpY3M=', 'VGVjaFNoYWt0aQ==', 'Q29kZSA0MDQ=',
    'Q2F0YWx5c3QgQ3Jldw==', 'R3VhcmRpYW5Cb3Rz', 'VGVjaDRCaGFyYXQ=', 'U2FhcnRoaQ==', 'TmVvVmlzaW9u',
    'QmluYXJ5IEJ5dGVz', 'VGVhbSBQaG9lbml4', 'THVtaW5hIHZpeGVu', 'TmV4dXM=', 'SGV4ZWw=',
    'QWRtaXJhbHM=', 'Q2xvdWRDcmFmdGVyeg==', 'Qnl0ZUd1YXJkaWFucw==', 'QmxpdHprcmllZw==', 'UkFZVk9MVVRJT04=',
    'VllBTlRSQQ==', 'VmVudXM=', 'VGVhbV9Sb2NrZXQ=', 'TmlybWF0YQ==', 'a2VybmFsQ3Jldw==',
    'QnVnIE9mZg==', 'TUFSSyA0Mg==', 'Qml0YnlCaXQ=', 'QmluYXJ5QmFuZGl0cw==', 'V29ya3NJblByb2Q=',
    'VmlyYWwgTWluZHM=', 'UmVzaXN0WA==', 'bW9zTg==', 'U2FtYXkgU3V0cmE=', 'U2t5QWlkIEVsZWN0cm9uaWNz'
];

// Official waiting list teams
const _0x7c8d = [
    'Q29tZWJhY2sxMDE=', 'R29vZGZlbGxhcw==', 'QVJLIEhpdmU=', 'Q29ucXVlcm9y', 'SW1wYWN0IGNyZXc='
];

// Decoding function
function _0xdec(encoded) {
    try {
        return atob(encoded);
    } catch (e) {
        return 'Unknown Team';
    }
}

class TeamManager {
    constructor() {
        this.teams = [];
        this.waitingList = [];
        this.initialized = false;
        this.cardData = new Map();
    }

    async init() {
        if (this.initialized) return;

        await new Promise(resolve => setTimeout(resolve, Math.random() * 500));

        const decodedTeams = _0x4a5b.map(encoded => _0xdec(encoded));
        const decodedWaiting = _0x7c8d.map(encoded => _0xdec(encoded));

        const allTeams = [...decodedTeams, ...decodedWaiting];

        this.teams = allTeams;
        this.waitingList = decodedWaiting;
        this.shuffle(this.teams);
        this.initialized = true;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    isWaitingList(teamName) {
        return this.waitingList.includes(teamName);
    }

    getTeams() {
        return this.teams;
    }
}

const teamManager = new TeamManager();

// Function to generate the HTML for a single card
function createCard(teamName, isWaiting) {
    const cardClass = isWaiting ? 'flip-card waiting-list' : 'flip-card';
    const backContent = isWaiting 
        ? `${teamName} <span class="waiting-text">Waiting List</span>`
        : teamName;

    return `
        <div class="${cardClass}">
            <div class="card-inner">
                <div class="card-front" style="transform: rotateY(180deg); opacity: 0;">SIH</div>
                <div class="card-back" style="transform: rotateY(0deg);">${backContent}</div>
            </div>
        </div>
    `;
}

// Main function to set up the game
async function setupGame() {
    await teamManager.init();
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = ''; // Clear the grid

    const teams = teamManager.getTeams();
    let cardsHtml = '';

    // Generate HTML for all cards and append to the grid
    teams.forEach(team => {
        const isWaiting = teamManager.isWaitingList(team);
        cardsHtml += createCard(team, isWaiting);
    });

    gameGrid.innerHTML = cardsHtml;
}

// Function to reload results (same as setup)
async function startNewGame() {
    await setupGame();
}

// Anti-debugging measures
(function () {
    const devtools = {
        open: false
    };

    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;

        if (widthThreshold || heightThreshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                console.log('%cHey there! 👋', 'color: #ff6b6b; font-size: 20px; font-weight: bold;');
                console.log('%cSorry, but this is the final result! 🤫', 'color: #45b7d1; font-size: 14px;');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
})();

// Console warning
console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it\'s likely a scam.', 'color: red; font-size: 16px;');

// Initialize the game
document.addEventListener('DOMContentLoaded', async () => {
    await setupGame();

    const infoButton = document.getElementById('infoButton');
    const disclaimerText = document.getElementById('disclaimerText');

    if (infoButton && disclaimerText) {
        infoButton.addEventListener('click', () => {
            disclaimerText.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            if (!infoButton.contains(event.target) && disclaimerText.classList.contains('show')) {
                disclaimerText.classList.remove('show');
            }
        });
    }
});
