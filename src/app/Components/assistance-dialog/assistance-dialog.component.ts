import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assistance-dialog',
  templateUrl: './assistance-dialog.component.html',
  styleUrls: ['./assistance-dialog.component.css']
})
export class AssistanceDialogComponent {

  selectedAnswers: { [key: string]: string } = {};
  questions = [
    { question: 'What is your current status ?', options: ['I am a student,', 'I am an employee of a company,', 'I am an alumnus,'] },
    { question: 'What type of assistance do you need ?', options: ['I need help with site navigation,', 'I need technical support for features,', 'I need assistance with specific problem-solving,'] },
    { question: 'Are you facing any particular difficulties on the site ?', options: ['I am having trouble finding certain information,', 'I am experiencing page loading issues,', 'I am encountering errors when using certain features,'] },
    { question: 'How would you rate your overall experience on the site ?', options: ['Very satisfying,', 'Average,', 'Dissatisfying,'] },
    { question: 'What features do you find most useful on the site ?', options: ['Posting questions and answers,', 'Searching for content,', 'Interacting with other users,'] },
    { question: 'How can we improve your experience on the site ?', options: ['Improve the user interface usability .', 'Enhance site performance and speed .', 'Add new features.'] },

  ];

  constructor(public dialogRef: MatDialogRef<AssistanceDialogComponent>) { }

  submitAnswers() {
    let feedbackContent = '';
    for (const question in this.selectedAnswers) {
      if (this.selectedAnswers.hasOwnProperty(question)) {
        feedbackContent += question + ': \n' + this.selectedAnswers[question] + '\n';
      }
    }
    this.dialogRef.close(feedbackContent);
  }
}
