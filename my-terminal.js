
const figletFont = 'Swamp Land';
const greetingsText = 'G-Terminal'
const lowerText = '\nWelcome to my portfolio website, to start write "gt --help" to see additional commands\n';
const lowerTextColor = '[[b;DimGrey;black]'
const greetingsColor = '[[b;lime;black]';
const imageFile = '[[b;lime;black]'
function print_dirs(dirs) {
    term.echo(dirs.map(dir => {
        return `[[b;blue;black]${dir}`;
    }).join('\n'));
}
function print_files(){
    term.echo(currentDirectory.map(dir => {
        return dir.name+"."+dir.type;
    }).join('\n'));
}
const commands = {
   help() {
       term.echo(`List of available commands: `);
       for(const command of command_list){
        term.echo(command)
       }
   },
   echo(...args) {
    term.echo(args.join(' '));
    },
    ls(dir = null){
        if(Array.isArray(currentDirectory)){
            print_files();
        }else{
            print_dirs(Object.keys(currentDirectory));
        }

    },

    cd(dir = null) {
        if(dir == ".."){
            cwd = root
            currentDirectory = directories;
        }
        else if(cwd == root){
            cwd = dir
            currentDirectory = currentDirectory[dir];

        }else{
        cwd = cwd.concat('/',dir)
        currentDirectory = currentDirectory[dir];

        }
        
    },
    cat(file){
        currentDirectory.map(dir => {
            if(dir.name === file){
                term.echo(dir.content)
            }
            
        });
    },
    
};
const directories = {
    education:['[[b;red;white]hello world]']

    ,
    projects:{}

    ,
    certificates:{}

    ,
    CV:{}

    ,
    hobbies:{
        Gym:['Current numbers:','Bench:80kg','Sqaut:120kg','Deadlift:120kg'],
        VideoGames:['Main games:','TFT: peak rank diamond I','League of leagends:peak rank platinum IV'],


    },
    whoami:[new FileObject("whoami","god","txt"), new FileObject("potrait",'[[@;;;;test.png]]',"img")


    ],
    skills:[['Coding languages:','Python','C#','Java']['Tools:']

    ]

}
const command_list = ['clear'].concat(Object.keys(commands));
const root = '~';
const dirs = Object.keys(directories);
let cwd = root;
const user = 'guest';
const server = 'gj.com';
let currentDirectory = directories;
figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts(['Standard', figletFont], ready);



const term = $('body').terminal(commands,{
    greetings: false,
    checkArity:false,
    completion:true,
    prompt,
    
    
}, { 
   

    
    });
    
term.pause();

function ready() {
    term.echo(() => render(term, greetingsText, figletFont) +
    `${lowerTextColor}${lowerText}`).resume();
 }
 
 function prompt(){
    return `${user}@${server}:${cwd}$ `;
}
function render(term, text, font) {
    const cols = term.cols();
    const greetings = figlet.textSync(text, {
        font: font || figletFont,
        width: cols,
        whitespaceBreak: true
        
    });
    return `${greetingsColor}${greetings}]`
}
term.on('click', '.command', function() {
    const command = $(this).text();
    term.exec(command, { typing: true, delay: 50 });
 });
 
 term.on('click', '.directory', function() {
     const dir = $(this).text();
     term.exec(`cd ~/${dir}`, { typing: true, delay: 50 });
 });
