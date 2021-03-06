const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

// creating manager
function appMenu() {
    function createManager() {
        inquirer.prompt([
            {
            type: "input",
            name: "managerName",
            message: "What is the manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }         
                return "Please enter a name!";
                }
            },
            {
            type: "input",
            name: "managerID",
            message: "What is the manager's ID?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Enter a number greater than 0";
                }
            },
            {
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?",
            validate: answer => {
                const pass = answer.match (
                    /\S+@\S+\.S+/
                );
                    if (pass) {
                        return true;
                }         
            return "Please enter an email!";
                }
            },
            {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Enter a number greater than 0";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerMame, answers.managerID, answers.managerEmail, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerID);
            createTeam();
        });
    }

    // creating team function
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    // adding engineer
    function addEngineer() {
        inquirer.prompt([
            {
            type: "input",
            name: "engineerName",
            message: "What is the engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }         
                return "Please enter a name!";
                }
            },
            {
            type: "input",
            name: "engineerID",
            message: "What is the engineer's ID?",
                validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    if (idArray.includes(answer)) {
                        return "This ID is already taken";
                    } else {
                    return true;
                }  
                }     
            }        
            },
            {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
            validate: answer => {
                const pass = answer.match (
                    /\S+@\S+\.S+/
                );
                    if (pass) {
                        return true;
                }                
            return "Please enter an email!";
                }
            },
            {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
            return "Please enter GitHub username";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerMame, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerID);
            createTeam();
        });
    }

    // adding intern
    function addIntern() {
        inquirer.prompt([
            {
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }         
                return "Please enter a name!";
                }
            },
            {
            type: "input",
            name: "internID",
            message: "What is the interns ID?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already taken";
                        } else {
                        return true;
                    }                
                    }
                }
                },
            {
            type: "input",
            name: "internEmail",
            message: "What is the interns email?",
            validate: answer => {
                const pass = answer.match (
                    /\S+@\S+\.S+/
                );
                    if (pass) {
                        return true;
                }             
                    return "Please enter an email!";
                        }
                    },
            {
            type: "input",
            name: "internSchool",
            message: "What is the school email?",
                    validate: answer => {
                        if (answer !== "") {
                            return true;
                        }         
                    return "Please enter an school name!";
                        }
                    }
        ]).then(answers => {
            const intern = new Intern(answers.internMame, answers.internID, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internID);
            createTeam();
                });
            }

function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}
}