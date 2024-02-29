import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  @ViewChild(MatStepper) matStepper!: MatStepper;

  resumeForm!: FormGroup;
  educations: FormControl[] = [];

  // Define properties to store form data
  fullName: string = "";
  phoneNumber: string = "";
  profileUrl: string = "";
  email: string = "";
  //educationInfo: any[] = [{ schoolName: "" }];
  experiences: any[] = [{ company: { name: "" } }];
  skills: string = "";
  achievements: any[] = [{ name: "" }];
  //educationInfo: any;

  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form and controls
    this.resumeForm = this.fb.group({
      fullName: new FormControl(''),
      phoneNumber: new FormControl(''),
      profileUrl: new FormControl(''),
      email: new FormControl(''),
      educations: this.fb.array([]),
      companyNames: this.fb.array([]),
      skills: new FormControl(''),
      achievements: this.fb.array([]),
    });

    // Add initial form controls for education, experience, and achievements
    this.addEducation();
    this.addExperience();
    this.addAchievement();
  }


  submitForm(): void {
    if (this.resumeForm.valid) {
      const currentStep = this.matStepper.selectedIndex;
      if (currentStep < this.matStepper.steps.length - 1) {
        this.matStepper.next();
      } else {
        // If it's the last step, you can call the generateResumePDF function or any other finalization logic.
        this.generateResumePDF();
      }
    }
  }

  // Add a new education control to the form
  addEducation(): void {
    const control = this.fb.control('');
    this.educations.push(control);
  }

  areAllEducationsValid(): boolean {
    return this.educations.every(education => education.valid);
  }

 
    

  // Add a new experience control to the form
  addExperience(): void {
    const control = this.fb.control('');
    this.companyNames.push(control);
  }

  // Add a new achievement control to the form
  addAchievement(): void {
    const control = this.fb.control('');
    this.achievements.push(control);
  }

  // Getters for form arrays
  

  get companyNames(): FormArray {
    return this.resumeForm.get('companyNames') as FormArray;
  }

  get achievementsFormArray(): FormArray {
    return this.resumeForm.get('achievements') as FormArray;
  }

  // Submit form
  generateResumePDF(): void {
    const doc = new jsPDF();
    const fullName = this.resumeForm.get('fullName')?.value ?? '';
    const phoneNumber = this.resumeForm.get('phoneNumber')?.value ?? '';
    const profileUrl = this.resumeForm.get('profileUrl')?.value ?? '';
    const email = this.resumeForm.get('email')?.value ?? '';
  
    // Add contact information
    doc.text(`Name: ${fullName}`, 10, 10);
    doc.text(`Phone Number: ${phoneNumber}`, 10, 20);
    doc.text(`LinkedIn Profile URL: ${profileUrl}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text('----------------------------------', 10, 50);
  
    // Initialize the vertical position for education and experience sections
    let verticalPosition = 60;
  
    // Add education information
    this.educations.forEach((education, index) => {
      const schoolName = education.get('schoolName')?.value ?? '';
      const startDate = education.get('startDate')?.value ?? '';
      const endDate = education.get('endDate')?.value ?? '';
      const studyField = education.get('studyField')?.value ?? '';
      const degree = education.get('degree')?.value ?? '';
    

      doc.text(`Education #${index + 1}`, 10, 60 + index * 80);
      doc.text(`School Name: ${education.value}`, 20, 70 + index * 80);
      doc.text(`Start Date: ${education.value}`, 20, 80 + index * 80);
      doc.text(`End Date: ${education.value}`, 20, 90 + index * 80);
      doc.text(`Study Field: ${education.value}`, 20, 100 + index * 80);
      doc.text(`Degree: ${education.value}`, 20, 110 + index * 80);
    
      // Add other education fields as needed
      doc.text('----------------------------------', 10, 120 + index * 80);
    
      // Increment the vertical position for the next section
      verticalPosition += 140; // Adjust as needed
    });
  
    // Add experience information
    this.experiences.forEach((experience, index) => {
     // const companyName = experience.get('company.name')?.value ?? '';
  
      doc.text(`Experience #${index + 1}`, 10, verticalPosition);
     // doc.text(`Company Name: ${companyName}`, 20, verticalPosition + 10);
      // Add other experience fields as needed
      doc.text('----------------------------------', 10, verticalPosition + 20);
  
      // Increment the vertical position for the next section
      verticalPosition += 30; // Adjust as needed
    });
  
  
    // Save the PDF
    doc.save((this.resumeForm.get('fullName')?.value ?? '') + 'Resume.pdf');
    console.log('Form Values:', this.resumeForm.value);
  }
  
  

 
}
