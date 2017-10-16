export class Idea {
    constructor(public ideaId: string, public problemStatement: string,public solutionProposed: string,public highLevelDesign: string,
            public skillsRequired: string,public toolRequired: string,public dependencies: string,public benefitAndImpact: string,
            public priority: string,public manualEffortSpent: string,public performedFrequency: string,
            public executions: string, public totalHoursPerMonth: number,public smeContactPhone: string,public smeContactMail: string){        
    }
    
    //portfolio - Tibco / CBG / CST/ BIP / RPA / Testing
    //CurrentOwner - User,Manager, GEO, Client, ImplTeam
    //submittedBy
    //Status Accepted/Rejected
    //Comments
    /*  constructor(public ideaId: string, public problemStatement: string, public solutionProposed: string) { 
        }*/
}