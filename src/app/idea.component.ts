import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IdeaService } from './idea.service';

import { Idea } from './idea';

@Component({
   selector: 'app-idea',
   templateUrl: './idea.component.html',
   styleUrls: ['./idea.component.css']
})
export class IdeaComponent implements OnInit { 
   //Component properties
   allIdeas: Idea[];
   statusCode: number;
   requestProcessing = false;
   ideaIdToUpdate = null;
   processValidation = false;
   //Create form
   ideaForm = new FormGroup({
       problemStatement: new FormControl('', Validators.required),
       solutionProposed: new FormControl('', Validators.required), 
       highLevelDesign: new FormControl('', Validators.required),
       skillsRequired: new FormControl('', Validators.required),
       toolRequired: new FormControl('', Validators.required),
       dependencies: new FormControl('', Validators.required),
       benefitAndImpact: new FormControl('', Validators.required),
       priority: new FormControl('', Validators.required),
       manualEffortSpent: new FormControl('', Validators.required),
       performedFrequency: new FormControl('', Validators.required),
       executions: new FormControl('', Validators.required),
       totalHoursPerMonth: new FormControl('', Validators.required),
       smeContactPhone: new FormControl('', Validators.required),
       smeContactMail: new FormControl('', Validators.required),
   });
   //Create constructor to get service instance
   constructor(private ideaService: IdeaService) {
   }
   //Create ngOnInit() and and load ideas
   ngOnInit(): void {
       this.getAllIdeas();
   }   
   //Fetch all ideas
   getAllIdeas() {
        this.ideaService.getAllIdeas()
          .subscribe(
                data => this.allIdeas = data,
                errorCode =>  this.statusCode = errorCode);   
   }
   //Handle create and update idea
   onIdeaFormSubmit() {
      this.processValidation = true;   
      if (this.ideaForm.invalid) {
           return; //Validation failed, exit from method.
      }   
      //Form is valid, now perform create or update
      this.preProcessConfigurations();
      let problemStatement = this.ideaForm.get('problemStatement').value.trim();
      let solutionProposed = this.ideaForm.get('solutionProposed').value.trim(); 
      let highLevelDesign = this.ideaForm.get('highLevelDesign').value.trim();
      let skillsRequired = this.ideaForm.get('skillsRequired').value.trim(); 
      let toolRequired = this.ideaForm.get('toolRequired').value.trim();
      let dependencies = this.ideaForm.get('dependencies').value.trim(); 
      let benefitAndImpact = this.ideaForm.get('benefitAndImpact').value.trim();
      let priority = this.ideaForm.get('priority').value.trim(); 
      let manualEffortSpent = this.ideaForm.get('manualEffortSpent').value.trim();
      let performedFrequency = this.ideaForm.get('performedFrequency').value.trim(); 
      let executions = this.ideaForm.get('executions').value.trim();
      let totalHoursPerMonth = this.ideaForm.get('totalHoursPerMonth').value.trim(); 
      let smeContactPhone = this.ideaForm.get('smeContactPhone').value.trim();
      let smeContactMail = this.ideaForm.get('smeContactMail').value.trim(); 
      
      if (this.ideaIdToUpdate === null) {  
        //Handle create idea
        let idea= new Idea(null, problemStatement, solutionProposed,highLevelDesign,skillsRequired,toolRequired,dependencies,benefitAndImpact,
                priority,manualEffortSpent,performedFrequency,executions,totalHoursPerMonth,smeContactPhone,smeContactMail);      
        this.ideaService.createIdea(idea)
          .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllIdeas();  
                    this.backToCreateIdea();
                },
                errorCode => this.statusCode = errorCode);
      } else {  
        //Handle update idea
        let idea= new Idea(this.ideaIdToUpdate, problemStatement, solutionProposed,highLevelDesign,skillsRequired,toolRequired,dependencies,benefitAndImpact,
                priority,manualEffortSpent,performedFrequency,executions,totalHoursPerMonth,smeContactPhone,smeContactMail);    
        this.ideaService.updateIdea(idea)
          .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllIdeas();  
                    this.backToCreateIdea();
                },
                errorCode => this.statusCode = errorCode);    
      }
   }
   //Load idea by id to edit
   loadIdeaToEdit(ideaId: string) {
      this.preProcessConfigurations();
      this.ideaService.getIdeaById(ideaId)
          .subscribe(idea => {
                    this.ideaIdToUpdate = idea.ideaId;   
                    this.ideaForm.setValue({ problemStatement: idea.problemStatement, solutionProposed: idea.solutionProposed,
                        highLevelDesign: idea.highLevelDesign, skillsRequired: idea.skillsRequired,
                        toolRequired: idea.toolRequired, dependencies: idea.dependencies,
                        benefitAndImpact: idea.benefitAndImpact, priority: idea.priority,
                        manualEffortSpent: idea.manualEffortSpent, performedFrequency: idea.performedFrequency,
                        executions: idea.executions, totalHoursPerMonth: idea.totalHoursPerMonth,
                        smeContactPhone: idea.smeContactPhone, smeContactMail: idea.smeContactMail});
                    this.processValidation = true;
                    this.requestProcessing = false;   
                },
                errorCode =>  this.statusCode = errorCode);   
   }
   //Delete idea
   deleteIdea(ideaId: string) {
      this.preProcessConfigurations();
      this.ideaService.deleteIdeaById(ideaId)
          .subscribe(successCode => {
                    this.statusCode = successCode;
                    this.getAllIdeas();  
                    this.backToCreateIdea();
                },
                errorCode => this.statusCode = errorCode);    
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;   
   }
   //Go back from update to create
   backToCreateIdea() {
      this.ideaIdToUpdate = null;
      this.ideaForm.reset();   
      this.processValidation = false;
   }
}
    