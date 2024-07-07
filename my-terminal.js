const figletFont = 'Swamp Land';
const greetingsText = 'G-Terminal'
const lowerText = '\nWelcome to my portfolio website, to start write "gt --help" to see additional commands\n';
const lowerTextColor = '[[b;DimGrey;black]'
const greetingsColor = '[[b;lime;black]';

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
    ls(){
        if(Array.isArray((currentDir))){
            for(const file of currentDir){
                term.echo(file)
        }
        

        }else{

            for(let [key,value] of Object.entries(currentDir)){
                term.echo(key);
            }
        }

        
        
    },

    cd(dir){
        if(path == root){
            path = dir

        }else{
        path = path.concat('/',dir)

        }
        currentDir = currentDir[dir]

        
    }
    
};
const directories = {
    education:[$(`<red>test</red>`)]

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
    whoami:['https://jcu.bi/wayne'


    ],
    skills:[['Coding languages:','Python','C#','Java']['Tools:']

    ]

}
const dirs = Object.keys(directories);
const command_list = ['clear'].concat(Object.keys(commands));
const root = '~';
let path = root;
const user = 'Guest';
const server = 'gjserver.com';
let currentDir = directories;



figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts(['Standard', figletFont], ready);



const term = $('body').terminal(commands,{
    greetings: false,
    checkArity:false,
    prompt
    
}, { 
    

    
    });
    
term.pause();

function ready() {
    term.echo(() => render(term, greetingsText, figletFont) +
    `${lowerTextColor}${lowerText}`).resume();
 }
 
 function prompt(){
    return `${user}@${server}:${path}$ `;
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
