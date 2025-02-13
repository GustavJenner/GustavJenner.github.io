// Constants
const figletFont = 'Swamp Land';
const greetingsText = 'G-Terminal';
const lowerText = '\nWelcome to my portfolio website, to start write "help" to see additional commands\n';
const lowerTextColor = '[[b;DimGrey;black]';
const commandColor = '[[b;cyan;black]';
const greetingsColor = '[[b;lime;black]';
const imageFile = '[[b;lime;black]';
const root = '~';
const user = 'guest';
const server = 'gj.com';

// Directory Structure
const directories = {
    Projects: [
        new FileObject("ChatEPB", "[[!;;]https://bravogroup2023.github.io/ChatEPB/]", "link")
    ],
    Certificates: [new FileObject("BLT1", '[[@;;;;BLT1.jpg]]', "jpg")],
    CV: {},
};

// State variables
let cwd = root;
let currentDirectory = directories;

// Command List
const command_list = ['clear'];  // We'll concat the commands later

// Helper Functions
function print_dirs(dirs) {
    dirs.forEach(dir => {
        const clickableDir = $(`<span class="clickable-dir">${dir}</span>`).click(function() {
            term.exec(`cd ${dir}`);
        });
        term.echo(clickableDir);
    });
}

function print_files() {
    currentDirectory.map(dir => {
        if (dir.type === "link") {
            const linkContent = dir.content.replace("[[!;;]", "").replace("]", "");
            const clickableLink = $(`<span class="clickable-link" style="color: blue; text-decoration: underline; cursor: pointer">${dir.name}.${dir.type}</span>`)
                .click(function() {
                    window.open(linkContent, "_blank");
                });
            term.echo(clickableLink);
        } else {
            term.echo(makeDirectoryClickable(term, dir));
        }
    });
}

function makeDirectoryClickable(term, item) {
    if (item instanceof FileObject) {
        return $(`<span class="clickable-dir">${item.name}.${item.type}</span>`).click(function() {
            term.exec(`cat ${item.name}`);
        });
    } else {
        return $(`<span class="clickable-dir">${item}</span>`).click(function() {
            term.exec(`cd ${item}`);
        });
    }
}

function ready() {
    term.echo(() => render(term, greetingsText, figletFont) +
    `${lowerTextColor}${lowerText}`).resume();
}

function prompt() {
    return `${user}@${server}:${cwd}$ `;
}

function render(term, text, font) {
    const cols = term.cols();
    const greetings = figlet.textSync(text, {
        font: font || figletFont,
        width: cols,
        whitespaceBreak: true
    });
    return `${greetingsColor}${greetings}]`;
}

// Terminal Commands
const commands = {
    help() {
        term.echo(`List of available commands: `);
        for(const command of command_list) {
            term.echo(`${commandColor}${command}`);
        }
    },
    echo(...args) {
        term.echo(args.join(' '));
    },
    ls(dir = null) {
        if(Array.isArray(currentDirectory)) {
            print_files();
        } else {
            print_dirs(Object.keys(currentDirectory));
        }
    },
    cd(dir = null) {
        if(dir == "..") {
            cwd = root;
            currentDirectory = directories;
        }
        else if(cwd == root) {
            cwd = dir;
            currentDirectory = currentDirectory[dir];
        } else {
            if(Object.keys(currentDirectory).includes(dir)) {
                cwd = cwd.concat('/', dir);
                currentDirectory = currentDirectory[dir];
            } else {
                term.echo(`Directory ${dir} not found`);
            }
        }
    },
    cat(file) {
        currentDirectory.map(dir => {
            if(dir.name === file) {
                if(dir.type === "link") {
                    window.open(dir.content.replace("[[!;;]", "").replace("]", ""), "_blank");
                } else {
                    term.echo(dir.content);
                }
            }
        });
    },
    whoami() {
        window.location.href = 'whoami.html';
    }
};

// Update command_list after commands are defined
command_list.push(...Object.keys(commands));

const dirs = Object.keys(directories);

// Terminal Initialization
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts(['Standard', figletFont], ready);

const term = $('body').terminal(commands, {
    greetings: false,
    checkArity: false,
    completion: true,
    prompt
});

term.pause();

// Event Listeners
term.on('click', '.command', function() {
    const command = $(this).text();
    term.exec(command, { typing: true, delay: 50 });
});

term.on('click', '.directory', function() {
    const dir = $(this).text();
    term.exec(`cd ~/${dir}`, { typing: true, delay: 50 });
});
