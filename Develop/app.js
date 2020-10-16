const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

// creating manager
function appMenu() {
    fuction createManager() {
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
            type: "input",
            name: "managerEmail",
            message: "What is the manager's email?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }         
            return "Please enter an email!";
                }
            },
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
        }
    };

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
    fuction addEngineer() {
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
                    return true;
                }
                return "Enter a number greater than 0";
                }
            },
            {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?",
                validate: answer => {
                if (answer !== "") {
                    return true;
                }         
            return "Please enter an email!";
                }
            },
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
        }
    };

    // adding intern
    fuction addIntern() {
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
                        return true;
                    }
                    return "Enter a number greater than 0";
                    }
                },
                {
            type: "input",
            name: "internEmail",
            message: "What is the interns email?",
                    validate: answer => {
                        if (answer !== "") {
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


        

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
